// user controller
const User = require("../models/user.js");
const Order = require("../models/order.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

module.exports.register_user = async function (req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "glamup.project@gmail.com",
      pass: "krzbhkmkdhjkskif",
    },
  });

  const { fullname, email, password, contact, address, profile } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({

    fullname,
    email,
    contact,
    address,
    password: hashed,
    profile:
      "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
  });
  const foundemail = await User.findOne({ email: email });
  if (!foundemail) {
    const usersaved = await user.save();
    if (usersaved) {
      function randomString(length, chars) {
        var result = "";
        for (var i = length; i > 0; --i)
          result += chars[Math.floor(Math.random() * chars.length)];
        return result;
      }
      var randomnumber = randomString(
        4,
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      );
      console.log(randomnumber);

      const subject = "This is your verification code";
      const text = "Code: " + randomnumber;
      var mailOptions = {
        from: "glamup.project@gmail.com",
        to: email,
        subject: subject,
        text: text,
      };
      const updateverificationcode = await User.findOneAndUpdate(
        { email: email },
        { verificationcode: randomnumber }
      );
      console.log(updateverificationcode);
      if (updateverificationcode) {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.json({
              message: "User not registered",
              success: false,
              error: error,
            });
          } else {
            console.log("Email sent: " + info.response);
            return res.json({ message: "User Registered", success: true });
          }
        });
      } else {
        return res.json({
          message: "User not registered",
          success: false,
        });
      }
    } else {
      return res.json({ message: "User not registered", success: false });
    }
  } else {
    return res.json({ message: "Email already registered", success: false });
  }
};


module.exports.emailverification = async function (req, res) {
  const { email, verificationcode } = req.body;
  const founduser = await User.findOne({
    email: email,
    verificationcode: verificationcode,
  });
  console.log(res.body);
  if (founduser) {
    const id = founduser._id;
    const updateuser = await User.findByIdAndUpdate(id, {
      active: true,
      verificationcode: null,
    });
    if (updateuser) {
      return res.json({ message: "Email verified succefully", success: true });
    } else {
      return res.json({ message: "Email verification failed", success: false });
    }
  } else {
    return res.json({
      message: "Email and verification code mismatch",
      success: false,
    });
  }
};



module.exports.login_user = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.active) {
      const validLogin = await bcrypt.compare(req.body.password, user.password);
      if (validLogin) {
        const _id = user._id;
        let isAdmin = false;
        if (user.userType == "Admin") {
          isAdmin = true;
        }
        const accessToken = jwt.sign({ id: _id, username: user.fullname, email: user.email, contact: user.contact, address: user.address,image:user.profile }, "token");
        return res.json({
          message: "Login Succesfull",
          accessToken,
          isAdmin: isAdmin,
          data: user,
          success: true,
        });
      } 
      else {
        return res.json({ message: "Invalid Credential", success: false });
      }
    } else {
      return res.json({ message: "Email is not verified", success: false });
    }
   
  } else {
    return res.json({ message: "Invalid Credential", success: false });
  }
};

module.exports.login_admin = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const validLogin = await bcrypt.compare(req.body.password, user.password);
    if (validLogin) {
      const _id = user._id;
      const accessToken = jwt.sign({ _id }, "token");
      return res.json({
        message: "co",
        isAdmin: true,
        accessToken: accessToken,
        data: user,
        success: true,
      });
    } else {
      return res.json({ message: "Invalid Credential", success: false });
    }
  } else {
    return res.json({ message: "Invalid Credential", success: false });
  }
};

module.exports.register_admin = async function (req, res) {
  const { fullname, email, password, contact, address, profile } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({
    fullname,
    email,
    contact,
    address,
    password: hashed,
    userType: "Admin",
    profile,
  });
  await user.save();
  return res.json({ message: "Admin Registered", success: true });
};

module.exports.get_user_detail = async function (req, res) {
  const _id = req.user._id;
  const user = await User.findById(_id).populate("cart");
  res.json({ success: true, message: "User Fetched", data: user });
};
module.exports.user_detail = async function (req, res) {
  const fullname= req.body.username
    const email= req.body.email
    const contact= req.body.contact
    const address= req.body.address
    const userType=req.body.userType
    //make userid in product model 
    
    
    
      User.find(fullname,address,contact,email)
      .then(function (result) {
        res.json(result);
        console.log(result);
      })
  
      .catch(function () {
        res.json({ msg: "something went wrong" });
      });
};



module.exports.update_user_picture = async function (req, res) {
  console.log(req.file)
  if (req.file == undefined) {
    return res.json({ message: "only png/jpg files are allowed!" });
  }
  const filename = req.file?.path;
  const user = req.user;
  const result = await User.updateOne(
    { _id: req.params.id },
    {
      profile: filename,
    }
  );
  res.json({ message: "User Profile Picture Uploaded", success: true });
};

module.exports.add_to_cart = async function (req, res) {
  try {
    // console.log(req.params.id);
    const user = await User.findOne({ _id: req.body.user });
    
    const productId = req.params.id;
    let message;
    const doesItemExistOnCart = user.cart.find(function (item) {
      if (item._id == productId) {
        console.log(productId)
        return true;
      }
    });
    if (doesItemExistOnCart) {
      console.log("remove")
      user.cart.pop({ productId });
      message = "Product Removed from cart";
    } else {
      console.log("added")
      user.cart.push({ productId });
      message = "Product Added to cart";
    }
    await user.save();
    res.json({ message, success: true });
  } catch (error) {
    res.json(error)
  }
};

module.exports.view_cart = async function (req, res) {
  // const user = req.user;
  const user = await User.findOne({_id:req.user}).populate({path:"cart",populate:{path:"productId",model:"Product"}})
  console.log(user.cart)
  // const cart = user.cart;
  // console.log(cart);
  res.json({ message: "View Cart", success: true, data: user.cart });
};

module.exports.checkout_cart = async function (req, res) {
  const cart = req.body.cart;
  const user = req.body.user;
 
    // user.cart.clear();
    const order = new Order({
      user: user,
      items: cart,
    });
    if(order){
       await User.findOneAndUpdate({_id:user},{
        cart:[]
      })

    }
    await order.save();
    
  
  res.json({ message: "Order Placed Successfully", success: true, data: cart });
};

module.exports.empty_cart =async function(req,res){
  const cart = req.body.cart;
  const user = req.body.user;
  await User.findOneAndUpdate({_id:user},{
    cart:[]
  })
  res.json({ message: "cleared", success: true, data: cart });
};

module.exports.update_password = async function (req, res) {
  if(!req.body.email){
    res.json({ msg: "Email wrong" });
}
else{
   
    const email=req.body.email
    bcrypt.hash(req.body.password, 10, function (e, hashed_pw){
        User.findOneAndUpdate({email:email},{password:hashed_pw})
        .then(function (result) {
            res.json(result);
            console.log(result);
          }
    )
    .catch(
        console.log('email not exist')
    )

    })
    
}
};
module.exports.update_user = async function (req, res) {
  const { fullname, email, address, contact } = req.body;
  const user = req.params.user;
  await User.updateOne(
    { _id: user },
    { fullname, email, address, contact}
  );
  return res.json({ message: "User Profile Updated", success: true });
};

module.exports.emailcheck = async function (req, res) {
  if (!req.body.email) {
    res.json({ msg: "Email  wrong" });
  }
  else {

    const email = req.body.email
    User.findOne({ email: email })
      .then(function (result) {
        res.json(result);
        console.log(result);
      }
      )
      .catch(
        console.log('email not exist')
      )
  }
};
module.exports.delete_user= async function(req,res){
  const user=await User.findOneAndDelete({_id:req.params.id});
  res.json(user);
}

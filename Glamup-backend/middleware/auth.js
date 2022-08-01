//auth 
const jsonwebtoken = require("jsonwebtoken");
const Users = require("../models/user");

module.exports.checkAuth = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const data = jsonwebtoken.verify(token, "token");
    const user = await Users.findOne({ _id: data.id }).populate("cart")
    console.log(user)
    if (user) {
      req.user = user;
      next();
    }
    else {
      res.json({ message: "Unauthorized!!", success: false });
    }
  } catch (e) {
    res.json({ error: e });
    console.log(e);
  }
};

module.exports.verifyAdmin = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jsonwebtoken.verify(token, "anysecretkey");


    console.log(data);
    Admin.findOne({ _id: data.aId }).then(function (result) {
      // console.log(result)gg;
      req.adminInfo = result;
      next();
    })
      .catch(function (e) {
        res.json({ error: e })
      })
  }
  catch (e) {
    res.json({ error: 'Invalid Access' })
  }


};

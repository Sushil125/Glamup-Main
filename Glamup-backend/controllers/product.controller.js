//product controller
const Product = require("../models/product.js");
const Comment = require("../models/comment");
const product = require("../models/product.js");
const Order= require("../models/order")

module.exports.add_product = async function (req, res) {
  const image = req?.file?.path;
  const { brandname, name, description, category, price } = req.body;
  const product = new Product({ brandname, name, description, category, price, image });
  await product.save();
  res.json({ message: "Product Added", success: true, data: product._id });
};

// module.exports.upload_image = async function (req, res) {
//   if (req.file == undefined) {
//     return res.json({ message: "only png files are allowed!" });
//   }
//   const filename = req.file.filename;
//   await Product.updateOne(
//     { _id: req.params.id },
//     {
//       image: "http://localhost:1025/public/" + filename,
//     }
//   );
//   res.json({ message: "Image Uploaded", success: true });
// };

module.exports.update_product = async function (req, res) {
  const image = req?.file?.path;
  const { brandname, name, description, category, price } = req.body;
  await Product.findOneAndUpdate(
    { _id: req.params.id },
    { brandname, name, description, category, price, image }
  );
  res.json({ message: "Product Updated", success: true });
};

module.exports.delete_product = async function (req, res) {
  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: "Product Deleted", success: true });
};

module.exports.view_product = async function (req, res) {
  const product = await Product.findOne({ _id: req.params.id });
  res.json({ message: "Product Fetched", success: true, data: product });
};

module.exports.get_products = async function (req, res) {
  const product = await Product.find();
  res.json({ message: "All Product Fetched", success: true, data: product });
};

module.exports.get_comments = async function (req, res) {
  const message = req.body.messagee;
  
    
  //make userid in product model

  Comment.find({product:req.params.id}).populate('user')
    .then(function (result) {
      res.json(result);
      console.log(result);
    })

    .catch(function () {
      res.json({ msg: "something went wrong" });
    });
};

module.exports.write_comment = async function (req, res) {
  const message = req.body.message;
  const product = req.body.product;
  
  const user = req.body.user;
  const pdt = new Comment({
    message: message,
    product: product,
    user: user,
    star:req.body.star

  });

  pdt
    .save()
    .then(function () {
      res.json({ msg: "Comment added!!" });
    })

    .catch(function () {
      res.json({ msg: "Something went wrong!" });
    });
};

module.exports.edit_comment = async function (req, res) {
  const commentId = req.params.id;
  const user = req.user._id;
  await Comment.updateOne(
    { _id: commentId, user: user },
    {
      message: req.body.message,
    }
  );
  res.json({ message: "Comment Edited", success: true });
};

module.exports.delete_comment = async function (req, res) {
  const commentId = req.params.id;
  const user = req.user._id;
  await Comment.deleteOne({ _id: commentId, user: user });
  res.json({ message: "Comment Deleted", success: true });
  
};

module.exports.get_order=async function(req,res){
  const order=await Order.find().populate("user");
  res.json(order);
}
module.exports.delete_order=async function(req,res){
  const order=await Order.findOneAndDelete({_id:req.params.id});
  res.json(order);
}
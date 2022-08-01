//product model
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brandname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  
});

const product = mongoose.model("Product", productSchema);
module.exports = product;

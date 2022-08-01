// user model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  active: {
    type: Boolean,
    default: false
  },
  verificationcode:
  {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  profile: {
    type: String,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: { type: Number, default: 1 }

    }
  ],
  
});

const user = mongoose.model("User", userSchema);
module.exports = user;

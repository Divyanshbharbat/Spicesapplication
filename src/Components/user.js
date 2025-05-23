import mongoose from "mongoose";
import products from "./product.js"; // Make sure Order.js exports the Order model
import Order from "./Order.js";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // no duplicates
  },
  email: {
    type: String,
    required: true,
    unique: true,  // no duplicates
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      // Embedded product details in cart (snapshot at time of adding)
      id: { type: Number },
      name: { type: String, },
      description: { type: String },
      quantity: { type: Number, default: 1, min: 1 },
      price: { type: Number,  },  // price stored as number
    
      image: { type: String }
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }
  ]
}, {
  timestamps: true,  // adds createdAt and updatedAt automatically
});

const User = mongoose.model("User", userSchema);

export default User;

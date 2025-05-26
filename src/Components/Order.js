import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  userDetails: {
    name: { type: String },
    email: { type: String},
  },
  address: { type: String },
  phone: { type: String },
  products: [
    {
      name: String,
      price: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true },
  placedAt: { type: Date, default: Date.now },
  expireAt: {
    type:Date,
    default: () => Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
  },
});

// TTL index to auto-delete orders 2 days after expireAt
orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Order = mongoose.model("Order", orderSchema);

export default Order;

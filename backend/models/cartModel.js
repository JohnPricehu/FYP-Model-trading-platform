import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const cartSchema = mongoose.Schema(
  {
    // name: { type: String, required: true },
    qty: { type: Number, required: true },
    // image: { type: String, required: true },
    // price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Goods',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
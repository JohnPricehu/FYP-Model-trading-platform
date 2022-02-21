import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const orderSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        // unique: true,
      },
    goods_id: {
        type: Int32Array,
        required: true,
        // unique: true,
      },
    order_id: {
      type: Int32Array,
      required: true,
      unique: true,
    },
    order_price: {
      type: Int32Array,
      required: true,     
    },

  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const shoppingCartSchema = mongoose.Schema(
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
    goods_name: {
        type: String,
        required: true,
      //   unique: true,
      },
    shoppingCart_price: {
      type: Int32Array,
      required: true,     
    },

  },
  {
    timestamps: true,
  }
);

const ShoppingCart = mongoose.model("Shopping cart", shoppingCartSchema);

export default ShoppingCart;
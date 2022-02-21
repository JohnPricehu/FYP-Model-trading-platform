import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const goodsSchema = mongoose.Schema(
  {
    goods_id: {
        type: Int32Array,
        required: true,
        unique: true,
      },
    goods_name: {
      type: String,
      required: true,
    //   unique: true,
    },
    goods_details: {
      type: String,
      required: true,     
    },
    goods_pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Goods = mongoose.model("Goods", goodsSchema);

export default Goods;
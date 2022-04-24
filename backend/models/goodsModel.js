import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const buyerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const goodsSchema = mongoose.Schema(
  {
    // goods_id: {
    //     type: Int32Array,
    //     required: true,
    //     unique: true,
    //   },
    goods_name: {
      type: String,
      required: true,
      unique: true,
    },
    goods_details: {
      type: String,
      required: true,     
    },
    goods_category: {
      type: String,
      required: true,
    },
    goods_price: {
      type: Number,
      required: true,
      default: 0,
    },
    goods_pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    buyers:[
      buyerSchema
  ],
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // owner_name: {
    //   type: String,
    //   required: true,
    // },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    sales:{
      type: Number,
      required: true,
      default: 0,
    }
  },
  
  {
    timestamps: true,
  }
);


const Goods = mongoose.model("Goods", goodsSchema);

export default Goods;
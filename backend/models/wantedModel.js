import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const wantedSchema = mongoose.Schema(
  {
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

const Wanted = mongoose.model("Wanted", wantedSchema);

export default Wanted;
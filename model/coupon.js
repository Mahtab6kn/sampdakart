import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },

  discount: {
    type: Number,
    required: true,
  },

  minAmt: {
    type: Number,
    default: 0,
  },

  maxAmt: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;

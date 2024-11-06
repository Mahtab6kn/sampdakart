import mongoose, { Schema } from "mongoose";

const SetOfProductSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      lowercase: true,
    },

    title: {
      type: String,
      required: true,
      lowercase: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    visibility: {
      type: Boolean,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    fabric: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],

    brand: [
      {
        type: String,
        lowercase: true,
      },
    ],

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.SetOfProduct ||
  mongoose.model("SetOfProduct", SetOfProductSchema);

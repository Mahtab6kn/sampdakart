import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: Object,
      default: {
        url: "",
        ref: "",
      },
      required: true,
    },

    subCategories: {
      type: Array,
      default: [],

      items: {
        type: Object,

        properties: {
          name: {
            type: String,
            lowercase: true,
          },

          colour: {
            type: String,
            lowercase: true,
          },
        },
      },
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;

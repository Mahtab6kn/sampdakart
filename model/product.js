import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    category: { type: String, required: true, lowercase: true, trim: true },

    subCategory: {
      type: Object,
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },

          ref: {
            type: String,
            required: true,
          },
        },
      ],

      required: true,

      default: [],

      validate: {
        validator: function (v) {
          return v.length >= 4;
        },

        message: (props) =>
          `At least 4 images are required, but only ${props.value.length} provided.`,
      },
    },

    discount: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    visibility: {
      type: Boolean,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    sizes: [
      {
        size: {
          type: String,
          lowercase: true,
          trim: true,
        },

        colours: [
          {
            colour: {
              name: {
                type: String,
                lowercase: true,
                trim: true,
              },

              hex: {
                type: String,
                trim: true,
                lowercase: true,
              },
            },

            quantity: {
              type: Number,
              trim: true,
            },

            _id: false,
          },
        ],
        _id: false,
      },
    ],

    fabric: {
      type: String,
      lowercase: true,
    },

    brand: {
      type: String,
      trim: true,
      lowercase: true,
    },

    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.index({
  description: "text",
  title: "text",
  fabric: "text",
  brand: "text",
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

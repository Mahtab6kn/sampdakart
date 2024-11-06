import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      lowercase: true,
    },

    image: {
      type: Object,
      default: {
        url: "https://firebasestorage.googleapis.com/v0/b/musharraf-39357.appspot.com/o/profile.svg?alt=media&token=a214a5c7-9b64-4251-be52-4292a57055c9",
        ref: "user/default.svg",
      },
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          required: true,
        },

        color: {
          name: {
            type: String,
            lowercase: true,
          },

          hex: {
            type: String,
            lowercase: true,
          },
        },

        size: {
          type: String,
          lowercase: true,
        },

        _id: false,
      },
    ],

    createdBy: {
      type: String,
      default: "user",
    },

    shippingInfo: {
      type: [
        {
          flat: {
            type: String,
            required: true,
            lowercase: true,
          },

          street: {
            type: String,
            required: true,
            lowercase: true,
          },

          landmark: {
            type: String,
            lowercase: true,
          },

          city: {
            type: String,
            required: true,
            lowercase: true,
          },

          state: {
            type: String,
            required: true,
            lowercase: true,
          },

          pincode: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 6,
          },
        },
      ],
      default: [],
    },

    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },

    otp: {
      type: Number,
      minlength: 6,
      maxlength: 6,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(12, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export default mongoose.models.User || mongoose.model("User", userSchema);

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema, "users");

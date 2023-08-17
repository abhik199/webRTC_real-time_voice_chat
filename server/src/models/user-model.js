import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
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

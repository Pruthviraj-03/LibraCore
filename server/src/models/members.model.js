import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["LIBRARIAN", "MEMBER"],
      default: "MEMBER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DELETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const Members = mongoose.model("members", memberSchema);

export { Members };

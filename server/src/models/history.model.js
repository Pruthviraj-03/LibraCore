import mongoose from "mongoose";

const borrowHistorySchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "members",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    returnedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["BORROWED", "RETURNED"],
      default: "BORROWED",
    },
  },
  { timestamps: true }
);

const BorrowHistory = mongoose.model("BorrowHistory", borrowHistorySchema);

export { BorrowHistory };

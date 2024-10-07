import { BorrowHistory } from "../models/borrowHistory.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";

// Get Borrow History
const getBorrowHistory = asyncHandler(async (req, res) => {
  const borrowHistory = await BorrowHistory.find({ status: "BORROWED" })
    .populate("memberId", "name email") // Populate member details
    .populate("bookId", "title author"); // Populate book details

  if (!borrowHistory || borrowHistory.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse("No borrow history found", false));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        "Borrow history retrieved successfully",
        true,
        borrowHistory
      )
    );
});

// Get Return History
const getReturnHistory = asyncHandler(async (req, res) => {
  const returnHistory = await BorrowHistory.find({ status: "RETURNED" })
    .populate("memberId", "name email") // Populate member details
    .populate("bookId", "title author"); // Populate book details

  if (!returnHistory || returnHistory.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse("No return history found", false));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        "Return history retrieved successfully",
        true,
        returnHistory
      )
    );
});

export { getBorrowHistory, getReturnHistory };

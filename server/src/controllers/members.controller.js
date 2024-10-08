import { users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";

// Get Borrowed Books
const getBorrowBooks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await users.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.borrowedBooks,
        "Borrowed books retrieved successfully"
      )
    );
});

// Get Returned Books
const getReturnBooks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await users.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.returnedBooks,
        "Returned books retrieved successfully"
      )
    );
});

// Get Borrow/Return History
const getHistoryMe = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await users.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.borrowReturnHistory,
        "Borrow/Return history retrieved successfully"
      )
    );
});

// Exporting the controller methods
export { getBorrowBooks, getReturnBooks, getHistoryMe };

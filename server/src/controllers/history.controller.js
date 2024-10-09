import { users } from "../models/user.model.js";
import { books } from "../models/books.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";

const borrowBook = asyncHandler(async (req, res) => {
  const { memberId, bookId } = req.params;

  const member = await users.findById(memberId);
  if (!member || member.status === "DELETED") {
    throw new ApiError(404, "Member not found or account is deactivated");
  }

  const book = await books.findById(bookId);
  if (!book || book.status === "BORROWED") {
    throw new ApiError(404, "Book not found or already borrowed");
  }

  member.borrowBooks.push(bookId);
  book.status = "BORROWED";

  await member.save();
  await book.save();

  res
    .status(200)
    .json(new ApiResponse(200, { member, book }, "Book borrowed successfully"));
});

const returnBook = asyncHandler(async (req, res) => {
  const { memberId, bookId } = req.params;

  const member = await users.findById(memberId);
  if (!member || member.status === "DELETED") {
    throw new ApiError(404, "Member not found or account is deactivated");
  }

  const book = await books.findById(bookId);
  if (!book || book.status === "AVAILABLE") {
    throw new ApiError(404, "Book not found or already returned");
  }

  member.borrowBooks = member.borrowBooks.filter(
    (borrowedBookId) => borrowedBookId.toString() !== bookId
  );
  member.returnBooks.push(bookId);

  book.status = "AVAILABLE";

  await member.save();
  await book.save();

  res
    .status(200)
    .json(new ApiResponse(200, { member, book }, "Book returned successfully"));
});

const getBorrowedBooks = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log("Fetching borrowed books for email:", req.body);

  const member = await users.findOne({ email }).populate("borrowBooks");

  console.log("Member found:", member);

  if (!member || member.status === "DELETED") {
    console.error("Member not found or account is deactivated");
    throw new ApiError(404, "Member not found or account is deactivated");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { borrowBooks: member.borrowBooks },
        "Borrowed books fetched successfully"
      )
    );
});

const getReturnedBooks = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log("Fetching returned books for email:", email);

  const member = await users.findOne({ email }).populate("returnBooks");

  console.log("Member found:", member);

  if (!member || member.status === "DELETED") {
    console.error("Member not found or account is deactivated");
    throw new ApiError(404, "Member not found or account is deactivated");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { returnBooks: member.returnBooks },
        "Returned books fetched successfully"
      )
    );
});

export { borrowBook, returnBook, getBorrowedBooks, getReturnedBooks };

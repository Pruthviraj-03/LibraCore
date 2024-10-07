import { books } from "../models/books.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";

// Get all books
const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await books.find({});
  res
    .status(200)
    .json(new ApiResponse(200, allBooks, "Books retrieved successfully"));
});

// Add a new book
const addNewBook = asyncHandler(async (req, res) => {
  const newBook = await books.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, newBook, "Book added successfully"));
});

// Update a book
const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await books.findById(id);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  // Update book details
  Object.assign(book, req.body);
  await book.save();

  res.status(200).json(new ApiResponse(200, book, "Book updated successfully"));
});

// Delete a book
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBook = await books.findByIdAndDelete(id);

  if (!deletedBook) {
    throw new ApiError(404, "Book not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedBook, "Book deleted successfully"));
});

// Exporting the controller methods
export { getAllBooks, addNewBook, updateBook, deleteBook };

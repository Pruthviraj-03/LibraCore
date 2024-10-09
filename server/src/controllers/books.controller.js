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

const addNewBook = asyncHandler(async (req, res) => {
  const { title, author, description, image } = req.body;

  // Check if all fields are provided
  if (!title || !author || !description || !image) {
    throw new ApiError(
      400,
      "All fields (title, author, description, image) are required"
    );
  }

  const newBook = await books.create({ title, author, description, image });
  res
    .status(201)
    .json(new ApiResponse(201, newBook, "Book added successfully"));
});

// Delete a book
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the book ID from the request params
  const deletedBook = await books.findByIdAndDelete(id); // Find and delete the book by ID

  if (!deletedBook) {
    // If the book was not found, return an error
    throw new ApiError(404, "Book not found");
  }

  // Send a successful response with the deleted book data
  res
    .status(200)
    .json(new ApiResponse(200, deletedBook, "Book deleted successfully"));
});

// Exporting the controller methods
export { getAllBooks, addNewBook, deleteBook };

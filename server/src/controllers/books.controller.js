import { books } from "../models/books.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";

const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await books.find({});
  res
    .status(200)
    .json(new ApiResponse(200, allBooks, "Books retrieved successfully"));
});

const addNewBook = asyncHandler(async (req, res) => {
  const { title, author, description, image } = req.body;

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
  const { id } = req.params;
  const deletedBook = await books.findByIdAndDelete(id);

  if (!deletedBook) {
    throw new ApiError(404, "Book not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedBook, "Book deleted successfully"));
});

export { getAllBooks, addNewBook, deleteBook };

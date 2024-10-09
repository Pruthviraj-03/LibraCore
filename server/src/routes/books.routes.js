import { Router } from "express";
import {
  getAllBooks,
  addNewBook,
  deleteBook,
} from "../controllers/books.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to get all books
router.route("/allbooks").get(getAllBooks);

// Route to add a new book (requires authentication)
router.route("/addbook").post(authMiddleWare, addNewBook);

// Route to delete a book (requires authentication)
router.route("/allbooks/:id").delete(authMiddleWare, deleteBook);

export { router };

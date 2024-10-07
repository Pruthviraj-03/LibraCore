import { Router } from "express";
import {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/books").get(getAllBooks).post(authMiddleWare, addNewBook);

router
  .route("/books/:id")
  .put(authMiddleWare, updateBook)
  .delete(authMiddleWare, deleteBook);

export { router };

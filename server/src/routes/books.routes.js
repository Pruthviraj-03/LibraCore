import { Router } from "express";
import {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/allbooks").get(getAllBooks).post(authMiddleWare, addNewBook);

router
  .route("/allbooks/:id")
  .put(authMiddleWare, updateBook)
  .delete(authMiddleWare, deleteBook);

export { router };

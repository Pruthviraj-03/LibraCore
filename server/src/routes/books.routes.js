import { Router } from "express";
import {
  getAllBooks,
  addNewBook,
  deleteBook,
} from "../controllers/books.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/allbooks").get(getAllBooks);

router.route("/addbook").post(authMiddleWare, addNewBook);

router.route("/allbooks/:id").delete(authMiddleWare, deleteBook);

export { router };

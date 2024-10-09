import { Router } from "express";
import {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getReturnedBooks,
} from "../controllers/history.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/members/:memberId/borrow/:bookId")
  .post(authMiddleWare, borrowBook);

router
  .route("/members/:memberId/return/:bookId")
  .post(authMiddleWare, returnBook);

router.route("/borrow-history").post(authMiddleWare, getBorrowedBooks);

router.route("/return-history").post(authMiddleWare, getReturnedBooks);

export { router };

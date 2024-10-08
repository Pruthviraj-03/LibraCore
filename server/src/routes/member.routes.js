import { Router } from "express";
import {
  getBorrowBooks,
  getReturnBooks,
  getHistoryMe,
  deleteMe,
} from "../controllers/members.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/me/borrowed").get(authMiddleWare, getBorrowBooks);
router.route("/me/returned").get(authMiddleWare, getReturnBooks);
router.route("/me/history").get(authMiddleWare, getHistoryMe);
router.route("/deleteme").delete(authMiddleWare, deleteMe);

export { router };

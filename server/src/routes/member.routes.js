import { Router } from "express";
import {
  getMyData,
  getBorrowBooks,
  getReturnBooks,
  getHistoryMe,
  deleteMe,
} from "../controllers/member.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

// Define routes using router.route()
router.route("/me").get(authMiddleWare, getMyData);
router.route("/me/borrowed").get(authMiddleWare, getBorrowBooks);
router.route("/me/returned").get(authMiddleWare, getReturnBooks);
router.route("/me/history").get(authMiddleWare, getHistoryMe);
router.route("/me").delete(authMiddleWare, deleteMe);

export { router };

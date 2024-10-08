import { Router } from "express";
import {
  getBorrowBooks,
  getReturnBooks,
} from "../controllers/members.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/me/borrowed").get(authMiddleWare, getBorrowBooks);
router.route("/me/returned").get(authMiddleWare, getReturnBooks);

export { router };

import { Router } from "express";
import {
  getBorrowHistory,
  getReturnHistory,
} from "../controllers/librarian.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

// Define routes
router.route("/borrow-history").get(authMiddleWare, getBorrowHistory);
router.route("/return-history").get(authMiddleWare, getReturnHistory);

export { router };

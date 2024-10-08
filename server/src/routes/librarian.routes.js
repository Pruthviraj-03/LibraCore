import { Router } from "express";
import {
  getAllMembers,
  deleteMember,
} from "../controllers/librarian.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/members").get(getAllMembers);

router.route("/members/:memberId").delete(authMiddleWare, deleteMember);

export { router };

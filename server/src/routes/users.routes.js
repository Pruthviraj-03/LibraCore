import { Router } from "express";
import {
  refreshAccessToken,
  signup,
  login,
  logout,
  getMyData,
} from "../controllers/user.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/refresh-token").post(refreshAccessToken);

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(authMiddleWare, logout);

router.route("/me").get(authMiddleWare, getMyData);

export { router };

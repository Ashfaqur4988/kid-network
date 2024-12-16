import express from "express";
import {
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/logout", logoutUser)
  .post("/login", loginUser)
  .get("/get-logged-in-user", protectRoute, getLoggedInUser);

export default router;

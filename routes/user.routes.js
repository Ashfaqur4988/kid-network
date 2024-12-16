import express from "express";
import {
  getAllUsers,
  getAllUsersDetails,
  updateUserRole,
} from "../controllers/user.controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router
  .get("/get-all-users", protectRoute, getAllUsers)
  .get("/get-all-users-details", protectRoute, getAllUsersDetails)
  .patch("/change-role", protectRoute, isAdmin, updateUserRole);

export default router;

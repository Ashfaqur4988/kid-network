import jwt from "jsonwebtoken";
import logger from "../logger.js";

export const generateToken = (userId, userRole) => {
  const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  logger.info("generateToken: Generated token");
  return token;
};

import jwt from "jsonwebtoken";
import logger from "../logger.js";

export const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      logger.warn("From isAdmin: No token provided");
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userRole !== "maintainer") {
      logger.warn("From isAdmin: Unauthorized");
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
    logger.info("isAdmin: Checked admin status");
  } catch (error) {
    logger.error(`Error checking admin status: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

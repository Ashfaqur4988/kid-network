import jwt from "jsonwebtoken";
import logger from "../logger.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    logger.info("token: " + token);
    if (!token) {
      logger.warn("From protectRoute: No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        logger.warn("From protectRoute: Invalid token");
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = payload.userId;
      req.userRole = payload.userRole;
      // console.log(payload.userId, payload.userRole);

      next();
      logger.info("protectRoute: Protected route passed");
    });
  } catch (error) {
    logger.error(`Error protecting route: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

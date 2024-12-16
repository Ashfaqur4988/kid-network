import logger from "../logger.js";
import prisma from "../utils/prisma.js";

export const getAllUsers = async (req, res) => {
  try {
    const role = req.userRole;
    const id = req.userId;

    if (role !== "cooler kid") {
      logger.warn("Unauthorized from getAllUsers");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findMany({
      where: {
        id: {
          not: id,
        },
      },
      select: {
        firstName: true,
        lastName: true,
        country: true,
      },
    });

    res.status(200).json(user);
    logger.info("getAllUsers: Fetched all users");
  } catch (error) {
    logger.error(`Error getting all users: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersDetails = async (req, res) => {
  try {
    const role = req.userRole;
    const id = req.userId;

    if (role !== "coolest kid" && role !== "maintainer") {
      logger.warn("Unauthorized from getAllUsersDetails");
      return res
        .status(401)
        .json({ message: "Unauthorized from getAllUsersDetails" });
    }

    const user = await prisma.user.findMany({
      where: {
        id: {
          not: id,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        country: true,
        email: true,
        role: true,
      },
    });

    res.status(200).json(user);
    logger.info("getAllUsersDetails: Fetched all users details");
  } catch (error) {
    logger.error(`Error getting all users details: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { newRole, userId } = req.body;

    if (!newRole) {
      logger.warn("From updateUserRole: New role is required");
      return res.status(400).json({ message: "New role is required" });
    }
    const validRoles = ["cool kid", "cooler kid", "coolest kid"];
    if (!validRoles.includes(newRole)) {
      logger.warn("From updateUserRole: Invalid role");
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });
    res.status(200).json(updatedUser);
    logger.info("updateUserRole: Updated user role");
  } catch (error) {
    logger.error(`Error updating user role: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

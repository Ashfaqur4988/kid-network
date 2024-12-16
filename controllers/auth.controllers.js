import { fakeUserGenerator } from "../utils/fakeUserGenerator.js";
import { generateToken } from "../utils/generateToken.js";
import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/setCookie.js";
import logger from "../logger.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const role = "cool kid";
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      logger.warn("Attempt to register existing user");
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const { firstName, lastName, country } = await fakeUserGenerator();
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role,
        firstName,
        lastName,
        country,
      },
    });

    const token = generateToken(newUser.id, newUser.role);
    setCookie(res, token);
    res.status(201).json({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      country: newUser.country,
      role: newUser.role,
    });
    logger.info("Registered new user");
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      logger.warn("Attempt to login non-existent user");
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      logger.warn("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // console.log("user id " + user.id);

    const token = generateToken(user.id, user.role);
    setCookie(res, token);
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      role: user.role,
    });
    logger.info("Logged in user");
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
    logger.info("Logging out user");
  } catch (error) {
    logger.error(`Error logging out user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      logger.warn("From getLoggedIn: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      role: user.role,
    });
    logger.info("getLoggedInUser: Fetched logged in user");
  } catch (error) {
    logger.error(`Error getting logged in user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

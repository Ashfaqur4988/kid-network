import logger from "../logger.js";

export const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  logger.info("setCookie: Set cookie");
};

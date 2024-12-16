import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import express from "express";
import logger from "./logger.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

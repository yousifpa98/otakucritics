import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { connectDb } from "./libs/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDb();

// Routes
app.use("/users", userRoutes);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;

import express from "express";
import cors from "cors";

import routes from "./routes";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

/**
 * CORS
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Parse JSON & URL-encoded bodies (increased limit to 50MB for image data URLs)
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});

/**
 * Health Check
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Temple ERP API Running",
  });
});

/**
 * API Routes
 */
app.use("/api", routes);

/**
 * 404 Handler
 */
app.use((_req, _res, next) => {
  next(new AppError("Route not found", 404));
});

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;
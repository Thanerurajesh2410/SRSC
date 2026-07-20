import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Sri Rama Temple Management Platform API is running...");
});

export default app;
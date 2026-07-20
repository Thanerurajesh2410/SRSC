import express from "express";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Temple ERP API Running");
});

app.use("/api/v1/auth", authRoutes);

export default app;
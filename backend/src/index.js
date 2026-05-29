import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import detectRoutes from "./routes/detect.js";
import scanRoutes from "./routes/scans.js";
import reportRoutes from "./routes/reports.js";
import statsRoutes from "./routes/stats.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "truthguard-api", timestamp: new Date().toISOString() });
});

app.use("/api/detect", detectRoutes(AI_SERVICE_URL));
app.use("/api/scans", scanRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/stats", statsRoutes);

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/truthguard";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.warn("MongoDB unavailable, running without persistence:", err.message);
  }
}

connectDB();

app.listen(PORT, () => {
  console.log(`TruthGuard API running on http://localhost:${PORT}`);
});

export default app;

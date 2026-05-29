import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
  scanId: { type: String, required: true, unique: true },
  userId: { type: String },
  type: { type: String, enum: ["fake_news", "ai_image", "deepfake_video", "ai_text"], required: true },
  verdict: String,
  confidence: Number,
  inputPreview: String,
  details: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Scan || mongoose.model("Scan", scanSchema);

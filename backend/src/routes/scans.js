import { Router } from "express";
import Scan from "../models/Scan.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 }).limit(50).lean();
    res.json(scans);
  } catch {
    res.json([]);
  }
});

router.get("/:scanId", async (req, res) => {
  try {
    const scan = await Scan.findOne({ scanId: req.params.scanId }).lean();
    if (!scan) return res.status(404).json({ message: "Scan not found" });
    res.json(scan);
  } catch {
    res.status(500).json({ message: "Error fetching scan" });
  }
});

export default router;

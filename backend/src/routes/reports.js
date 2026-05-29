import { Router } from "express";
import Scan from "../models/Scan.js";

const router = Router();

router.get("/:scanId", async (req, res) => {
  try {
    const scan = await Scan.findOne({ scanId: req.params.scanId }).lean();
    if (!scan) return res.status(404).json({ message: "Report not found" });

    const report = {
      scanId: scan.scanId,
      type: scan.type,
      verdict: scan.verdict,
      confidence: scan.confidence,
      date: scan.createdAt,
      findings: scan.details,
      riskAssessment: scan.confidence > 70 ? "High" : scan.confidence > 40 ? "Medium" : "Low",
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="truthguard-report-${scan.scanId}.json"`);
    res.json(report);
  } catch {
    res.status(500).json({ message: "Error generating report" });
  }
});

export default router;

import express from "express";
import { analyzeOption } from "../services/option.service";

const router = express.Router();

/* ============================
   ✅ HEALTH CHECK (CRITICAL)
   ============================ */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "option-api",
    timestamp: new Date().toISOString(),
  });
});

/* ============================
   📊 OPTION ANALYSIS
   ============================ */
router.get("/analysis", async (req, res) => {
  const symbol = (req.query.symbol as string) || "AAPL";

  try {
    const result = await analyzeOption(symbol);
    res.status(200).json(result);
  } catch (error) {
    console.error("Option analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze option",
    });
  }
});

export default router;

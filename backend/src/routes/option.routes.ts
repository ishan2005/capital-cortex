import { Router } from "express";
import { analyzeOption } from "../services/option.service";

const router = Router();

// health check
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// analysis route
router.get("/analysis", async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || "AAPL";
    const result = await analyzeOption(symbol);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

export default router;

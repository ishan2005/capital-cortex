import { Router } from "express";
import { analyzeOption } from "../services/option.service";

const router = Router();

router.get("/analysis", async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || "AAPL";
    const result = await analyzeOption(symbol);
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;

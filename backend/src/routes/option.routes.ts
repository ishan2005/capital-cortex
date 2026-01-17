import express from "express"
import { analyzeOption } from "../services/option.service"

const router = express.Router()

router.get("/analysis", async (req, res) => {
  const symbol = (req.query.symbol as string) || "AAPL"

  try {
    const result = await analyzeOption(symbol)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze option" })
  }
})

export default router

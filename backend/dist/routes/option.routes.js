"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const option_service_1 = require("../services/option.service");
const router = express_1.default.Router();
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
    const symbol = req.query.symbol || "AAPL";
    try {
        const result = await (0, option_service_1.analyzeOption)(symbol);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Option analysis error:", error);
        res.status(500).json({
            error: "Failed to analyze option",
        });
    }
});
exports.default = router;

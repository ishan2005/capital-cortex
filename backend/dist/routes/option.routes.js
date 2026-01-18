"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const option_service_1 = require("../services/option.service");
const router = (0, express_1.Router)();
// health check
router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// analysis route
router.get("/analysis", async (req, res) => {
    try {
        const symbol = req.query.symbol || "AAPL";
        const result = await (0, option_service_1.analyzeOption)(symbol);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Analysis failed" });
    }
});
exports.default = router;

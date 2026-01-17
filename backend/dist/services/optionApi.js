"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOptionAnalysis = fetchOptionAnalysis;
require("dotenv/config");
const API_URL = process.env.API_URL || "http://localhost:4000";
async function fetchOptionAnalysis() {
    const res = await fetch(`${API_URL}/api/option/analysis`);
    if (!res.ok) {
        throw new Error("Failed to fetch option analysis");
    }
    return res.json();
}

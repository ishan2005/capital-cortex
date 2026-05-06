"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeOption = analyzeOption;
require("dotenv/config");
const blackScholes_1 = require("../utils/blackScholes");
const API_KEY = process.env.TWELVE_API_KEY;
async function analyzeOption(symbol) {
    if (!API_KEY)
        throw new Error("Missing TWELVE_API_KEY");
    // PRICE
    const priceRes = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`);
    const priceJson = await priceRes.json();
    const S = Number(priceJson.price);
    if (!S)
        throw new Error("Invalid price from API");
    // HISTORY for volatility
    const histRes = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=252&apikey=${API_KEY}`);
    const histJson = await histRes.json();
    if (!histJson.values)
        throw new Error("No history from API");
    const prices = histJson.values
        .map((d) => Number(d.close))
        .reverse();
    const returns = prices
        .slice(1)
        .map((p, i) => Math.log(p / prices[i]));
    const variance = returns.reduce((a, b) => a + b * b, 0) / returns.length;
    const sigma = Math.sqrt(variance) * Math.sqrt(252);
    const K = S * 1.05;
    const T = 30 / 365;
    const r = 0.06;
    const greeks = (0, blackScholes_1.blackScholesCall)(S, K, T, r, sigma);
    return {
        symbol,
        underlyingPrice: S.toFixed(2),
        volatility: (sigma * 100).toFixed(2),
        ...greeks,
    };
}

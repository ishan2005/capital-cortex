"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeOption = analyzeOption;
const blackScholes_1 = require("../utils/blackScholes");
const API_KEY = process.env.TWELVE_API_KEY;
async function analyzeOption(symbol) {
    // 1️⃣ Fetch last price
    const priceRes = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`);
    const priceJson = await priceRes.json();
    const S = parseFloat(priceJson.price);
    // 2️⃣ Fetch historical data (1 year)
    const histRes = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=252&apikey=${API_KEY}`);
    const histJson = await histRes.json();
    const prices = histJson.values
        .map((d) => parseFloat(d.close))
        .reverse();
    // 3️⃣ Volatility calculation
    const returns = prices.slice(1).map((p, i) => Math.log(p / prices[i]));
    const variance = returns.reduce((a, b) => a + b * b, 0) /
        returns.length;
    const sigma = Math.sqrt(variance) * Math.sqrt(252);
    // 4️⃣ Option assumptions (hackathon-safe)
    const K = S * 1.05;
    const T = 30 / 365;
    const r = 0.06;
    const bs = (0, blackScholes_1.blackScholesCall)(S, K, T, r, sigma);
    return {
        symbol,
        underlyingPrice: S.toFixed(2),
        volatility: (sigma * 100).toFixed(2),
        ...bs,
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blackScholesCall = blackScholesCall;
function normCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 *
        Math.exp((-x * x) / 2) *
        t *
        (0.3193815 +
            t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - d : d;
}
function normPDF(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp((-x * x) / 2);
}
function blackScholesCall(S, K, T, r, sigma) {
    const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) /
        (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    const price = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
    // Greeks
    const delta = normCDF(d1);
    const theta = (-(S * normPDF(d1) * sigma) / (2 * Math.sqrt(T)) -
        r * K * Math.exp(-r * T) * normCDF(d2)) /
        365;
    const vega = S * normPDF(d1) * Math.sqrt(T) * 0.01;
    return {
        price: parseFloat(price.toFixed(4)),
        delta: parseFloat(delta.toFixed(4)),
        theta: parseFloat(theta.toFixed(4)),
        vega: parseFloat(vega.toFixed(4)),
    };
}

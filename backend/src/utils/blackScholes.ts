function normCDF(x: number): number {
  // Abramowitz & Stegun approximation
  const sign = x < 0 ? -1 : 1
  const absX = Math.abs(x) / Math.sqrt(2)

  const t = 1 / (1 + 0.3275911 * absX)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429

  const erf =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-absX * absX))

  return 0.5 * (1 + sign * erf)
}

export function blackScholesCall(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number
) {
  const d1 =
    (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) /
    (sigma * Math.sqrt(T))

  const d2 = d1 - sigma * Math.sqrt(T)

  const price =
    S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2)

  const delta = normCDF(d1)
  const vega = S * Math.sqrt(T) * (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(d1 * d1) / 2)
  const theta =
    (-S *
      (1 / Math.sqrt(2 * Math.PI)) *
      sigma *
      Math.exp(-(d1 * d1) / 2)) /
      (2 * Math.sqrt(T)) -
    r * K * Math.exp(-r * T) * normCDF(d2)

  return {
    price: Number(price.toFixed(2)),
    delta: Number(delta.toFixed(2)),
    theta: Number((theta / 365).toFixed(3)), // per day
    vega: Number((vega / 100).toFixed(2)), // per 1% vol
  }
}

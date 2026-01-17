export interface OptionAnalysis {
  symbol: string
  underlyingPrice: string
  volatility: string
  price: number
  delta: number
  theta: number
  vega: number
}

const API_URL = import.meta.env.VITE_API_URL || "https://capital-cortex-production.up.railway.app"


export async function fetchOptionAnalysis(symbol: string) {
  const res = await fetch(
    `${API_URL}/api/option/analysis?symbol=${symbol}`
  )

  if (!res.ok) {
    throw new Error("Failed to fetch option analysis")
  }

  return res.json() as Promise<OptionAnalysis>
}

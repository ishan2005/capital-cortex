import "dotenv/config"

export interface OptionAnalysis {
  symbol: string
  price: number
  delta: number
  theta: number
  vega: number
}

const API_URL = process.env.API_URL || "http://localhost:4000"
export async function fetchOptionAnalysis(): Promise<OptionAnalysis> {
  const res = await fetch(`${API_URL}/api/option/analysis`)
  if (!res.ok) {
    throw new Error("Failed to fetch option analysis")
  }
  return res.json()
}

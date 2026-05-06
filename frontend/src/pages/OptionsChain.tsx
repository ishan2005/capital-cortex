import { useEffect, useState } from "react"
import { fetchOptionAnalysis } from "../services/optionApi"

interface Props { symbol: string }

function normCDF(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp(-x * x / 2) * t *
    (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return x > 0 ? 1 - d : d
}
function normPDF(x: number) { return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-x * x / 2) }

function computeGreeks(S: number, K: number, T: number, r: number, sigma: number) {
  if (T <= 0 || sigma <= 0) return { price: Math.max(0, S - K), delta: S > K ? 1 : 0, theta: 0, vega: 0 }
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)
  return {
    price:  parseFloat((S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2)).toFixed(2)),
    delta:  parseFloat(normCDF(d1).toFixed(3)),
    theta:  parseFloat(((-(S * normPDF(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normCDF(d2)) / 365).toFixed(4)),
    vega:   parseFloat((S * normPDF(d1) * Math.sqrt(T) * 0.01).toFixed(3)),
  }
}

export default function OptionsChain({ symbol }: Props) {
  const [spotPrice, setSpotPrice] = useState<number | null>(null)
  const [sigma, setSigma] = useState(0.25)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchOptionAnalysis(symbol).then(d => {
      setSpotPrice(parseFloat(d.underlyingPrice))
      setSigma(parseFloat(d.volatility) / 100)
    }).finally(() => setLoading(false))
  }, [symbol])

  if (loading || !spotPrice) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="shimmer" style={{ height: 64, borderRadius: 12 }} />
        <div className="shimmer" style={{ height: 400, borderRadius: 12 }} />
      </div>
    )
  }

  const T = 30 / 365
  const r = 0.06
  const step = spotPrice > 100 ? 10 : 5
  const ATM = Math.round(spotPrice / step) * step
  const strikes = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(i => ATM + i * step)

  const rows = strikes.map(K => {
    const moneyness = K < spotPrice ? "ITM" : K === ATM ? "ATM" : "OTM"
    const g = computeGreeks(spotPrice, K, T, r, sigma)
    const intrinsic  = parseFloat(Math.max(0, spotPrice - K).toFixed(2))
    const timeVal    = parseFloat(Math.max(0, g.price - intrinsic).toFixed(2))
    return { K, moneyness, ...g, intrinsic, timeVal }
  })

  const tag = (m: string) => {
    if (m === "ITM") return <span className="badge badge-emerald">ITM</span>
    if (m === "ATM") return <span className="badge badge-violet">ATM</span>
    return <span className="badge badge-ocean">OTM</span>
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div className="fade-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="label" style={{ marginBottom: 6 }}>Live Computation</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.02em" }}>
            <span className="gradient-text">{symbol}</span> Options Chain
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
            Spot: <span className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>₹{spotPrice}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
            Vol: <span className="mono" style={{ fontWeight: 700, color: "var(--amber)" }}>{(sigma * 100).toFixed(1)}%</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-500)" }}>Expiry: <span style={{ fontWeight: 600, color: "var(--ink-700)" }}>30D</span></div>
        </div>
      </div>

      {/* Volatility slider */}
      <div className="card fade-in-d1" style={{ padding: "18px 24px" }}>
        <div className="label" style={{ marginBottom: 10 }}>Adjust Implied Volatility (σ) — {(sigma * 100).toFixed(1)}%</div>
        <input type="range" min={5} max={100} value={Math.round(sigma * 100)} onChange={e => setSigma(+e.target.value / 100)} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--ink-300)" }}>
          <span>5% (Low vol)</span><span>100% (Extreme vol)</span>
        </div>
      </div>

      {/* Chain table */}
      <div className="card fade-in-d2" style={{ overflow: "hidden", padding: 0 }}>
        <div style={{ padding: "18px 22px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)", marginBottom: 4 }}>Call Options Chain</div>
          <div style={{ fontSize: 11, color: "var(--ink-300)", marginBottom: 14 }}>
            Black-Scholes computed values · Strike range ±4 steps from ATM
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Strike</th>
                <th>Status</th>
                <th>Model Price</th>
                <th>Intrinsic</th>
                <th>Time Value</th>
                <th>Delta Δ</th>
                <th>Theta Θ</th>
                <th>Vega ν</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.K} className={row.moneyness === "ATM" ? "atm" : ""}>
                  <td className="mono" style={{ fontWeight: 700, color: "var(--ink-900)" }}>₹{row.K}</td>
                  <td>{tag(row.moneyness)}</td>
                  <td className="mono" style={{ color: "var(--violet)", fontWeight: 600 }}>₹{row.price}</td>
                  <td className="mono" style={{ color: row.intrinsic > 0 ? "var(--emerald)" : "var(--ink-300)" }}>₹{row.intrinsic}</td>
                  <td className="mono" style={{ color: "var(--amber)" }}>₹{row.timeVal}</td>
                  <td className="mono" style={{ color: "var(--ocean)" }}>{row.delta}</td>
                  <td className="mono" style={{ color: "var(--rose)" }}>{row.theta}</td>
                  <td className="mono" style={{ color: "var(--ink-700)" }}>{row.vega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "12px 22px", borderTop: "1px solid var(--border-soft)", display: "flex", gap: 16 }}>
          <span className="badge badge-emerald">ITM = In the Money</span>
          <span className="badge badge-violet">ATM = At the Money</span>
          <span className="badge badge-ocean">OTM = Out of the Money</span>
        </div>
      </div>
    </div>
  )
}

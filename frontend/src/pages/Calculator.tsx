import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface Props { symbol: string }

// Black-Scholes call price at a given stock price S
function bsPrice(S: number, K: number, T: number, r: number, sigma: number) {
  if (T <= 0) return Math.max(0, S - K)
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)
  const nd1 = normCDF(d1), nd2 = normCDF(d2)
  return S * nd1 - K * Math.exp(-r * T) * nd2
}
function normCDF(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp(-x * x / 2) * t *
    (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return x > 0 ? 1 - d : d
}

const MOCK_PARAMS: Record<string, { S: number; sigma: number }> = {
  AAPL: { S: 280.15, sigma: 0.2354 },
  MSFT: { S: 415.20, sigma: 0.2100 },
  NVDA: { S: 890.50, sigma: 0.4500 },
  TSLA: { S: 175.30, sigma: 0.5200 },
}

export default function Calculator({ symbol }: Props) {
  const params = MOCK_PARAMS[symbol] ?? MOCK_PARAMS.AAPL
  const K = params.S * 1.05
  const T = 30 / 365
  const r = 0.06
  const sigma = params.sigma

  const premiumPaid = bsPrice(params.S, K, T, r, sigma)

  const [contracts, setContracts]   = useState(1)
  const [spotPrice, setSpotPrice]   = useState(Math.round(params.S))

  const lotSize = 100
  const totalPremium = premiumPaid * contracts * lotSize

  // Generate P&L curve data
  const minPrice = Math.round(params.S * 0.8)
  const maxPrice = Math.round(params.S * 1.25)
  const chartData = []
  for (let s = minPrice; s <= maxPrice; s += Math.round((maxPrice - minPrice) / 40)) {
    const intrinsic = Math.max(0, s - K)
    const pnl = (intrinsic - premiumPaid) * contracts * lotSize
    chartData.push({ price: s, pnl: parseFloat(pnl.toFixed(2)) })
  }

  // Current P&L
  const currentPnl = (Math.max(0, spotPrice - K) - premiumPaid) * contracts * lotSize
  const breakeven  = K + premiumPaid

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const val = payload[0].value
      return (
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontFamily: "var(--font-mono)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ color: "var(--ink-300)", marginBottom: 2 }}>Stock @ ₹{payload[0].payload.price}</div>
          <div style={{ color: val >= 0 ? "var(--emerald)" : "var(--rose)", fontWeight: 700 }}>
            P&L: {val >= 0 ? "+" : ""}₹{val.toLocaleString()}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div className="fade-in">
        <div className="label" style={{ marginBottom: 6 }}>Interactive Tool</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.02em" }}>
          <span className="gradient-text">{symbol}</span> P&L Calculator
        </h1>
      </div>

      {/* Controls */}
      <div className="fade-in-d1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Contracts */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <div className="label" style={{ marginBottom: 12 }}>Number of Contracts</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <button onClick={() => setContracts(c => Math.max(1, c - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--ink-700)", fontSize: 18, cursor: "pointer", fontWeight: 600 }}>−</button>
            <span className="mono" style={{ fontSize: 32, fontWeight: 800, color: "var(--violet)", flex: 1, textAlign: "center" }}>{contracts}</span>
            <button onClick={() => setContracts(c => Math.min(50, c + 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--ink-700)", fontSize: 18, cursor: "pointer", fontWeight: 600 }}>+</button>
          </div>
          <input type="range" min={1} max={50} value={contracts} onChange={e => setContracts(+e.target.value)} />
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-300)" }}>Lot size: {lotSize} shares/contract</div>
        </div>

        {/* Spot Price Slider */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <div className="label" style={{ marginBottom: 12 }}>Stock Price at Expiry</div>
          <div className="mono" style={{ fontSize: 32, fontWeight: 800, color: "var(--ocean)", marginBottom: 12 }}>₹{spotPrice}</div>
          <input type="range" min={minPrice} max={maxPrice} value={spotPrice} onChange={e => setSpotPrice(+e.target.value)} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--ink-300)" }}>
            <span>₹{minPrice}</span><span>₹{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="fade-in-d2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "Premium Paid",    value: `₹${totalPremium.toFixed(0)}`,  color: "var(--amber)"   },
          { label: "Break-even",      value: `₹${breakeven.toFixed(2)}`,     color: "var(--ocean)"   },
          { label: "Strike Price",    value: `₹${K.toFixed(2)}`,             color: "var(--ink-700)" },
          { label: "Current P&L",     value: `${currentPnl >= 0 ? "+" : ""}₹${currentPnl.toFixed(0)}`, color: currentPnl >= 0 ? "var(--emerald)" : "var(--rose)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: "18px 20px" }}>
            <div className="label" style={{ marginBottom: 8 }}>{label}</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* P&L Chart */}
      <div className="card fade-in-d3" style={{ padding: "22px 18px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, padding: "0 4px" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>Profit & Loss at Expiry</div>
            <div style={{ fontSize: 11, color: "var(--ink-300)", marginTop: 2 }}>
              For {contracts} contract{contracts > 1 ? "s" : ""} · {lotSize} shares each
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-emerald">Max Profit: Unlimited</span>
            <span className="badge badge-rose">Max Loss: ₹{totalPremium.toFixed(0)}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pnlPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#047857" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#047857" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="pnlNeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#BE185D" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#BE185D" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="var(--border-soft)" />
            <XAxis dataKey="price" stroke="var(--border)" axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: "var(--ink-300)", fontFamily: "var(--font-mono)" }}
              tickFormatter={v => `₹${v}`}
            />
            <YAxis stroke="var(--border)" axisLine={false} tickLine={false} width={64}
              tick={{ fontSize: 10, fill: "var(--ink-300)", fontFamily: "var(--font-mono)" }}
              tickFormatter={v => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="var(--ink-300)" strokeDasharray="5 5" strokeWidth={1.5} />
            <ReferenceLine x={Math.round(breakeven)} stroke="var(--amber)" strokeDasharray="4 4" strokeWidth={1.5}
              label={{ value: `BE ₹${breakeven.toFixed(0)}`, position: "top", fontSize: 10, fill: "var(--amber)", fontFamily: "var(--font-mono)" }} />
            <ReferenceLine x={spotPrice} stroke="var(--violet)" strokeWidth={2}
              label={{ value: `Now`, position: "top", fontSize: 10, fill: "var(--violet)", fontFamily: "var(--font-mono)" }} />
            <Area type="monotone" dataKey="pnl" stroke="var(--violet)" strokeWidth={2.5}
              fill={currentPnl >= 0 ? "url(#pnlPos)" : "url(#pnlNeg)"} dot={false}
              activeDot={{ r: 4, fill: "var(--violet)", stroke: "#fff", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

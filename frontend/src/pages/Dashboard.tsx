import { useEffect, useState } from "react"
import Card from "../components/ui/Card"
import PriceChart from "../components/charts/PriceChart"
import RiskChart from "../components/charts/RiskChart"
import HedgeCard from "../components/ui/HedgeCard"
import { fetchOptionAnalysis } from "../services/optionApi"
import type { OptionAnalysis } from "../services/optionApi"

interface DashboardProps { symbol: string }

function Skeleton({ h = 120 }: { h?: number }) {
  return <div className="shimmer" style={{ height: h, borderRadius: 12 }} />
}

// Sentiment gauge based on delta
function SentimentGauge({ delta }: { delta: number }) {
  const pct = Math.min(100, Math.max(0, delta * 100))
  const label = pct < 25 ? "Strong Bear" : pct < 40 ? "Bearish" : pct < 60 ? "Neutral" : pct < 75 ? "Bullish" : "Strong Bull"
  const color = pct < 40 ? "var(--rose)" : pct < 60 ? "var(--amber)" : "var(--emerald)"
  const angle = -90 + pct * 1.8

  return (
    <div className="card" style={{ padding: "22px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="label" style={{ marginBottom: 16, alignSelf: "flex-start" }}>Market Sentiment</div>
      {/* Semicircle SVG */}
      <svg width="160" height="90" viewBox="0 0 160 90">
        {/* Track */}
        <path d="M 15 80 A 65 65 0 0 1 145 80" fill="none" stroke="var(--border-soft)" strokeWidth="10" strokeLinecap="round" />
        {/* Fill */}
        <path d="M 15 80 A 65 65 0 0 1 145 80" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${pct / 100 * 204} 204`} style={{ transition: "stroke-dasharray 0.5s ease, stroke 0.5s ease" }} />
        {/* Needle */}
        <g transform={`rotate(${angle}, 80, 80)`}>
          <line x1="80" y1="80" x2="80" y2="22" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="80" r="5" fill="var(--ink-700)" />
        </g>
        {/* Labels */}
        <text x="10" y="92" fontSize="9" fill="var(--ink-300)" fontFamily="var(--font-mono)">Bear</text>
        <text x="125" y="92" fontSize="9" fill="var(--ink-300)" fontFamily="var(--font-mono)">Bull</text>
      </svg>
      <div className="mono" style={{ fontSize: 22, fontWeight: 800, color, marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--ink-300)", marginTop: 4 }}>Δ = {delta.toFixed(3)} · {pct.toFixed(0)}% bullish</div>
    </div>
  )
}

export default function Dashboard({ symbol }: DashboardProps) {
  const [data, setData] = useState<OptionAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true); setError(null)
    fetchOptionAnalysis(symbol)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [symbol])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Page header */}
      <div className="fade-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="label" style={{ marginBottom: 6 }}>Options Intelligence</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.02em" }}>
            <span className="gradient-text">{symbol}</span> Dashboard
          </h1>
        </div>
        {data && (
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-emerald">● Data Live</span>
            <span className="badge badge-amber">Vol {data.volatility}%</span>
          </div>
        )}
      </div>

      {error && (
        <div style={{ background: "var(--rose-tint)", border: "1px solid rgba(190,24,93,0.2)", borderRadius: 10, padding: "14px 18px", color: "var(--rose)", fontSize: 13 }}>
          ⚠ {error}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {loading ? [0,1,2,3].map(i => <Skeleton key={i} h={110} />) : data ? (
          <>
            <Card title="Option Price"   value={`₹${data.price.toFixed(2)}`}    subtitle="Black-Scholes model"   accent="violet"  icon="◈" />
            <Card title="Delta Δ"        value={data.delta.toFixed(3)}           subtitle="Directional exposure"  accent="ocean"   icon="◉" trend={data.delta > 0.5 ? "up" : "neutral"} />
            <Card title="Theta Θ Daily"  value={data.theta.toFixed(4)}           subtitle="Time decay per day"    accent="rose"    icon="◫" trend="down" />
            <Card title="Vega ν"         value={data.vega.toFixed(3)}            subtitle="Vol sensitivity"       accent="emerald" icon="◧" />
          </>
        ) : null}
      </div>

      {/* Signals + Sentiment */}
      {loading ? <Skeleton h={160} /> : data && (
        <div className="fade-in-d1" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
          {/* Signals */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div className="label" style={{ marginBottom: 14 }}>AI Signal Assessment</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { label: "BUY",  conf: 72, risk: "Medium", bg: "var(--emerald-tint)", border: "rgba(4,120,87,0.2)",   color: "var(--emerald)" },
                { label: "HOLD", conf: 55, risk: "Low",    bg: "var(--amber-tint)",   border: "rgba(180,83,9,0.2)",   color: "var(--amber)"   },
                { label: "SELL", conf: 38, risk: "High",   bg: "var(--rose-tint)",    border: "rgba(190,24,93,0.2)",  color: "var(--rose)"    },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: "var(--ink-300)" }}>Risk: {s.risk}</span>
                  </div>
                  <div style={{ height: 4, background: "var(--border-soft)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.conf}%`, background: s.color, borderRadius: 999, transition: "width 0.8s ease" }} />
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11, color: s.color, fontWeight: 600 }}>{s.conf}% confidence</div>
                </div>
              ))}
            </div>
          </div>
          {/* Sentiment Gauge */}
          <SentimentGauge delta={data.delta} />
        </div>
      )}

      {/* Charts */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><Skeleton h={280} /><Skeleton h={280} /></div>
      ) : data && (
        <div className="fade-in-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <PriceChart />
          <RiskChart delta={data.delta} theta={data.theta} vega={data.vega} />
        </div>
      )}

      {/* Stats bar */}
      {data && !loading && (
        <div className="card fade-in-d3" style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 36 }}>
            {[
              { label: "Underlying",    value: `$${data.underlyingPrice}`,                              color: "var(--ink-900)" },
              { label: "Strike (5%OTM)",value: `$${(parseFloat(data.underlyingPrice)*1.05).toFixed(2)}`, color: "var(--ink-700)" },
              { label: "Expiry",        value: "30 Days",                                               color: "var(--ink-700)" },
              { label: "Risk-Free",     value: "6.00%",                                                 color: "var(--ink-700)" },
              { label: "Annualised Vol",value: `${data.volatility}%`,                                   color: "var(--amber)"   },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="label" style={{ marginBottom: 4 }}>{label}</div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>
          <span className="badge badge-violet">Call Option · {symbol}</span>
        </div>
      )}

      {/* Hedge recommendation */}
      {data && !loading && (
        <HedgeCard
          strategy="Protective PUT"
          strike="₹2,800"
          premium="₹32.5"
          riskReduction="-48%"
          note="Suggested to protect downside risk in case of increased volatility. Delta hedge ratio derived from the current Black-Scholes model output."
        />
      )}
      {/* Footer */}
      <footer style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: "1px solid var(--border-soft)",
        textAlign: "center",
        color: "var(--ink-300)",
        fontSize: 13,
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.04em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}>
        <span style={{ opacity: 0.5, fontSize: 16 }}>◈</span>
        <span>
          Created by{" "}
          <span style={{ color: "var(--violet)", fontWeight: 700, letterSpacing: "0.02em" }}>
            Ishan Agrawal
          </span>
        </span>
        <span style={{ opacity: 0.5, fontSize: 16 }}>◈</span>
      </footer>
    </div>
  )
}

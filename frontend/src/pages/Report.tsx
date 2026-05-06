import { useEffect, useState } from "react"
import { fetchOptionAnalysis } from "../services/optionApi"
import type { OptionAnalysis } from "../services/optionApi"

interface ReportProps { symbol: string }

function Section({ title, accent = "violet", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="card" style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{ width: 3, height: 16, background: `var(--${accent})`, borderRadius: 99 }} />
        <div className="label">{title}</div>
      </div>
      {children}
    </section>
  )
}

export default function Report({ symbol }: ReportProps) {
  const [data, setData] = useState<OptionAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchOptionAnalysis(symbol).then(setData).finally(() => setLoading(false))
  }, [symbol])

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[64, 120, 200, 160, 160].map((h, i) => <div key={i} className="shimmer" style={{ height: h, borderRadius: 12 }} />)}
    </div>
  )
  if (!data) return <div style={{ color: "var(--ink-300)" }}>No data available.</div>

  const greeks = [
    { name: "Delta Δ", value: data.delta, color: "var(--violet)", desc: "Measures sensitivity to price movement. Δ = 0.5 approximates 50% probability of expiring ITM." },
    { name: "Theta Θ", value: data.theta, color: "var(--rose)",   desc: "Daily time erosion. Option loses this value each day — accelerates sharply near expiry." },
    { name: "Vega ν",  value: data.vega,  color: "var(--ocean)",  desc: "Sensitivity to a 1% volatility change. Spike in IV (fear) directly inflates option premium." },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 840 }}>
      {/* Header */}
      <div className="fade-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="label" style={{ marginBottom: 6 }}>Institutional Research</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.02em" }}>
            <span className="gradient-text">{symbol}</span> Option Report
          </h1>
        </div>
        <button style={{ background: "var(--violet-tint)", border: "1px solid rgba(91,33,182,0.2)", borderRadius: 8, color: "var(--violet)", fontSize: 13, fontWeight: 700, padding: "9px 18px", cursor: "pointer", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 6 }}>
          ↓ Export PDF
        </button>
      </div>

      {/* Summary */}
      <Section title="Executive Summary" accent="violet">
        <p style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.75 }}>
          This report evaluates a <strong>call option on {data.symbol}</strong> using the Black–Scholes pricing framework.
          The model-derived option price and Greeks assess valuation, risk exposure, and hedging considerations.
        </p>
        <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-violet">30-Day Expiry</span>
          <span className="badge badge-emerald">Call Option</span>
          <span className="badge badge-amber">5% OTM Strike</span>
          <span className="badge badge-ocean">Risk-Free: 6%</span>
        </div>
      </Section>

      {/* Pricing */}
      <Section title="Option Pricing" accent="ocean">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { label: "Underlying Price", value: `$${data.underlyingPrice}`, color: "var(--ink-900)"  },
            { label: "Model Price (BS)", value: `₹${data.price.toFixed(4)}`, color: "var(--violet)"  },
            { label: "Annualised Vol",   value: `${data.volatility}%`,       color: "var(--amber)"   },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: "16px 18px", border: "1px solid var(--border-soft)" }}>
              <div className="label" style={{ marginBottom: 8 }}>{label}</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 11, color: "var(--ink-300)" }}>
          Model assumes constant volatility and risk-free rate. Real-world conditions may deviate.
        </p>
      </Section>

      {/* Greeks */}
      <Section title="Risk Sensitivities — Greeks" accent="rose">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {greeks.map(({ name, value, color, desc }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", background: "var(--bg-subtle)", borderRadius: 10, border: "1px solid var(--border-soft)" }}>
              <div style={{ flexShrink: 0, textAlign: "center", minWidth: 80 }}>
                <div className="mono" style={{ fontSize: 20, fontWeight: 800, color }}>{value > 0 ? "+" : ""}{value.toFixed(4)}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color, marginTop: 2 }}>{name}</div>
              </div>
              <div style={{ width: 1, height: 36, background: "var(--border)", flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: "var(--ink-500)", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Risk & Hedging */}
      <Section title="Risk & Hedging" accent="emerald">
        <p style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.75, marginBottom: 14 }}>
          Delta exposure and Vega sensitivity are the dominant risk drivers. A Protective PUT at 5% below spot caps downside to the premium cost while retaining full upside participation.
        </p>
        <div style={{ background: "var(--emerald-tint)", border: "1px solid rgba(4,120,87,0.2)", borderRadius: 10, padding: "14px 18px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--emerald)", marginBottom: 6 }}>Recommended Strategy</div>
          <p style={{ fontSize: 13, color: "var(--ink-700)", lineHeight: 1.65 }}>
            Reassess if implied volatility exceeds {(parseFloat(data.volatility) * 1.3).toFixed(1)}% or time-to-expiry drops below 10 days.
          </p>
        </div>
      </Section>

      {/* Recommendation */}
      <Section title="Consulting Recommendation" accent="amber">
        <p style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.75 }}>
          The option appears <strong style={{ color: "var(--emerald)" }}>reasonably valued</strong> under current market assumptions. Suitable for investors with a <strong>moderate risk appetite</strong> who actively monitor volatility conditions.
        </p>
      </Section>
    </div>
  )
}

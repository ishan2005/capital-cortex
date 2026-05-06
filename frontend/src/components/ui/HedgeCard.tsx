interface HedgeCardProps {
  strategy: string
  strike: string
  premium: string
  riskReduction: string
  note: string
}

export default function HedgeCard({ strategy, strike, premium, riskReduction, note }: HedgeCardProps) {
  return (
    <div className="card fade-in-d4" style={{ padding: "24px 28px", position: "relative", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--emerald), var(--ocean))", borderRadius: "14px 14px 0 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div className="label" style={{ marginBottom: 6 }}>Hedge Recommendation</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--ink-900)" }}>{strategy}</div>
        </div>
        <span className="badge badge-emerald">▼ Downside Protected</span>
      </div>

      <div className="divider" style={{ marginBottom: 20 }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Strike Price",   value: strike,       color: "var(--ink-900)" },
          { label: "Premium Cost",   value: premium,      color: "var(--amber)"   },
          { label: "Risk Reduction", value: riskReduction,color: "var(--emerald)" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: "14px 16px", border: "1px solid var(--border-soft)" }}>
            <div className="label" style={{ marginBottom: 6 }}>{label}</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--emerald-tint)", border: "1px solid rgba(4,120,87,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "var(--ink-700)", lineHeight: 1.65 }}>
        <span style={{ fontWeight: 700, color: "var(--emerald)", marginRight: 6 }}>Strategy Note</span>
        {note}
      </div>
    </div>
  )
}

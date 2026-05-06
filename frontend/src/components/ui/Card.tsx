const accentMap = {
  violet:  { text: "var(--violet)",  bg: "var(--violet-tint)",  border: "rgba(91,33,182,0.15)"  },
  rose:    { text: "var(--rose)",    bg: "var(--rose-tint)",    border: "rgba(190,24,93,0.15)"  },
  ocean:   { text: "var(--ocean)",   bg: "var(--ocean-tint)",   border: "rgba(3,105,161,0.15)"  },
  emerald: { text: "var(--emerald)", bg: "var(--emerald-tint)", border: "rgba(4,120,87,0.15)"   },
  amber:   { text: "var(--amber)",   bg: "var(--amber-tint)",   border: "rgba(180,83,9,0.15)"   },
}

interface CardProps {
  title: string
  value: string | number
  subtitle?: string
  accent?: keyof typeof accentMap
  trend?: "up" | "down" | "neutral"
  icon?: string
  className?: string
}

export default function Card({ title, value, subtitle, accent = "violet", trend, icon, className = "" }: CardProps) {
  const colors = accentMap[accent]
  const trendEl = trend === "up"
    ? <span style={{ color: "var(--emerald)", fontSize: 12, fontWeight: 700 }}>↑</span>
    : trend === "down"
    ? <span style={{ color: "var(--rose)",    fontSize: 12, fontWeight: 700 }}>↓</span>
    : null

  return (
    <div className={`card card-lift fade-in ${className}`} style={{ padding: "20px 22px" }}>
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${colors.text}, transparent)`,
        borderRadius: "14px 14px 0 0",
        opacity: 0.5,
      }} />

      <div className="label" style={{ marginBottom: 10 }}>
        {icon && <span style={{ marginRight: 5 }}>{icon}</span>}
        {title}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <div className="mono" style={{
          fontSize: 28, fontWeight: 800,
          color: colors.text,
          letterSpacing: "-0.02em", lineHeight: 1,
        }}>
          {value}
        </div>
        {trendEl}
      </div>

      {subtitle && (
        <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-300)" }}>
          {subtitle}
        </div>
      )}

      {/* Corner chip */}
      <div style={{
        position: "absolute", bottom: 12, right: 14,
        width: 28, height: 28, borderRadius: 8,
        background: colors.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13,
      }}>{icon ?? "◈"}</div>
    </div>
  )
}

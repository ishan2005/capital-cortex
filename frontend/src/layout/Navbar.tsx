const stocks = [
  { value: "AAPL", label: "Apple Inc.",  flag: "🍎" },
  { value: "MSFT", label: "Microsoft",   flag: "🟦" },
  { value: "NVDA", label: "NVIDIA",      flag: "💚" },
  { value: "TSLA", label: "Tesla",       flag: "⚡" },
]

interface NavbarProps {
  selectedStock?: string
  onStockChange?: (s: string) => void
}

export default function Navbar({ selectedStock = "AAPL", onStockChange }: NavbarProps) {
  const current = stocks.find(s => s.value === selectedStock) ?? stocks[0]
  return (
    <header style={{
      height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px",
      background: "var(--bg-card)",
      borderBottom: "1px solid var(--border)",
      boxShadow: "0 1px 0 var(--border-soft)",
      flexShrink: 0,
      position: "sticky", top: 0, zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: "linear-gradient(135deg, #5B21B6, #7C3AED, #BE185D)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, color: "#fff",
          boxShadow: "0 2px 8px rgba(91,33,182,0.3)",
        }}>◈</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.01em" }}>
            Capital Cortex
          </div>
          <div className="label" style={{ color: "var(--ink-300)" }}>
            Options Intelligence
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="pulse-dot" />
        <span style={{ fontSize: 12, color: "var(--ink-500)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
          LIVE · NSE/NYSE
        </span>
      </div>

      {/* Stock selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: "var(--ink-300)" }}>Instrument</span>
        <div style={{ position: "relative" }}>
          <select
            value={selectedStock}
            onChange={e => onStockChange?.(e.target.value)}
            style={{
              appearance: "none",
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              color: "var(--ink-900)",
              fontSize: 13, fontWeight: 500,
              padding: "7px 32px 7px 12px",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          >
            {stocks.map(s => (
              <option key={s.value} value={s.value}>
                {s.flag} {s.label} ({s.value})
              </option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 9, color: "var(--ink-300)", pointerEvents: "none" }}>▼</span>
        </div>
        <div style={{
          background: "var(--violet-tint)",
          border: "1px solid rgba(91,33,182,0.2)",
          borderRadius: 6,
          padding: "5px 10px",
          fontSize: 11, fontWeight: 700,
          color: "var(--violet)",
          letterSpacing: "0.06em",
          fontFamily: "var(--font-mono)",
        }}>
          {current.value}
        </div>
      </div>
    </header>
  )
}

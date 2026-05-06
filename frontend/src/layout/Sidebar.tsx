import type { Page } from "../App"

const navItems: { id: string; label: string; icon: string; page: Page; isNew?: boolean }[] = [
  { id: "dashboard",  label: "Dashboard",      icon: "⬡",  page: "dashboard"  },
  { id: "calculator", label: "P&L Calculator", icon: "◈",  page: "calculator", isNew: true },
  { id: "chain",      label: "Options Chain",  icon: "⊞",  page: "chain",      isNew: true },
  { id: "report",     label: "Reports",        icon: "◧",  page: "report"     },
]

interface SidebarProps {
  activePage: Page
  onNavigate: (p: Page) => void
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside style={{
      width: 224,
      background: "var(--bg-card)",
      borderRight: "1px solid var(--border)",
      padding: "20px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flexShrink: 0,
    }}>
      <div className="label" style={{ padding: "0 8px", marginBottom: 10 }}>Navigation</div>

      {navItems.map(item => {
        const isActive = activePage === item.page
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.page)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "10px 12px",
              borderRadius: "var(--radius-md)",
              border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              textAlign: "left",
              transition: "all 0.15s ease",
              background: isActive ? "var(--violet-tint)" : "transparent",
              color: isActive ? "var(--violet)" : "var(--ink-500)",
              boxShadow: isActive ? "inset 2px 0 0 var(--violet)" : "inset 2px 0 0 transparent",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ fontSize: 14, opacity: isActive ? 1 : 0.5 }}>{item.icon}</span>
              {item.label}
            </span>
            {item.isNew && (
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                background: "linear-gradient(135deg, var(--violet), var(--rose))",
                color: "#fff", padding: "2px 6px", borderRadius: 99,
              }}>NEW</span>
            )}
          </button>
        )
      })}

      <div style={{ marginTop: "auto" }}>
        <div className="divider" style={{ marginBottom: 16 }} />
        <div style={{
          background: "var(--violet-tint)",
          border: "1px solid rgba(91,33,182,0.15)",
          borderRadius: "var(--radius-md)",
          padding: "14px",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--violet)", marginBottom: 6 }}>Model Active</div>
          <div style={{ fontSize: 11, color: "var(--ink-500)", lineHeight: 1.6 }}>
            Black-Scholes v2.1<br />Risk-free: 6.00%<br />Expiry: 30 days
          </div>
        </div>
      </div>
    </aside>
  )
}

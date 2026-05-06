import { useState } from "react"
import Dashboard   from "./pages/Dashboard"
import Report      from "./pages/Report"
import Calculator  from "./pages/Calculator"
import OptionsChain from "./pages/OptionsChain"
import Navbar  from "./layout/Navbar"
import Sidebar from "./layout/Sidebar"
import AIChat  from "./components/ai/AIChat"

export type Page = "dashboard" | "report" | "calculator" | "chain"

export default function App() {
  const [activePage, setActivePage]   = useState<Page>("dashboard")
  const [showAI, setShowAI]           = useState(false)
  const [selectedStock, setSelectedStock] = useState("AAPL")

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
      <Navbar selectedStock={selectedStock} onStockChange={setSelectedStock} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {activePage === "dashboard"  && <Dashboard   symbol={selectedStock} />}
          {activePage === "report"     && <Report      symbol={selectedStock} />}
          {activePage === "calculator" && <Calculator  symbol={selectedStock} />}
          {activePage === "chain"      && <OptionsChain symbol={selectedStock} />}
        </main>
      </div>

      {/* Floating AI Button */}
      <button
        onClick={() => setShowAI(true)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 50,
          display: "flex", alignItems: "center", gap: 8,
          background: "linear-gradient(135deg, #5B21B6, #7C3AED, #BE185D)",
          color: "#fff",
          border: "none", borderRadius: 999,
          padding: "12px 22px",
          fontSize: 13, fontWeight: 700,
          fontFamily: "var(--font-sans)",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(91,33,182,0.35), 0 8px 32px rgba(0,0,0,0.12)",
          transition: "transform 0.2s, box-shadow 0.2s",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.transform = "scale(1.05) translateY(-2px)"
          el.style.boxShadow = "0 6px 28px rgba(91,33,182,0.45), 0 12px 40px rgba(0,0,0,0.15)"
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.transform = ""
          el.style.boxShadow = "0 4px 20px rgba(91,33,182,0.35), 0 8px 32px rgba(0,0,0,0.12)"
        }}
      >
        <span style={{ fontSize: 15 }}>✦</span>
        AI Assistant
      </button>

      {showAI && <AIChat onClose={() => setShowAI(false)} />}
    </div>
  )
}

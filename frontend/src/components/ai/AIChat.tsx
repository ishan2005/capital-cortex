import { useState, useRef, useEffect } from "react"

type Message = { role: "user" | "ai"; content: string }
type AIChatProps = { onClose: () => void }

const PRESETS = ["What does Delta mean?", "Explain Theta decay", "How does Vega affect me?", "When to use a Protective PUT?"]

const RESPONSES: Record<string, string> = {
  delta:   "Delta (Δ) measures how much your option price changes per ₹1 move in the stock. A delta of 0.27 means if the stock rises ₹100, your option gains ~₹27. It also approximates the probability the option expires in-the-money.",
  theta:   "Theta (Θ) is the daily loss in option value from time passing alone. As an option buyer, Theta works against you — it accelerates sharply in the final 2 weeks before expiry.",
  vega:    "Vega (ν) shows sensitivity to a 1% change in implied volatility. If IV rises 1%, your option gains one vega in value. High vega means larger swings during market fear events (VIX spikes).",
  put:     "A Protective PUT acts as portfolio insurance. Buy a put below your entry price to cap downside loss while retaining full upside. The cost is the premium paid, which is your max loss.",
  default: "Great question! This platform uses Black-Scholes pricing to compute Greeks in real time. Try asking about Delta, Theta, Vega, or hedging strategies for a detailed breakdown.",
}

function getAIResponse(input: string) {
  const l = input.toLowerCase()
  if (l.includes("delta")) return RESPONSES.delta
  if (l.includes("theta") || l.includes("decay")) return RESPONSES.theta
  if (l.includes("vega") || l.includes("volatility")) return RESPONSES.vega
  if (l.includes("put") || l.includes("hedge") || l.includes("protective")) return RESPONSES.put
  return RESPONSES.default
}

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([{
    role: "ai",
    content: "Hi! I'm your options intelligence assistant. Ask me anything about Greeks, pricing, or hedging strategies.",
  }])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, typing])

  const send = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg) return
    setMessages(p => [...p, { role: "user", content: msg }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(p => [...p, { role: "ai", content: getAIResponse(msg) }])
    }, 700 + Math.random() * 300)
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(26,20,40,0.2)", backdropFilter: "blur(3px)" }} />
      <div style={{
        position: "relative", width: 420, height: "100%",
        background: "#fff", borderLeft: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(91,33,182,0.12)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #5B21B6, #BE185D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff", boxShadow: "0 2px 8px rgba(91,33,182,0.3)" }}>✦</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-900)" }}>AI Assistant</div>
              <div style={{ fontSize: 11, color: "var(--ink-300)" }}>Options Intelligence</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--ink-500)", cursor: "pointer", fontSize: 13, padding: "5px 10px", fontFamily: "var(--font-sans)" }}>✕ Close</button>
        </div>

        {/* Quick prompts */}
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border-soft)", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button key={p} onClick={() => send(p)} style={{ background: "var(--violet-tint)", border: "1px solid rgba(91,33,182,0.15)", borderRadius: 20, color: "var(--violet)", fontSize: 11, fontWeight: 500, padding: "5px 10px", cursor: "pointer", fontFamily: "var(--font-sans)" }}>{p}</button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "82%", padding: "10px 14px", fontSize: 13, lineHeight: 1.65,
                borderRadius: msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                background: msg.role === "user" ? "linear-gradient(135deg, var(--violet), var(--violet-soft))" : "var(--bg-subtle)",
                color: msg.role === "user" ? "#fff" : "var(--ink-700)",
                border: msg.role === "user" ? "none" : "1px solid var(--border-soft)",
                boxShadow: msg.role === "user" ? "0 2px 8px rgba(91,33,182,0.25)" : "var(--shadow-sm)",
              }}>{msg.content}</div>
            </div>
          ))}
          {typing && (
            <div style={{ display: "flex", gap: 5, padding: "10px 14px", background: "var(--bg-subtle)", borderRadius: "14px 14px 14px 3px", width: "fit-content", border: "1px solid var(--border-soft)" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet)", opacity: 0.6, animation: `pulse-anim 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) send() }}
            placeholder="Ask about Greeks, pricing, or hedging…"
            style={{ flex: 1, background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--ink-900)", fontSize: 13, padding: "10px 14px", outline: "none", fontFamily: "var(--font-sans)" }}
          />
          <button onClick={() => send()} disabled={!input.trim() || typing} style={{ background: "linear-gradient(135deg, var(--violet), var(--violet-soft))", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", cursor: "pointer", fontFamily: "var(--font-sans)", opacity: (!input.trim() || typing) ? 0.4 : 1, transition: "opacity 0.15s" }}>Send</button>
        </div>
      </div>
    </div>
  )
}

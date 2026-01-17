import { useState } from "react"

type Message = {
  role: "user" | "ai"
  content: string
}

type AIChatProps = {
  onClose: () => void
}

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hi! I can explain option pricing, Greeks, risk, and hedging strategies. Ask me anything.",
    },
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // 🔹 TEMP AI RESPONSE (backend will replace this)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "This is a placeholder AI response. Soon I’ll explain this using Black–Scholes logic and Greeks.",
        },
      ])
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold">AI Assistant</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage()
            }}
            placeholder="Ask about this option…"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

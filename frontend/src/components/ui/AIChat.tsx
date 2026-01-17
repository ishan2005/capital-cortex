import { useState } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Ask me anything about this stock’s risk, price movement, or hedging strategy.",
    },
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    const aiReply: Message = {
      role: "assistant",
      content:
        "The recent price movement is influenced by volatility expansion and short-term profit booking. Risk indicators suggest moderate downside pressure.",
    }

    setMessages((prev) => [...prev, userMessage, aiReply])
    setInput("")
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-[420px] flex flex-col">
      {/* Header */}
      <div className="text-sm font-medium text-gray-900 mb-2">
        AI Risk Assistant
      </div>

      {/* Messages (ONLY THIS SCROLLS) */}
      <div className="flex-1 overflow-y-auto space-y-3 text-sm mb-3 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md max-w-[85%] ${
              msg.role === "user"
                ? "bg-blue-100 ml-auto text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about risk, price, hedge..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

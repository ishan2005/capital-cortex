interface SignalCardProps {
  signal: "BUY" | "HOLD" | "SELL"
  confidence: number
  risk: "Low" | "Medium" | "High"
}

export default function SignalCard({
  signal,
  confidence,
  risk,
}: SignalCardProps) {
  const signalColor =
    signal === "BUY"
      ? "text-green-600"
      : signal === "SELL"
      ? "text-red-600"
      : "text-yellow-600"

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-sm text-gray-500 mb-2">
        Trading Signal
      </div>

      <div className={`text-3xl font-bold ${signalColor}`}>
        {signal}
      </div>

      <div className="mt-2 text-sm text-gray-600">
        Confidence: <span className="font-medium">{confidence}%</span>
      </div>

      <div className="mt-1 text-sm text-gray-600">
        Risk Level: <span className="font-medium">{risk}</span>
      </div>
    </div>
  )
}

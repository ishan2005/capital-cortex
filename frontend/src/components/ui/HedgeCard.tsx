interface HedgeCardProps {
  strategy: string
  strike: string
  premium: string
  riskReduction: string
  note: string
}

export default function HedgeCard({
  strategy,
  strike,
  premium,
  riskReduction,
  note
}: HedgeCardProps) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-3">
      <h3 className="font-semibold">Hedge Recommendation</h3>

      <div className="text-lg font-semibold">{strategy}</div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Strike</div>
          <div className="font-medium">{strike}</div>
        </div>

        <div>
          <div className="text-gray-500">Premium</div>
          <div className="font-medium">{premium}</div>
        </div>

        <div>
          <div className="text-gray-500">Risk Reduction</div>
          <div className="font-medium text-green-600">
            {riskReduction}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">{note}</p>
    </div>
  )
}

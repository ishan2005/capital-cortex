import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { priceData } from "../../data/mockPriceData"

export default function PriceChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-80">
      <div className="text-sm font-medium text-gray-900 mb-2">
        Intraday Price Movement
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            domain={["dataMin - 20", "dataMax + 20"]}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

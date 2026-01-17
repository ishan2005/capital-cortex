import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts"

interface Props {
  delta: number
  theta: number
  vega: number
}

export default function RiskChart({ delta, theta, vega }: Props) {
  const data = [
    { name: "Delta", value: delta, fill: "#16a34a" },
    { name: "Theta", value: theta, fill: "#dc2626" },
    { name: "Vega", value: vega, fill: "#2563eb" }
  ]

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <ReferenceLine y={0} stroke="#9ca3af" />
        <Bar
          dataKey="value"
          radius={[8, 8, 8, 8]}
          isAnimationActive
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

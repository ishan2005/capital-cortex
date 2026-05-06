import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts"

interface Props { delta: number; theta: number; vega: number }

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const val: number = payload[0].value
    const isNeg = val < 0
    return (
      <div style={{
        background: "#fff", border: "1px solid var(--border)",
        borderRadius: 8, padding: "8px 14px", fontSize: 12,
        fontFamily: "var(--font-mono)", boxShadow: "var(--shadow-md)",
      }}>
        <div style={{ color: "var(--ink-300)", marginBottom: 2 }}>{payload[0].payload?.name}</div>
        <div style={{ color: isNeg ? "var(--rose)" : "var(--emerald)", fontWeight: 700 }}>
          {val > 0 ? "+" : ""}{val.toFixed(4)}
        </div>
      </div>
    )
  }
  return null
}

export default function RiskChart({ delta, theta, vega }: Props) {
  const data = [
    { name: "Delta Δ", value: delta },
    { name: "Theta Θ", value: theta },
    { name: "Vega ν",  value: vega  },
  ]
  const barColors = ["#5B21B6", "#BE185D", "#0369A1"]

  return (
    <div className="card" style={{ padding: "20px 16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0 4px" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>Greeks — Risk Sensitivity</div>
          <div style={{ fontSize: 11, color: "var(--ink-300)", marginTop: 2 }}>Black-Scholes derived</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <span className="badge badge-violet">Δ Delta</span>
          <span className="badge badge-rose">Θ Theta</span>
          <span className="badge badge-ocean">ν Vega</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={44}>
          <XAxis dataKey="name" stroke="var(--border)" axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "var(--ink-500)", fontFamily: "var(--font-mono)", fontWeight: 600 }} />
          <YAxis stroke="var(--border)" axisLine={false} tickLine={false} width={50}
            tick={{ fontSize: 10, fill: "var(--ink-300)", fontFamily: "var(--font-mono)" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(91,33,182,0.04)" }} />
          <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="4 4" />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={barColors[i]} fillOpacity={0.85} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

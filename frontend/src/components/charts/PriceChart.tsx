import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts"
import { priceData } from "../../data/mockPriceData"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 12,
        fontFamily: "var(--font-mono)",
        boxShadow: "var(--shadow-md)",
      }}>
        <div style={{ color: "var(--ink-300)", marginBottom: 2 }}>{label}</div>
        <div style={{ color: "var(--violet)", fontWeight: 700 }}>₹{payload[0].value?.toLocaleString()}</div>
      </div>
    )
  }
  return null
}

export default function PriceChart() {
  return (
    <div className="card" style={{ padding: "20px 16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0 4px" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>Intraday Price Movement</div>
          <div style={{ fontSize: 11, color: "var(--ink-300)", marginTop: 2 }}>Simulated 1D candle data</div>
        </div>
        <div className="badge badge-emerald">● LIVE</div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={priceData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#5B21B6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#5B21B6" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="var(--border-soft)" />
          <XAxis
            dataKey="time"
            stroke="var(--border)"
            tick={{ fontSize: 10, fill: "var(--ink-300)", fontFamily: "var(--font-mono)" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            stroke="var(--border)"
            tick={{ fontSize: 10, fill: "var(--ink-300)", fontFamily: "var(--font-mono)" }}
            axisLine={false} tickLine={false}
            domain={["dataMin - 10", "dataMax + 10"]}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone" dataKey="price"
            stroke="var(--violet)" strokeWidth={2.5}
            fill="url(#priceGradLight)" dot={false}
            activeDot={{ r: 4, fill: "var(--violet)", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

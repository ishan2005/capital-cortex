import { useEffect, useState } from "react"
import Card from "../components/ui/Card"
import PriceChart from "../components/charts/PriceChart"
import RiskChart from "../components/charts/RiskChart"
import HedgeCard from "../components/ui/HedgeCard"
import { fetchOptionAnalysis } from "../services/optionApi"
import type { OptionAnalysis } from "../services/optionApi"

interface DashboardProps {
  symbol: string
}

export default function Dashboard({ symbol }: DashboardProps) {

  const [data, setData] = useState<OptionAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  
useEffect(() => {
  setLoading(true)

  fetchOptionAnalysis(symbol)
    .then(setData)
    .finally(() => setLoading(false))
}, [symbol])


  if (loading) {
    return <div className="text-gray-500">Loading analysis…</div>
  }

  if (!data) {
  return <div className="text-gray-500">Generating report…</div>
}


  return (
    <div className="space-y-8">
      {/* ================= KPI SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Option Price (Model)"
          value={`₹${data.price.toFixed(2)}`}
          subtitle="Black–Scholes estimate"
        />
        <Card
          title="Delta"
          value={data.delta.toFixed(3)}
          subtitle="Directional exposure"
        />
        <Card
          title="Theta (Daily)"
          value={data.theta.toFixed(3)}
          subtitle="Time decay"
        />
        <Card
          title="Vega"
          value={data.vega.toFixed(3)}
          subtitle="Volatility sensitivity"
        />
      </div>
      {/* ================= TRADING SIGNALS ================= */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* BUY */}
  <div className="border rounded-lg p-4 bg-green-50">
    <p className="text-sm text-gray-500">Trading Signal</p>
    <h3 className="text-2xl font-bold text-green-700">BUY</h3>
    <p className="text-sm text-gray-600">
      Confidence: 72% | Risk: Medium
    </p>
  </div>

  {/* HOLD */}
  <div className="border rounded-lg p-4 bg-yellow-50">
    <p className="text-sm text-gray-500">Alternative Signal</p>
    <h3 className="text-2xl font-bold text-yellow-700">HOLD</h3>
    <p className="text-sm text-gray-600">
      Confidence: 55% | Risk: Low
    </p>
  </div>

  {/* SELL */}
  <div className="border rounded-lg p-4 bg-red-50">
    <p className="text-sm text-gray-500">Bearish Scenario</p>
    <h3 className="text-2xl font-bold text-red-700">SELL</h3>
    <p className="text-sm text-gray-600">
      Confidence: 38% | Risk: High
    </p>
  </div>
</div>


      {/* ================= PRICE CHART ================= */}
      <div className="bg-white border rounded-lg p-6">
        <Card
  title="Underlying Price"
  value={`$${data.underlyingPrice}`}
  subtitle={`${symbol} latest price`}
/>

        <PriceChart />
      </div>

      {/* ================= RISK ANALYSIS ================= */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Risk Sensitivity Overview</h3>
        <RiskChart
          delta={data.delta}
          theta={data.theta}
          vega={data.vega}
        />
      </div>

      {/* ================= HEDGING ================= */}
      <HedgeCard
        strategy="Protective PUT"
        strike="₹2,800"
        premium="₹32.5"
        riskReduction="-48%"
        note="Suggested to protect downside risk in case of increased volatility."
      />
    </div>
  )
}

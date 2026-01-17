import { useEffect, useState } from "react"
import { fetchOptionAnalysis } from "../services/optionApi"
import type { OptionAnalysis } from "../services/optionApi"

interface ReportProps {
  symbol: string
}

export default function Report({ symbol }: ReportProps) {

  const [data, setData] = useState<OptionAnalysis | null>(null)
  

  useEffect(() => {
  fetchOptionAnalysis(symbol).then(setData)
}, [symbol])


 if (!data) {
  return <div className="text-gray-500">Generating report…</div>
}


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Option Analysis Report</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
          Export PDF
        </button>
      </div>

      {/* Executive Summary */}
      <section className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-2">Executive Summary</h2>
        <p className="text-sm text-gray-700">
          This report evaluates a call option on <strong>{data.symbol}</strong>{" "}
          using a Black–Scholes pricing framework. The model-derived option price
          and Greeks are used to assess valuation, risk exposure, and hedging
          considerations for a professional investment decision.
        </p>
      </section>

      {/* Pricing */}
      <section className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-2">Option Pricing</h2>
        <p className="text-sm text-gray-700">
          The estimated fair value of the option using the Black–Scholes model is:
        </p>
        <div className="mt-2 text-xl font-semibold">₹{data.price.toFixed(2)}</div>
        <p className="mt-2 text-xs text-gray-500">
          Model-based valuation assuming constant volatility and risk-free rate.
        </p>
      </section>

      {/* Greeks */}
      <section className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Risk Sensitivities (Greeks)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Delta</div>
            <div className="text-lg font-semibold">
              {data.delta.toFixed(3)}
            </div>
            <p className="text-xs text-gray-500">
              Measures sensitivity to stock price movement.
            </p>
          </div>

          <div>
            <div className="text-gray-500">Theta</div>
            <div className="text-lg font-semibold">
              {data.theta.toFixed(3)}
            </div>
            <p className="text-xs text-gray-500">
              Represents time decay of the option.
            </p>
          </div>

          <div>
            <div className="text-gray-500">Vega</div>
            <div className="text-lg font-semibold">
              {data.vega.toFixed(3)}
            </div>
            <p className="text-xs text-gray-500">
              Sensitivity to changes in volatility.
            </p>
          </div>
        </div>
      </section>

      {/* Risk & Hedging */}
      <section className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-2">Risk & Hedging Considerations</h2>
        <p className="text-sm text-gray-700">
          The option carries meaningful directional exposure (Delta) and
          sensitivity to volatility (Vega). Time decay (Theta) will negatively
          impact value if price movement stalls.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          A basic Delta-hedging strategy using the underlying stock can be used
          to reduce directional risk, while monitoring volatility conditions is
          recommended.
        </p>
      </section>

      {/* Consulting Recommendation */}
      <section className="bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-2">Consulting Recommendation</h2>
        <p className="text-sm text-gray-700">
          Based on model pricing and Greek analysis, the option appears reasonably
          valued under current assumptions. The position is suitable for
          investors with a moderate risk appetite who actively monitor price
          action and volatility.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          It is recommended to reassess the position if volatility rises sharply
          or time to expiry reduces significantly.
        </p>
      </section>
    </div>
  )
}

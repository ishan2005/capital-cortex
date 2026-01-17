interface NavbarProps {
  selectedStock?: string
  onStockChange?: (symbol: string) => void
}

export default function Navbar({
  selectedStock = "AAPL",
  onStockChange,
}: NavbarProps) {
  return (
   <header className="h-14 border-b bg-white flex items-center justify-between px-6">
  <div className="flex flex-col">
    <h1 className="font-semibold text-lg">Capital Cortex</h1>
    <span className="text-xs text-gray-500">
      AI-Powered Option Risk & Hedging Platform
    </span>
  </div>   {/* Stock Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Stock</span>

        <select
  value={selectedStock}
  onChange={(e) => onStockChange?.(e.target.value)}
  className="border rounded-md px-3 py-1 text-sm focus:outline-none"
>
  <option value="AAPL">🍎 Apple Inc. (AAPL)</option>
  <option value="MSFT">🟦 Microsoft (MSFT)</option>
  <option value="NVDA">🟩 NVIDIA (NVDA)</option>
  <option value="TSLA">🔴 Tesla (TSLA)</option>
</select>


        <span className="text-sm font-medium text-gray-700">
          NSE
        </span>
      </div>
    </header>
  )
}

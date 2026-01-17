import { useState } from "react"

import Dashboard from "./pages/Dashboard"
import Report from "./pages/Report"

import Navbar from "./layout/Navbar"
import Sidebar from "./layout/Sidebar"

import AIChat from "./components/ai/AIChat"


export default function App() {
  // ✅ State MUST be here (not inside JSX)
  
  const [activePage, setActivePage] = useState<
    "dashboard" | "report"
  >("dashboard")
 const [showAI, setShowAI] = useState(false)
 const [selectedStock, setSelectedStock] = useState("AAPL")

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar
  selectedStock={selectedStock}
  onStockChange={setSelectedStock}
/>


      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onNavigate={setActivePage} />

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {activePage === "dashboard" && (
  <Dashboard symbol={selectedStock} />
)}

{activePage === "report" && (
  <Report symbol={selectedStock} />
)}

             </main>
    </div>

    {/* Floating AI Assistant */}
<button
  onClick={() => setShowAI(true)}
  className="fixed bottom-6 right-6 z-50 flex items-center gap-2
             bg-gradient-to-r from-indigo-600 to-blue-600
             text-white px-4 py-3 rounded-full shadow-lg
             hover:scale-105 transition"
>
  🤖 <span className="font-medium">AI Assistant</span>
</button>

{showAI && <AIChat onClose={() => setShowAI(false)} />}


  </div>
)

}

interface SidebarProps {
  onNavigate: (page: "dashboard" | "report") => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 border-r bg-white p-4 space-y-2">
      <SidebarItem label="Dashboard" onClick={() => onNavigate("dashboard")} />
      <SidebarItem label="Stock Analysis" onClick={() => onNavigate("dashboard")} />
      <SidebarItem label="Risk Metrics" onClick={() => onNavigate("dashboard")} />
      <SidebarItem label="Hedging" onClick={() => onNavigate("dashboard")} />
      <SidebarItem label="Reports" onClick={() => onNavigate("report")} />
    </aside>
  )
}

function SidebarItem({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-md
                 hover:bg-gray-100 transition text-gray-700"
    >
      {label}
    </button>
  )
}

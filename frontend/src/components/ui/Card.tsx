interface CardProps {
  title: string
  value: string
  subtitle?: string
}

export default function Card({ title, value, subtitle }: CardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </div>
      {subtitle && (
        <div className="mt-1 text-xs text-gray-400">
          {subtitle}
        </div>
      )}
    </div>
  )
}

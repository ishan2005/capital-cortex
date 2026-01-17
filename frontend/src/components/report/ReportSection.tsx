interface ReportSectionProps {
  title: string
  children: React.ReactNode
}

export default function ReportSection({
  title,
  children,
}: ReportSectionProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h2>
      <div className="text-sm text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

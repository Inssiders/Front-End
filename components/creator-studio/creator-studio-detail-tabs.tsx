"use client"

interface CreatorStudioDetailTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function CreatorStudioDetailTabs({ activeTab, setActiveTab }: CreatorStudioDetailTabsProps) {
  const tabs = [
    { id: "overview", label: "개요" },
    { id: "analytics", label: "분석" },
    { id: "comments", label: "댓글" },
    { id: "monetization", label: "수익화" },
  ]

  return (
    <div className="border-b mb-6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

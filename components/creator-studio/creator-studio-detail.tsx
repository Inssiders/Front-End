"use client"

import { useEffect, useState } from "react"
import { CreatorStudioDetailTabs } from "./creator-studio-detail-tabs"
import { CreatorStudioDetailContent } from "./creator-studio-detail-content"

interface CreatorStudioDetailProps {
  id: string
}

export function CreatorStudioDetail({ id }: CreatorStudioDetailProps) {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate fetching content data
    const fetchContent = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/creator-studio/content/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          title: "인싸이더 콘텐츠",
          type: "video",
          thumbnail: "/placeholder.svg?height=300&width=500",
          status: "published",
          publishDate: "2023-05-10",
          views: 12543,
          likes: 1243,
          comments: 89,
          shares: 156,
          description: "인싸이더 플랫폼에서 공유된 콘텐츠입니다. 다양한 주제와 트렌드를 다루고 있습니다.",
          tags: ["인싸이더", "트렌드", "콘텐츠", "크리에이터"],
          category: "엔터테인먼트",
          duration: "03:45",
          monetization: true,
          revenue: "₩12,500",
        }

        setContent(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching content:", error)
        setLoading(false)
      }
    }

    fetchContent()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  if (!content) {
    return <div className="p-8 text-center">콘텐츠를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={content.thumbnail || "/placeholder.svg"}
                alt={content.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      content.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {content.status === "published" ? "게시됨" : "초안"}
                  </span>
                  <span className="text-gray-500 text-sm">{content.publishDate}</span>
                </div>

                <h1 className="text-xl font-bold mb-2">{content.title}</h1>
                <p className="text-gray-700 text-sm mb-4">{content.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {content.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">카테고리</p>
                    <p className="font-medium">{content.category}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">길이</p>
                    <p className="font-medium">{content.duration}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">수익화</p>
                    <p className="font-medium">{content.monetization ? "활성화" : "비활성화"}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">수익</p>
                    <p className="font-medium">{content.revenue}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex-1">
                    편집
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm flex-1">
                    삭제
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <CreatorStudioDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <CreatorStudioDetailContent id={id} content={content} activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

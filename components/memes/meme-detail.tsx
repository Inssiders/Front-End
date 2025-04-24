"use client"

import { useEffect, useState } from "react"
import { MemeComments } from "./meme-comments"
import { RelatedMemes } from "./related-memes"

interface MemeDetailProps {
  id: string
}

export function MemeDetail({ id }: MemeDetailProps) {
  const [meme, setMeme] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching meme data
    const fetchMeme = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/memes/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          title: "인싸이더 밈",
          image: "/placeholder.svg?height=600&width=600",
          creator: {
            id: "user-1",
            name: "밈 크리에이터",
            avatar: "/placeholder.svg?height=50&width=50",
          },
          createdAt: "2일 전",
          likes: 3245,
          comments: 156,
          shares: 423,
          saved: 89,
          category: "유머",
          tags: ["밈", "유머", "인싸이더", "재미"],
          description: "인싸이더 플랫폼에서 공유된 재미있는 밈입니다.",
        }

        setMeme(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching meme:", error)
        setLoading(false)
      }
    }

    fetchMeme()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  if (!meme) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <img src={meme.image || "/placeholder.svg"} alt={meme.title} className="w-full h-auto rounded-lg" />
            </div>

            <div className="w-full md:w-1/3">
              <h1 className="text-2xl font-bold mb-4">{meme.title}</h1>

              <div className="flex items-center mb-4">
                <img
                  src={meme.creator.avatar || "/placeholder.svg"}
                  alt={meme.creator.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{meme.creator.name}</p>
                  <p className="text-gray-500 text-sm">{meme.createdAt}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{meme.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{meme.category}</div>
                {meme.tags.map((tag: string, index: number) => (
                  <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xl font-bold">{meme.likes.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">좋아요</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xl font-bold">{meme.comments.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">댓글</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xl font-bold">{meme.shares.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">공유</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xl font-bold">{meme.saved.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">저장</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex-1 flex justify-center items-center gap-1">
                  <span>👍</span>
                  <span>좋아요</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm flex-1 flex justify-center items-center gap-1">
                  <span>💬</span>
                  <span>댓글</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm flex-1 flex justify-center items-center gap-1">
                  <span>🔗</span>
                  <span>공유</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MemeComments id={id} />
      <RelatedMemes id={id} />
    </div>
  )
}

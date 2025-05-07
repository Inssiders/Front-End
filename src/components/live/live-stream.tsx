"use client"

import { useEffect, useState } from "react"
import { LiveChat } from "./live-chat"

interface LiveStreamProps {
  id: string
}

export function LiveStream({ id }: LiveStreamProps) {
  const [stream, setStream] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching stream data
    const fetchStream = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/live/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          title: "라이브 스트리밍",
          streamer: {
            id: "streamer-1",
            name: "인싸이더 스트리머",
            avatar: "/placeholder.svg?height=50&width=50",
            followers: "1.2M",
          },
          thumbnail: "/placeholder.svg?height=720&width=1280",
          viewers: 1543,
          startedAt: "1시간 전",
          likes: 876,
          category: "토크쇼",
          tags: ["라이브", "토크쇼", "인싸이더"],
          description: "인싸이더 플랫폼에서 진행되는 라이브 스트리밍입니다. 다양한 주제로 시청자와 소통합니다.",
        }

        setStream(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching stream:", error)
        setLoading(false)
      }
    }

    fetchStream()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  if (!stream) {
    return <div className="p-8 text-center">스트림을 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden">
            <div className="relative pb-[56.25%]">
              <img
                src={stream.thumbnail || "/placeholder.svg"}
                alt={stream.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                LIVE
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {stream.viewers.toLocaleString()} 시청자
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md mt-4 p-6">
            <h1 className="text-2xl font-bold mb-2">{stream.title}</h1>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={stream.streamer.avatar || "/placeholder.svg"}
                  alt={stream.streamer.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{stream.streamer.name}</p>
                  <p className="text-gray-500 text-sm">{stream.streamer.followers} 팔로워</p>
                </div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
                팔로우
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{stream.category}</div>
              {stream.tags.map((tag: string, index: number) => (
                <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center">
                <span className="mr-1">👁️</span>
                <span>{stream.viewers.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">❤️</span>
                <span>{stream.likes.toLocaleString()}</span>
              </div>
              <div className="text-gray-500">{stream.startedAt} 시작</div>
            </div>

            <p className="text-gray-700">{stream.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <LiveChat id={id} />
        </div>
      </div>
    </div>
  )
}

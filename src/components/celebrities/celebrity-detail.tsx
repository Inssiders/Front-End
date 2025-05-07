"use client"

import { useEffect, useState } from "react"
import { CelebrityContent } from "./celebrity-content"
import { RelatedCelebrities } from "./related-celebrities"

interface CelebrityDetailProps {
  id: string
}

export function CelebrityDetail({ id }: CelebrityDetailProps) {
  const [celebrity, setCelebrity] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching celebrity data
    const fetchCelebrity = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/celebrities/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          name: "유명 연예인",
          profileImage: "/placeholder.svg?height=300&width=300",
          followers: "2.5M",
          posts: 342,
          bio: "인기 연예인 프로필입니다. 다양한 활동과 소식을 확인하세요.",
          categories: ["배우", "가수", "모델"],
          socialLinks: {
            instagram: "https://instagram.com",
            twitter: "https://twitter.com",
            youtube: "https://youtube.com",
          },
          recentPosts: [
            { id: "1", title: "새 영화 촬영 현장", image: "/placeholder.svg?height=200&width=300" },
            { id: "2", title: "팬미팅 현장", image: "/placeholder.svg?height=200&width=300" },
            { id: "3", title: "신곡 발매 소식", image: "/placeholder.svg?height=200&width=300" },
          ],
        }

        setCelebrity(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching celebrity:", error)
        setLoading(false)
      }
    }

    fetchCelebrity()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  if (!celebrity) {
    return <div className="p-8 text-center">연예인 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={celebrity.profileImage || "/placeholder.svg"}
                alt={celebrity.name}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-lg font-bold">{celebrity.followers}</p>
                  <p className="text-gray-500 text-sm">팔로워</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{celebrity.posts}</p>
                  <p className="text-gray-500 text-sm">게시물</p>
                </div>
                <div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full">팔로우</button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{celebrity.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {celebrity.categories.map((category: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6">{celebrity.bio}</p>

              <div className="flex gap-4 mb-6">
                {Object.entries(celebrity.socialLinks).map(([platform, url]: [string, any]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CelebrityContent id={id} />
      <RelatedCelebrities id={id} />
    </div>
  )
}

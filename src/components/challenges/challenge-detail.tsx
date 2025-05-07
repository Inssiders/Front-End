"use client"

import { useEffect, useState } from "react"
import { ChallengeSubmissions } from "./challenge-submissions"

interface ChallengeDetailProps {
  id: string
}

export function ChallengeDetail({ id }: ChallengeDetailProps) {
  const [challenge, setChallenge] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching challenge data
    const fetchChallenge = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/challenges/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          title: "댄스 챌린지",
          image: "/placeholder.svg?height=400&width=800",
          creator: {
            name: "인싸이더 공식",
            avatar: "/placeholder.svg?height=50&width=50",
            verified: true,
          },
          startDate: "2023-04-15",
          endDate: "2023-05-15",
          participants: 12543,
          prize: "₩1,000,000",
          description:
            "이 챌린지에 참여하여 당신의 댄스 실력을 보여주세요! 가장 창의적이고 인기있는 댄스 영상에 상금이 주어집니다.",
          rules: [
            "15초에서 60초 사이의 댄스 영상을 업로드하세요.",
            "해시태그 #인싸이더댄스챌린지를 사용하세요.",
            "다른 참가자의 영상에 투표하고 댓글을 남겨주세요.",
            "부적절한 콘텐츠는 실격 처리됩니다.",
          ],
          status: "active",
          tags: ["댄스", "챌린지", "상금", "인싸이더"],
        }

        setChallenge(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching challenge:", error)
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  if (!challenge) {
    return <div className="p-8 text-center">챌린지 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={challenge.image || "/placeholder.svg"}
          alt={challenge.title}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {challenge.status === "active" ? "진행 중" : "종료됨"}
            </div>
          </div>

          <div className="flex items-center mb-6">
            <img
              src={challenge.creator.avatar || "/placeholder.svg"}
              alt={challenge.creator.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="flex items-center">
                <p className="font-medium">{challenge.creator.name}</p>
                {challenge.creator.verified && <span className="ml-1 text-blue-500">✓</span>}
              </div>
              <p className="text-gray-500 text-sm">주최자</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">기간</p>
              <p className="font-medium">
                {challenge.startDate} ~ {challenge.endDate}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">참가자</p>
              <p className="font-medium">{challenge.participants.toLocaleString()}명</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">상금</p>
              <p className="font-medium">{challenge.prize}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">챌린지 설명</h2>
            <p className="text-gray-700">{challenge.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">참여 규칙</h2>
            <ul className="list-disc pl-5 space-y-2">
              {challenge.rules.map((rule: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {challenge.tags.map((tag: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium">
              챌린지 참여하기
            </button>
          </div>
        </div>
      </div>

      <ChallengeSubmissions id={id} />
    </div>
  )
}

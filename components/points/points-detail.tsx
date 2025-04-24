"use client"

import { useEffect, useState } from "react"
import { PointsTransactions } from "./points-transactions"

interface PointsDetailProps {
  id: string
}

export function PointsDetail({ id }: PointsDetailProps) {
  const [pointsData, setPointsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching points data
    const fetchPointsData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/points/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          user: {
            id: "user-1",
            name: "포인트 사용자",
            avatar: "/placeholder.svg?height=80&width=80",
          },
          totalPoints: 12500,
          level: 5,
          nextLevel: 6,
          progress: 75,
          pointsToNextLevel: 2500,
          rank: 123,
          badges: [
            { id: "badge-1", name: "콘텐츠 크리에이터", icon: "🏆", earned: "2023-03-15" },
            { id: "badge-2", name: "인기 멤버", icon: "⭐", earned: "2023-04-20" },
            { id: "badge-3", name: "챌린지 우승자", icon: "🥇", earned: "2023-05-10" },
          ],
          recentActivity: [
            { id: "activity-1", type: "획득", amount: 100, description: "로그인 보너스", date: "2023-06-01" },
            { id: "activity-2", type: "획득", amount: 250, description: "콘텐츠 업로드", date: "2023-06-02" },
            { id: "activity-3", type: "사용", amount: -500, description: "프리미엄 스티커 구매", date: "2023-06-03" },
            { id: "activity-4", type: "획득", amount: 150, description: "댓글 작성", date: "2023-06-04" },
          ],
        }

        setPointsData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching points data:", error)
        setLoading(false)
      }
    }

    fetchPointsData()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  if (!pointsData) {
    return <div className="p-8 text-center">포인트 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="flex flex-col items-center text-center">
                <img
                  src={pointsData.user.avatar || "/placeholder.svg"}
                  alt={pointsData.user.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h1 className="text-2xl font-bold mb-1">{pointsData.user.name}</h1>
                <p className="text-gray-500 mb-4">레벨 {pointsData.level}</p>

                <div className="bg-gray-100 w-full h-4 rounded-full mb-2">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${pointsData.progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  다음 레벨까지 {pointsData.pointsToNextLevel.toLocaleString()} 포인트 필요
                </p>

                <div className="bg-blue-50 p-4 rounded-lg w-full mb-6">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">총 포인트</p>
                    <p className="text-2xl font-bold">{pointsData.totalPoints.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg w-full">
                  <p className="font-medium mb-3">랭킹</p>
                  <p className="text-3xl font-bold text-blue-500">#{pointsData.rank}</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">획득한 배지</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {pointsData.badges.map((badge: any) => (
                    <div key={badge.id} className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-gray-500 text-sm">{badge.earned} 획득</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">최근 활동</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left">날짜</th>
                        <th className="py-3 px-4 text-left">설명</th>
                        <th className="py-3 px-4 text-right">포인트</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pointsData.recentActivity.map((activity: any) => (
                        <tr key={activity.id} className="border-t border-gray-200">
                          <td className="py-3 px-4 text-gray-500">{activity.date}</td>
                          <td className="py-3 px-4">{activity.description}</td>
                          <td
                            className={`py-3 px-4 text-right font-medium ${
                              activity.amount > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {activity.amount > 0 ? "+" : ""}
                            {activity.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-right">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">모든 활동 보기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PointsTransactions id={id} />
    </div>
  )
}

import Link from "next/link"

interface ChallengeSubmissionsProps {
  id: string
}

export function ChallengeSubmissions({ id }: ChallengeSubmissionsProps) {
  // Simulated submissions data
  const submissions = Array(6)
    .fill(0)
    .map((_, i) => ({
      id: `submission-${i + 1}`,
      user: {
        id: `user-${i + 1}`,
        name: `사용자 ${i + 1}`,
        avatar: `/placeholder.svg?height=50&width=50`,
      },
      video: `/placeholder.svg?height=300&width=300`,
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 500),
      timestamp: "2일 전",
    }))

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">인기 제출작</h2>
        <button className="text-blue-500 hover:text-blue-700">모두 보기</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative pb-[100%]">
              <img
                src={submission.video || "/placeholder.svg"}
                alt={`Submission by ${submission.user.name}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                00:15
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-3">
                <Link href={`/profile/${submission.user.id}`}>
                  <img
                    src={submission.user.avatar || "/placeholder.svg"}
                    alt={submission.user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                </Link>
                <div>
                  <Link href={`/profile/${submission.user.id}`} className="font-medium hover:underline">
                    {submission.user.name}
                  </Link>
                  <p className="text-gray-500 text-xs">{submission.timestamp}</p>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{submission.likes}</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{submission.comments}</span>
                  </button>
                </div>
                <button className="text-gray-500">공유</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

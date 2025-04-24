import Link from "next/link"

interface MemeCommentsProps {
  id: string
}

export function MemeComments({ id }: MemeCommentsProps) {
  // Simulated comments
  const comments = Array(5)
    .fill(0)
    .map((_, i) => ({
      id: `comment-${i + 1}`,
      user: {
        id: `user-${i + 1}`,
        name: `사용자 ${i + 1}`,
        avatar: `/placeholder.svg?height=40&width=40`,
      },
      text:
        i % 2 === 0
          ? "정말 재미있는 밈이네요! 친구들에게 공유했어요 😂"
          : "이런 밈 더 많이 올려주세요. 항상 웃게 해주셔서 감사합니다.",
      timestamp: `${i + 1}시간 전`,
      likes: Math.floor(Math.random() * 50),
      replies:
        i % 2 === 0
          ? [
              {
                id: `reply-${i}-1`,
                user: {
                  id: `user-reply-${i}`,
                  name: "답글 작성자",
                  avatar: `/placeholder.svg?height=30&width=30`,
                },
                text: "저도 동의합니다! 정말 재미있어요.",
                timestamp: `${i}시간 전`,
                likes: Math.floor(Math.random() * 10),
              },
            ]
          : [],
    }))

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">댓글 {comments.length}개</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start mb-6">
          <img src="/placeholder.svg?height=40&width=40" alt="User" className="w-10 h-10 rounded-full mr-3" />
          <div className="flex-1">
            <textarea
              placeholder="댓글을 작성해주세요..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                댓글 작성
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-t pt-4">
              <div className="flex items-start">
                <Link href={`/profile/${comment.user.id}`}>
                  <img
                    src={comment.user.avatar || "/placeholder.svg"}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <Link href={`/profile/${comment.user.id}`} className="font-medium hover:underline">
                      {comment.user.name}
                    </Link>
                    <p className="text-gray-500 text-xs">{comment.timestamp}</p>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.text}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                      <span>👍</span>
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">답글</button>
                  </div>

                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start">
                          <Link href={`/profile/${reply.user.id}`}>
                            <img
                              src={reply.user.avatar || "/placeholder.svg"}
                              alt={reply.user.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                          </Link>
                          <div>
                            <div className="flex items-center mb-1">
                              <Link href={`/profile/${reply.user.id}`} className="font-medium text-sm hover:underline">
                                {reply.user.name}
                              </Link>
                              <p className="text-gray-500 text-xs ml-2">{reply.timestamp}</p>
                            </div>
                            <p className="text-gray-700 text-sm mb-1">{reply.text}</p>
                            <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1">
                              <span>👍</span>
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-blue-500 hover:text-blue-700 font-medium">더 많은 댓글 보기</button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Reply, MoreHorizontal } from "lucide-react"

// 댓글 데이터 (실제로는 API에서 가져올 것)
const initialComments = [
  {
    id: 1,
    author: {
      name: "김민서",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
    },
    content: "이 밈 진짜 웃겨요! 친구들한테 공유했더니 다들 좋아했어요 ㅋㅋㅋ",
    likes: 42,
    replies: 3,
    createdAt: "1시간 전",
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "박준혁",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
    },
    content: "아무말 대잔치 밈이 요즘 정말 유행이네요. 저도 몇 개 만들어봤는데 생각보다 어렵더라고요.",
    likes: 28,
    replies: 1,
    createdAt: "2시간 전",
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: "이지유",
      avatar: "/placeholder.svg?height=40&width=40&text=JY",
    },
    content: "이런 밈이 왜 인기 있는지 이해가 안 돼요... 그냥 아무말 아닌가요?",
    likes: 15,
    replies: 7,
    createdAt: "3시간 전",
    isLiked: false,
  },
  {
    id: 4,
    author: {
      name: "최다은",
      avatar: "/placeholder.svg?height=40&width=40&text=DE",
    },
    content: "이 밈 시리즈 더 올려주세요! 너무 재밌어요 ㅋㅋㅋ",
    likes: 36,
    replies: 0,
    createdAt: "5시간 전",
    isLiked: false,
  },
]

export default function CommentSection({ trendingId }: { trendingId: string }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // 실제로는 API 호출을 통해 댓글을 저장할 것
    setTimeout(() => {
      const newCommentObj = {
        id: comments.length + 1,
        author: {
          name: "나",
          avatar: "/placeholder.svg?height=40&width=40&text=ME",
        },
        content: newComment,
        likes: 0,
        replies: 0,
        createdAt: "방금 전",
        isLiked: false,
      }

      setComments([newCommentObj, ...comments])
      setNewComment("")
      setIsSubmitting(false)
    }, 500)
  }

  const toggleLike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Textarea
          placeholder="댓글을 작성해주세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none mb-3"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleCommentSubmit}
            disabled={!newComment.trim() || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? "게시 중..." : "댓글 게시"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{comment.author.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{comment.createdAt}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <button
                className={`flex items-center mr-4 hover:text-purple-600 dark:hover:text-purple-400 ${
                  comment.isLiked ? "text-purple-600 dark:text-purple-400" : ""
                }`}
                onClick={() => toggleLike(comment.id)}
              >
                <Heart className={`h-4 w-4 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                <span>{comment.likes}</span>
              </button>
              <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400">
                <Reply className="h-4 w-4 mr-1" />
                <span>답글 {comment.replies > 0 ? comment.replies : "달기"}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

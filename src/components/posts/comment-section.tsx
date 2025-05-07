"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Flag, MessageSquare } from "lucide-react"

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setComments([
        {
          id: "1",
          author: {
            id: "456",
            name: "댓글러버",
            avatar: `/placeholder.svg?height=40&width=40`,
          },
          content: "정말 흥미로운 글이네요! 요즘 이런 트렌드가 많이 보이는 것 같아요.",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          likes: 24,
          replies: [
            {
              id: "1-1",
              author: {
                id: "123",
                name: "트렌드헌터",
                avatar: `/placeholder.svg?height=40&width=40`,
              },
              content: "관심 가져주셔서 감사합니다! 앞으로도 좋은 정보 공유하겠습니다.",
              publishedAt: new Date(Date.now() - 1800000).toISOString(),
              likes: 5,
            },
          ],
        },
        {
          id: "2",
          author: {
            id: "789",
            name: "인싸이더팬",
            avatar: `/placeholder.svg?height=40&width=40`,
          },
          content: "저도 이 트렌드에 참여해봤는데 정말 재미있었어요! 다들 한번 도전해보세요.",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          likes: 18,
          replies: [],
        },
        {
          id: "3",
          author: {
            id: "101",
            name: "트렌드분석가",
            avatar: `/placeholder.svg?height=40&width=40`,
          },
          content:
            "이 트렌드는 Z세대를 중심으로 확산되고 있지만, 점차 다른 세대로도 퍼지고 있는 것 같아요. 특히 30대 초반에서도 인기가 높아지고 있습니다.",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          likes: 32,
          replies: [],
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [postId])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}초 전`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`

    return date.toLocaleDateString("ko-KR")
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In a real app, you would send this to your API
    const newCommentObj = {
      id: `new-${Date.now()}`,
      author: {
        id: "current-user",
        name: "현재사용자",
        avatar: `/placeholder.svg?height=40&width=40`,
      },
      content: newComment,
      publishedAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  return (
    <section id="comments" className="max-w-4xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-6">댓글 {comments.length}개</h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <Textarea
          placeholder="댓글을 작성해주세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 resize-none"
          rows={3}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!newComment.trim()}>
            댓글 작성
          </Button>
        </div>
      </form>

      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start space-x-4 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">{comment.author.name}</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.publishedAt)}</span>
                  </div>
                  <p className="text-gray-800 mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Heart size={16} className="mr-1" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageSquare size={16} className="mr-1" />
                      <span>답글</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Flag size={16} className="mr-1" />
                      <span>신고</span>
                    </Button>
                  </div>
                </div>
              </div>

              {comment.replies.length > 0 && (
                <div className="ml-14 mt-4 space-y-4">
                  {comment.replies.map((reply: any) => (
                    <div key={reply.id} className="flex items-start space-x-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium mr-2">{reply.author.name}</span>
                          <span className="text-sm text-gray-500">{formatDate(reply.publishedAt)}</span>
                        </div>
                        <p className="text-gray-800 mb-2">{reply.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-sm">
                            <Heart size={14} className="mr-1" />
                            <span>{reply.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-sm">
                            <Flag size={14} className="mr-1" />
                            <span>신고</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

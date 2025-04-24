"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Eye } from "lucide-react"

interface RelatedPostsProps {
  postId: string
}

export default function RelatedPosts({ postId }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRelatedPosts(
        Array.from({ length: 3 }, (_, i) => ({
          id: `related-${i + 1}`,
          title: `관련 게시글 ${i + 1}: 트렌드와 인사이트`,
          excerpt: "이 게시글은 현재 보고 계신 내용과 관련된 트렌드와 인사이트를 다루고 있습니다.",
          author: {
            name: `작성자${i + 1}`,
            avatar: `/placeholder.svg?height=40&width=40`,
          },
          publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
          comments: Math.floor(Math.random() * 50),
          likes: Math.floor(Math.random() * 200),
          views: Math.floor(Math.random() * 500) + 100,
          image: `/placeholder.svg?height=150&width=300`,
        })),
      )
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

  return (
    <section className="max-w-4xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-6">관련 게시글</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-200" />
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-2" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative w-full h-40">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <MessageSquare size={12} className="mr-1" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

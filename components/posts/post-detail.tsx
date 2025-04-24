"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Heart, Eye, Share2, Bookmark, Flag, AlertCircle, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useData } from "@/hooks/use-data"

interface PostDetailProps {
  id: string
}

export default function PostDetail({ id }: PostDetailProps) {
  const { data, isLoading, error } = useData("posts", { id })
  const post = data?.postDetail || null

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">게시글을 불러오는 중...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>
          게시글을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          <br />
          {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (!post) {
    return (
      <Alert className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>게시글 없음</AlertTitle>
        <AlertDescription>요청하신 게시글을 찾을 수 없습니다.</AlertDescription>
      </Alert>
    )
  }

  return (
    <article className="max-w-4xl mx-auto mb-12">
      <div className="mb-6">
        <Link href="/posts" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft size={18} className="mr-2" />
          <span>게시글 목록으로 돌아가기</span>
        </Link>

        <Badge className="mb-4">{post.category}</Badge>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href={`/profile/${post.author.id}`}>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${post.author.id}`} className="font-medium hover:underline">
                {post.author.name}
              </Link>
              <p className="text-sm text-gray-500">
                팔로워 {post.author.followers.toLocaleString()}명 • {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Share2 size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>카카오톡으로 공유</DropdownMenuItem>
              <DropdownMenuItem>페이스북으로 공유</DropdownMenuItem>
              <DropdownMenuItem>트위터로 공유</DropdownMenuItem>
              <DropdownMenuItem>링크 복사</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {post.image && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="flex items-center justify-between border-t border-b py-4 my-8">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            className={`flex items-center gap-2 ${isLiked ? "text-red-500" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={20} className={isLiked ? "fill-current" : ""} />
            <span>{isLiked ? post.likes + 1 : post.likes}</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
          >
            <MessageSquare size={20} />
            <span>{post.comments}</span>
          </Button>

          <div className="flex items-center gap-2 text-gray-500">
            <Eye size={20} />
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={isBookmarked ? "text-blue-500" : ""}
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label="북마크"
          >
            <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
          </Button>

          <Button variant="ghost" size="icon" aria-label="신고하기">
            <Flag size={20} />
          </Button>
        </div>
      </div>
    </article>
  )
}

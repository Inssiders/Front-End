"use client"
import Link from "next/link"
import Image from "next/image"
import { MessageSquare, Heart, Eye, Clock, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useData } from "@/hooks/use-data"

export default function PostsGrid() {
  const { data, isLoading, error } = useData("posts", {})
  const posts = data?.posts || []

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">데이터를 불러오는 중...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>
          데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          <br />
          {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <Alert className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>게시글 없음</AlertTitle>
        <AlertDescription>표시할 게시글이 없습니다.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            {post.image && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            )}
            <CardContent className={`p-4 ${!post.image ? "pt-4" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 text-sm">
                <div className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center">
                  <Heart size={14} className="mr-1" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  <span>{post.views}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Link href="/" className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold">게시글</h1>
      </div>
      <p className="text-gray-600 max-w-2xl">
        인싸이더에서 인기 있는 게시글을 확인하고 최신 트렌드를 따라가세요. 다양한 주제의 게시글을 통해 새로운 정보와
        재미를 얻을 수 있습니다.
      </p>
    </div>
  )
}

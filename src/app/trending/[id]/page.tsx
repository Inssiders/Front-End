import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import TrendingDetail from "@/components/trending/trending-detail"
import TrendingDetailLoading from "@/components/trending/trending-detail-loading"
import RelatedTrending from "@/components/trending/related-trending"

export default function TrendingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 py-6">
        <Link href="/trending">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            트렌딩으로 돌아가기
          </Button>
        </Link>

        <Suspense fallback={<TrendingDetailLoading />}>
          <TrendingDetail id={params.id} />
        </Suspense>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">관련 트렌드</h2>
          <RelatedTrending currentId={params.id} />
        </div>
      </div>
    </div>
  )
}

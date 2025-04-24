interface CreatorStudioDetailContentProps {
  id: string
  content: any
  activeTab: string
}

export function CreatorStudioDetailContent({ id, content, activeTab }: CreatorStudioDetailContentProps) {
  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview()
      case "analytics":
        return renderAnalytics()
      case "comments":
        return renderComments()
      case "monetization":
        return renderMonetization()
      default:
        return renderOverview()
    }
  }

  const renderOverview = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">조회수</p>
            <p className="text-2xl font-bold">{content.views.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">좋아요</p>
            <p className="text-2xl font-bold">{content.likes.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">댓글</p>
            <p className="text-2xl font-bold">{content.comments.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">공유</p>
            <p className="text-2xl font-bold">{content.shares.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">콘텐츠 요약</h3>
          <p className="text-gray-700">{content.description}</p>
        </div>
      </div>
    )
  }

  const renderAnalytics = () => {
    return (
      <div>
        <h3 className="font-bold mb-4">상세 분석</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-500 text-sm mb-2">시청자 통계</p>
          <div className="h-64 flex items-center justify-center border border-gray-200 rounded bg-white">
            <p className="text-gray-500">시청자 통계 차트가 여기에 표시됩니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-2">시청자 연령대</p>
            <div className="h-40 flex items-center justify-center border border-gray-200 rounded bg-white">
              <p className="text-gray-500">연령대 차트</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-2">시청자 성별</p>
            <div className="h-40 flex items-center justify-center border border-gray-200 rounded bg-white">
              <p className="text-gray-500">성별 차트</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-2">시청자 위치</p>
            <div className="h-40 flex items-center justify-center border border-gray-200 rounded bg-white">
              <p className="text-gray-500">위치 차트</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm mb-2">트래픽 소스</p>
            <div className="h-40 flex items-center justify-center border border-gray-200 rounded bg-white">
              <p className="text-gray-500">트래픽 소스 차트</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderComments = () => {
    // Simulated comments
    const comments = Array(5)
      .fill(0)
      .map((_, i) => ({
        id: `comment-${i + 1}`,
        user: {
          name: `사용자 ${i + 1}`,
          avatar: `/placeholder.svg?height=40&width=40`,
        },
        text:
          i % 2 === 0
            ? "정말 좋은 콘텐츠네요! 다음 영상도 기대하고 있어요."
            : "이런 내용 더 많이 올려주세요. 매우 유익했습니다.",
        timestamp: `${i + 1}일 전`,
        likes: Math.floor(Math.random() * 50),
      }))

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">댓글 ({content.comments})</h3>
          <select className="border rounded px-2 py-1 text-sm">
            <option>최신순</option>
            <option>인기순</option>
          </select>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <img
                  src={comment.user.avatar || "/placeholder.svg"}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{comment.user.name}</p>
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
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
            더 보기
          </button>
        </div>
      </div>
    )
  }

  const renderMonetization = () => {
    return (
      <div>
        <h3 className="font-bold mb-4">수익화 정보</h3>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">수익화 상태</p>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                content.monetization ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {content.monetization ? "활성화" : "비활성화"}
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-4">이 콘텐츠는 현재 수익화가 활성화되어 있습니다.</p>

          <div className="mb-4">
            <p className="font-medium mb-2">총 수익</p>
            <p className="text-2xl font-bold">{content.revenue}</p>
          </div>

          <div className="h-48 flex items-center justify-center border border-gray-200 rounded bg-white mb-4">
            <p className="text-gray-500">수익 차트가 여기에 표시됩니다.</p>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            수익화 설정 변경
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">수익화 옵션</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="ads" className="mr-2" checked />
              <label htmlFor="ads">광고 수익</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sponsorship" className="mr-2" />
              <label htmlFor="sponsorship">스폰서십</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="membership" className="mr-2" />
              <label htmlFor="membership">멤버십 전용 콘텐츠</label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div>{renderContent()}</div>
}

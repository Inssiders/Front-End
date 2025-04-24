interface CelebrityContentProps {
  id: string
}

export function CelebrityContent({ id }: CelebrityContentProps) {
  // Simulated content data
  const contentTabs = [
    { id: "posts", label: "게시물" },
    { id: "videos", label: "비디오" },
    { id: "news", label: "뉴스" },
    { id: "events", label: "이벤트" },
  ]

  const posts = Array(9)
    .fill(0)
    .map((_, i) => ({
      id: `post-${i}`,
      image: `/placeholder.svg?height=300&width=300`,
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 1000),
    }))

  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {contentTabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 font-medium ${
                  tab.id === "posts" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="relative group">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={`Post ${post.id}`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white flex gap-4">
                    <div className="flex items-center">
                      <span className="mr-1">❤️</span>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">💬</span>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

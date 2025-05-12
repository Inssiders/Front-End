"use client";

import { useEffect, useRef, useState } from "react";
import { MemeComments } from "./meme-comments";
import { RelatedMemes } from "./related-memes";

interface MemeDetailProps {
  id: string;
}

export function MemeDetail({ id }: MemeDetailProps) {
  const [meme, setMeme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [descClamped, setDescClamped] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching meme data
    const fetchMeme = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/memes/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          title: "인싸이더 밈",
          image: "/placeholder.svg?height=600&width=600",
          creator: {
            id: "user-1",
            name: "밈 크리에이터",
            avatar: "/placeholder.svg?height=50&width=50",
          },
          createdAt: "2일 전",
          likes: 3245,
          comments: 156,
          shares: 423,
          saved: 89,
          category: "유머",
          tags: ["밈", "유머", "인싸이더", "재미"],
          description:
            "인싸이더 플랫폼에서 공유된 재미있는 밈입니다.\n인싸이더 플랫폼에서 공유된 재미있는 밈입니다.\n인싸이더 플랫폼에서 공유된 재미있는 밈입니다.",
        };

        setMeme(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meme:", error);
        setLoading(false);
      }
    };

    fetchMeme();
  }, [id]);

  useEffect(() => {
    if (descRef.current) {
      // 3줄 이상인지 체크
      setDescClamped(
        descRef.current.scrollHeight > descRef.current.clientHeight + 2
      );
    }
  }, [meme?.description]);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  if (!meme) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full mx-auto md:flex md:flex-row md:h-[1000px]">
        {/* 이미지 영역 */}
        <div className="md:w-3/5 flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none md:h-full h-72">
          <img
            src={meme.image || "/placeholder.svg"}
            alt={meme.title}
            className="w-full h-full object-contain md:rounded-l-lg md:rounded-r-none rounded-t-lg"
          />
        </div>
        {/* 오른쪽 정보 영역 */}
        <div className="md:w-2/5 flex flex-col md:h-full md:overflow-y-auto">
          {/* 버튼: 좋아요/댓글/공유/저장 */}
          <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <button className="text-2xl text-gray-700 hover:text-pink-500 transition">
              <span role="img" aria-label="좋아요">
                ❤️
              </span>
            </button>
            <button className="text-2xl text-gray-700 hover:text-blue-500 transition">
              <span role="img" aria-label="댓글">
                💬
              </span>
            </button>
            <button className="text-2xl text-gray-700 hover:text-green-500 transition">
              <span role="img" aria-label="공유">
                🔗
              </span>
            </button>
            <button className="ml-auto text-2xl text-gray-700 hover:text-yellow-500 transition">
              <span role="img" aria-label="저장">
                🔖
              </span>
            </button>
          </div>
          {/* 상단: 작성자, 설명, 더보기 */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center mb-2">
              <img
                src={meme.creator.avatar || "/placeholder.svg"}
                alt={meme.creator.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-medium mr-2">{meme.creator.name}</span>
              <span className="text-gray-400 text-xs">{meme.createdAt}</span>
            </div>
            <div className="mb-2 relative">
              <div
                ref={descRef}
                className={
                  showFullDesc
                    ? "text-gray-700 md:text-base whitespace-pre-line"
                    : "text-gray-700 md:text-base line-clamp-3 whitespace-pre-line"
                }
                style={
                  !showFullDesc
                    ? { maxHeight: "4.5em", overflow: "hidden" }
                    : {}
                }
              >
                {meme.description}
              </div>
              {!showFullDesc && descClamped && (
                <button
                  className="absolute right-0 bottom-0 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 px-2 text-sm text-purple-600 font-semibold"
                  onClick={() => setShowFullDesc(true)}
                >
                  더보기
                </button>
              )}
              {showFullDesc && descClamped && (
                <button
                  className="mt-2 text-sm text-purple-600 font-semibold"
                  onClick={() => setShowFullDesc(false)}
                >
                  접기
                </button>
              )}
            </div>
          </div>
          {/* 태그/카테고리 */}
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {meme.category}
            </div>
            {meme.tags.map((tag: string, index: number) => (
              <div
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </div>
            ))}
          </div>
          {/* 댓글 (스크롤) */}
          <div className="px-4 pb-2 flex-1">
            <div className="overflow-y-auto border-t border-b border-gray-100 dark:border-gray-800 py-2">
              <MemeComments
                id={id}
                likes={meme.likes}
                commentsCount={meme.comments}
                shares={meme.shares}
                saved={meme.saved}
              />
            </div>
          </div>
          {/* 댓글 입력 폼 */}
          <form className="px-4 pb-4 pt-2 flex gap-2 border-t border-gray-100 dark:border-gray-800">
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              className="flex-1 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition text-sm"
            >
              등록
            </button>
          </form>
        </div>
      </div>
      <RelatedMemes id={id} />
    </div>
  );
}

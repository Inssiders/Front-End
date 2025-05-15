"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch meme data from public/mock-data/memes-data.json
    const fetchMeme = async () => {
      try {
        const response = await fetch("/mock-data/memes-data.json");
        const allMemes = await response.json();
        const found = allMemes.find((m: any) => String(m.id) === String(id));
        setMeme(found || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meme:", error);
        setMeme(null);
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
  }, [meme?.content]);

  // 공유하기
  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL이 복사되었습니다.");
    } catch (e) {
      toast.error("복사에 실패했습니다.");
    }
  }, []);

  // 좋아요
  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 500); // 애니메이션 지속시간
  }, []);

  // 댓글 input 포커스
  const handleComment = useCallback(() => {
    commentInputRef.current?.focus();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  if (!meme) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full mx-auto md:flex md:flex-row md:h-[700px]">
        {/* 이미지 영역 */}
        <div className="md:w-3/5 flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none md:h-full h-72">
          <img
            src={meme.media_url || "/placeholder.svg"}
            alt={meme.title}
            className="w-full h-full object-contain md:rounded-l-lg md:rounded-r-none rounded-t-lg"
          />
        </div>
        <div className="md:w-2/5 flex flex-col md:h-full md:overflow-y-auto">
          <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <button
              onClick={handleLike}
              className={`text-2xl transition relative
                ${
                  isLiked
                    ? "text-pink-500"
                    : "text-gray-700 hover:text-pink-500"
                }
                ${likeAnimating ? "scale-125" : "scale-100"}
                `}
              style={{ transition: "transform 0.2s, color 0.2s" }}
            >
              <span role="img" aria-label="좋아요">
                {isLiked ? "❤️" : "🤍"}
              </span>
            </button>
            <button
              onClick={handleComment}
              className="text-2xl text-gray-700 hover:text-blue-500 transition"
            >
              <span role="img" aria-label="댓글">
                💬
              </span>
            </button>
            <button
              onClick={handleShare}
              className="text-2xl text-gray-700 hover:text-green-500 transition"
            >
              <span role="img" aria-label="공유">
                🔗
              </span>
            </button>
          </div>
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center mb-2">
              <img
                src={"/placeholder.svg?height=50&width=50"}
                alt={"작성자"}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-medium mr-2">작성자 {meme.user_id}</span>
              <span className="text-gray-400 text-xs">
                {new Date(meme.created_at).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">{meme.title}</h2>
            <div className="mb-2 text-gray-700 md:text-base whitespace-pre-line">
              {meme.content}
            </div>
          </div>
          <div className="px-4 pb-2 flex flex-wrap gap-2 items-center">
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              카테고리 {meme.category_id}
            </div>
            <div className="text-xs text-gray-500 ml-auto">
              좋아요 {meme.likes} · 댓글 {meme.comments}
            </div>
          </div>
          <div className="px-4 pb-2 flex-1">
            <div className="overflow-y-auto border-t border-b border-gray-100 dark:border-gray-800 py-2">
              <div className="text-gray-400 text-sm text-center py-8">
                댓글 기능 준비 중
              </div>
            </div>
          </div>
          <form
            className="px-4 pb-4 pt-2 flex gap-2 border-t border-gray-100 dark:border-gray-800"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={commentInputRef}
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

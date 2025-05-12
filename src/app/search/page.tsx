"use client";

import MemesGrid from "@/components/memes/memes-grid";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Meme {
  id: number;
  title: string;
  category: string;
  image: string;
  author: { name: string; avatar: string };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toLowerCase() || "";
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/memes-data.json")
      .then((res) => res.json())
      .then((data) => {
        setMemes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setMemes([]);
        setLoading(false);
      });
  }, []);

  const filteredMemes = useMemo(() => {
    if (!q) return [];
    return memes.filter((meme) => meme.title.toLowerCase().includes(q));
  }, [q, memes]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">트렌드 검색 결과</h1>
      {q ? (
        <>
          <div className="mb-6 text-lg">
            <span className="font-semibold text-purple-600">"{q}"</span>에 대한
            검색 결과
          </div>
          {filteredMemes.length > 0 || loading ? (
            <MemesGrid memes={filteredMemes} loading={loading} />
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400">
              <span className="text-lg">검색 결과가 없습니다.</span>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-400">검색어를 입력해 주세요.</div>
      )}
    </div>
  );
}

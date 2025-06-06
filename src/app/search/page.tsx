"use client";

import MemesGrid from "@/components/posts/post-grid";
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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-2xl font-bold">트렌드 검색 결과</h1>
      {q ? (
        <>
          <div className="mb-6 text-lg">
            <span className="font-semibold text-purple-600">"{q}"</span>에 대한 검색 결과
          </div>
          {filteredMemes.length > 0 || loading ? (
            <MemesGrid posts={filteredMemes} loading={loading} />
          ) : (
            <div className="rounded-xl bg-gray-50 p-8 text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
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

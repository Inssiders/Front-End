"use client";

import { DynamicSearchContainer } from "@/components/common/dynamic-imports";
import { getPosts } from "@/utils/fetch/posts";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q")?.trim() || "";

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const searchPosts = useCallback(
    async (keyword: string, reset: boolean = true) => {
      if (!keyword.trim()) {
        if (reset) {
          setPosts([]);
          setTotalResults(0);
          setHasNextPage(false);
        }
        return;
      }

      setLoading(true);

      try {
        const response = await getPosts({
          keyword: keyword.trim(),
          page: reset ? 1 : Math.floor(posts.length / 20) + 1,
          size: 20,
        });

        const newPosts = response.posts || [];

        if (reset) {
          setPosts(newPosts);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }

        setTotalResults(response.total || newPosts.length);
        setHasNextPage(response.hasNextPage || false);
      } catch (err) {
        console.error("Search error:", err);
        if (reset) {
          setPosts([]);
          setTotalResults(0);
          setHasNextPage(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [posts.length]
  );

  // 검색어가 변경될 때마다 새로운 검색 실행
  useEffect(() => {
    searchPosts(query, true);
  }, [query]);

  // 검색 결과 메모이제이션
  const searchResults = useMemo(() => {
    return {
      posts,
      loading,
      hasNextPage,
      totalResults,
    };
  }, [posts, loading, hasNextPage, totalResults]);

  return (
    <DynamicSearchContainer
      query={query}
      posts={searchResults.posts}
      loading={searchResults.loading}
      hasNextPage={searchResults.hasNextPage}
      totalResults={searchResults.totalResults}
    />
  );
}

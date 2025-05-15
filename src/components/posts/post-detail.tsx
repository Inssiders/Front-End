"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { RelatedPosts } from "./related-posts";

interface PostDetailProps {
  post: any;
}

export function PostDetail({ post }: PostDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 댓글 입력 폼 react-hook-form 세팅
  const form = useForm({
    defaultValues: { comment: "" },
  });

  // 댓글 데이터 추출 (post.comments, post.comments_list, post.comment_list 등 지원)
  const comments =
    post.comments_list || post.comments || post.comment_list || [];

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

  const onSubmit = (values: { comment: string }) => {
    // 댓글 등록 처리 (예시)
    toast.success("댓글이 등록되었습니다.");
    form.reset();
  };

  if (!post) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <Card className="w-full mx-auto md:flex md:flex-row md:h-[700px] overflow-hidden">
        {/* 비디오 컨테이너 */}
        <div className="md:w-3/5 relative bg-gray-50 md:rounded-l-lg md:rounded-r-none">
          <div
            ref={videoContainerRef}
            className="absolute inset-0 w-full h-full"
            style={{ aspectRatio: "16/9" }}
          />
        </div>
        <div className="md:w-2/5 flex flex-col md:h-full md:overflow-y-auto">
          <CardContent className="flex-1 flex flex-col p-4 md:p-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href={`/profile/${post.user_id}`}>
                <Avatar>
                  <AvatarImage
                    src={
                      post.user_detail_profile_url ||
                      "/placeholder.svg?height=50&width=50"
                    }
                    alt={post.user_detail_username || "작성자"}
                  />
                  <AvatarFallback>
                    {(post.user_detail_username || "").slice(0, 2) || "유저"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`/profile/${post.user_id}`}
                  className="font-medium text-base"
                >
                  {post.user_detail_username || `작성자 ${post.user_id}`}
                </Link>
                <span className="text-gray-400 text-xs">
                  {new Date(post.post_created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
              <div className="flex-1 flex justify-end gap-2">
                <Badge variant="secondary">ID: {post.user_id}</Badge>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{post.post_title}</h2>
            <div className="mb-4 text-gray-700 md:text-base whitespace-pre-line">
              {post.post_content}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.category_name && (
                <Badge variant="default">카테고리: {post.category_name}</Badge>
              )}
              {post.tag_name && (
                <Badge variant="secondary"># {post.tag_name}</Badge>
              )}
              {/* 여러 태그 지원 (tag_names: string[]) */}
              {Array.isArray(post.tag_names) &&
                post.tag_names.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline">좋아요 {post.post_likes || 0}</Badge>
              <Badge variant="outline">댓글 {post.post_comments || 0}</Badge>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Button
                onClick={handleLike}
                variant={isLiked ? "default" : "outline"}
                className={`text-2xl transition relative ${
                  isLiked
                    ? "text-pink-500"
                    : "text-gray-700 hover:text-pink-500"
                } ${likeAnimating ? "scale-125" : "scale-100"}`}
                style={{ transition: "transform 0.2s, color 0.2s" }}
              >
                <span role="img" aria-label="좋아요">
                  {isLiked ? "❤️" : "🤍"}
                </span>
              </Button>
              <Button
                onClick={handleComment}
                variant="outline"
                className="text-2xl text-gray-700 hover:text-blue-500 transition"
              >
                <span role="img" aria-label="댓글">
                  💬
                </span>
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="text-2xl text-gray-700 hover:text-green-500 transition"
              >
                <span role="img" aria-label="공유">
                  🔗
                </span>
              </Button>
            </div>
            <div className="flex-1 flex flex-col min-h-[200px]">
              <div className="flex-1 overflow-y-auto border-t border-b border-gray-100 dark:border-gray-800 py-2 mb-4 min-h-[120px]">
                {Array.isArray(comments) && comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment: any, idx: number) => (
                      <Card
                        key={comment.comment_id || idx}
                        className="bg-gray-50"
                      >
                        <CardContent className="flex items-start gap-3 p-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                comment.user_profile_url ||
                                "/placeholder.svg?height=40&width=40"
                              }
                              alt={comment.user_username || "익명"}
                            />
                            <AvatarFallback>
                              {(comment.user_username || "").slice(0, 2) ||
                                "익명"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">
                                {comment.user_username ||
                                  `유저${comment.comment_user_id}`}
                              </span>
                              <Badge variant="outline" className="ml-1">
                                {new Date(
                                  comment.comment_created_at
                                ).toLocaleDateString("ko-KR")}
                              </Badge>
                            </div>
                            <div className="text-gray-700 text-sm whitespace-pre-line">
                              {comment.comment_content}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[120px] text-gray-400 text-sm text-center py-8">
                    댓글이 없습니다.
                  </div>
                )}
              </div>
              {/* 댓글 입력 폼 */}
              <div className="border-gray-100 dark:border-gray-800 px-0 sm:px-0 bg-white">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 sm:flex-row px-4"
                  >
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              ref={commentInputRef}
                              placeholder="댓글을 입력하세요..."
                              className="resize-none min-h-[44px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="h-auto w-full sm:w-auto sm:ml-2 mt-2 sm:mt-0"
                    >
                      등록
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      <RelatedPosts post={post} />
    </div>
  );
}

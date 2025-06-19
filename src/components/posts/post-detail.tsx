// src/components/posts/post-detail/index.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { ActionButtons } from "./components/action-buttons";
import CommentForm from "./components/comment-form";
import { CommentSection } from "./components/comment-section";
import { PostContent } from "./components/post-component";
import { PostHeader } from "./components/post-header";
import { VideoSection } from "./components/video-section";
import { RelatedPosts } from "./related-posts";

interface PostDetailProps {
  post: any; // TODO: 타입 정의 필요
  isPreview?: boolean;
  handlePreviewMode?: () => void;
}

export function PostDetail({ post, isPreview, handlePreviewMode }: PostDetailProps) {
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState<{ commentId: string; username: string } | null>(null);

  useEffect(() => {
    if (post && !isPreview) {
      setComments(post.comments_list || post.comments || post.comment_list || []);
    }
  }, [post]);

  useEffect(() => {
    if (post && !isPreview) {
      setComments(post.comments_list || post.comments || post.comment_list || []);
    }
  }, [post]);

  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${post.post_id}/comments`);
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments);
    }
  };

  const handleCommentSubmit = () => {
    setReplyTo(null); // 답글 등록 후 replyTo 초기화
    fetchComments();
  };

  function getTotalCommentCount(comments: any[]) {
    if (!Array.isArray(comments)) return 0;
    return comments.reduce((acc, comment) => {
      const replyCount = Array.isArray(comment.replies) ? comment.replies.length : 0;
      return acc + 1 + replyCount;
    }, 0);
  }

  // 댓글+대댓글 합산
  const totalComments = getTotalCommentCount(comments);

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/posts/${post.post_id}/comments/${commentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchComments();
          toast.success("댓글이 삭제되었습니다.");
        } else {
          toast.error("댓글 삭제에 실패했습니다.");
        }
      } catch (error) {
        toast.error("댓글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 대댓글 삭제 함수
  const handleDeleteReply = async (commentId: string, replyId: string) => {
    if (window.confirm("대댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/posts/${post.post_id}/comments/${commentId}/replies/${replyId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchComments();
          toast.success("대댓글이 삭제되었습니다.");
        } else {
          toast.error("대댓글 삭제에 실패했습니다.");
        }
      } catch (error) {
        toast.error("대댓글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 댓글 수정 함수
  const handleEditComment = async (commentId: string, newContent: string) => {
    try {
      const response = await fetch(`/api/posts/${post.post_id}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_content: newContent }),
      });

      if (response.ok) {
        fetchComments();
        toast.success("댓글이 수정되었습니다.");
      } else {
        toast.error("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      toast.error("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  // 대댓글 수정 함수
  const handleEditReply = async (commentId: string, replyId: string, newContent: string) => {
    try {
      const response = await fetch(`/api/posts/${post.post_id}/comments/${commentId}/replies/${replyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply_content: newContent }),
      });

      if (response.ok) {
        fetchComments();
        toast.success("대댓글이 수정되었습니다.");
      } else {
        toast.error("대댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      toast.error("대댓글 수정 중 오류가 발생했습니다.");
    }
  };

  if (!post) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      {isPreview && handlePreviewMode && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">밈 작성</h1>
          <Button onClick={handlePreviewMode}>미리보기</Button>
        </div>
      )}
      <Card className="mx-auto w-full overflow-hidden md:flex md:h-[700px] md:flex-row">
        <VideoSection mediaUrl={post.media_url} onMediaUrlChange={() => {}} />
        <div className="flex flex-col md:h-full md:w-2/5 md:overflow-y-auto">
          <CardContent className="flex flex-1 flex-col p-4 md:p-6">
            <PostHeader
              userId={post.user_id}
              username={post.user_detail_username}
              profileUrl={post.user_detail_profile_url}
              createdAt={post.media_dpload_time}
            />
            <PostContent
              title={post.title}
              content={post.content}
              categoryName={post.category_name}
              tagNames={post.tags}
              likes={post.likes}
              comments={totalComments}
            />
            <ActionButtons onCommentClick={() => commentInputRef.current?.focus()} />
            {
              <div className="flex min-h-[200px] flex-1 flex-col">
                <CommentSection
                  postId={post.post_id}
                  comments={comments}
                  onRefresh={handleCommentSubmit}
                  onReply={(commentId, username) => setReplyTo({ commentId, username })}
                  onDeleteComment={handleDeleteComment}
                  onDeleteReply={handleDeleteReply}
                  onEditComment={handleEditComment}
                  onEditReply={handleEditReply}
                />
                <CommentForm
                  ref={commentInputRef}
                  postId={post.post_id}
                  replyTo={replyTo || undefined}
                  onCommentAdded={handleCommentSubmit}
                  onCancel={replyTo ? () => setReplyTo(null) : undefined}
                />
              </div>
            }
          </CardContent>
        </div>
      </Card>
      <RelatedPosts post={post} />
    </div>
  );
}

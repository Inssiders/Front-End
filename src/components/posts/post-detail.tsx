// src/components/posts/post-detail/index.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { VideoSection } from "./components/video-section";
import { PostHeader } from "./components/post-header";
import { PostContent } from "./components/post-component";
import { ActionButtons } from "./components/action-buttons";
import { CommentSection } from "./components/comment-section";
import { CommentForm } from "./components/comment-form";
import { RelatedPosts } from "./related-posts";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { deleteComment, deletePost, fetchComments, updateComment } from "@/utils/fetch/post-detail";
import { CommentData } from "@/utils/types/posts";


interface PostDetailProps {
  post: any; // TODO: 타입 정의 필요    
  isPreview?: boolean;
  handlePreviewMode?: () => void;
  handleEditMode?: () => void;
  initialComments?: CommentData[];
}

export function PostDetail({ post, initialComments, isPreview, handlePreviewMode, handleEditMode }: PostDetailProps) {
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState<CommentData[]>(initialComments || []);
  const [replyTo, setReplyTo] = useState<{ commentId: number; username: string } | null>(null);


  useEffect(() => {
    if (post && !isPreview) {
      setComments(comments);
    }
  }, [post]);

  // const fetchComments = async () => {
  //   const res = await fetch(`/api/posts/${post.post_id}/comments`);
  //   if (res.ok) {
  //     const data = await res.json();
  //     setComments(data.comments);
  //   }
  // };

  const handleCommentSubmit = () => {
    setReplyTo(null); // 답글 등록 후 replyTo 초기화
    // fetchComments();
  };

  function getTotalCommentCount(comments: CommentData[]) {
    if (!Array.isArray(comments)) return 0;
    return comments.reduce((acc, comment) => {
      const replyCount = Array.isArray(comment.children) ? comment.children.length : 0;
      return acc + 1 + replyCount;
    }, 0);
  }

  // 댓글+대댓글 합산
  const totalComments = getTotalCommentCount(comments);

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId).then((data) => {
        if (data) {
          fetchComments(post.id).then((data) => {
            setComments(data);
          })
        }
      })
    }
  };
  // 댓글 수정 함수
  const handleEditComment = async (commentId: number, newContent: string) => {
    updateComment(commentId, newContent).then((data :boolean | undefined) => {
      if (data) {
        fetchComments(post.id).then((data) => {
          setComments(data);
        })
      }
    })
  };




  const handleDeletePost = async () => {
    if (window.confirm("밈을 삭제하시겠습니까?")) {
      await deletePost(post.id);
    }
  };
  if (!post) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      {isPreview && handlePreviewMode && <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">밈 작성</h1>
        <Button onClick={handlePreviewMode}>미리보기</Button>
      </div>}
      {handleEditMode &&
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <Button onClick={handleEditMode}>수정</Button>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleDeletePost}>삭제</Button>
          </div>
        </div>
      }
      <Card className="mx-auto w-full overflow-hidden md:flex md:h-[700px] md:flex-row">
        <VideoSection mediaUrl={post.media_url} title={post.title} />
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
            <ActionButtons onCommentClick={() => commentInputRef.current?.focus()} id={post.id} />
            {<div className="flex min-h-[200px] flex-1 flex-col">
              <CommentSection
                postId={post.post_id}
                comments={comments}
                onRefresh={handleCommentSubmit}
                onReply={(commentId, username) => setReplyTo({ commentId, username })}
                onDeleteComment={handleDeleteComment}
        
                onEditComment={handleEditComment}
        
              />
              <CommentForm
                postId={post.post_id}
                commentInputRef={commentInputRef as React.RefObject<HTMLTextAreaElement>}
                onCommentSubmit={handleCommentSubmit}
                replyTo={replyTo}
                onCancelReply={() => setReplyTo(null)}
              />
            </div>}
          </CardContent>
        </div>
      </Card>
      <RelatedPosts post={post} />
    </div>
  );
}

// src/components/posts/post-detail/index.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import { VideoSection } from "./components/video-section";
import { PostHeader } from "./components/post-header";
import { PostContent } from "./components/post-component";
import { ActionButtons } from "./components/action-buttons";
import { CommentSection } from "./components/comment-section";
import { CommentForm } from "./components/comment-form";
import { RelatedPosts } from "./related-posts";

interface PostDetailProps {
  post: any; // TODO: 타입 정의 필요
}

export function PostDetail({ post }: PostDetailProps) {
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState(
    post.comments_list || post.comments || post.comment_list || []
  );
  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${post.post_id}/comments`);
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments);
    }
  };
  const handleCommentSubmit = () => {
    fetchComments();
  };

  if (!post) {
    return <div className="p-8 text-center">밈을 찾을 수 없습니다.</div>;
  }
 
  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <Card className="w-full mx-auto md:flex md:flex-row md:h-[700px] overflow-hidden">
        <VideoSection mediaUrl={post.post_media_url} title={post.post_title} />
        <div className="md:w-2/5 flex flex-col md:h-full md:overflow-y-auto">
          <CardContent className="flex-1 flex flex-col p-4 md:p-6">
            <PostHeader
              userId={post.user_id}
              username={post.user_detail_username}
              profileUrl={post.user_detail_profile_url}
              createdAt={post.post_created_at}
            />
            <PostContent
              title={post.post_title}
              content={post.post_content}
              categoryName={post.category_name}
              tagNames={post.tag_names}
              likes={post.post_likes}
              comments={comments.length > 0 ? comments.length : post.post_comments}
            />
            <ActionButtons
              onCommentClick={() => commentInputRef.current?.focus()}
            />
            <div className="flex-1 flex flex-col min-h-[200px]">
              <CommentSection comments={comments} />
              <CommentForm 
                postId={post.post_id} 
                commentInputRef={commentInputRef as React.RefObject<HTMLTextAreaElement>}
                onCommentSubmit={handleCommentSubmit}
              />
            </div>
          </CardContent>
        </div>
      </Card>
      <RelatedPosts post={post} />
    </div>
  );
}
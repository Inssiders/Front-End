// src/components/posts/components/comment-section.tsx
import { useState } from "react";
import { ReplyForm } from "./reply-form";
import { DetailComment } from "@/mocks/types";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

interface CommentSectionProps {
  postId: string;
  comments: DetailComment[];
  onRefresh: () => void;
  onReply: (commentId: string, username: string) => void;
  onDeleteComment: (commentId: string) => void;
  onDeleteReply: (commentId: string, replyId: string) => void;
}

export function CommentSection({
  postId,
  comments,
  onRefresh,
  onReply,
  onDeleteComment,
  onDeleteReply,
}: CommentSectionProps) {
  return (
    <div className="overflow-y-auto max-h-80 pr-2">
      {comments.slice().reverse().map((comment) => (
        <div key={comment.comment_id} className="mb-4 relative">
          {/* 댓글 삭제 버튼 */}
          <button
            className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500"
            onClick={() => onDeleteComment(comment.comment_id)}
            aria-label="댓글 삭제"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold">{comment.user_username}</span>
            <span className="text-xs text-gray-400">{new Date(comment.comment_created_at).toLocaleString()}</span>
          </div>
          <div className="ml-2">{comment.comment_content}</div>
          <button
            className="text-xs text-blue-500 ml-2"
            onClick={() => onReply(comment.comment_id, comment.user_username)}
          >
            답글
          </button>
          {/* 대댓글 리스트 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-2 space-y-2">
              {comment.replies.slice().reverse().map((reply: any) => (
                <div key={reply.reply_id} className="flex flex-col items-center gap-2 relative">
                  <div className="flex items-center gap-2 w-full" >
                    <div className="font-bold">{reply.user_username}</div>
                    <div className="text-xs text-gray-400">{new Date(reply.reply_created_at).toLocaleString()}</div>
                    {/* 대댓글 삭제 버튼 */}
                    <button
                      className="ml-auto p-1 text-gray-400 hover:text-red-500"
                      onClick={() => onDeleteReply(comment.comment_id, reply.reply_id)}
                      aria-label="대댓글 삭제"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <span className="ml-2">{reply.reply_content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
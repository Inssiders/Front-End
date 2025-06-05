// src/components/posts/components/comment-section.tsx
import { useState, useEffect, useRef } from "react";
import { ReplyForm } from "./reply-form";
import { DetailComment } from "@/mocks/types";
import { X, Edit2, Check, X as XIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface CommentSectionProps {
  postId: string;
  comments: DetailComment[];
  onRefresh: () => void;
  onReply: (commentId: string, username: string) => void;
  onDeleteComment: (commentId: string) => void;
  onDeleteReply: (commentId: string, replyId: string) => void;
  onEditComment: (commentId: string, newContent: string) => void;
  onEditReply: (commentId: string, replyId: string, newContent: string) => void;
}

export function CommentSection({
  postId,
  comments,
  onRefresh,
  onReply,
  onDeleteComment,
  onDeleteReply,
  onEditComment,
  onEditReply,
}: CommentSectionProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  // 에딧 모드 시작
  const startEditComment = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingReplyId(null);
    setEditContent(currentContent);
  };

  const startEditReply = (replyId: string, currentContent: string) => {
    setEditingReplyId(replyId);
    setEditingCommentId(null);
    setEditContent(currentContent);
  };

  // 에딧 모드 취소
  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingReplyId(null);
    setEditContent("");
  };

  // 댓글 수정 완료
  const submitCommentEdit = () => {
    if (editingCommentId && editContent.trim()) {
      onEditComment(editingCommentId, editContent.trim());
      cancelEdit();
    }
  };

  // 대댓글 수정 완료
  const submitReplyEdit = (commentId: string) => {
    if (editingReplyId && editContent.trim()) {
      onEditReply(commentId, editingReplyId, editContent.trim());
      cancelEdit();
    }
  };

  // 포커스 아웃 시 취소
  const handleBlur = () => {
    // setTimeout을 사용해서 버튼 클릭이 처리된 후 blur가 실행되도록 함
    setTimeout(() => {
      cancelEdit();
    }, 150);
  };

  // 에딧 모드 시작 시 포커스
  useEffect(() => {
    if ((editingCommentId || editingReplyId) && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingCommentId, editingReplyId]);

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
            <span className="text-xs text-gray-400">
              {new Date(comment.comment_created_at).toLocaleString()}
            </span>
          </div>
          
          {/* 댓글 내용 - 에딧 모드/뷰 모드 */}
          <div className="ml-2 mt-1">
            {editingCommentId === comment.comment_id ? (
              <div className="space-y-2">
                <textarea
                  ref={editInputRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleBlur}
                  className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    onClick={submitCommentEdit}
                  >
                    <Check size={12} />
                    수정하기
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                    onClick={cancelEdit}
                  >
                    <XIcon size={12} />
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <span>{comment.comment_content}</span>
                <button
                  className="ml-2 p-1 text-gray-400 hover:text-blue-500"
                  onClick={() => startEditComment(comment.comment_id, comment.comment_content)}
                  aria-label="댓글 수정"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>
          
          <button
            className="text-xs text-blue-500 ml-2 mt-1"
            onClick={() => onReply(comment.comment_id, comment.user_username)}
          >
            답글
          </button>
          
          {/* 대댓글 리스트 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-2 space-y-2">
              {comment.replies.slice().reverse().map((reply: any) => (
                <div key={reply.reply_id} className="relative">
                  <div className="flex items-center gap-2 w-full">
                    <div className="font-bold">{reply.user_username}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(reply.reply_created_at).toLocaleString()}
                    </div>
                    {/* 대댓글 삭제 버튼 */}
                    <button
                      className="ml-auto p-1 text-gray-400 hover:text-red-500"
                      onClick={() => onDeleteReply(comment.comment_id, reply.reply_id)}
                      aria-label="대댓글 삭제"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  {/* 대댓글 내용 - 에딧 모드/뷰 모드 */}
                  <div className="ml-2 mt-1">
                    {editingReplyId === reply.reply_id ? (
                      <div className="space-y-2">
                        <textarea
                          ref={editInputRef}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onBlur={handleBlur}
                          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button
                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                            onClick={() => submitReplyEdit(comment.comment_id)}
                          >
                            <Check size={12} />
                            수정하기
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                            onClick={cancelEdit}
                          >
                            <XIcon size={12} />
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <span>{reply.reply_content}</span>
                        <button
                          className="ml-2 p-1 text-gray-400 hover:text-blue-500"
                          onClick={() => startEditReply(reply.reply_id, reply.reply_content)}
                          aria-label="대댓글 수정"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
// src/components/posts/post-detail/CommentForm.tsx
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { useState } from "react";
import styles from "./comment-form.module.css";

interface CommentFormProps {
  postId: string;
  replyTo?: { commentId: string; username: string };
  onCommentAdded: () => void;
  onCancel?: () => void;
}

export default function CommentForm({ postId, replyTo, onCommentAdded, onCancel }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAuthToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting || !accessToken) return;

    setIsSubmitting(true);
    try {
      const url = replyTo
        ? `/api/posts/${postId}/comments/${replyTo.commentId}/replies`
        : `/api/posts/${postId}/comments`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ content: content.trim() }),
      });

      if (res.ok) {
        setContent("");
        onCommentAdded();
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      {replyTo && <div className={styles.replyIndicator}>@{replyTo.username}에게 답글 작성 중</div>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
        className={styles.textarea}
        rows={3}
      />
      <div className={styles.buttons}>
        {onCancel && (
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting || !accessToken}
          className={styles.submitButton}
        >
          {isSubmitting ? "등록 중..." : replyTo ? "답글 등록" : "댓글 등록"}
        </button>
      </div>
    </form>
  );
}

// src/components/posts/post-detail/CommentForm.tsx
import { apiFetch } from "@/utils/fetch/auth";
import { forwardRef, useState } from "react";
import styles from "./comment-form.module.css";

interface CommentFormProps {
  postId: string;
  replyTo?: { commentId: string; username: string };
  onCommentAdded: () => void;
  onCancel?: () => void;
}

const CommentForm = forwardRef<HTMLTextAreaElement, CommentFormProps>(
  ({ postId, replyTo, onCommentAdded, onCancel }, ref) => {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!content.trim() || isSubmitting) return;

      setIsSubmitting(true);
      try {
        const url = replyTo ? `/posts/${postId}/comments/${replyTo.commentId}/replies` : `/posts/${postId}/comments`;

        const res = await apiFetch(url, {
          method: "POST",
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
          ref={ref}
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
          <button type="submit" disabled={!content.trim() || isSubmitting} className={styles.submitButton}>
            {isSubmitting ? "등록 중..." : replyTo ? "답글 등록" : "댓글 등록"}
          </button>
        </div>
      </form>
    );
  }
);

CommentForm.displayName = "CommentForm";

export default CommentForm;

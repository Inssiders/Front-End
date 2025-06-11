// src/components/posts/components/reply-form.tsx
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { useState } from "react";
import styles from "./reply-form.module.css";

interface ReplyFormProps {
  postId: string;
  commentId: string;
  onReplyAdded: () => void;
  onCancel: () => void;
}

export default function ReplyForm({ postId, commentId, onReplyAdded, onCancel }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAuthToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting || !accessToken) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
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
        onReplyAdded();
      } else {
        console.error("Failed to add reply");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.replyForm}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="답글을 입력하세요..."
        className={styles.textarea}
        rows={3}
      />
      <div className={styles.buttons}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          취소
        </button>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting || !accessToken}
          className={styles.submitButton}
        >
          {isSubmitting ? "등록 중..." : "답글 등록"}
        </button>
      </div>
    </form>
  );
}

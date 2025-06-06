import Link from "next/link";
import styles from "./post-comments.module.css";

interface PostCommentsProps {
  id: string;
  likes?: number;
  commentsCount?: number;
  shares?: number;
  saved?: number;
}

export function PostComments({ id, likes, commentsCount, shares, saved }: PostCommentsProps) {
  // Simulated comments
  const comments = Array(5)
    .fill(0)
    .map((_, i) => ({
      id: `comment-${i + 1}`,
      user: {
        id: `user-${i + 1}`,
        name: `사용자 ${i + 1}`,
        avatar: `/placeholder.svg?height=40&width=40`,
      },
      text:
        i % 2 === 0
          ? "정말 재미있는 밈이네요! 친구들에게 공유했어요 😂"
          : "이런 밈 더 많이 올려주세요. 항상 웃게 해주셔서 감사합니다.",
      timestamp: `${i + 1}시간 전`,
      likes: Math.floor(Math.random() * 50),
      replies:
        i % 2 === 0
          ? [
              {
                id: `reply-${i}-1`,
                user: {
                  id: `user-reply-${i}`,
                  name: "답글 작성자",
                  avatar: `/placeholder.svg?height=30&width=30`,
                },
                text: "저도 동의합니다! 정말 재미있어요.",
                timestamp: `${i}시간 전`,
                likes: Math.floor(Math.random() * 10),
              },
            ]
          : [],
    }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>댓글 {comments.length}개</h2>

      <div className={styles.commentsContainer}>
        <div className={styles.commentsSpace}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <Link href={`/profile/${comment.user.id}`}>
                  <img
                    src={comment.user.avatar || "/placeholder.svg"}
                    alt={comment.user.name}
                    className={styles.avatar}
                  />
                </Link>
                <div className={styles.commentContent}>
                  <div className={styles.commentMeta}>
                    <Link href={`/profile/${comment.user.id}`} className={styles.username}>
                      {comment.user.name}
                    </Link>
                    <p className={styles.timestamp}>{comment.timestamp}</p>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionButton} ${styles.likeButton}`}>
                      <span>👍</span>
                      <span>{comment.likes}</span>
                    </button>
                    <button className={styles.actionButton}>답글</button>
                  </div>
                  {comment.replies.length > 0 && (
                    <div className={styles.repliesContainer}>
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className={styles.replyItem}>
                          <Link href={`/profile/${reply.user.id}`}>
                            <img
                              src={reply.user.avatar || "/placeholder.svg"}
                              alt={reply.user.name}
                              className={styles.replyAvatar}
                            />
                          </Link>
                          <div className={styles.replyContent}>
                            <div className={styles.replyMeta}>
                              <Link
                                href={`/profile/${reply.user.id}`}
                                className={styles.replyUsername}
                              >
                                {reply.user.name}
                              </Link>
                              <p className={styles.replyTimestamp}>{reply.timestamp}</p>
                            </div>
                            <p className={styles.replyText}>{reply.text}</p>
                            <button className={styles.replyLikeButton}>
                              <span>👍</span>
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className={styles.loadMoreButton}>더 많은 댓글 보기</button>
        </div>
        {(likes !== undefined ||
          commentsCount !== undefined ||
          shares !== undefined ||
          saved !== undefined) && (
          <div className={styles.statsContainer}>
            {likes !== undefined && (
              <span className={styles.statItem}>❤️ 좋아요 {likes.toLocaleString()}</span>
            )}
            {commentsCount !== undefined && (
              <span className={styles.statItem}>💬 댓글 {commentsCount.toLocaleString()}</span>
            )}
            {shares !== undefined && (
              <span className={styles.statItem}>🔗 공유 {shares.toLocaleString()}</span>
            )}
            {saved !== undefined && (
              <span className={styles.statItem}> 🔖저장 {saved.toLocaleString()}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

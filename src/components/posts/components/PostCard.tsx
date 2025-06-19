"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_IDS, CATEGORY_LABELS, CategoryType, PostCardProps } from "@/types/posts";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HoverVideo } from "./HoverVideo";
import styles from "./PostCard.module.css";

export default function PostCard({
  post,
  enableHoverPlay,
  feedMode,
  showAuthor,
  showActions,
  disableAnimation = false,
  onLike,
  onComment,
  onView,
}: PostCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  // post가 undefined인 경우를 처리
  if (!post) {
    return null;
  }

  const categoryKey = post?.category_id
    ? (Object.keys(CATEGORY_IDS) as CategoryType[]).find((key) => CATEGORY_IDS[key] === post.category_id)
    : "USER_CONTENTS";

  const categoryLabel = categoryKey ? CATEGORY_LABELS[categoryKey] : "유저 컨텐츠";

  return (
    <Card
      className={`${styles.card} ${feedMode ? styles.feedMode : ""} ${disableAnimation ? styles.noAnimation : ""}`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* 미디어 영역 */}
      <div className={styles.mediaContainer}>
        {post.media_url ? (
          <HoverVideo url={post.media_url} />
        ) : post.media_url && !post.media_url.includes("youtube.com") && !post.media_url.includes("youtu.be") ? (
          <img src={post.media_url} alt={post.title} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderContent}>
              <div className={styles.placeholderIcon}>🖼️</div>
              <span className={styles.placeholderText}>이미지 없음</span>
            </div>
          </div>
        )}

        {/* 카테고리 배지 */}
        <div className={styles.badge}>{categoryLabel}</div>
      </div>

      {/* 콘텐츠 영역 */}
      <CardContent className={styles.content}>
        {/* 상단: 제목 */}
        <div>
          <Link href={`/posts/${post.id}`} className={styles.title}>
            {post.title}
          </Link>
        </div>
        {/* 중간: 설명 및 작성자 정보 */}
        <div>
          {/* 설명 (피드 모드에서만 표시) */}
          {post.content && feedMode && <p className={styles.description}>{post.content}</p>}

          {/* 작성자 정보 */}
          {showAuthor && (
            <Link href={`/profile/${post.account_id}`} className={styles.authorContainer}>
              <div className={styles.authorInfo}>
                <Avatar className={styles.avatar}>
                  <AvatarImage
                    src={post.author?.profile_image || "/placeholder.svg"}
                    alt={post.author?.account_name || `User ${post.account_id}`}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <AvatarFallback>{post.author?.account_name?.substring(0, 2) || `U${post.account_id}`}</AvatarFallback>
                </Avatar>
                <span className={styles.authorName}>{post.author?.account_name || `User ${post.account_id}`}</span>
              </div>
            </Link>
          )}
        </div>
        {showActions && (
          <div className={styles.actions}>
            <button
              className={`${styles.actionButton} ${styles.likeButton} ${post.is_liked ? styles.liked : ""}`}
              onClick={() => onLike(post.id)}
            >
              <Heart className={`${styles.actionIcon} ${post.is_liked ? styles.likedIcon : ""}`} />
              {(post?.like_count || 0).toLocaleString()}
            </button>
            <button className={`${styles.actionButton} ${styles.commentButton}`} onClick={() => onComment(post.id)}>
              <MessageCircle className={styles.actionIcon} />
              {(post?.comment_count || 0).toLocaleString()}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

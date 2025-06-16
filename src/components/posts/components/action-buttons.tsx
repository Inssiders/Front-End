// src/components/posts/post-detail/ActionButtons.tsx
import { Button } from "@/components/ui/button";
import { likePost } from "@/utils/fetch/post-detail";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ActionButtonsProps {
  onCommentClick: () => void;
  id: number;
}

export function ActionButtons({ onCommentClick, id }: ActionButtonsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL이 복사되었습니다.");
    } catch (e) {
      toast.error("복사에 실패했습니다.");
    }
  }, []);

  const handleLike = useCallback(async () => {
    setIsLiked((prev) => !prev);
    setLikeAnimating(true);
    const likeData = await likePost(id);
    setIsLiked(likeData.data.liked);
    setTimeout(() => setLikeAnimating(false), 500);
  }, [id]);

  return (
    <div className="mb-6 flex items-center gap-3">
      <Button
        onClick={handleLike}
        variant={isLiked ? "default" : "outline"}
        className={`relative text-2xl transition ${
          isLiked ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
        } ${likeAnimating ? "scale-125" : "scale-100"}`}
        style={{ transition: "transform 0.2s, color 0.2s" }}
      >
        <span role="img" aria-label="좋아요">
          {isLiked ? "❤️" : "🤍"}
        </span>
      </Button>
      <Button
        onClick={onCommentClick}
        variant="outline"
        className="text-2xl text-gray-700 transition hover:text-blue-500"
      >
        <span role="img" aria-label="댓글">
          💬
        </span>
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        className="text-2xl text-gray-700 transition hover:text-green-500"
      >
        <span role="img" aria-label="공유">
          🔗
        </span>
      </Button>
    </div>
  );
}

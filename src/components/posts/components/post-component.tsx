// src/components/posts/post-detail/PostContent.tsx
import { Badge } from "@/components/ui/badge";

interface PostContentProps {
  title: string;
  content: string;
  categoryName?: string;
  tagNames?: string[];
  likes: number;
  comments: number;
}

export function PostContent({ title, content, categoryName, tagNames, likes, comments }: PostContentProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="mb-4 text-gray-700 md:text-base whitespace-pre-line">
        {content}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categoryName && (
          <Badge variant="default">카테고리: {categoryName}</Badge>
        )}
        {tagNames?.map((tag) => (
          <Badge key={tag} variant="secondary">
            #{tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Badge variant="outline">좋아요 {likes}</Badge>
        <Badge variant="outline">댓글 {comments}</Badge>
      </div>
    </>
  );
}
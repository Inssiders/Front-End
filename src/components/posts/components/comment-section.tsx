// src/components/posts/post-detail/CommentSection.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Comment {
  comment_id: string;
  user_profile_url: string;
  user_username: string;
  comment_user_id: string;
  comment_created_at: string;
  comment_content: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="flex-1 overflow-y-auto border-t border-b border-gray-100 dark:border-gray-800 py-2 mb-4 min-h-[120px]">
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, idx) => (
            <Card key={comment.comment_id || idx} className="bg-gray-50">
              <CardContent className="flex items-start gap-3 p-3">
                <Avatar>
                  <AvatarImage
                    src={comment.user_profile_url || "/placeholder.svg?height=40&width=40"}
                    alt={comment.user_username || "익명"}
                  />
                  <AvatarFallback>
                    {(comment.user_username || "").slice(0, 2) || "익명"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {comment.user_username || `유저${comment.comment_user_id}`}
                    </span>
                    <Badge variant="outline" className="ml-1">
                      {new Date(comment.comment_created_at).toLocaleDateString("ko-KR")}
                    </Badge>
                  </div>
                  <div className="text-gray-700 text-sm whitespace-pre-line">
                    {comment.comment_content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[120px] text-gray-400 text-sm text-center py-8">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
// src/components/posts/post-detail/PostHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface PostHeaderProps {
  userId: string;
  username: string;
  profileUrl: string;
  createdAt: string;
}

export function PostHeader({ userId, username, profileUrl, createdAt }: PostHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <Link href={`/profile/${userId}`}>
        <Avatar>
          <AvatarImage src={profileUrl || "/placeholder.svg?height=50&width=50"} alt={username} />
          <AvatarFallback>{username.slice(0, 2) || "유저"}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-col">
        <Link href={`/profile/${userId}`} className="text-base font-medium">
          {username}
        </Link>
        <span className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>
      <div className="flex flex-1 justify-end gap-2">
        <Badge variant="secondary">ID: {userId}</Badge>
      </div>
    </div>
  );
}

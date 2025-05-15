import Image from "next/image";
import Link from "next/link";

interface RelatedPostsProps {
  post: any;
}

export function RelatedPosts({ post }: RelatedPostsProps) {
  // Simulated related memes

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">관련 밈</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(4).map((temp: any) => (
          <Link href={`/posts/${post.post_id}`} key={post.post_id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative pb-[100%]">
                <Image
                  src={post.post_media_url || "/placeholder.svg"}
                  alt={post.post_title}
                  className="absolute inset-0 w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{post.post_title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>👍</span>
                    <span>{post.post_likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{post.post_comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

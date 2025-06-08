import Link from "next/link";

interface RelatedPostsProps {
  post: any;
}

export function RelatedPosts({ post }: RelatedPostsProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">관련 밈</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Link href={`/posts/${post.post_id}`} key={`${post.post_id}-${index}`}>
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
              <div className="flex h-72 items-center justify-center bg-gray-50 md:h-full md:w-3/5 md:rounded-l-lg md:rounded-r-none">
                <iframe
                  src={post.post_media_url}
                  title={post.post_title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="size-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">{post.post_title}</h3>
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

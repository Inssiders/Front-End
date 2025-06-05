import Link from "next/link";

interface RelatedPostsProps {
  post: any;
}

export function RelatedPosts({ post }: RelatedPostsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">관련 밈</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Link
            href={`/posts/${post.post_id}`}
            key={`${post.post_id}-${index}`}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="md:w-3/5 flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none md:h-full h-72">
                <iframe
                  src={post.post_media_url}
                  title={post.post_title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
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

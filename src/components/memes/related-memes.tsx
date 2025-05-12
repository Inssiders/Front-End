import Link from "next/link";

interface RelatedMemesProps {
  id: string;
}

export function RelatedMemes({ id }: RelatedMemesProps) {
  // Simulated related memes
  const relatedMemes = Array(4)
    .fill(0)
    .map((_, i) => ({
      id: `${i + 1}`,
      title: `관련 밈 ${i + 1}`,
      image: `/placeholder.svg?height=300&width=300`,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
    }));

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">관련 밈</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedMemes.map((meme) => (
          <Link href={`/memes/${meme.id}`} key={meme.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative pb-[100%]">
                <img
                  src={meme.image || "/placeholder.svg"}
                  alt={meme.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{meme.title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>👍</span>
                    <span>{meme.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{meme.comments}</span>
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

import Link from "next/link"

interface RelatedCelebritiesProps {
  id: string
}

export function RelatedCelebrities({ id }: RelatedCelebritiesProps) {
  // Simulated related celebrities
  const relatedCelebrities = Array(4)
    .fill(0)
    .map((_, i) => ({
      id: `celeb-${i + 1}`,
      name: `연예인 ${i + 1}`,
      image: `/placeholder.svg?height=200&width=200`,
      category: i % 2 === 0 ? "배우" : "가수",
      followers: `${Math.floor(Math.random() * 10) / 10}M`,
    }))

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">관련 연예인</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedCelebrities.map((celebrity) => (
          <Link href={`/celebrities/${celebrity.id}`} key={celebrity.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={celebrity.image || "/placeholder.svg"}
                alt={celebrity.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{celebrity.name}</h3>
                <p className="text-gray-500 text-sm">{celebrity.category}</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-gray-700">{celebrity.followers} 팔로워</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

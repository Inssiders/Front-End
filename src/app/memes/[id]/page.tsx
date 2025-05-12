import { MemeDetail } from "@/components/memes/meme-detail";

interface MemeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MemeDetailPage({ params }: MemeDetailPageProps) {
  const { id } = await params;
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <MemeDetail id={id} />
    </main>
  );
}

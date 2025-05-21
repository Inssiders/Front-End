import { PostDetail } from '@/components/posts/post-detail';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  // 서버에서 fetch로 데이터 가져오기
  const res = await fetch(
    `${process.env.SERVER_URL || ''}/mock-data/all-mock-data.json`,
    { cache: 'no-store' }
  );
  const allData = await res.json();
  // post_id가 일치하는 첫 번째 post만 추출
  const post = allData.find((p: any) => String(p.post_id) === String(id));
  return (
    <main className='flex flex-col min-h-screen bg-gray-50'>
      <PostDetail post={post} />
    </main>
  );
}

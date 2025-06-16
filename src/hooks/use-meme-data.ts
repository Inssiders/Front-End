// 서버 컴포넌트 (ex: app/page.tsx
export const getMemes = async (page = 1, size = 10, category?: string) => {
  const ServerUrl = process.env.SERVER_URL;

  const url = new URL(`${ServerUrl}/api/posts`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

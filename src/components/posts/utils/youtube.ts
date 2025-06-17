// YouTube URL에서 비디오 ID 추출
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // YouTube URL 패턴들
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^/?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// YouTube 썸네일 URL 생성
export function getYouTubeThumbnail(videoId: string | null): string | null {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// YouTube 썸네일 대체 URL 생성 (maxresdefault가 없을 경우)
export function getYouTubeThumbnailFallback(videoId: string | null): string | null {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// YouTube 임베드 URL 생성
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`;
}

// URL을 임베드 URL로 변환
export function getEmbedUrl(url: string): string {
  // YouTube URL 체크
  const youtubeId = getYouTubeVideoId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  // 다른 비디오 URL은 그대로 반환
  return url;
}

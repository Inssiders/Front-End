/**
 * YouTube URL을 embed 형식으로 변환하는 유틸리티 함수
 */

// YouTube URL에서 비디오 ID를 추출하는 함수
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // 다양한 YouTube URL 형식을 지원
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// YouTube URL인지 확인하는 함수
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;

  const youtubeHosts = [
    "www.youtube.com",
    "youtube.com",
    "youtu.be",
    "m.youtube.com",
    "music.youtube.com",
  ];

  try {
    const urlObj = new URL(url);
    return youtubeHosts.some(
      (host) => urlObj.hostname === host || urlObj.hostname.endsWith("." + host)
    );
  } catch {
    return false;
  }
}

// YouTube URL을 embed 형식으로 변환하는 함수 (옵션 추가)
export function convertToYouTubeEmbedUrl(
  url: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
    loop?: boolean;
    rel?: boolean;
    modestbranding?: boolean;
    enablejsapi?: boolean;
  } = {}
): string | null {
  if (!isYouTubeUrl(url)) return null;

  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  // 기본 옵션 설정
  const {
    autoplay = false,
    mute = true,
    controls = true,
    loop = false,
    rel = false,
    modestbranding = true,
    enablejsapi = true,
  } = options;

  // YouTube embed URL 생성
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);

  // 파라미터 설정
  embedUrl.searchParams.set("autoplay", autoplay ? "1" : "0");
  embedUrl.searchParams.set("mute", mute ? "1" : "0");
  embedUrl.searchParams.set("controls", controls ? "1" : "0");
  embedUrl.searchParams.set("rel", rel ? "1" : "0");
  embedUrl.searchParams.set("modestbranding", modestbranding ? "1" : "0");

  if (enablejsapi) {
    embedUrl.searchParams.set("enablejsapi", "1");
    embedUrl.searchParams.set(
      "origin",
      typeof window !== "undefined" ? window.location.origin : ""
    );
  }

  if (loop) {
    embedUrl.searchParams.set("loop", "1");
    embedUrl.searchParams.set("playlist", videoId); // loop을 위해 playlist 파라미터 필요
  }

  return embedUrl.toString();
}

// 기타 비디오 플랫폼 지원 (확장 가능)
export function isVideoUrl(url: string): boolean {
  if (!url) return false;

  return (
    isYouTubeUrl(url) ||
    url.includes("vimeo.com") ||
    url.includes("dailymotion.com") ||
    url.includes("twitch.tv")
  );
}

// 비디오 URL을 embed 형식으로 변환하는 통합 함수
export function convertToEmbedUrl(
  url: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
    loop?: boolean;
  } = {}
): string | null {
  if (!url) return null;

  // YouTube 처리
  if (isYouTubeUrl(url)) {
    return convertToYouTubeEmbedUrl(url, options);
  }

  // Vimeo 처리
  if (url.includes("vimeo.com")) {
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      const vimeoUrl = new URL(
        `https://player.vimeo.com/video/${vimeoMatch[1]}`
      );
      if (options.autoplay) vimeoUrl.searchParams.set("autoplay", "1");
      if (options.mute) vimeoUrl.searchParams.set("muted", "1");
      if (options.loop) vimeoUrl.searchParams.set("loop", "1");
      return vimeoUrl.toString();
    }
  }

  // 이미 embed URL인 경우 그대로 반환
  if (url.includes("/embed/") || url.includes("player.")) {
    return url;
  }

  return url; // 원본 URL 반환 (fallback)
}

// YouTube Shorts URL 감지
export function isYouTubeShorts(url: string): boolean {
  return (
    url.includes("youtube.com/shorts/") ||
    (url.includes("youtu.be/") && url.includes("shorts"))
  );
}

// 안전한 iframe 속성 생성 (옵션 추가)
export function getVideoIframeProps(
  url: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
    loop?: boolean;
  } = {}
) {
  const embedUrl = convertToEmbedUrl(url, options);

  if (!embedUrl) {
    return null;
  }

  return {
    src: embedUrl,
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    referrerPolicy: "strict-origin-when-cross-origin" as const,
    sandbox: "allow-scripts allow-same-origin allow-presentation",
    loading: "lazy" as const,
  };
}

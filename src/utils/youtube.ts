/**
 * YouTube URL을 embed 형식으로 변환하는 유틸리티 함수
 */

// 타입 정의
interface VideoEmbedOptions {
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
  loop?: boolean;
  rel?: boolean;
  modestbranding?: boolean;
  enablejsapi?: boolean;
}

interface IframeProps {
  src: string;
  allow: string;
  allowFullScreen: boolean;
  referrerPolicy: "strict-origin-when-cross-origin";
  sandbox: string;
  loading: "lazy";
}

// 지원하는 비디오 플랫폼 정의
const VIDEO_PLATFORMS = {
  YOUTUBE: {
    hosts: ["www.youtube.com", "youtube.com", "youtu.be", "m.youtube.com", "music.youtube.com"],
    patterns: [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ],
  },
  VIMEO: {
    hosts: ["vimeo.com"],
    pattern: /vimeo\.com\/(\d+)/,
  },
} as const;

/**
 * URL이 특정 비디오 플랫폼의 것인지 확인
 */
function isUrlFromPlatform(url: string, hosts: string[]): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    return hosts.some((host) => urlObj.hostname === host || urlObj.hostname.endsWith("." + host));
  } catch {
    return false;
  }
}

/**
 * YouTube URL에서 비디오 ID를 추출
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  for (const pattern of VIDEO_PLATFORMS.YOUTUBE.patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * YouTube URL 여부 확인
 */
export function isYouTubeUrl(url: string): boolean {
  return isUrlFromPlatform(url, VIDEO_PLATFORMS.YOUTUBE.hosts);
}

/**
 * YouTube URL을 embed 형식으로 변환
 */
export function convertToYouTubeEmbedUrl(url: string, options: VideoEmbedOptions = {}): string | null {
  if (!isYouTubeUrl(url)) return null;

  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  const {
    autoplay = false,
    mute = true,
    controls = true,
    loop = false,
    rel = false,
    modestbranding = true,
    enablejsapi = true,
  } = options;

  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
  const params = {
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    controls: controls ? "1" : "0",
    rel: rel ? "1" : "0",
    modestbranding: modestbranding ? "1" : "0",
  };

  Object.entries(params).forEach(([key, value]) => {
    embedUrl.searchParams.set(key, value);
  });

  if (enablejsapi) {
    embedUrl.searchParams.set("enablejsapi", "1");
    embedUrl.searchParams.set("origin", typeof window !== "undefined" ? window.location.origin : "");
  }

  if (loop) {
    embedUrl.searchParams.set("loop", "1");
    embedUrl.searchParams.set("playlist", videoId);
  }

  return embedUrl.toString();
}

/**
 * 지원하는 비디오 URL인지 확인
 */
export function isVideoUrl(url: string): boolean {
  if (!url) return false;

  return isYouTubeUrl(url) || isUrlFromPlatform(url, VIDEO_PLATFORMS.VIMEO.hosts);
}

/**
 * 비디오 URL을 embed 형식으로 변환
 */
export function convertToEmbedUrl(url: string, options: VideoEmbedOptions = {}): string | null {
  if (!url) return null;

  // YouTube 처리
  if (isYouTubeUrl(url)) {
    return convertToYouTubeEmbedUrl(url, options);
  }

  // Vimeo 처리
  if (isUrlFromPlatform(url, VIDEO_PLATFORMS.VIMEO.hosts)) {
    const match = url.match(VIDEO_PLATFORMS.VIMEO.pattern);
    if (match?.[1]) {
      const vimeoUrl = new URL(`https://player.vimeo.com/video/${match[1]}`);
      if (options.autoplay) vimeoUrl.searchParams.set("autoplay", "1");
      if (options.mute) vimeoUrl.searchParams.set("muted", "1");
      if (options.loop) vimeoUrl.searchParams.set("loop", "1");
      return vimeoUrl.toString();
    }
  }

  // 이미 embed URL인 경우
  if (url.includes("/embed/") || url.includes("player.")) {
    return url;
  }

  return null;
}

/**
 * YouTube Shorts URL 여부 확인
 */
export function isYouTubeShorts(url: string): boolean {
  return url.includes("youtube.com/shorts/") || (url.includes("youtu.be/") && url.includes("shorts"));
}

/**
 * 안전한 iframe 속성 생성
 */
export function getVideoIframeProps(url: string, options: VideoEmbedOptions = {}): IframeProps | null {
  const embedUrl = convertToEmbedUrl(url, options);
  if (!embedUrl) return null;

  return {
    src: embedUrl,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    referrerPolicy: "strict-origin-when-cross-origin",
    sandbox: "allow-scripts allow-same-origin allow-presentation",
    loading: "lazy",
  };
}

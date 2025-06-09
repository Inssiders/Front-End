// YouTube 비디오 ID 추출
export const getYouTubeVideoId = (url: string): string => {
  if (!url || typeof url !== "string") {
    console.error("유효하지 않은 URL:", url);
    return "";
  }

  try {
    // embed URL에서 추출
    if (url.includes("/embed/")) {
      const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
      if (embedMatch?.[1]) {
        return embedMatch[1];
      }
    }

    // watch URL에서 추출
    if (url.includes("v=")) {
      const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
      if (watchMatch?.[1]) {
        return watchMatch[1];
      }
    }

    // 단축 URL에서 추출
    if (url.includes("youtu.be/")) {
      const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (shortMatch?.[1]) {
        return shortMatch[1];
      }
    }

    console.error("비디오 ID를 찾을 수 없음:", url);
    return "";
  } catch (error) {
    console.error("비디오 ID 추출 중 오류:", error);
    return "";
  }
};

// YouTube 썸네일 URL 생성
export const getYouTubeThumbnail = (videoId: string): string => {
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// YouTube 대체 썸네일 URL 생성
export const getYouTubeThumbnailFallback = (videoId: string): string => {
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

// YouTube embed URL 생성 (UI 요소 숨김 설정 포함)
export const getYouTubeEmbedUrl = (url: string): string => {
  try {
    // 이미 embed URL인 경우
    if (url.includes("/embed/")) {
      const baseUrl = url.split("?")[0];
      // 일반 youtube.com 도메인 사용
      return `${baseUrl}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&enablejsapi=0&origin=${window.location.origin}&widget_referrer=&branding=0&autohide=1&loop=1`;
    }

    // watch URL을 embed URL로 변환
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&enablejsapi=0&origin=${window.location.origin}&widget_referrer=&branding=0&autohide=1&loop=1`;
  } catch (error) {
    console.error("embed URL 생성 중 오류:", error);
    return "";
  }
};

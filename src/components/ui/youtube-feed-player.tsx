"use client";

import { cn } from "@/lib/utils";
import { isYouTubeUrl } from "@/utils/youtube";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

interface YouTubeFeedPlayerProps {
  url: string;
  title?: string;
  thumbnail?: string;
  className?: string;
  fallbackImage?: string;
  isHovered?: boolean;
}

export default function YouTubeFeedPlayer({
  url,
  title = "Video",
  thumbnail,
  className = "",
  fallbackImage,
  isHovered: externalIsHovered,
}: YouTubeFeedPlayerProps) {
  const [internalIsHovered, setInternalIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 외부에서 hover 상태가 전달되면 그것을 우선 사용, 아니면 내부 상태 사용
  const isHovered =
    externalIsHovered !== undefined ? externalIsHovered : internalIsHovered;

  // 유튜브 비디오 ID 추출
  const getYouTubeVideoId = (videoUrl: string) => {
    if (!isYouTubeUrl(videoUrl)) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);

  // 유튜브 썸네일 URL 생성
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const videoThumbnail =
    thumbnail || (videoId ? getYouTubeThumbnail(videoId) : null);

  // 유튜브 embed URL 생성 (컨트롤 숨김 + 자동재생)
  const getEmbedUrl = (videoId: string, shouldPlay: boolean) => {
    const params = new URLSearchParams({
      autoplay: shouldPlay ? "1" : "0",
      mute: "1", // 자동재생을 위해 음소거 필수
      controls: "0", // 컨트롤 숨김
      disablekb: "1", // 키보드 컨트롤 비활성화
      fs: "0", // 전체화면 버튼 숨김
      iv_load_policy: "3", // 주석 완전 비활성화
      modestbranding: "1", // 유튜브 로고 최소화
      playsinline: "1", // 인라인 재생
      rel: "0", // 관련 영상 숨김
      showinfo: "0", // 제목/업로더 정보 숨김
      loop: "1", // 반복 재생
      playlist: videoId, // 반복 재생을 위해 필요
      cc_load_policy: "0", // 자막 비활성화
      autohide: "1", // 컨트롤 자동 숨김
      color: "white", // 진행 바 색상
      start: "0", // 시작 시간
      end: "", // 종료 시간 (무한 반복을 위해 비움)
      widget_referrer: "", // 위젯 참조자 숨김
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const handleMouseEnter = () => {
    setInternalIsHovered(true);
  };

  const handleMouseLeave = () => {
    setInternalIsHovered(false);
  };

  // iframe 로드 완료 처리
  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  // 유튜브가 아닌 URL이거나 videoId가 없는 경우
  if (!videoId) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100 dark:bg-gray-800 group",
          className
        )}
      >
        <img
          src={fallbackImage || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <Play className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                비디오를 로드할 수 없습니다
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-black group", className)}
      onMouseEnter={
        externalIsHovered === undefined ? handleMouseEnter : undefined
      }
      onMouseLeave={
        externalIsHovered === undefined ? handleMouseLeave : undefined
      }
    >
      {/* 썸네일 (hover 전까지 표시) */}
      {!isHovered && videoThumbnail && (
        <div className="relative w-full h-full">
          <img
            src={videoThumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage || "/placeholder.svg";
            }}
          />

          {/* 재생 오버레이 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600/80 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Play className="h-6 w-6 text-white fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* 비디오 제목 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm font-medium line-clamp-2">
              {title}
            </p>
          </div>
        </div>
      )}

      {/* 유튜브 iframe (hover 시 표시) */}
      {isHovered && (
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            src={getEmbedUrl(videoId, true)}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            onLoad={handleIframeLoad}
            style={{
              pointerEvents: "none", // iframe 내부 클릭 방지
            }}
          />

          {/* 완전 투명 오버레이 - YouTube 로고/북마크 클릭 차단 */}
          <div
            className="absolute inset-0 bg-transparent cursor-pointer z-10"
            style={{ pointerEvents: "auto" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />

          {/* 로딩 오버레이 */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { getVideoIframeProps, isVideoUrl, isYouTubeUrl } from "@/utils/youtube";
import {
  AlertCircle,
  ExternalLink,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  url: string;
  title?: string;
  thumbnail?: string;
  className?: string;
  autoPlay?: boolean;
  showPlayButton?: boolean;
  fallbackImage?: string;
  hoverToPlay?: boolean;
  muted?: boolean;
  playOnHover?: boolean;
}

export default function VideoPlayer({
  url,
  title = "Video",
  thumbnail,
  className = "",
  autoPlay = false,
  showPlayButton = true,
  fallbackImage,
  hoverToPlay = false,
  muted = true,
  playOnHover = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldPlayOnHover = hoverToPlay || playOnHover;

  useEffect(() => {
    if (!shouldPlayOnHover) return;

    if (isHovered) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isHovered, shouldPlayOnHover]);

  useEffect(() => {
    if (!shouldPlayOnHover || !isYouTubeUrl(url)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data = JSON.parse(event.data);
        if (data.event === "video-progress") {
          // 비디오 진행 상태 처리
        }
      } catch (e) {
        // JSON 파싱 에러 무시
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [url, shouldPlayOnHover]);

  if (!isVideoUrl(url)) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
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
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>
    );
  }

  const iframeProps = getVideoIframeProps(url, {
    autoplay: shouldPlayOnHover ? isPlaying : false,
    mute: isMuted,
    controls: !shouldPlayOnHover,
    loop: shouldPlayOnHover,
  });

  if (!iframeProps) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
          className
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">비디오를 로드할 수 없습니다</p>
          </div>
        </div>
      </div>
    );
  }

  const getYouTubeThumbnail = (videoUrl: string) => {
    if (isYouTubeUrl(videoUrl)) {
      const videoId = videoUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/
      )?.[1];
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    return thumbnail;
  };

  const videoThumbnail = thumbnail || getYouTubeThumbnail(url);

  const handleMouseEnter = () => {
    if (shouldPlayOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (shouldPlayOnHover) {
      setIsHovered(false);
    }
  };

  const handlePlayClick = () => {
    if (!shouldPlayOnHover) {
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-black group", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isPlaying && showPlayButton ? (
        <div className="relative w-full h-full">
          {videoThumbnail && (
            <img
              src={videoThumbnail}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage || "/placeholder.svg";
              }}
            />
          )}

          {!shouldPlayOnHover && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <button
                onClick={handlePlayClick}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label="동영상 재생"
              >
                <Play className="h-8 w-8 ml-1 fill-current" />
              </button>
            </div>
          )}

          {shouldPlayOnHover && (
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="absolute bottom-3 left-3 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-4 w-4 text-white fill-current" />
              </div>
            </div>
          )}

          {isYouTubeUrl(url) && !shouldPlayOnHover && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="YouTube에서 보기"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {shouldPlayOnHover && (
            <>
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                aria-label={isMuted ? "음소거 해제" : "음소거"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              {isYouTubeUrl(url) && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="YouTube에서 보기"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            key={`${url}-${isPlaying}-${isMuted}`}
            src={iframeProps.src}
            title={title}
            allow={iframeProps.allow}
            allowFullScreen={iframeProps.allowFullScreen}
            referrerPolicy={iframeProps.referrerPolicy}
            sandbox={iframeProps.sandbox}
            loading={iframeProps.loading}
            className="w-full h-full border-0"
            onLoad={() => setHasError(false)}
            onError={() => setHasError(true)}
          />

          {shouldPlayOnHover && (
            <>
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                aria-label={isMuted ? "음소거 해제" : "음소거"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              {isYouTubeUrl(url) && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="YouTube에서 보기"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </>
          )}
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">비디오를 로드할 수 없습니다</p>
            <button
              onClick={() => window.open(url, "_blank")}
              className="mt-2 text-xs text-blue-500 hover:text-blue-600 underline"
            >
              원본 링크에서 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

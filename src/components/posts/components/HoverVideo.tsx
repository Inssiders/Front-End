"use client";

import { useState } from "react";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  getYouTubeThumbnailFallback,
  getYouTubeVideoId,
} from "../utils/youtube";

interface HoverVideoProps {
  media_url: string;
  enableHover?: boolean;
  isHovered?: boolean;
}

export default function HoverVideo({
  media_url,
  enableHover = true,
  isHovered: externalHovered,
}: HoverVideoProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const videoId = getYouTubeVideoId(media_url);
  const thumbnailUrl = useFallback
    ? getYouTubeThumbnailFallback(videoId)
    : getYouTubeThumbnail(videoId);

  // 외부 또는 내부 hover 상태 결정
  const isHovered = externalHovered !== undefined ? externalHovered : internalHovered;

  const handleMouseEnter = () => {
    if (enableHover && externalHovered === undefined) {
      setInternalHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (enableHover && externalHovered === undefined) {
      setInternalHovered(false);
    }
  };

  const handleImageError = () => {
    if (!useFallback) {
      setUseFallback(true);
    } else {
      setImageError(true);
    }
  };
  // embed URL 생성 (hover 시에만)
  const embedUrl = isHovered ? getYouTubeEmbedUrl(media_url) : "";

  // 유효하지 않은 비디오 ID인 경우
  if (!videoId || !thumbnailUrl) {
    return (
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-gray-200">
        <div className="text-center">
          <span className="text-sm text-gray-500">유효하지 않은 YouTube URL</span>
          <small className="mt-1 block text-xs text-gray-400">URL: {media_url}</small>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 썸네일 이미지 */}
      {!imageError ? (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="size-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-gray-800">
          <div className="text-center">
            <div className="mb-2 text-4xl text-white">▶</div>
            <div className="text-xs text-gray-300">YouTube Video</div>
            <div className="mt-1 text-xs text-gray-400">ID: {videoId}</div>
          </div>
        </div>
      )}

      {/* hover 시 비디오 재생 */}
      {isHovered && enableHover && (
        <div className="absolute inset-0">
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="size-full border-0"
            style={{ pointerEvents: "none" }}
          />
        </div>
      )}
    </div>
  );
}

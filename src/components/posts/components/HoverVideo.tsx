"use client";

import { useState } from "react";
import { HoverVideoProps } from "../types";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  getYouTubeThumbnailFallback,
  getYouTubeVideoId,
} from "../utils/youtube";

export default function HoverVideo({
  youtubeUrl,
  enableHover = true,
  isHovered: externalHovered,
}: HoverVideoProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const videoId = getYouTubeVideoId(youtubeUrl);
  const thumbnailUrl = useFallback
    ? getYouTubeThumbnailFallback(videoId)
    : getYouTubeThumbnail(videoId);

  // 외부 또는 내부 hover 상태 결정
  const isHovered =
    externalHovered !== undefined ? externalHovered : internalHovered;

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
  const embedUrl = isHovered ? getYouTubeEmbedUrl(youtubeUrl) : "";

  // 유효하지 않은 비디오 ID인 경우
  if (!videoId || !thumbnailUrl) {
    return (
      <div className="w-full aspect-square relative overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <span className="text-gray-500 text-sm">
            유효하지 않은 YouTube URL
          </span>
          <small className="block text-xs text-gray-400 mt-1">
            URL: {youtubeUrl}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full aspect-square relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 썸네일 이미지 */}
      {!imageError ? (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-4xl mb-2">▶</div>
            <div className="text-gray-300 text-xs">YouTube Video</div>
            <div className="text-gray-400 text-xs mt-1">ID: {videoId}</div>
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
            className="w-full h-full border-0"
            style={{ pointerEvents: "none" }}
          />
        </div>
      )}
    </div>
  );
}

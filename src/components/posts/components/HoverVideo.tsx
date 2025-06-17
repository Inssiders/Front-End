"use client";

import { useState } from "react";
import { getEmbedUrl } from "../utils/youtube";

interface HoverVideoProps {
  url: string;
}

export function HoverVideo({ url }: HoverVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const embedUrl = getEmbedUrl(url);
  const isYoutube = embedUrl.includes("youtube.com/embed");

  return (
    <div
      className="w-full h-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isYoutube ? (
        <iframe
          src={`${embedUrl}${isHovered ? "?autoplay=1" : ""}`}
          title="Video preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <video src={embedUrl} controls autoPlay={isHovered} loop muted className="w-full h-full object-cover" />
      )}

      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-white text-sm">마우스를 올려서 미리보기</p>
      </div>
    </div>
  );
}

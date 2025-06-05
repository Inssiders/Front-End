// src/components/posts/post-detail/VideoSection.tsx
import React from "react";

interface VideoSectionProps {
  mediaUrl: string;
  title: string;
}

export function VideoSection({ mediaUrl, title }: VideoSectionProps) {
  return (
    <div className="flex h-72 items-center justify-center bg-gray-50 md:h-full md:w-3/5 md:rounded-l-lg md:rounded-r-none">
      <iframe
        src={mediaUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
      />
    </div>
  );
}

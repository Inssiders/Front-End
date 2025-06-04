// src/components/posts/post-detail/VideoSection.tsx
import React from 'react';

interface VideoSectionProps {
  mediaUrl: string;
  title: string;
}

export function VideoSection({ mediaUrl, title }: VideoSectionProps) {
  return (
    <div className="md:w-3/5 flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none md:h-full h-72">
      <iframe
        src={mediaUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
      />
    </div>
  );
}
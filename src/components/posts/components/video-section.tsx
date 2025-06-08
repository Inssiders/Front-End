// src/components/posts/post-detail/VideoSection.tsx
'use client'
import React, { useEffect, useState, useRef } from 'react';

interface VideoSectionProps {
  mediaUrl: string;
  title: string;
}

function isValidVideoUrl(url: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return false;
    return true;
  } catch {
    return false;
  }
}

function getEmbedUrl(url: string) {
  // shorts, youtu.be, watch?v=, embed/ 모두 지원
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url; // 이미 embed면 그대로
}

// Instagram 임베드 컴포넌트
function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 인스타그램 embed.js 동적 로드
    if (typeof window !== 'undefined') {
      if (!(window as any).instgrm) {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    }
  }, [url]);

  return (
    <div ref={ref} className="w-full flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, margin: 0, padding: 0, width: '100%' }}
      ></blockquote>
    </div>
  );
}

export function VideoSection({ mediaUrl, title }: VideoSectionProps) {
  const [videoUrl, setVideoUrl] = useState('');
  useEffect(() => {
    setVideoUrl(mediaUrl);
  }, [mediaUrl]);

  if (!isValidVideoUrl(videoUrl)) {
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none text-red-500 text-center">
        유효하지 않은 url 입니다
      </div>
    );
  }

  // Instagram URL 체크
  const isInstagram = /instagram\.com\/(reel|p|tv)\//.test(videoUrl);
  if (isInstagram) {
    return (
      <div className="w-full aspect-[4/5] flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none">
        <InstagramEmbed url={videoUrl.split('?')[0]} />
      </div>
    );
  }

  // YouTube면 embed 변환, 아니면 원본 사용
  let src = getEmbedUrl(videoUrl);
  const isYoutube = src.includes('youtube.com/embed');

  return (
    <div className="w-full aspect-video flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none">
      {isYoutube ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
        />
      ) : (
        <video
          src={src}
          controls
          className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
        />
      )}
    </div>
  );
}
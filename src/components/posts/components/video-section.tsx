// src/components/posts/post-detail/VideoSection.tsx
"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { HoverVideo } from "./HoverVideo";

export interface VideoSectionProps {
  mediaUrl: string;
  onMediaUrlChange: (url: string) => void;
}

function isValidYouTubeUrl(url: string) {
  if (!url) return true; // Empty URL is valid (optional field)
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return false;

    // YouTube URL 패턴 검사
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return !!match;
  } catch {
    return false;
  }
}

function getEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

// Instagram 임베드 컴포넌트
// function InstagramEmbed({ url }: { url: string }) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // 인스타그램 embed.js 동적 로드
//     if (typeof window !== 'undefined') {
//       if (!(window as any).instgrm) {
//         const script = document.createElement('script');
//         script.src = 'https://www.instagram.com/embed.js';
//         script.async = true;
//         document.body.appendChild(script);
//       } else if ((window as any).instgrm) {
//         (window as any).instgrm.Embeds.process();
//       }
//     }
//   }, [url]);

//   return (
//     <div ref={ref} className="w-full flex justify-center">
//       <blockquote
//         className="instagram-media"
//         data-instgrm-permalink={url}
//         data-instgrm-version="14"
//         style={{ background: '#FFF', border: 0, margin: 0, padding: 0, width: '100%' }}
//       ></blockquote>
//     </div>
//   );
// }

export function VideoSection({ mediaUrl, onMediaUrlChange }: VideoSectionProps) {
  const [error, setError] = useState<string>("");

  const handleUrlChange = (url: string) => {
    if (!url) {
      setError("");
      onMediaUrlChange("");
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError("유효한 YouTube URL이 아닙니다. YouTube 동영상 URL만 입력 가능합니다.");
      onMediaUrlChange(url);
      return;
    }

    setError("");
    onMediaUrlChange(url);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="YouTube 동영상 URL을 입력해주세요 (예: https://youtube.com/watch?v=...)"
          value={mediaUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          className={`focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"}`}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      {mediaUrl && !error && (
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <HoverVideo url={mediaUrl} />
        </div>
      )}
    </div>
  );
}

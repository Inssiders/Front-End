"use client";

import { Pause, Play } from "lucide-react";
import { JSX, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  src: string;
  thumbnail: string;
}

const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Funny Cat",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Dancing Dog",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Epic Fail",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "Cute Baby",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "Prank Time",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    title: "Sports Blooper",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    title: "Reaction Meme",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    title: "Gaming Moment",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    title: "Unexpected Turn",
    src: "/videos/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=200&width=200",
  },
];

export default function VideoGrid(): JSX.Element {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());

  const handleMouseEnter = (id: number) => {
    setHoveredVideo(id);
    const videoElement = document.getElementById(
      `video-${id}`
    ) as HTMLVideoElement;
    if (videoElement && !playingVideos.has(id)) {
      videoElement
        .play()
        .catch((error) => console.error("Error playing video:", error));
    }
  };

  const handleMouseLeave = (id: number) => {
    setHoveredVideo(null);
    const videoElement = document.getElementById(
      `video-${id}`
    ) as HTMLVideoElement;
    if (videoElement && !playingVideos.has(id)) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  const toggleVideoPlay = (id: number) => {
    const newPlayingVideos = new Set(playingVideos);
    const videoElement = document.getElementById(
      `video-${id}`
    ) as HTMLVideoElement;

    if (playingVideos.has(id)) {
      newPlayingVideos.delete(id);
      if (videoElement) {
        videoElement.pause();
      }
    } else {
      newPlayingVideos.add(id);
      if (videoElement) {
        videoElement
          .play()
          .catch((error) => console.error("Error playing video:", error));
      }
    }

    setPlayingVideos(newPlayingVideos);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videoData.map((video) => (
        <div
          key={video.id}
          className="relative rounded-lg overflow-hidden bg-mocha-700"
          onMouseEnter={() => handleMouseEnter(video.id)}
          onMouseLeave={() => handleMouseLeave(video.id)}
          style={{
            transform: hoveredVideo === video.id ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
            zIndex: hoveredVideo === video.id ? 10 : 1,
          }}
        >
          <video
            id={`video-${video.id}`}
            className="w-full aspect-video object-cover"
            src={video.src}
            poster={video.thumbnail}
            loop
            muted
            playsInline
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <h3 className="text-cream-100 font-medium">{video.title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVideoPlay(video.id);
              }}
              className="absolute top-2 right-2 bg-cream-100/30 hover:bg-cream-100/50 rounded-full p-1.5 backdrop-blur-sm transition-colors"
            >
              {playingVideos.has(video.id) ? (
                <Pause className="w-4 h-4 text-cream-100" />
              ) : (
                <Play className="w-4 h-4 text-cream-100" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

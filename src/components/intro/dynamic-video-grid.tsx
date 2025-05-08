"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { JSX, useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  size: "small" | "medium" | "large";
}

const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Funny Cat",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "medium",
  },
  {
    id: 2,
    title: "Dancing Dog",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "small",
  },
  {
    id: 3,
    title: "Epic Fail",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "large",
  },
  {
    id: 4,
    title: "Cute Baby",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "small",
  },
  {
    id: 5,
    title: "Prank Time",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "medium",
  },
  {
    id: 6,
    title: "Sports Blooper",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "small",
  },
  {
    id: 7,
    title: "Reaction Meme",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "large",
  },
  {
    id: 8,
    title: "Gaming Moment",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "medium",
  },
  {
    id: 9,
    title: "Unexpected Turn",
    thumbnail: "/placeholder.svg?height=200&width=200",
    size: "small",
  },
];

interface DynamicVideoGridProps {
  showFrames?: boolean;
  onToggleShowFrames?: (show: boolean) => void;
}

export default function DynamicVideoGrid({
  showFrames = true,
  onToggleShowFrames,
}: DynamicVideoGridProps): JSX.Element {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(
    new Set(videoData.map((v) => v.id))
  );
  const [areFramesVisible, setAreFramesVisible] = useState<boolean>(showFrames);

  useEffect(() => {
    setAreFramesVisible(showFrames);
  }, [showFrames]);

  const handleMouseEnter = (id: number) => {
    setHoveredVideo(id);
  };

  const handleMouseLeave = (id: number) => {
    setHoveredVideo(null);
  };

  const toggleVideoPlay = (id: number, event?: React.MouseEvent) => {
    event?.stopPropagation();

    const newPlayingVideos = new Set(playingVideos);

    if (playingVideos.has(id)) {
      newPlayingVideos.delete(id);
    } else {
      newPlayingVideos.add(id);
    }

    setPlayingVideos(newPlayingVideos);
  };

  const toggleMute = (id: number, event?: React.MouseEvent) => {
    event?.stopPropagation();

    const newMutedVideos = new Set(mutedVideos);

    if (mutedVideos.has(id)) {
      newMutedVideos.delete(id);
    } else {
      newMutedVideos.add(id);
    }

    setMutedVideos(newMutedVideos);
  };

  const playAllVideos = () => {
    const allIds = videoData.map((video) => video.id);
    setPlayingVideos(new Set(allIds));
  };

  const pauseAllVideos = () => {
    setPlayingVideos(new Set());
  };

  const toggleShowFrames = () => {
    const newValue = !areFramesVisible;
    setAreFramesVisible(newValue);
    if (onToggleShowFrames) {
      onToggleShowFrames(newValue);
    }
  };

  // Get size classes based on video size
  const getSizeClasses = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1";
      case "medium":
        return "col-span-1 row-span-2 sm:col-span-2 sm:row-span-1";
      case "large":
        return "col-span-1 row-span-2 sm:col-span-2 sm:row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={playAllVideos}
            className="px-4 py-2 bg-cream-100 text-mocha-900 rounded-lg hover:bg-cream-200 transition-colors text-sm"
          >
            Play All
          </button>
          <button
            onClick={pauseAllVideos}
            className="px-4 py-2 border border-cream-200 text-cream-100 rounded-lg hover:bg-mocha-700 transition-colors text-sm"
          >
            Pause All
          </button>
        </div>
        <button
          onClick={toggleShowFrames}
          className="px-4 py-2 border border-cream-200 text-cream-100 rounded-lg hover:bg-mocha-700 transition-colors text-sm"
        >
          {areFramesVisible ? "Hide Frames" : "Show Frames"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 auto-rows-[120px]">
        {videoData.map((video) => (
          <motion.div
            key={video.id}
            className={`${getSizeClasses(
              video.size
            )} relative rounded-lg overflow-hidden bg-mocha-700 ${
              !areFramesVisible
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            onMouseEnter={() => handleMouseEnter(video.id)}
            onMouseLeave={() => handleMouseLeave(video.id)}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Empty video container with just the thumbnail */}
            <div className="w-full h-full">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <h3 className="text-cream-100 font-medium text-sm truncate">
                {video.title}
              </h3>
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={(e) => toggleVideoPlay(video.id, e)}
                className="bg-cream-100/30 hover:bg-cream-100/50 rounded-full p-1.5 backdrop-blur-sm transition-colors"
              >
                {playingVideos.has(video.id) ? (
                  <Pause className="w-3 h-3 text-cream-100" />
                ) : (
                  <Play className="w-3 h-3 text-cream-100" />
                )}
              </button>
              <button
                onClick={(e) => toggleMute(video.id, e)}
                className="bg-cream-100/30 hover:bg-cream-100/50 rounded-full p-1.5 backdrop-blur-sm transition-colors"
              >
                {mutedVideos.has(video.id) ? (
                  <VolumeX className="w-3 h-3 text-cream-100" />
                ) : (
                  <Volume2 className="w-3 h-3 text-cream-100" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

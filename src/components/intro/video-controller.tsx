"use client";

import { JSX, useState } from "react";

interface VideoControllerProps {
  videoIds: number[];
}

export default function VideoController({
  videoIds,
}: VideoControllerProps): JSX.Element {
  const [allPlaying, setAllPlaying] = useState<boolean>(false);

  const playAllVideos = () => {
    videoIds.forEach((id) => {
      const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
      if (video) {
        video
          .play()
          .catch((error) => console.error("Error playing video:", error));
      }
    });
    setAllPlaying(true);
  };

  const pauseAllVideos = () => {
    videoIds.forEach((id) => {
      const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setAllPlaying(false);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={playAllVideos}
        className="px-6 py-2 bg-cream-100 text-mocha-900 rounded-lg hover:bg-cream-200 transition-colors"
        disabled={allPlaying}
      >
        Show All
      </button>
      <button
        onClick={pauseAllVideos}
        className="px-6 py-2 border border-cream-200 text-cream-100 rounded-lg hover:bg-mocha-700 transition-colors"
        disabled={!allPlaying}
      >
        Hide All
      </button>
    </div>
  );
}

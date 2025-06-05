"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";

interface Frame {
  post_id: number;
  gif_url: string;
  defaultPos: { x: number; y: number; w: number; h: number };
}

interface VideoGridProps {
  showFrames: boolean;
  onToggleShowFrames: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  gridSize?: number;
  cellSize?: number;
  gapSize?: number;
  gifUrls?: string[];
}

const defaultGifUrls = [
  "gif/meme1.gif",
  "gif/meme2.gif",
  "gif/meme3.gif",
  "gif/meme4.gif",
  "gif/meme5.gif",
  "gif/meme6.gif",
  "gif/meme7.gif",
  "gif/meme8.gif",
  "gif/meme9.gif",
];

const GridCell = memo(function GridCell({
  frame,
  row,
  col,
  transformOrigin,
  onHover,
  onLeave,
  isHovered,
}: {
  frame: Frame;
  row: number;
  col: number;
  transformOrigin: string;
  onHover: (row: number, col: number) => void;
  onLeave: () => void;
  isHovered: boolean;
}) {
  return (
    <motion.div
      key={frame.post_id}
      className="relative overflow-hidden rounded-lg"
      style={{
        transformOrigin,
        transition: "transform 0.4s ease",
      }}
      onMouseEnter={() => onHover(row, col)}
      onMouseLeave={onLeave}
    >
      <Image
        src={frame.gif_url}
        alt={`Meme ${frame.post_id}`}
        fill
        className="object-cover"
        priority
        unoptimized
      />
    </motion.div>
  );
});

function VideoGrid({
  showFrames,
  onToggleShowFrames,
  className = "",
  gridSize = 12,
  cellSize = 60,
  gapSize = 4,
  gifUrls = defaultGifUrls,
}: VideoGridProps) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);
  const [hoverSize, setHoverSize] = useState(6);

  const toFrame = useCallback(
    (gif_url: string, index: number): Frame => {
      const gridDimension = Math.sqrt(gifUrls.length);
      const cellWidth = gridSize / gridDimension;
      const row = Math.floor(index / gridDimension);
      const col = index % gridDimension;

      return {
        post_id: index + 1,
        gif_url,
        defaultPos: {
          x: col * cellWidth,
          y: row * cellWidth,
          w: cellWidth,
          h: cellWidth,
        },
      };
    },
    [gifUrls.length, gridSize]
  );

  useEffect(() => {
    const framed = gifUrls.map((gif_url, i) => toFrame(gif_url, i));
    setFrames(framed);
  }, [gifUrls, toFrame]);

  const getRowSizes = useCallback(() => {
    if (hovered === null) {
      return Array(Math.sqrt(gifUrls.length)).fill("1fr").join(" ");
    }
    const { row } = hovered;
    const nonHoveredSize = (gridSize - hoverSize) / 2;
    return Array(Math.sqrt(gifUrls.length))
      .fill(0)
      .map((_, r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  }, [hovered, hoverSize, gridSize, gifUrls.length]);

  const getColSizes = useCallback(() => {
    if (hovered === null) {
      return Array(Math.sqrt(gifUrls.length)).fill("1fr").join(" ");
    }
    const { col } = hovered;
    const nonHoveredSize = (gridSize - hoverSize) / 2;
    return Array(Math.sqrt(gifUrls.length))
      .fill(0)
      .map((_, c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  }, [hovered, hoverSize, gridSize, gifUrls.length]);

  const getTransformOrigin = useCallback(
    (x: number, y: number) => {
      const vertical = y === 0 ? "top" : y === gridSize / 2 ? "center" : "bottom";
      const horizontal = x === 0 ? "left" : x === gridSize / 2 ? "center" : "right";
      return `${vertical} ${horizontal}`;
    },
    [gridSize]
  );

  return (
    <div className={`size-full space-y-4 ${className}`}>
      <div
        className="relative size-full min-h-[480px]"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame, index) => {
          const row = Math.floor(frame.defaultPos.y / (gridSize / Math.sqrt(gifUrls.length)));
          const col = Math.floor(frame.defaultPos.x / (gridSize / Math.sqrt(gifUrls.length)));
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y);

          return (
            <GridCell
              key={frame.post_id}
              frame={frame}
              row={row}
              col={col}
              transformOrigin={transformOrigin}
              onHover={(r, c) => setHovered({ row: r, col: c })}
              onLeave={() => setHovered(null)}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(VideoGrid);

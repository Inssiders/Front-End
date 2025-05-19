"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FrameComponent } from "./dynamic-video-frame-component.tsx";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const GRID_SIZE = 12;
const CELL_SIZE = 60; // pixels per grid cell

interface Frame {
  post_id: number;
  post_media_url: string;
  defaultPos: { x: number; y: number; w: number; h: number };
  mediaSize: number;
  borderThickness: number;
  borderSize: number;
  autoplayMode: "all" | "hover";
  isHovered: boolean;
}

interface RawVideoData {
  post_id: number;
  post_media_url: string;
  // 다른 외부에서 올 수 있는 데이터 필드들
}
interface DynamicVideoGridProps {
  showFrames: boolean;
  onToggleShowFrames: React.Dispatch<React.SetStateAction<boolean>>;
}

// const initialFrames: Frame[] = [
//   {
//     id: 1,
//     video:
//       "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
//     defaultPos: { x: 0, y: 0, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 2,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
//     defaultPos: { x: 4, y: 0, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 3,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
//     defaultPos: { x: 8, y: 0, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 4,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
//     defaultPos: { x: 0, y: 4, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 5,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
//     defaultPos: { x: 4, y: 4, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 6,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
//     defaultPos: { x: 8, y: 4, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 7,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
//     defaultPos: { x: 0, y: 8, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 8,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
//     defaultPos: { x: 4, y: 8, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
//   {
//     id: 9,
//     video:
//       "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
//     defaultPos: { x: 8, y: 8, w: 4, h: 4 },

//     mediaSize: 1,
//     borderThickness: 0,
//     borderSize: 80,
//     autoplayMode: "all",
//     isHovered: false,
//   },
// ];

export default function DynamicFrameLayout(props: DynamicVideoGridProps) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null
  );
  const [hoverSize, setHoverSize] = useState(6);
  const [gapSize, setGapSize] = useState(4);
  const [showControls, setShowControls] = useState(false);
  const [cleanInterface, setCleanInterface] = useState(true);
  const [showFrames, setShowFrames] = useState(false); // Update: showFrames starts as false
  const [autoplayMode, setAutoplayMode] = useState<"all" | "hover">("hover");

  const toFrame = (post_media_url: RawVideoData, index: number): Frame => {
    const positions = [
      { x: 0, y: 0, w: 4, h: 4 },
      { x: 4, y: 0, w: 4, h: 4 },
      { x: 8, y: 0, w: 4, h: 4 },
      { x: 0, y: 4, w: 4, h: 4 },
      { x: 4, y: 4, w: 4, h: 4 },
      { x: 8, y: 4, w: 4, h: 4 },
      { x: 0, y: 8, w: 4, h: 4 },
      { x: 4, y: 8, w: 4, h: 4 },
      { x: 8, y: 8, w: 4, h: 4 },
    ];

    return {
      ...post_media_url,
      defaultPos: positions[index],
      borderThickness: 0,
      borderSize: 80,
      mediaSize: 1,
      autoplayMode: "all",
      isHovered: false,
    };
  };
  useEffect(() => {
    fetch("/mock-data/all-mock-data.json")
      .then((res) => res.json())
      .then((rawData: RawVideoData[]) => {
        // id가 1부터 6까지만 필터링
        const filteredData = rawData.filter(
          (item) => item.post_id >= 1 && item.post_id <= 9
        );

        const framed = filteredData.map((post_media_url, i) =>
          toFrame(post_media_url, i)
        );
        setFrames(framed);
        console.log(framed);
      });
  }, []);
  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr";
    }
    const { row } = hovered;
    const nonHoveredSize = (12 - hoverSize) / 2;
    return [0, 1, 2]
      .map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  };

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr";
    }
    const { col } = hovered;
    const nonHoveredSize = (12 - hoverSize) / 2;
    return [0, 1, 2]
      .map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  };

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom";
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right";
    return `${vertical} ${horizontal}`;
  };

  const updateFrameProperty = (
    id: number,
    property: keyof Frame,
    value: number
  ) => {
    setFrames(
      frames.map((frame) =>
        frame.post_id === id ? { ...frame, [property]: value } : frame
      )
    );
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface);
    if (!cleanInterface) {
      setShowControls(false);
    }
  };

  const updateCodebase = () => {
    console.log("Updating codebase with current values:");
    console.log("Hover Size:", hoverSize);
    console.log("Gap Size:", gapSize);
    console.log("Frames:", frames);
    // Here you would typically make an API call to update the codebase
    // For now, we'll just log the values
  };

  return (
    <div className="space-y-4 w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="autoplay-toggle"
              checked={autoplayMode === "all"}
              onCheckedChange={(checked) =>
                setAutoplayMode(checked ? "all" : "hover")
              }
            />
            <label htmlFor="autoplay-toggle" className="text-sm text-black/70">
              {autoplayMode === "all" ? "Auto On" : "Auto Off"}
            </label>
          </div>
        </div>
      </div>
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Dynamic Frame Layout
          </h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>
              {showControls ? "Hide Controls" : "Show Controls"}
            </Button>
            <Button onClick={updateCodebase}>Update Codebase</Button>
            <Button onClick={toggleCleanInterface}>
              {cleanInterface ? "Show UI" : "Hide UI"}
            </Button>
          </div>
        </div>
      )}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label
              htmlFor="hover-size"
              className="block text-sm font-medium text-gray-200"
            >
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="gap-size"
              className="block text-sm font-medium text-gray-200"
            >
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      <div
        className="relative w-full h-full min-h-[480px]"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition:
            "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4);
          const col = Math.floor(frame.defaultPos.x / 4);
          const transformOrigin = getTransformOrigin(
            frame.defaultPos.x,
            frame.defaultPos.y
          );

          return (
            <motion.div
              key={frame.post_id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                video={frame.post_media_url}
                width="100%"
                height="100%"
                className="absolute inset-0"
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) =>
                  updateFrameProperty(frame.post_id, "mediaSize", value)
                }
                onBorderThicknessChange={(value) =>
                  updateFrameProperty(frame.post_id, "borderThickness", value)
                }
                onBorderSizeChange={(value) =>
                  updateFrameProperty(frame.post_id, "borderSize", value)
                }
                showControls={showControls && !cleanInterface}
                label={`Frame ${frame.post_id}`}
                showFrame={showFrames}
                autoplayMode={autoplayMode}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

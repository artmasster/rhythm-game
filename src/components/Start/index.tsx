import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import YouTubeVideo from "./YouTubeVideo";

export default function Start({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<"start" | "play">>;
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Extract video ID from the YouTube URL
  const videoId = "8t8jLB_kKoA";

  const handleStartClick = () => {
    setPage("play"); // force page to play
    setIsVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setPage("play");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* YouTube Video Background */}
      {isVideoPlaying && (
        <YouTubeVideo
          videoId={videoId}
          onEnd={handleVideoEnd}
          isPlaying={isVideoPlaying}
        />
      )}

      {/* Content overlay */}
      <div
        className={clsx(
          "relative z-10 text-center",
          isVideoPlaying && "text-white"
        )}
      >
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Rhythm Game</h1>
        <p className="text-lg mb-4 drop-shadow-lg">
          A simple rhythm game to test your reaction time.
        </p>
        {!isVideoPlaying && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            onClick={handleStartClick}
          >
            Start
          </button>
        )}
        {isVideoPlaying && (
          <div className="text-lg font-semibold drop-shadow-lg">Loading...</div>
        )}
      </div>
    </div>
  );
}

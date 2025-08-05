import { useEffect, useRef } from "react";

interface YouTubeVideoProps {
  videoId: string;
  onEnd: () => void;
  isPlaying: boolean;
}

export default function YouTubeVideo({ videoId, onEnd, isPlaying }: YouTubeVideoProps) {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const onYouTubeIframeAPIReady = () => {
      if (containerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            mute: 0,
            loop: 0,
          },
          events: {
            onReady: (event) => {
              if (isPlaying) {
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              // Video ended (state 0)
              if (event.data === 0) {
                onEnd();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, onEnd]);

  useEffect(() => {
    if (playerRef.current && isPlaying) {
      playerRef.current.playVideo();
    } else if (playerRef.current && !isPlaying) {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="youtube-background"
    />
  );
}

// Add YouTube API types to window object
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
} 
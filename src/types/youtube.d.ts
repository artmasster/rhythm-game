declare namespace YT {
  interface PlayerOptions {
    videoId?: string;
    playerVars?: {
      autoplay?: number;
      controls?: number;
      disablekb?: number;
      enablejsapi?: number;
      fs?: number;
      iv_load_policy?: number;
      modestbranding?: number;
      rel?: number;
      showinfo?: number;
      mute?: number;
      loop?: number;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: number;
  }

  class Player {
    constructor(element: HTMLElement, options: PlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    destroy(): void;
  }
}

declare var YT: {
  Player: typeof YT.Player;
};

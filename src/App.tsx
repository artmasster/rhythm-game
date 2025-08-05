import { useEffect, useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [bpm, setBpm] = useState(120);

  const beats = [1, 2, 3, 4]; // 4/4 time signature

  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentBeat((prev) => (prev + 1) % beats.length);
      }, (60 / bpm) * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, bpm, beats.length]);

  const handleBeatClick = (beatNumber: number) => {
    if (beatNumber === currentBeat) {
      setScore(score + 10);
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentBeat(0);
    }
  };

  return (
    <div className="game-container">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8 animate-pulse">
          Rhythm Game
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-white text-xl">BPM:</span>
            <input
              type="range"
              min="60"
              max="200"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white text-xl font-mono">{bpm}</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={togglePlay}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200 ${
                isPlaying
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isPlaying ? "Stop" : "Start"}
            </button>
          </div>

          <div className="text-white text-2xl font-bold mb-4">
            Score: {score}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {beats.map((beat, index) => (
            <button
              key={beat}
              onClick={() => handleBeatClick(index)}
              className={`w-20 h-20 rounded-full text-2xl font-bold transition-all duration-200 ${
                currentBeat === index && isPlaying
                  ? "bg-yellow-400 text-black scale-110 shadow-lg shadow-yellow-400/50"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {beat}
            </button>
          ))}
        </div>

        <div className="mt-8 text-white/70 text-center">
          <p className="text-lg mb-2">How to play:</p>
          <p className="text-sm">
            Click the beat buttons in time with the highlighted beat!
          </p>
          <p className="text-sm mt-2">
            +10 points for perfect timing, -5 points for missing
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

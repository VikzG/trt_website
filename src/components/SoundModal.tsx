import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

type SoundData = {
  videoFile: string;
  soundFile: string;
};

interface SoundModalProps {
  data: SoundData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SoundModal({ data, isOpen, onClose }: SoundModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Sync audio + video
  useEffect(() => {
    if (!isOpen || !videoRef.current || !audioRef.current) return;

    const video = videoRef.current;
    const audio = audioRef.current;

    video.play();
    audio.play();
    setIsPlaying(true);

    audio.volume = volume;
    video.volume = volume;
  }, [isOpen]);

  useEffect(() => {
    if (!audioRef.current || !videoRef.current) return;
    audioRef.current.volume = volume;
    videoRef.current.volume = volume;
  }, [volume]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl mx-4 animate-scale-in">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-50 p-3 bg-white text-black rounded-full shadow-lg hover:bg-neutral-200 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full flex flex-col items-center">

          {/* ---------- SKELETON LOADER ---------- */}
          {!isVideoLoaded && (
            <div className="w-full h-[400px] rounded-lg bg-neutral-800 animate-pulse flex items-center justify-center relative">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {/* ---------- VIDEO ---------- */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={() => setIsVideoLoaded(true)}
            onCanPlay={() => setIsVideoLoaded(true)}
          >
            <source src={data.videoFile} type="video/mp4" />
          </video>

          {/* AUDIO */}
          <audio ref={audioRef} src={data.soundFile} />

          {/* ---------- CONTROLS ---------- */}
          <div className="flex items-center justify-center gap-6 mt-4">

            {/* Restart */}
            <button
              onClick={() => {
                const v = videoRef.current;
                const a = audioRef.current;
                if (!v || !a) return;
                v.currentTime = 0;
                a.currentTime = 0;
                v.play();
                a.play();
                setIsPlaying(true);
              }}
              className="p-4 bg-white/20 hover:bg-white/30 transition rounded-full text-white"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={() => {
                const v = videoRef.current;
                const a = audioRef.current;
                if (!v || !a) return;
                if (isPlaying) {
                  v.pause();
                  a.pause();
                } else {
                  v.play();
                  a.play();
                }
                setIsPlaying(!isPlaying);
              }}
              className="p-6 bg-white text-black rounded-full shadow-xl hover:bg-neutral-200 transition"
            >
              {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
            </button>

            {/* Volume */}
            <div className="relative">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="p-4 bg-white/20 hover:bg-white/30 transition rounded-full text-white"
              >
                {volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/80 backdrop-blur-md p-4 rounded-lg">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(Number(e.target.value) / 100)}
                    className="w-32 h-2 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

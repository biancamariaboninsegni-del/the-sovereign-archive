import { Howl } from "howler";
import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  isReady: boolean;
}

const AudioCtx = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  isReady: false,
});

export const useAudio = () => useContext(AudioCtx);

// Free ambient rain loop from freesound-style placeholder
// We use a generated tone as placeholder - user can replace with real .mp3
const RAIN_URL = "https://cdn.freesound.org/previews/531/531947_6481981-lq.mp3";

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const initRef = useRef(false);

  const initAudio = useCallback(() => {
    if (initRef.current) return;
    initRef.current = true;

    const sound = new Howl({
      src: [RAIN_URL],
      loop: true,
      volume: 0.2,
      html5: true,
      onload: () => setIsReady(true),
      onloaderror: () => {
        console.warn("Audio failed to load — ambient sound unavailable");
        setIsReady(false);
      },
    });

    soundRef.current = sound;
  }, []);

  // Initialize on first user interaction
  useEffect(() => {
    const handler = () => {
      initAudio();
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [initAudio]);

  const toggleMute = useCallback(() => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isMuted) {
      if (!sound.playing()) sound.play();
      sound.fade(0, 0.2, 800);
    } else {
      sound.fade(0.2, 0, 800);
      setTimeout(() => { if (sound.playing()) sound.pause(); }, 850);
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  return (
    <AudioCtx.Provider value={{ isMuted, toggleMute, isReady }}>
      {children}
    </AudioCtx.Provider>
  );
};

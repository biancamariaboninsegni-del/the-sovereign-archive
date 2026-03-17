import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioEngine";
import { motion } from "framer-motion";

export const AudioToggle = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-[100] w-9 h-9 flex items-center justify-center rounded-sm bg-primary/60 backdrop-blur-sm shadow-tactile hover:bg-primary/80 transition-colors duration-300 cursor-pointer"
      aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-primary-foreground/70" />
      ) : (
        <Volume2 className="w-4 h-4 text-primary-foreground/70" />
      )}
    </motion.button>
  );
};

import { motion } from "framer-motion";
import studyIsometric from "@/assets/study-isometric.jpg";
import studyLofi from "@/assets/study-lofi.jpg";
import { DossierKey } from "@/pages/Index";
import { Monitor, Grid3x3, Radio, BookOpen, Trophy, Coffee } from "lucide-react";

interface StudySceneProps {
  onIMacClick: () => void;
  onSudokuClick: () => void;
  onDossierClick: (key: DossierKey) => void;
  sudokuSolved: boolean;
  onFlatlandiaClick: () => void;
}

const Hotspot = ({
  children,
  onClick,
  label,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) => (
  <motion.button
    onClick={onClick}
    className={`absolute group cursor-pointer flex flex-col items-center justify-center gap-1 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    aria-label={label}
  >
    {children}
    <span className="font-display text-xs text-primary-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/80 px-2 py-0.5 rounded-sm backdrop-blur-sm">
      {label}
    </span>
  </motion.button>
);

/* Steam wisps */
const SteamWisp = ({ delay }: { delay: string }) => (
  <div
    className={`absolute w-1 h-6 bg-primary-foreground/20 rounded-full ${delay === "0" ? "animate-steam" : delay === "1" ? "animate-steam-delayed" : "animate-steam-slow"}`}
  />
);

export const StudyScene = ({
  onIMacClick,
  onSudokuClick,
  onDossierClick,
  sudokuSolved,
  onFlatlandiaClick,
}: StudySceneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full h-full"
    >
      {/* Background layers - two study images blended */}
      <div className="absolute inset-0">
        <img
          src={studyLofi}
          alt="Studio a Bologna"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--wood-walnut) / 0.3) 100%)"
      }} />

      {/* Interactive hotspots layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-5xl aspect-square max-h-[90vh]">

          {/* iMac - center of desk */}
          <Hotspot
            onClick={onIMacClick}
            label="Technical Mastery & CV"
            className="top-[32%] left-[45%] w-28 h-24"
          >
            <div className="w-20 h-14 rounded-sm bg-os-green/90 shadow-tactile flex items-center justify-center border border-brass/20">
              <Monitor className="w-8 h-8 text-primary-foreground/80" />
            </div>
          </Hotspot>

          {/* Sudoku - right of desk */}
          <Hotspot
            onClick={onSudokuClick}
            label={sudokuSolved ? "Sudoku risolto ✓" : "Solve to unlock Flatlandia"}
            className="top-[45%] right-[22%] w-20 h-20"
          >
            <div className="w-14 h-14 rounded-sm bg-parchment/90 shadow-tactile flex items-center justify-center border border-brass/20">
              <Grid3x3 className="w-7 h-7 text-foreground/70" />
            </div>
          </Hotspot>

          {/* Coffee cup - near Sudoku */}
          <div className="absolute top-[40%] right-[30%] w-10 h-10 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <Coffee className="w-6 h-6 text-foreground/40" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
                <SteamWisp delay="0" />
                <SteamWisp delay="1" />
                <SteamWisp delay="2" />
              </div>
            </div>
          </div>

          {/* Radio - left of desk */}
          <Hotspot
            onClick={() => {}}
            label="Ambient: Rain & Jazz"
            className="top-[45%] left-[18%] w-20 h-16"
          >
            <div className="w-14 h-10 rounded-sm bg-walnut/80 shadow-tactile flex items-center justify-center border border-brass/20">
              <Radio className="w-6 h-6 text-brass" />
            </div>
            <span className="font-ui text-[9px] text-brass/70 animate-text-pulse">♪ playing</span>
          </Hotspot>

          {/* Dossier: Campari - left wall prints */}
          <Hotspot
            onClick={() => onDossierClick("campari")}
            label="Campari Botanical"
            className="top-[15%] left-[10%] w-16 h-20"
          >
            <div className="w-12 h-16 rounded-sm bg-walnut/70 shadow-tactile flex items-center justify-center border border-brass/30">
              <BookOpen className="w-5 h-5 text-parchment/80" />
            </div>
          </Hotspot>

          {/* Dossier: Richemont - left wall, lower */}
          <Hotspot
            onClick={() => onDossierClick("richemont")}
            label="Patek Philippe / Glashütte"
            className="top-[25%] left-[15%] w-14 h-14"
          >
            <div className="w-11 h-11 rounded-sm bg-walnut/60 shadow-tactile flex items-center justify-center border border-brass/30">
              <span className="font-display text-lg text-brass/80">⚙</span>
            </div>
          </Hotspot>

          {/* Dossier: Christie's - right wall */}
          <Hotspot
            onClick={() => onDossierClick("christies")}
            label="Christie's La Dolce Vita"
            className="top-[15%] right-[10%] w-16 h-20"
          >
            <div className="w-12 h-16 rounded-sm bg-leather/60 shadow-tactile flex items-center justify-center border border-brass/20">
              <BookOpen className="w-5 h-5 text-brass/70" />
            </div>
          </Hotspot>

          {/* Dossier: Loyola - right wall, lower */}
          <Hotspot
            onClick={() => onDossierClick("loyola")}
            label="Loyola New Orleans"
            className="top-[25%] right-[15%] w-14 h-14"
          >
            <div className="w-11 h-11 rounded-full bg-parchment/70 shadow-tactile flex items-center justify-center border border-brass/20">
              <Trophy className="w-5 h-5 text-foreground/60" />
            </div>
          </Hotspot>

          {/* Solved Sudoku: link to Flatlandia */}
          {sudokuSolved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-[20%] right-[25%]"
            >
              <button
                onClick={onFlatlandiaClick}
                className="font-display text-sm text-brass hover:text-foreground transition-colors duration-500 underline underline-offset-4 decoration-brass/40"
              >
                Entra in Flatlandia →
              </button>
            </motion.div>
          )}

          {/* Title watermark */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <h1 className="font-display text-2xl md:text-3xl text-foreground/60 tracking-tight">
              The Sovereign Archive
            </h1>
            <p className="font-ui text-[10px] text-muted-foreground/50 mt-1 tracking-widest uppercase">
              Click the objects to explore
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

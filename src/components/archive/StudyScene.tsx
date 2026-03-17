import { motion } from "framer-motion";
import studyLofi from "@/assets/study-lofi.jpg";
import { DossierKey } from "@/pages/Index";

interface StudySceneProps {
  onIMacClick: () => void;
  onSudokuClick: () => void;
  onDossierClick: (key: DossierKey) => void;
  sudokuSolved: boolean;
  onFlatlandiaClick: () => void;
}

const transition15 = { duration: 1.5, ease: [0.4, 0, 0.2, 1] as const };

/* Invisible hotspot mapped to image coordinates (percentage-based) */
const ImageHotspot = ({
  onClick,
  label,
  style,
}: {
  onClick: () => void;
  label: string;
  style: React.CSSProperties;
}) => (
  <motion.button
    onClick={onClick}
    className="absolute cursor-pointer group"
    style={style}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3 }}
    aria-label={label}
  >
    {/* Glow overlay on hover */}
    <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      style={{
        background: "radial-gradient(ellipse at center, hsl(43 46% 48% / 0.15) 0%, transparent 70%)",
        boxShadow: "inset 0 0 20px hsl(43 46% 48% / 0.1)",
      }}
    />
    {/* Label tooltip */}
    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[11px] text-primary-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/80 px-2 py-0.5 rounded-sm backdrop-blur-sm pointer-events-none">
      {label}
    </span>
  </motion.button>
);

/* Steam wisps */
const SteamWisp = ({ className }: { className: string }) => (
  <div className={`absolute w-[2px] h-5 rounded-full ${className}`}
    style={{ background: "hsl(48 100% 93% / 0.25)" }}
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
      transition={transition15}
      className="relative w-full h-full"
    >
      {/* Background image - the study */}
      <div className="absolute inset-0">
        <img
          src={studyLofi}
          alt="Studio a Bologna — vista su San Luca"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Warm lamp glow on desk area */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 35% 30% at 58% 55%, hsl(43 80% 65% / 0.08) 0%, transparent 100%),
              radial-gradient(ellipse 20% 25% at 50% 35%, hsl(43 60% 70% / 0.06) 0%, transparent 100%)
            `,
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 35%, hsl(25 32% 10% / 0.35) 100%)",
          }}
        />
      </div>

      {/* ====== HOTSPOTS mapped to lofi study image ====== */}
      {/* The lofi image: desk centered, bookshelves L+R, window center-top, lamp right of desk */}

      {/* iMac screen — center of desk, slightly right */}
      <ImageHotspot
        onClick={onIMacClick}
        label="iMac 24″ — Technical Mastery & CV"
        style={{ top: "38%", left: "43%", width: "14%", height: "18%" }}
      />

      {/* Desk lamp — right side, above desk surface */}
      <div className="absolute pointer-events-none" style={{ top: "32%", left: "62%", width: "6%", height: "22%" }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/3 rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, hsl(43 80% 65% / 0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Sudoku / notebook area — on desk, left-center */}
      <ImageHotspot
        onClick={onSudokuClick}
        label={sudokuSolved ? "Sudoku risolto ✓" : "Sudoku — Solve to unlock Flatlandia"}
        style={{ top: "55%", left: "35%", width: "10%", height: "10%" }}
      />

      {/* Open book on desk — center */}
      <ImageHotspot
        onClick={() => onDossierClick("campari")}
        label="Campari Botanical Prints"
        style={{ top: "52%", left: "47%", width: "10%", height: "9%" }}
      />

      {/* Coffee / steam area — right of book, decorative */}
      <div className="absolute pointer-events-none" style={{ top: "43%", left: "57%", width: "4%", height: "12%" }}>
        <div className="relative w-full h-full flex justify-center">
          <SteamWisp className="animate-steam left-[30%]" />
          <SteamWisp className="animate-steam-delayed left-[50%]" />
          <SteamWisp className="animate-steam-slow left-[70%]" />
        </div>
      </div>

      {/* Left bookshelf — top paintings/frames area */}
      {/* Frame top-left: landscape painting */}
      <ImageHotspot
        onClick={() => onDossierClick("richemont")}
        label="Patek Philippe / Glashütte — Richemont"
        style={{ top: "8%", left: "5%", width: "12%", height: "14%" }}
      />

      {/* Frame mid-left: smaller frames */}
      <ImageHotspot
        onClick={() => onDossierClick("christies")}
        label="Christie's — La Dolce Vita"
        style={{ top: "24%", left: "5%", width: "10%", height: "12%" }}
      />

      {/* Right bookshelf — top paintings area */}
      {/* Frame top-right: portrait */}
      <ImageHotspot
        onClick={() => onDossierClick("loyola")}
        label="Loyola New Orleans — Baseball & Storytelling"
        style={{ top: "8%", right: "5%", width: "12%", height: "14%" }}
      />

      {/* Right shelf items */}
      <ImageHotspot
        onClick={() => onDossierClick("loyola")}
        label="Loyola New Orleans"
        style={{ top: "4%", right: "8%", width: "8%", height: "8%" }}
      />

      {/* Window — San Luca view (non-interactive, just visual anchor) */}
      <div className="absolute pointer-events-none" style={{ top: "0%", left: "32%", width: "36%", height: "50%" }}>
        {/* Subtle rain effect overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              100deg,
              transparent,
              transparent 98%,
              hsl(210 30% 70% / 0.3) 98%,
              hsl(210 30% 70% / 0.3) 100%
            )`,
            backgroundSize: "3px 100%",
            animation: "rain-drift 8s linear infinite",
          }}
        />
      </div>

      {/* Flatlandia link after solving */}
      {sudokuSolved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-10"
        >
          <button
            onClick={onFlatlandiaClick}
            className="font-display text-base text-brass hover:text-foreground transition-colors duration-700 underline underline-offset-4 decoration-brass/40 cursor-pointer"
          >
            Entra in Flatlandia →
          </button>
        </motion.div>
      )}

      {/* Title watermark */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <h1 className="font-display text-xl md:text-2xl text-foreground/40 tracking-tight">
          The Sovereign Archive
        </h1>
        <p className="font-ui text-[9px] text-muted-foreground/40 mt-0.5 tracking-[0.2em] uppercase">
          Explore the objects
        </p>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { X, FileText, Download, File } from "lucide-react";
import { useState } from "react";

interface IMacScreenProps {
  onBack: () => void;
}

const FileIcon = ({
  name,
  icon: Icon,
  onClick,
}: {
  name: string;
  icon: typeof FileText;
  onClick?: () => void;
}) => (
  <motion.button
    className="flex flex-col items-center gap-2 p-3 rounded-sm hover:bg-primary-foreground/10 transition-colors cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onDoubleClick={onClick}
    onClick={onClick}
    aria-label={`Apri ${name}`}
  >
    <Icon className="w-10 h-10 text-primary-foreground/70" />
    <span className="font-ui text-[11px] text-primary-foreground/80 max-w-[80px] text-center leading-tight">
      {name}
    </span>
  </motion.button>
);

export const IMacScreen = ({ onBack }: IMacScreenProps) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex items-center justify-center backdrop-focus z-50"
    >
      {/* iMac frame */}
      <div className="relative w-[80vw] max-w-4xl aspect-[16/10] bg-os-green rounded-lg shadow-lifted overflow-hidden border border-brass/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-os-green/80 border-b border-primary-foreground/10">
          <button
            onClick={onBack}
            className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors"
            aria-label="Chiudi"
          />
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-3 h-3 rounded-full bg-accent/40" />
          <span className="font-ui text-[11px] text-primary-foreground/50 ml-4">
            Sovereign OS — Desktop
          </span>
        </div>

        {/* Desktop area */}
        <div className="p-8 h-full flex flex-col">
          <div className="flex gap-6 flex-wrap">
            <FileIcon
              name="Mastery_Log.txt"
              icon={FileText}
              onClick={() => setActiveFile("mastery")}
            />
            <FileIcon
              name="Academic_Path.pdf"
              icon={File}
              onClick={() => setActiveFile("academic")}
            />
            <FileIcon
              name="BMB_CV_2026.pdf"
              icon={File}
              onClick={() => setActiveFile("cv")}
            />
          </div>
        </div>

        {/* Finder window overlay */}
        {activeFile && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-8 bg-background/95 backdrop-blur-md rounded-sm shadow-lifted border border-brass/20 flex flex-col overflow-hidden"
          >
            {/* Finder title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
              <button
                onClick={() => setActiveFile(null)}
                className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors"
              />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <span className="font-ui text-[11px] text-foreground/60 ml-3">
                {activeFile === "mastery"
                  ? "Mastery_Log.txt"
                  : activeFile === "academic"
                  ? "Academic_Path.pdf"
                  : "BMB_CV_2026.pdf"}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeFile === "mastery" && (
                <div className="font-ui text-sm text-foreground/80 space-y-3 leading-relaxed">
                  <p className="font-display text-xl text-foreground mb-4">
                    Technical Mastery Log
                  </p>
                  <p>→ Digital Strategy & Brand Architecture</p>
                  <p>→ Data Analytics & Performance Marketing</p>
                  <p>→ Luxury Market Intelligence (HNWI)</p>
                  <p>→ Heritage Curation & Editorial Systems</p>
                  <p>→ Cross-functional Operations Management</p>
                  <p>→ Behavioral Psychology Applied to Branding</p>
                </div>
              )}
              {activeFile === "academic" && (
                <div className="font-ui text-sm text-foreground/80 space-y-3 leading-relaxed">
                  <p className="font-display text-xl text-foreground mb-4">
                    Academic Path
                  </p>
                  <p>→ Loyola University New Orleans — GPA 4.0</p>
                  <p>→ Marketing & International Business</p>
                  <p>→ Bologna, Milano, Ginevra, New Orleans</p>
                  <p>→ Continuous learning: data science, behavioral economics</p>
                </div>
              )}
              {activeFile === "cv" && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <File className="w-16 h-16 text-foreground/30" />
                  <p className="font-display text-lg text-foreground/60">
                    BMB_CV_2026.pdf
                  </p>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-ui text-sm shadow-tactile hover:shadow-lifted transition-shadow duration-300"
                    disabled={downloading}
                  >
                    <Download className="w-4 h-4" />
                    {downloading ? "Saving..." : "Save to Disk"}
                  </button>
                  {downloading && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                      className="h-0.5 bg-brass rounded-full max-w-[200px]"
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

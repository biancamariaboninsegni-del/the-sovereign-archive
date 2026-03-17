import { motion } from "framer-motion";
import { FileText, Download, File } from "lucide-react";
import { useState } from "react";

interface IMacScreenProps {
  onBack: () => void;
}

const transition15 = { duration: 1.5, ease: [0.4, 0, 0.2, 1] as const };

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
    className="flex flex-col items-center gap-2 p-4 rounded-sm hover:bg-primary-foreground/10 transition-colors duration-300 cursor-pointer"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    aria-label={`Apri ${name}`}
  >
    <Icon className="w-12 h-12 text-primary-foreground/60" />
    <span className="font-ui text-[11px] text-primary-foreground/70 max-w-[90px] text-center leading-tight">
      {name}
    </span>
  </motion.button>
);

export const IMacScreen = ({ onBack }: IMacScreenProps) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Trigger real download
    const link = document.createElement("a");
    link.href = "/BMB_CV_2026.pdf";
    link.download = "BMB_CV_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={transition15}
      className="absolute inset-0 flex items-center justify-center backdrop-focus z-50"
    >
      {/* iMac frame */}
      <div className="relative w-[80vw] max-w-4xl aspect-[16/10] bg-os-green rounded-lg shadow-lifted overflow-hidden border border-brass/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary-foreground/10"
          style={{ background: "hsl(145 20% 12%)" }}
        >
          <button
            onClick={onBack}
            className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors cursor-pointer"
            aria-label="Chiudi"
          />
          <div className="w-3 h-3 rounded-full bg-accent/50" />
          <div className="w-3 h-3 rounded-full bg-accent/30" />
          <span className="font-ui text-[11px] text-primary-foreground/40 ml-4 tracking-wide">
            Sovereign OS — Desktop
          </span>
        </div>

        {/* Desktop area */}
        <div className="p-10 h-full flex flex-col">
          <div className="flex gap-8 flex-wrap">
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
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-8 bg-background/95 backdrop-blur-md rounded-sm shadow-lifted border border-brass/20 flex flex-col overflow-hidden"
          >
            {/* Finder title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
              <button
                onClick={() => setActiveFile(null)}
                className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors cursor-pointer"
              />
              <div className="w-3 h-3 rounded-full bg-accent/50" />
              <div className="w-3 h-3 rounded-full bg-accent/30" />
              <span className="font-ui text-[11px] text-foreground/50 ml-3">
                {activeFile === "mastery"
                  ? "Mastery_Log.txt"
                  : activeFile === "academic"
                  ? "Academic_Path.pdf"
                  : "BMB_CV_2026.pdf"}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {activeFile === "mastery" && (
                <div className="font-ui text-sm text-foreground/80 space-y-3 leading-relaxed">
                  <p className="font-display text-2xl text-foreground mb-6">
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
                  <p className="font-display text-2xl text-foreground mb-6">
                    Academic Path
                  </p>
                  <p>→ Loyola University New Orleans — GPA 4.0</p>
                  <p>→ Marketing & International Business</p>
                  <p>→ Bologna, Milano, Ginevra, New Orleans</p>
                  <p>→ Continuous learning: data science, behavioral economics</p>
                </div>
              )}
              {activeFile === "cv" && (
                <div className="flex flex-col items-center justify-center h-full gap-5">
                  <File className="w-20 h-20 text-foreground/20" />
                  <p className="font-display text-xl text-foreground/50">
                    BMB_CV_2026.pdf
                  </p>
                  <motion.button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-sm font-ui text-sm shadow-tactile hover:shadow-lifted transition-all duration-500 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download className="w-4 h-4" />
                    {downloading ? "Saving..." : "Save to Disk"}
                  </motion.button>
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

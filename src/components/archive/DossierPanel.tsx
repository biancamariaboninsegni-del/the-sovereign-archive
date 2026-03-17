import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dossier } from "@/data/dossiers";

interface DossierPanelProps {
  dossier: Dossier;
  onClose: () => void;
}

export const DossierPanel = ({ dossier, onClose }: DossierPanelProps) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 backdrop-focus z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background/95 backdrop-blur-sm shadow-lifted z-50 flex flex-col border-l border-brass/20"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
          <div>
            <h2 className="font-display text-2xl text-foreground leading-tight">
              {dossier.title}
            </h2>
            <p className="font-ui text-xs text-muted-foreground mt-1 tracking-wider uppercase">
              {dossier.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/40 hover:text-foreground transition-colors mt-1"
            aria-label="Chiudi dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p
            className={`text-base leading-relaxed text-foreground/85 ${
              dossier.fontStyle === "handwritten"
                ? "font-handwritten text-lg"
                : "font-display text-base italic"
            }`}
          >
            {dossier.narrative}
          </p>
        </div>

        {/* Metadata footer */}
        <div className="p-6 pt-4 border-t border-border">
          <p className="font-ui text-[10px] text-muted-foreground tracking-widest uppercase">
            {dossier.metadata}
          </p>
        </div>
      </motion.aside>
    </>
  );
};

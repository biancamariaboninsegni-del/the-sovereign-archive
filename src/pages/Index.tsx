import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StudyScene } from "@/components/archive/StudyScene";
import { IMacScreen } from "@/components/archive/IMacScreen";
import { DossierPanel } from "@/components/archive/DossierPanel";
import { SudokuPuzzle } from "@/components/archive/SudokuPuzzle";
import { Flatlandia } from "@/components/archive/Flatlandia";
import { WhiteHole } from "@/components/archive/WhiteHole";
import { dossiers } from "@/data/dossiers";

export type AppView = "study" | "imac" | "sudoku" | "flatlandia" | "whitehole";
export type DossierKey = "campari" | "richemont" | "christies" | "loyola" | null;

const Index = () => {
  const [view, setView] = useState<AppView>("study");
  const [activeDossier, setActiveDossier] = useState<DossierKey>(null);
  const [sudokuSolved, setSudokuSolved] = useState(false);

  const handleSudokuSolve = () => {
    setSudokuSolved(true);
    setTimeout(() => setView("flatlandia"), 1200);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {view === "study" && (
          <StudyScene
            key="study"
            onIMacClick={() => setView("imac")}
            onSudokuClick={() => setView("sudoku")}
            onDossierClick={setActiveDossier}
            sudokuSolved={sudokuSolved}
            onFlatlandiaClick={() => setView("flatlandia")}
          />
        )}

        {view === "imac" && (
          <IMacScreen key="imac" onBack={() => setView("study")} />
        )}

        {view === "sudoku" && (
          <SudokuPuzzle
            key="sudoku"
            onBack={() => setView("study")}
            onSolve={handleSudokuSolve}
          />
        )}

        {view === "flatlandia" && (
          <Flatlandia
            key="flatlandia"
            onBack={() => setView("study")}
            onNext={() => setView("whitehole")}
          />
        )}

        {view === "whitehole" && (
          <WhiteHole key="whitehole" onBack={() => setView("study")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDossier && (
          <DossierPanel
            key={activeDossier}
            dossier={dossiers[activeDossier]}
            onClose={() => setActiveDossier(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

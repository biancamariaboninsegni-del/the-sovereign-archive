import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface SudokuPuzzleProps {
  onBack: () => void;
  onSolve: () => void;
}

// A valid 4x4 Sudoku solution
const solution = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 1, 4, 3],
  [4, 3, 2, 1],
];

// Initial puzzle (0 = empty)
const initial = [
  [1, 0, 3, 0],
  [0, 4, 0, 2],
  [2, 0, 4, 0],
  [0, 3, 0, 1],
];

export const SudokuPuzzle = ({ onBack, onSolve }: SudokuPuzzleProps) => {
  const [grid, setGrid] = useState<number[][]>(
    initial.map((row) => [...row])
  );
  const [solved, setSolved] = useState(false);

  const handleChange = useCallback(
    (r: number, c: number, value: string) => {
      if (initial[r][c] !== 0 || solved) return;
      const num = parseInt(value);
      const newGrid = grid.map((row) => [...row]);
      newGrid[r][c] = isNaN(num) ? 0 : Math.min(4, Math.max(0, num));
      setGrid(newGrid);

      // Check if solved
      const isSolved = newGrid.every((row, ri) =>
        row.every((cell, ci) => cell === solution[ri][ci])
      );
      if (isSolved) {
        setSolved(true);
        setTimeout(onSolve, 800);
      }
    },
    [grid, solved, onSolve]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex items-center justify-center backdrop-focus z-50"
    >
      <div className="relative bg-parchment/95 shadow-lifted rounded-sm p-8 max-w-sm w-full border border-brass/20">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-3 left-3 text-foreground/40 hover:text-foreground transition-colors"
          aria-label="Torna allo studio"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="font-display text-2xl text-foreground text-center mb-1">
          Sudoku 4×4
        </h2>
        <p className="font-handwritten text-sm text-muted-foreground text-center mb-6">
          [ Solve to unlock Flatlandia ]
        </p>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-0 mx-auto w-fit border-2 border-foreground/30">
          {grid.map((row, ri) =>
            row.map((cell, ci) => {
              const isFixed = initial[ri][ci] !== 0;
              const isCorrect = cell === solution[ri][ci] && cell !== 0;
              return (
                <div
                  key={`${ri}-${ci}`}
                  className={`w-14 h-14 flex items-center justify-center
                    ${ci === 1 ? "border-r-2 border-r-foreground/30" : "border-r border-r-foreground/10"}
                    ${ri === 1 ? "border-b-2 border-b-foreground/30" : "border-b border-b-foreground/10"}
                    ${ci === 3 ? "border-r-0" : ""}
                    ${ri === 3 ? "border-b-0" : ""}
                  `}
                >
                  {isFixed ? (
                    <span className="font-display text-xl text-foreground font-semibold">
                      {cell}
                    </span>
                  ) : (
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={cell || ""}
                      onChange={(e) => handleChange(ri, ci, e.target.value)}
                      className={`w-full h-full text-center font-display text-xl bg-transparent outline-none
                        ${isCorrect ? "text-os-green" : "text-brass"}
                        focus:bg-accent/20 transition-colors
                      `}
                      aria-label={`Cella ${ri + 1},${ci + 1}`}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Solved feedback */}
        {solved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center gap-2 text-os-green"
          >
            <Check className="w-5 h-5" />
            <span className="font-display text-lg">Flatlandia si apre...</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

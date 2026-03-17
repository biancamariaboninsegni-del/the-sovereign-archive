import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface FlatlandiaProps {
  onBack: () => void;
  onNext: () => void;
}

export const Flatlandia = ({ onBack, onNext }: FlatlandiaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;
    let angle = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(61, 43, 31, 0.06)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 3D cube projection
      const size = 60;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const cosY = Math.cos(angle * 0.7);
      const sinY = Math.sin(angle * 0.7);

      const vertices3D = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];

      const project = (v: number[]) => {
        let [x, y, z] = v;
        // Rotate Y
        const x2 = x * cos - z * sin;
        const z2 = x * sin + z * cos;
        // Rotate X
        const y2 = y * cosY - z2 * sinY;
        const z3 = y * sinY + z2 * cosY;
        const scale = 200 / (200 + z3 * size);
        return [cx + x2 * size * scale, cy + y2 * size * scale];
      };

      const projected = vertices3D.map(project);

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      ctx.strokeStyle = "hsl(25, 32%, 18%)";
      ctx.lineWidth = 1.5;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(projected[a][0], projected[a][1]);
        ctx.lineTo(projected[b][0], projected[b][1]);
        ctx.stroke();
      });

      // Vertices
      projected.forEach(([x, y]) => {
        ctx.fillStyle = "hsl(43, 46%, 48%)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      angle += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#E6E2D3" }}
    >
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-display text-sm text-foreground/60 hover:text-foreground transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Archive
        </button>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onNext}
          className="flex items-center gap-2 font-display text-sm text-foreground/60 hover:text-foreground transition-colors duration-500"
        >
          White Hole
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-[400px] h-[400px] max-w-[80vw] max-h-[50vh]"
      />

      {/* Narrative */}
      <div className="max-w-lg px-6 mt-8 text-center">
        <h2 className="font-display text-3xl text-foreground/80 mb-4">
          Flatlandia
        </h2>
        <p className="font-display text-sm italic text-foreground/60 leading-relaxed">
          In un mercato spesso appiattito su metriche di superficie, la vera
          strategia richiede di vedere la Terza Dimensione. Ispirata da Edwin
          Abbott, cerco la forma solida dietro i dati, elevando la mente oltre i
          sensi immediati per scoprire nuove dimensioni di valore.
        </p>
      </div>
    </motion.div>
  );
};

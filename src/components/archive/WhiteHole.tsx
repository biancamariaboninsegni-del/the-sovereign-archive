import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";

interface WhiteHoleProps {
  onBack: () => void;
}

export const WhiteHole = ({ onBack }: WhiteHoleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      gold: boolean;
    }[] = [];

    const spawnParticle = () => {
      const cx = w() / 2;
      const cy = h() / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 1.5;
      particles.push({
        x: cx + (Math.random() - 0.5) * 4,
        y: cy + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        size: 0.5 + Math.random() * 1.5,
        gold: Math.random() > 0.7,
      });
    };

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // Proximity to center affects spawn rate
      const mx = mouseRef.current.x * w();
      const my = mouseRef.current.y * h();
      const dist = Math.hypot(mx - w() / 2, my - h() / 2);
      const spawnRate = dist < 200 ? 8 : 3;

      for (let i = 0; i < spawnRate; i++) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - progress;

        if (p.life >= p.maxLife || alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = p.gold
          ? `hsl(43, 46%, ${48 + progress * 30}%)`
          : `hsl(0, 0%, ${85 + progress * 15}%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Central glow
      ctx.globalAlpha = 0.6;
      const grad = ctx.createRadialGradient(
        w() / 2, h() / 2, 0,
        w() / 2, h() / 2, 30
      );
      grad.addColorStop(0, "hsl(43, 60%, 85%)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(w() / 2 - 30, h() / 2 - 30, 60, 60);

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / w(), y: e.clientY / h() };
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0"
      style={{ backgroundColor: "hsl(19, 27%, 6%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-display text-sm text-parchment/50 hover:text-parchment transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Archive
        </button>
      </div>

      {/* Narrative overlay */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-lg text-center z-10 px-6">
        <h2 className="font-display text-2xl text-parchment/40 mb-3">
          White Hole
        </h2>
        <p className="font-display text-sm italic text-parchment/30 leading-relaxed">
          Un Buco Bianco è l'antitesi del vuoto: una singolarità che emette luce
          e materia. Applico questa visione al Brand Management: trasformo
          l'heritage di marchi come Campari o Richemont da archivi statici in
          punti di emissione, dove l'informazione del passato rimbalza nel futuro
          come nuova energia digitale.
        </p>
      </div>
    </motion.div>
  );
};

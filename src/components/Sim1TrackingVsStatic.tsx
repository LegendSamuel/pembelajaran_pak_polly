import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Lightbulb, ChevronDown, CheckCircle, Video, Eye } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { quizQuestions } from '../data/quizData';
import { sound } from '../utils/sound';

interface Sim1Props {
  onScoreUpdate: (id: number, correct: boolean) => void;
  quizStatus: boolean;
}

export const Sim1TrackingVsStatic: React.FC<Sim1Props> = ({
  onScoreUpdate,
  quizStatus,
}) => {
  const [mode, setMode] = useState<0 | 1>(0); // 0 = Diam, 1 = Tracking
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Simulation physics variables
  const tRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const L = 12; // Length of hallway
  const VS = 1.8; // Student speed (m/s)
  const S0 = 1.5; // Initial student offset
  const F = 4.2; // Focal length perspective

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const vY = H * 0.44; // Vanishing point Y
    const vw = 26; // Corridor width at horizon

    const render = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (isPlaying) {
        tRef.current += dt;
        if (tRef.current > L / VS + 1.2) {
          tRef.current = 0; // Loop simulation
        }
      }

      const t = tRef.current;
      // Camera position: in mode 0, camera is static (0). In mode 1, camera tracks student.
      const studentZ = S0 + Math.min(VS * t, L);
      const camZ = mode === 1 ? Math.min(VS * t, L) : 0;
      const d = studentZ - camZ;

      // Perspective projection helper
      const projectAt = (z: number) => {
        const dist = z - camZ;
        if (dist < 0.18) return null;
        const scale = F / (dist + F);
        return {
          dist,
          scale,
          y: vY + (H - vY) * scale,
          halfW: 2.6 * 64 * scale,
        };
      };

      // 1. Clear background & draw walls
      const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
      wallGrad.addColorStop(0, '#1a2233');
      wallGrad.addColorStop(1, '#0d131f');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, W, H);

      // Floor
      ctx.fillStyle = '#222c3d';
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(W, H);
      ctx.lineTo(W / 2 + vw, vY);
      ctx.lineTo(W / 2 - vw, vY);
      ctx.closePath();
      ctx.fill();

      // Ceiling shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(W, 0);
      ctx.lineTo(W / 2 + vw, vY);
      ctx.lineTo(W / 2 - vw, vY);
      ctx.closePath();
      ctx.fill();

      // 2. Floor tiles and lockers from back to front
      const z0 = Math.max(-1, Math.floor(camZ / 1.6) * 1.6);
      const z1 = camZ + 18;

      for (let z = z1; z >= z0; z -= 1.6) {
        const p = projectAt(z);
        if (!p) continue;
        const alpha = Math.min(0.7, 0.15 + 0.5 * p.scale);

        // Floor line
        ctx.strokeStyle = `rgba(255, 209, 102, ${alpha.toFixed(2)})`;
        ctx.lineWidth = 2 * p.scale;
        ctx.beginPath();
        ctx.moveTo(W / 2 - p.halfW, p.y);
        ctx.lineTo(W / 2 + p.halfW, p.y);
        ctx.stroke();

        // Lockers on sides
        const lc = projectAt(z + 0.35);
        if (lc) {
          const lockerH = (vY - (vY - H * 0.12)) * lc.scale;
          const ly = vY - lockerH;
          const lockerW = 0.95 * 64 * lc.scale;

          ctx.fillStyle = '#2d3b50';
          // Left locker
          ctx.fillRect(W / 2 - lc.halfW, ly, lockerW, lc.y - ly);
          // Right locker
          ctx.fillRect(W / 2 + lc.halfW - lockerW, ly, lockerW, lc.y - ly);

          // Locker ventilation slits
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.fillRect(W / 2 - lc.halfW + lockerW * 0.25, ly + lockerW * 0.2, lockerW * 0.5, 3 * lc.scale);
          ctx.fillRect(W / 2 + lc.halfW - lockerW * 0.75, ly + lockerW * 0.2, lockerW * 0.5, 3 * lc.scale);
        }
      }

      // 3. Classroom Door at end of hall (Z = S0 + L)
      const doorP = projectAt(S0 + L);
      if (doorP) {
        const dTop = vY - (vY - H * 0.14) * doorP.scale;
        const dBot = vY + (H * 0.5) * doorP.scale;
        const halfDw = 1.05 * 64 * doorP.scale;

        // Door frame glow
        ctx.fillStyle = '#b45309';
        ctx.fillRect(W / 2 - halfDw, dTop, halfDw * 2, dBot - dTop);

        // Door slit/window
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(W / 2 - halfDw * 0.2, dTop + 10 * doorP.scale, halfDw * 0.4, (dBot - dTop) * 0.4);

        // Door label
        ctx.fillStyle = '#ffd166';
        ctx.font = `bold ${Math.max(10, 20 * doorP.scale)}px 'Plus Jakarta Sans', system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText('KELAS 10-A', W / 2, dTop - 8 * doorP.scale);

        // Door outline
        ctx.strokeStyle = `rgba(255, 209, 102, ${Math.min(1, 0.4 + 0.6 * doorP.scale)})`;
        ctx.lineWidth = 2 * doorP.scale;
        ctx.strokeRect(W / 2 - halfDw, dTop, halfDw * 2, dBot - dTop);
      }

      // 4. Student character
      if (d >= 0.18) {
        const s = F / (d + F);
        const foot = vY + (H * 0.54) * s;
        const h = 120 * s;
        const w = 38 * s;
        const x = W / 2;

        const isMoving = studentZ < S0 + L;
        const legBob = isMoving ? Math.sin(t * 10) * 2.5 * s : 0;
        const legSwing = isMoving ? Math.sin(t * 10) * 9 * s : 0;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.ellipse(x, foot + 3 * s, w * 0.75, 5 * s, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x - w * 0.32 + legSwing, foot - 33 * s, w * 0.28, 33 * s);
        ctx.fillRect(x + w * 0.05 - legSwing, foot - 33 * s, w * 0.28, 33 * s);

        // Body (Jacket)
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x - w * 0.42, foot - 80 * s + legBob, w * 0.84, 50 * s, 7 * s);
        } else {
          ctx.rect(x - w * 0.42, foot - 80 * s + legBob, w * 0.84, 50 * s);
        }
        ctx.fill();

        // Backpack
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x - w * 0.7, foot - 73 * s + legBob, w * 0.32, 32 * s, 5 * s);
        } else {
          ctx.rect(x - w * 0.7, foot - 73 * s + legBob, w * 0.32, 32 * s);
        }
        ctx.fill();

        // Head
        ctx.fillStyle = '#f0bd8b';
        ctx.beginPath();
        ctx.arc(x, foot - 90 * s + legBob, 11 * s, 0, Math.PI * 2);
        ctx.fill();

        // Hair
        ctx.fillStyle = '#29180d';
        ctx.beginPath();
        ctx.arc(x, foot - 94 * s + legBob, 11 * s, Math.PI, 0);
        ctx.fill();

        // If distance is huge (mode 0), show distance warning
        if (mode === 0 && d > 6) {
          ctx.fillStyle = '#ffd166';
          ctx.font = "bold 15px 'Plus Jakarta Sans', system-ui";
          ctx.textAlign = 'center';
          ctx.fillText(`Siswa menjauh ... (${d.toFixed(1)}m)`, W / 2, foot - 110 * s);
        }
      }

      // 5. Cine Viewfinder Overlay on Simulation Canvas
      // Corner markers
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      const m = 18;
      const cLen = 22;
      const corners = [
        [m, m, 1, 1],
        [W - m, m, -1, 1],
        [m, H - m, 1, -1],
        [W - m, H - m, -1, -1],
      ];
      corners.forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx + dx * cLen, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + dy * cLen);
        ctx.stroke();
      });

      // HUD Text
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ff4d5e';
      ctx.beginPath();
      ctx.arc(38, 38, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = "bold 16px ui-monospace, Consolas, monospace";
      ctx.fillText(`REC · ${mode === 1 ? 'TRACKING SHOT (FOLLOW)' : 'KAMERA DIAM (STATIC)'}`, 52, 43);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#48d6ff';
      ctx.font = "bold 14px ui-monospace, Consolas, monospace";
      ctx.fillText(`JARAK KAMERA: ${d.toFixed(1)} METER`, W - 38, 43);

      animRef.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mode, isPlaying]);

  const handleModeChange = (newMode: 0 | 1) => {
    sound.playClick();
    setMode(newMode);
    tRef.current = 0;
    setIsPlaying(true);
  };

  return (
    <section id="p1" className="py-16 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl sm:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] select-none">
            01
          </span>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold uppercase tracking-wider mb-2 border border-orange-500/20">
              Pertanyaan 01
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Teknik kamera apa yang paling tepat?
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Pikirkan sebagai sutradara: agar siswa tetap terbingkai jelas hingga menyentuh pintu kelas, kamera sebaiknya diam di tempat atau ikut melangkah?
            </p>
          </div>
        </div>

        {/* Guess First Reveal Accordion */}
        <div className="mb-8">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              sound.playClick();
              setShowAnswer(!showAnswer);
            }}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 border border-white/10 dark:border-white/10 light:border-slate-200 text-sm font-bold text-amber-300 dark:text-amber-300 light:text-amber-700 shadow-sm transition-all"
          >
            <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{showAnswer ? 'Sembunyikan Jawaban Inti' : 'Tebak Dulu, Lalu Buka Jawaban'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAnswer ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 dark:text-emerald-200 light:text-emerald-900 shadow-lg">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 mb-1">
                    <CheckCircle className="w-4 h-4" /> Jawaban Sutradara Profesional
                  </div>
                  <p className="text-sm leading-relaxed">
                    Gunakan <strong>Tracking Shot</strong>, secara khusus jenis <strong>Follow Shot dari belakang</strong>. 
                    Kamera bergerak maju mengikuti siswa secara simultan, bukan diam membeku di titik awal. Hal ini mempertahankan ukuran subjek di layar dan mengalirkan dinamika visual.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Simulation Card */}
        <div className="rounded-3xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 overflow-hidden shadow-2xl">
          
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-slate-900/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-extrabold text-sm text-white dark:text-white light:text-slate-900">
                Simulasi Interaktif · Perbandingan Visual
              </span>
            </div>

            {/* Mode Toggle Buttons */}
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => handleModeChange(0)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === 0
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Kamera Diam (Statis)
              </button>
              <button
                onClick={() => handleModeChange(1)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === 1
                    ? 'bg-gradient-to-r from-[#ff8a3d] to-[#ffd166] text-slate-950 shadow-md shadow-orange-500/30 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tracking Shot (Follow)
              </button>
            </div>
          </div>

          {/* Canvas Screen */}
          <div className="relative aspect-[16/7] w-full bg-slate-950 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={960}
              height={420}
              className="w-full h-full block object-contain"
            />
            {/* Scanlines */}
            <div className="scanlines-overlay absolute inset-0 pointer-events-none" />
          </div>

          {/* Dynamic Status Callout */}
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 bg-black/20">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold flex-1 ${
              mode === 1
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <span className="text-xl">{mode === 1 ? '🎥' : '📹'}</span>
              <span>
                {mode === 1
                  ? 'Tracking shot: Jarak kamera–siswa tetap konsisten (~1.5m), siswa selalu menjadi pusat fokus, penonton diajak ikut melangkah.'
                  : 'Kamera diam: Siswa kian mengecil menjauh ke ujung lorong, keluar dari titik fokus. Penonton terisolasi sebagai pengamat luar.'}
              </span>
            </div>

            {/* Play/Pause & Replay */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'Jeda' : 'Lanjut'}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  tRef.current = 0;
                  setIsPlaying(true);
                }}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all"
                title="Putar Ulang dari Awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Embedded Quiz 1 */}
        <QuizCard
          question={quizQuestions[0]}
          onAnswer={onScoreUpdate}
          isAnswered={quizStatus}
        />

      </div>
    </section>
  );
};

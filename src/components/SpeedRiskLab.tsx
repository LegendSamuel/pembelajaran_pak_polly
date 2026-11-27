import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Play, Pause, RotateCcw, Lightbulb, ChevronDown, CheckCircle, Zap, ShieldAlert, Sparkles, Gauge } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { quizQuestions } from '../data/quizData';
import { sound } from '../utils/sound';

interface SpeedRiskLabProps {
  onScoreUpdate: (id: number, correct: boolean) => void;
  quizStatus: boolean;
}

export const SpeedRiskLab: React.FC<SpeedRiskLabProps> = ({
  onScoreUpdate,
  quizStatus,
}) => {
  const [speed, setSpeed] = useState<number>(1.0); // 0.5x to 2.0x
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shakingCard, setShakingCard] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  const L = 12;
  const VS = 1.8;
  const S0 = 1.5;
  const F = 4.2;

  // Real-time canvas simulation for speed sync & destabilization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const vY = H * 0.44;
    const vw = 26;

    const render = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (isPlaying) {
        tRef.current += dt;
        if (tRef.current > L / VS + 1.2) {
          tRef.current = 0;
        }
      }

      const t = tRef.current;
      const studentZ = S0 + Math.min(VS * t, L);
      // Camera speed = speed multiplier * student speed
      const camZ = Math.min(speed * VS * t, L + 5);
      const d = studentZ - camZ;

      // Calculate camera shake intensity when speed > 1.2x
      const isOverspeed = speed > 1.15;
      const shakeAmt = isOverspeed ? Math.min((speed - 1.1) * 16, 18) : 0;
      const shakeX = shakeAmt > 0 ? (Math.random() - 0.5) * shakeAmt : 0;
      const shakeY = shakeAmt > 0 ? (Math.random() - 0.5) * shakeAmt : 0;

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Perspective projection
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

      // 1. Clear background
      const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
      wallGrad.addColorStop(0, '#161e2e');
      wallGrad.addColorStop(1, '#0a101d');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, W, H);

      // Floor
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(W, H);
      ctx.lineTo(W / 2 + vw, vY);
      ctx.lineTo(W / 2 - vw, vY);
      ctx.closePath();
      ctx.fill();

      // Ceiling
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(W, 0);
      ctx.lineTo(W / 2 + vw, vY);
      ctx.lineTo(W / 2 - vw, vY);
      ctx.closePath();
      ctx.fill();

      // Floor tiles and lockers
      const z0 = Math.max(-1, Math.floor(camZ / 1.6) * 1.6);
      const z1 = camZ + 18;

      for (let z = z1; z >= z0; z -= 1.6) {
        const p = projectAt(z);
        if (!p) continue;
        const alpha = Math.min(0.7, 0.15 + 0.5 * p.scale);

        ctx.strokeStyle = `rgba(255, 209, 102, ${alpha.toFixed(2)})`;
        ctx.lineWidth = 2 * p.scale;
        ctx.beginPath();
        ctx.moveTo(W / 2 - p.halfW, p.y);
        ctx.lineTo(W / 2 + p.halfW, p.y);
        ctx.stroke();

        const lc = projectAt(z + 0.35);
        if (lc) {
          const lockerH = (vY - (vY - H * 0.12)) * lc.scale;
          const ly = vY - lockerH;
          const lockerW = 0.95 * 64 * lc.scale;
          ctx.fillStyle = '#2d3b50';
          ctx.fillRect(W / 2 - lc.halfW, ly, lockerW, lc.y - ly);
          ctx.fillRect(W / 2 + lc.halfW - lockerW, ly, lockerW, lc.y - ly);
        }
      }

      // Door at end
      const doorP = projectAt(S0 + L);
      if (doorP) {
        const dTop = vY - (vY - H * 0.14) * doorP.scale;
        const dBot = vY + (H * 0.5) * doorP.scale;
        const halfDw = 1.05 * 64 * doorP.scale;

        ctx.fillStyle = '#b45309';
        ctx.fillRect(W / 2 - halfDw, dTop, halfDw * 2, dBot - dTop);

        ctx.fillStyle = '#ffd166';
        ctx.font = `bold ${Math.max(10, 20 * doorP.scale)}px 'Plus Jakarta Sans', system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText('KELAS 10-A', W / 2, dTop - 8 * doorP.scale);
      }

      // Student drawing or Overtake warning
      if (d < 0.18) {
        // OVERTAKEN! Camera passed the student!
        ctx.fillStyle = '#ff4d5e';
        ctx.font = "bold 26px 'Plus Jakarta Sans', system-ui";
        ctx.textAlign = 'center';
        ctx.fillText('⚠️ KAMERA MENYALIP SISWA!', W / 2, H * 0.52);
        ctx.font = "16px 'Plus Jakarta Sans', system-ui";
        ctx.fillStyle = '#ffd166';
        ctx.fillText('Siswa tertinggal di belakang lensa — framing hancur!', W / 2, H * 0.59);
      } else if (d > 7) {
        // TOO SLOW! Student far away
        ctx.fillStyle = '#94a3b8';
        ctx.font = "bold 22px 'Plus Jakarta Sans', system-ui";
        ctx.textAlign = 'center';
        ctx.fillText('🐢 SISWA MAKIN MENJAUH DARI BINGKAI ...', W / 2, H * 0.52);
      } else {
        // Normal rendering of student
        const s = F / (d + F);
        const foot = vY + (H * 0.54) * s;
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

        // Body
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
      }

      // HUD overlay
      ctx.textAlign = 'left';
      ctx.fillStyle = speed > 1.2 ? '#ff4d5e' : speed < 0.9 ? '#ffd166' : '#4ade80';
      ctx.beginPath();
      ctx.arc(38, 38, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = "bold 15px ui-monospace, Consolas, monospace";
      ctx.fillText(`SPEED: ${speed.toFixed(2)}x ${speed === 1 ? '(SINKRON)' : speed > 1 ? '(TERLALU CEPAT)' : '(TERLALU LAMBAT)'}`, 52, 43);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#48d6ff';
      ctx.fillText(`JARAK: ${Math.max(0, d).toFixed(1)}m`, W - 38, 43);

      ctx.restore();

      animRef.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [speed, isPlaying]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSpeed(val);
    if (val > 1.5) {
      sound.playWrong();
    }
  };

  const riskCards = [
    {
      id: 0,
      icon: "🎬",
      title: "Suasana Adegan Berubah",
      desc: "Adegan berjalan tenang menuju kelas tiba-tiba terasa seperti adegan kejar-kejaran aksi laga yang tegang, padahal sutradara tidak menginginkannya.",
      triggerSpeed: 1.2
    },
    {
      id: 1,
      icon: "📳",
      title: "Gambar Bergetar & Motion Blur",
      desc: "Kamera yang melaju terlalu cepat di lorong sempit sangat sulit distabilkan. Gambar menjadi goyah, berbayang, dan kehilangan ketajaman fokus.",
      triggerSpeed: 1.35
    },
    {
      id: 2,
      icon: "😵",
      title: "Penonton Mengalami Disorientasi",
      desc: "Gerakan terlalu cepat dan hentakan kamera yang tidak sinkron membuat mata penonton lelah, kehilangan orientasi spasial, hingga pusing.",
      triggerSpeed: 1.5
    }
  ];

  return (
    <section id="p4" className="py-16 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl sm:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] select-none">
            04
          </span>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold uppercase tracking-wider mb-2 border border-orange-500/20">
              Pertanyaan 04
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Apa risikonya kalau kamera terlalu cepat?
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Uji coba langsung di Speed Risk Lab. Geser pengatur kecepatan kamera dan amati bagaimana ketidaksinkronan merusak framing dan kestabilan gambar.
            </p>
          </div>
        </div>

        {/* Guess First Reveal */}
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
                    <strong>Suasana adegan berubah drastis</strong>, gambar <strong>bergetar hebat/blur</strong>, penonton <strong>merasa pusing</strong>, dan kamera bisa <strong>menyalip siswa</strong> sehingga subjek tertinggal di belakang lensa.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Speed Risk Lab Interactive Sandbox */}
        <div className="rounded-3xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 overflow-hidden shadow-2xl mb-8">
          
          {/* Top Info & Speed Slider */}
          <div className="p-6 bg-slate-900/50 border-b border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-orange-400" />
                <span className="font-extrabold text-base text-white">
                  Pengatur Kecepatan Gerak Kamera (Dolly Speed)
                </span>
              </div>
              <div className="font-mono text-2xl font-black text-amber-300">
                {speed.toFixed(2)}x
              </div>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={speed}
                onChange={handleSpeedChange}
                className="w-full h-3 bg-gradient-to-r from-cyan-500 via-emerald-500 to-rose-500 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
                <span>0.50x (Terlalu Lambat)</span>
                <span className="text-emerald-400 font-bold">1.00x (Sinkron Presisi)</span>
                <span>2.00x (Terlalu Cepat)</span>
              </div>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative aspect-[16/7] w-full bg-slate-950 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={960}
              height={420}
              className={`w-full h-full block object-contain transition-all duration-150 ${
                speed > 1.3 ? 'filter blur-[1.5px]' : ''
              }`}
            />
            <div className="scanlines-overlay absolute inset-0 pointer-events-none" />
          </div>

          {/* Status Message */}
          <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 bg-black/20">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold flex-1 ${
              Math.abs(speed - 1) <= 0.08
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : speed > 1
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <span className="text-xl">
                {Math.abs(speed - 1) <= 0.08 ? '✅' : speed > 1 ? '⚠️' : '🐢'}
              </span>
              <span>
                {Math.abs(speed - 1) <= 0.08
                  ? 'Sinkron Sempurna: Kecepatan kamera sama persis dengan tempo langkah siswa. Framing stabil & mulus.'
                  : speed > 1.2
                  ? 'Bahaya: Kecepatan kamera melebihi siswa! Kamera menyalip dan subjek tertinggal di belakang lensa.'
                  : 'Terlalu Lambat: Siswa menjauh dan keluar dari fokus bingkai (efek mengikuti hilang).'}
              </span>
            </div>

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
                  setSpeed(1.0);
                  tRef.current = 0;
                  setIsPlaying(true);
                }}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1"
                title="Reset ke 1.00x Sinkron"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset 1.0x
              </button>
            </div>
          </div>

        </div>

        {/* 3 Risk Highlight Cards with Interactive Trigger */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {riskCards.map((card) => {
            const isDanger = speed >= card.triggerSpeed;
            return (
              <motion.div
                key={card.id}
                animate={isDanger ? { x: [-2, 2, -2, 2, 0] } : {}}
                transition={{ repeat: isDanger ? Infinity : 0, duration: 0.2 }}
                onClick={() => {
                  sound.playWrong();
                  setShakingCard(card.id);
                  setTimeout(() => setShakingCard(null), 500);
                }}
                className={`p-6 rounded-3xl border transition-all cursor-pointer glass-panel ${
                  isDanger
                    ? 'border-rose-500/60 bg-rose-500/10 shadow-xl shadow-rose-500/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-3xl mb-3 flex items-center justify-between">
                  <span>{card.icon}</span>
                  {isDanger && (
                    <span className="text-[10px] font-mono font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase animate-pulse">
                      Terpicu pada {speed.toFixed(2)}x
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Embedded Quiz 4 */}
        <QuizCard
          question={quizQuestions[3]}
          onAnswer={onScoreUpdate}
          isAnswered={quizStatus}
        />

      </div>
    </section>
  );
};

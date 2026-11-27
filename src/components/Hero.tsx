import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Camera, Film, Grid, Sparkles, BatteryMedium, Disc } from 'lucide-react';
import { sound } from '../utils/sound';

export const Hero: React.FC = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const posterRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Cinematic Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ffd166] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              Modul 01 · Sinematografi Film Pendek
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white dark:text-white light:text-slate-900">
              Kamera yang{' '}
              <span className="bg-gradient-to-r from-[#ff8a3d] via-[#ffd166] to-[#48d6ff] bg-clip-text text-transparent underline decoration-orange-500/30 decoration-wavy">
                Ikut Berjalan
              </span>{' '}
              Bikin Adegan Hidup.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed max-w-xl">
              Kamu adalah <strong className="text-white dark:text-white light:text-slate-900 font-bold">sutradara</strong> film pendek. 
              Rekam adegan seorang siswa menyusuri lorong sekolah menuju kelas — lalu <strong className="text-amber-400 font-bold">membuka pintunya</strong>. 
              Kamera diam terasa kaku. Ada teknik legendaris yang mengubah segalanya: <strong className="text-[#48d6ff] font-bold">Tracking Shot</strong>.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#p1"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff8a3d] to-[#ffd166] text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center gap-2 group"
              >
                Mulai Eksplorasi
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#video"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 border border-white/10 dark:border-white/10 light:border-slate-200 text-white dark:text-white light:text-slate-800 font-bold text-sm flex items-center gap-2 transition-all shadow-sm"
              >
                <Play className="w-4 h-4 text-orange-400 fill-orange-400" />
                Putar Video Pembahasan
              </motion.a>

              <button
                onClick={() => {
                  sound.playShutter();
                  setShowGrid(!showGrid);
                }}
                className={`p-3.5 rounded-xl border transition-all ${
                  showGrid
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Toggle Rule of Thirds Cine Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10 dark:border-white/10 light:border-slate-200">
              <div>
                <div className="text-2xl font-black text-amber-400">04</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pertanyaan</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#ff8a3d]">02</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Simulasi</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#48d6ff]">04</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Kuis Interaktif</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Praktik Bebas</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Cine Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div
              ref={posterRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#0f172a] to-[#070b13] group select-none cursor-crosshair"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Dynamic perspective inner wrapper */}
              <motion.div
                animate={{
                  rotateX: -mousePos.y * 0.4,
                  rotateY: mousePos.x * 0.4,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="w-full h-full relative"
              >
                {/* 3D Hallway Environment */}
                {/* Ceiling */}
                <div 
                  className="absolute inset-0 origin-top"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 58% 46%, 42% 46%)',
                    background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 60px), linear-gradient(#0d1524, #1a2538)',
                  }}
                />

                {/* Left Wall */}
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 0, 42% 46%, 42% 56%, 0 100%)',
                    background: 'repeating-linear-gradient(90deg, #1e293b 0 35px, #0f172a 35px 40px)',
                  }}
                />

                {/* Right Wall */}
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(100% 0, 58% 46%, 58% 56%, 100% 100%)',
                    background: 'repeating-linear-gradient(90deg, #0f172a 0 35px, #1e293b 35px 40px)',
                  }}
                />

                {/* Floor with Perspective Grid */}
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 58% 56%, 42% 56%)',
                    background: 'repeating-linear-gradient(0deg, rgba(255,209,102,0.12) 0 2px, transparent 2px 45px), linear-gradient(#1e293b, #0a101c)',
                  }}
                />

                {/* End Door */}
                <div className="absolute left-[45.5%] top-[40%] w-[9%] h-[16.5%] rounded-t-sm bg-gradient-to-br from-amber-600 to-amber-900 shadow-[0_0_35px_rgba(255,209,102,0.6)] border border-amber-400/40 flex items-center justify-center">
                  <span className="absolute -top-4 font-mono font-bold text-[8px] text-amber-300 tracking-wider">
                    KELAS
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#ffd166] mr-4" />
                </div>

                {/* Student Character Walking (Animated) */}
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[24%] w-8 h-20 flex flex-col items-center"
                >
                  {/* Head */}
                  <div className="w-4 h-4 rounded-full bg-[#f0bd8b] shadow-md shadow-orange-500/20" />
                  {/* Torso & Backpack */}
                  <div className="w-6 h-9 rounded-md bg-blue-600 relative shadow-sm">
                    <div className="absolute -left-1.5 top-1 w-3 h-6 rounded bg-slate-900 border border-slate-700" />
                  </div>
                  {/* Legs */}
                  <div className="flex gap-1 -mt-0.5">
                    <motion.div 
                      animate={{ rotate: [-15, 15, -15] }} 
                      transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
                      className="w-2 h-7 bg-slate-800 rounded-sm origin-top" 
                    />
                    <motion.div 
                      animate={{ rotate: [15, -15, 15] }} 
                      transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
                      className="w-2 h-7 bg-slate-800 rounded-sm origin-top" 
                    />
                  </div>
                </motion.div>

                {/* Following Camera Icon */}
                <motion.div
                  animate={{
                    y: [0, -2, 0],
                    scale: [1.1, 1.13, 1.1]
                  }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.1, ease: 'easeInOut' }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[14%] flex items-center gap-1 bg-slate-900/90 border border-cyan-400/50 px-2 py-1 rounded-lg shadow-[0_0_20px_rgba(72,214,255,0.4)]"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-cyan-300">CAM A</span>
                </motion.div>

                {/* Light beam sweeping */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[sweep_5s_ease-in-out_infinite]" />
              </motion.div>

              {/* Viewfinder Rule of Thirds Grid Overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-20">
                  <div className="border-r border-b border-cyan-400/30" />
                  <div className="border-r border-b border-cyan-400/30" />
                  <div className="border-b border-cyan-400/30" />
                  <div className="border-r border-b border-cyan-400/30" />
                  <div className="border-r border-b border-cyan-400/30" />
                  <div className="border-b border-cyan-400/30" />
                  <div className="border-r border-cyan-400/30" />
                  <div className="border-r border-cyan-400/30" />
                  <div />
                </div>
              )}

              {/* Cine Viewfinder HUD Overlays */}
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/60 pointer-events-none" />

              {/* Top HUD */}
              <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs font-mono font-bold text-white pointer-events-none z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400 font-extrabold tracking-wider">REC</span>
                  <span className="text-slate-300">RAW 4K</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span>ISO 800</span>
                  <span>f/2.8</span>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <BatteryMedium className="w-3.5 h-3.5" />
                    <span>94%</span>
                  </div>
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono font-bold pointer-events-none z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="text-cyan-300 flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>DOLLY · BEHIND</span>
                </div>
                <div className="text-amber-400 tracking-wider">
                  TRACKING SHOT 35mm
                </div>
              </div>

              {/* Scanlines Effect */}
              <div className="scanlines-overlay absolute inset-0 z-20" />
            </div>

            {/* Floating Info Tags */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 glass-panel p-3 rounded-xl border border-white/10 shadow-2xl z-30 hidden sm:flex items-center gap-2.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#ffd166]" />
              <div className="text-xs font-bold text-amber-200">
                Jarak Kamera = Tetap Sinkron
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-panel p-3 rounded-xl border border-white/10 shadow-2xl z-30 hidden sm:flex items-center gap-2.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#48d6ff]" />
              <div className="text-xs font-bold text-cyan-200">
                Penonton Ikut Melangkah Masuk
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

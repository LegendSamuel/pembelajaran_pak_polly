import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Video, Sun, Moon, Volume2, VolumeX, Clapperboard, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  soundEnabled: boolean;
  setSoundEnabled: (s: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSec, setActiveSec] = useState('hero');
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'kasus', 'p1', 'p2', 'p3', 'p4', 'video', 'rangkuman'];
      const scrollPos = window.scrollY + 160;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSec(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timecode generator
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      const frames = Math.floor((elapsed % 1000) / 41.6).toString().padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'kasus', label: 'Kasus' },
    { id: 'p1', label: '1 · Teknik' },
    { id: 'p2', label: '2 · Cara' },
    { id: 'p3', label: '3 · Tujuan' },
    { id: 'p4', label: '4 · Risiko' },
    { id: 'video', label: 'Video' },
    { id: 'rangkuman', label: 'Rangkuman' },
  ];

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff8a3d] via-[#ffd166] to-[#48d6ff] z-50 origin-left shadow-[0_0_15px_rgba(255,138,61,0.8)]"
        style={{ scaleX }}
      />

      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070b13]/80 dark:bg-[#070b13]/80 light:bg-white/85 border-b border-white/10 dark:border-white/10 light:border-slate-200 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand */}
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 font-black text-sm tracking-widest uppercase group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff8a3d] to-[#ffd166] flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Clapperboard className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight text-base">
              SINE<span className="text-[#ff8a3d]">LAB</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-orange-500/10 text-orange-400 dark:text-orange-300 light:text-orange-600 px-2 py-0.5 rounded-full border border-orange-500/20 font-mono font-medium">
              <Sparkles className="w-2.5 h-2.5" /> PRO
            </span>
          </a>

          {/* Timecode for Cine Aesthetic */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-slate-500 text-[10px]">TC:</span>
            <span className="text-amber-400/90 font-semibold">{timecode}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-[10px]">24.00 FPS</span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {navItems.map((item) => {
              const isActive = activeSec === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => sound.playClick()}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-black hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#ff8a3d] to-[#ffd166] rounded-full shadow-lg shadow-orange-500/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Sound & Theme */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                sound.enabled = next;
                if (next) sound.playClick();
              }}
              title={soundEnabled ? "Nonaktifkan Efek Suara" : "Aktifkan Efek Suara"}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-orange-500/10 border-orange-500/30 text-[#ff8a3d]'
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              title="Ganti Tema Studio"
              className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:scale-105 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            <a
              href="#p1"
              onClick={() => sound.playClick()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff8a3d] to-[#ffd166] text-slate-950 font-bold text-xs shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Video className="w-3.5 h-3.5" />
              Mulai Belajar
            </a>
          </div>

        </div>
      </header>
    </>
  );
};

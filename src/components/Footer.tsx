import React from 'react';
import { Clapperboard, Heart, Sparkles, ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 dark:border-white/10 light:border-slate-200 py-12 bg-[#070b13]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff8a3d] to-[#ffd166] flex items-center justify-center text-slate-950 font-black shadow-md shadow-orange-500/20">
            <Clapperboard className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm tracking-tight">
              SINE<span className="text-orange-400">LAB</span> · CineLab Interactive Edition
            </div>
            <div className="text-xs text-slate-500">
              Modul Edukasi Sinematografi & Penguasaan Kamera Film Pendek
            </div>
          </div>
        </div>

        {/* Center note */}
        <div className="text-xs text-slate-400 text-center">
          Dibuat dengan React 19, Tailwind CSS, & Framer Motion untuk pengalaman belajar interaktif yang imersif.
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Kembali ke Atas
        </button>

      </div>
    </footer>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, RotateCcw, Sparkles, Trophy, Film, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface ScorecardSummaryProps {
  score: number;
  total: number;
  onResetAll: () => void;
}

export const ScorecardSummary: React.FC<ScorecardSummaryProps> = ({
  score,
  total,
  onResetAll,
}) => {
  const percentage = Math.round((score / total) * 100);

  // Trigger confetti when score is 4/4
  React.useEffect(() => {
    if (score === total && total > 0) {
      sound.playVictory();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff8a3d', '#ffd166', '#48d6ff', '#4ade80', '#fb7185']
      });
    }
  }, [score, total]);

  const getRank = () => {
    if (score === 4) return { title: "Master Director of Photography", badge: "🏆 DoP Bintang 5", desc: "Pemahaman sinematografi tingkat tinggi! Kamu siap mengarahkan camera operator di set sesungguhnya." };
    if (score === 3) return { title: "Camera Operator Mahir", badge: "🎥 Operator Utama", desc: "Sangat baik! Sebagian besar teori dan risiko teknis tracking shot sudah kamu kuasai." };
    if (score === 2) return { title: "Assistant Camera (Focus Puller)", badge: "🎬 Kru Kamera", desc: "Cukup baik. Ulangi simulasi pergerakan kamera untuk mempertajam intuisi sinematikmu." };
    return { title: "Rookie Film Enthusiast", badge: "🍿 Penonton Magang", desc: "Ayo pelajari kembali 4 pertanyaan di atas dan coba kuasai setiap simulasi!" };
  };

  const rank = getRank();

  return (
    <section id="rangkuman" className="py-16 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <span className="text-5xl sm:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] select-none">
            ✓
          </span>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-2 border border-emerald-500/20">
              Penutup & Evaluasi
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Rangkuman Sutradara & Skor Kuis
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Empat pilar utama yang wajib diingat sebelum action dimulai di lokasi syuting.
            </p>
          </div>
        </div>

        {/* 2-Column Summary & Scorecard */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Key Takeaways Card (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <h3 className="font-extrabold text-xl text-white dark:text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <Film className="w-5 h-5 text-orange-400" />
              4 Prinsip Kunci Sinematografi Tracking Shot:
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sm text-amber-300">Teknik: Tracking Shot (Follow Shot Belakang)</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Kamera bergerak maju mengikuti karakter dari belakang, menjaga komposisi subjek tetap berada di dalam frame.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-sm text-cyan-300">Cara: Stabilizer & Sinkronisasi Kecepatan</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Gunakan Dolly, Steadicam, atau Gimbal. Kecepatan kamera harus persis sama dengan tempo langkah siswa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-300">Tujuan: Menghidupkan Adegan & Membangun Rasa Ingin Tahu</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Menghilangkan kekakuan shot diam, memicu motion parallax, dan mengajak penonton ikut berjalan menuju pintu kelas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-sm text-rose-300">Risiko: Desinkronisasi Kecepatan</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Jika terlalu kencang kamera menyalip siswa, memicu getaran blur hebat, dan membuat penonton pusing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Director Scorecard (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Circular Progress Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/10"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="url(#scoreGrad)"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={2 * Math.PI * 58 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff8a3d" />
                    <stop offset="50%" stopColor="#ffd166" />
                    <stop offset="100%" stopColor="#48d6ff" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-white font-mono tracking-tight">
                  {score}<span className="text-xl text-slate-400">/{total}</span>
                </div>
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-0.5">
                  Benar
                </div>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-amber-300 font-extrabold text-xs mb-2">
              <Trophy className="w-3.5 h-3.5" />
              {rank.badge}
            </div>

            <h4 className="font-extrabold text-base text-white mb-1">
              {rank.title}
            </h4>

            <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6">
              {rank.desc}
            </p>

            {/* Reset / Redo button */}
            <button
              onClick={() => {
                sound.playClick();
                onResetAll();
              }}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulangi Seluruh Kuis
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

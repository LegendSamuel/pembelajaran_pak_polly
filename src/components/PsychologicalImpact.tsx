import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Film, Sparkles, Lightbulb, ChevronDown, CheckCircle, HeartHandshake, Compass } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { quizQuestions } from '../data/quizData';
import { sound } from '../utils/sound';

interface PsychologicalImpactProps {
  onScoreUpdate: (id: number, correct: boolean) => void;
  quizStatus: boolean;
}

export const PsychologicalImpact: React.FC<PsychologicalImpactProps> = ({
  onScoreUpdate,
  quizStatus,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(1);

  const impactCards = [
    {
      id: 0,
      icon: "🧊",
      badge: "Kamera Diam",
      title: "Statis & Menjauhkan Emosi",
      summary: "Penonton merasa seperti penonton pasif di luar adegan. Karakter kian mengecil dan ikatan emosional memudar.",
      detail: "Ketika kamera tidak bergerak, audiens secara psikologis diposisikan sebagai saksi mata yang terisolasi. Penonton tidak merasakan beratnya langkah atau urgensi apa yang dirasakan siswa.",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30",
    },
    {
      id: 1,
      icon: "🎥",
      badge: "Tracking Shot",
      title: "Hidup, Dramatis & Mengalir",
      summary: "Latar lorong sekolah bergeser menciptakan sensasi gerak nyata (motion parallax). Adegan menjadi bernyawa.",
      detail: "Pergerakan latar depan (foreground) dan latar belakang (background) yang bergeser dengan kecepatan berbeda memicu persepsi kedalaman 3D di otak penonton, membuat lorong sekolah terasa nyata.",
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/40",
    },
    {
      id: 2,
      icon: "🚶",
      badge: "Penonton Ikut Masuk",
      title: "Membangun Rasa Penasaran",
      summary: "Kamera tepat di belakang menciptakan antisipasi: 'Apa yang akan terjadi begitu pintu itu terbuka?'",
      detail: "Dengan menyembunyikan wajah siswa dan hanya memperlihatkan punggungnya yang menuju ke pintu, sutradara menanamkan rasa misteri dan ketegangan (suspense) di benak penonton.",
      color: "from-cyan-500/20 to-teal-500/10 border-cyan-500/30",
    }
  ];

  return (
    <section id="p3" className="py-16 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl sm:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] select-none">
            03
          </span>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold uppercase tracking-wider mb-2 border border-orange-500/20">
              Pertanyaan 03
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Apa tujuan pakai teknik ini?
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Sinematografi bukan sekadar memindahkan kamera, melainkan memanipulasi emosi penonton. Bandingkan 3 kartu di bawah ini.
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
                    Adegan menjadi <strong>lebih hidup dan dramatis</strong>. Penonton diajak <strong>ikut berjalan bersama siswa</strong> menuju pintu kelas, memantik rasa penasaran tentang apa yang menanti di dalam kelas.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3 Interactive Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {impactCards.map((card) => {
            const isSelected = activeCard === card.id;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -6 }}
                onClick={() => {
                  sound.playClick();
                  setActiveCard(card.id);
                }}
                className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden glass-panel ${
                  isSelected
                    ? `bg-gradient-to-br ${card.color} shadow-2xl ring-2 ring-orange-500/40`
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-4xl mb-4 p-3 rounded-2xl bg-white/5 w-fit border border-white/10">
                  {card.icon}
                </div>

                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                  {card.badge}
                </div>

                <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {card.summary}
                </p>

                <div className="pt-3 border-t border-white/10 text-xs text-slate-400 leading-normal">
                  <strong className="text-amber-300 block mb-1">Dampak Psikologis:</strong>
                  {card.detail}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Embedded Quiz 3 */}
        <QuizCard
          question={quizQuestions[2]}
          onAnswer={onScoreUpdate}
          isAnswered={quizStatus}
        />

      </div>
    </section>
  );
};

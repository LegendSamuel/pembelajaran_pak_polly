import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Compass, Video, Gauge, DoorOpen, Lightbulb, ChevronDown, CheckCircle, Sparkles, Layers } from 'lucide-react';
import { productionSteps } from '../data/stepsData';
import { QuizCard } from './QuizCard';
import { quizQuestions } from '../data/quizData';
import { sound } from '../utils/sound';

interface StepWorkflowProps {
  onScoreUpdate: (id: number, correct: boolean) => void;
  quizStatus: boolean;
}

export const StepWorkflow: React.FC<StepWorkflowProps> = ({
  onScoreUpdate,
  quizStatus,
}) => {
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [selectedToolIdx, setSelectedToolIdx] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'SlidersHorizontal': return <SlidersHorizontal className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Gauge': return <Gauge className="w-5 h-5" />;
      case 'DoorOpen': return <DoorOpen className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="p2" className="py-16 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl sm:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] select-none">
            02
          </span>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold uppercase tracking-wider mb-2 border border-orange-500/20">
              Pertanyaan 02
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Bagaimana cara melakukannya?
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Ada standar operasional di set film untuk mengeksekusi tracking shot. Buka langkah-langkah di bawah untuk menelaah alat dan alasan teknisnya.
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
                    Kamera diposisikan di <strong>belakang siswa</strong>, digerakkan meluncur dengan alat bantu 
                    <strong> Dolly, Steadicam, atau Gimbal</strong>. Kuncinya: <strong>kecepatan kamera harus sinkron persis dengan langkah kaki siswa</strong>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step-by-Step Interactive Timeline */}
        <div className="space-y-4 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-cyan-500 before:to-emerald-500">
          {productionSteps.map((step) => {
            const isOpen = openStep === step.id;
            return (
              <div key={step.id} className="relative pl-14">
                
                {/* Step Toggle Bar */}
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    sound.playClick();
                    setOpenStep(isOpen ? null : step.id);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 glass-panel ${
                    isOpen
                      ? 'border-orange-500/50 bg-gradient-to-r from-orange-500/10 via-slate-900/60 to-slate-900/60 shadow-lg shadow-orange-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number Circle */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                      isOpen
                        ? 'bg-gradient-to-br from-[#ff8a3d] to-[#ffd166] text-slate-950 shadow-md shadow-orange-500/30 rotate-[-6deg]'
                        : 'bg-white/5 border border-white/10 text-amber-300'
                    }`}>
                      {step.id}
                    </div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white dark:text-white light:text-slate-900">
                        {step.title}
                      </h3>
                      {!isOpen && (
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {step.summary}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 hidden sm:inline-block">
                      {getStepIcon(step.icon)}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
                  </div>
                </motion.button>

                {/* Step Detail Panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {step.summary}
                        </p>

                        {/* Interactive Equipment Showcase if Step 1 */}
                        {step.tools && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Pilih & Pelajari 3 Alat Standar Film:
                            </div>

                            {/* Equipment Tabs */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {step.tools.map((tool, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    sound.playClick();
                                    setSelectedToolIdx(idx);
                                  }}
                                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                                    selectedToolIdx === idx
                                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-400 shadow-md shadow-orange-500/20'
                                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                                  }`}
                                >
                                  {tool.name}
                                </button>
                              ))}
                            </div>

                            {/* Selected Tool Details Card */}
                            <motion.div
                              key={selectedToolIdx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm space-y-2"
                            >
                              <div className="font-bold text-white text-base">
                                {step.tools[selectedToolIdx].name}
                              </div>
                              <p className="text-slate-300">
                                {step.tools[selectedToolIdx].description}
                              </p>
                              <div className="grid sm:grid-cols-2 gap-2 pt-2 text-xs">
                                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                                  <span className="text-amber-400 font-bold block mb-0.5">Spesifikasi Set:</span>
                                  <span className="text-slate-400">{step.tools[selectedToolIdx].specs}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                  <span className="text-emerald-400 font-bold block mb-0.5">Keunggulan Utama:</span>
                                  <span className="text-emerald-200">{step.tools[selectedToolIdx].pros}</span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}

                        {/* Why / Mengapa Section */}
                        <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs sm:text-sm text-orange-200 flex items-start gap-2.5">
                          <span className="font-extrabold text-orange-400 uppercase tracking-wider text-[11px] whitespace-nowrap mt-0.5">
                            Mengapa?
                          </span>
                          <span className="leading-relaxed">
                            {step.why}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Embedded Quiz 2 */}
        <QuizCard
          question={quizQuestions[1]}
          onAnswer={onScoreUpdate}
          isAnswered={quizStatus}
        />

      </div>
    </section>
  );
};

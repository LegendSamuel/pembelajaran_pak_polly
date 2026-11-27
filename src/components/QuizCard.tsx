import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';
import { sound } from '../utils/sound';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (questionId: number, isCorrect: boolean) => void;
  isAnswered: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const correct = question.options[index].isCorrect;
    if (correct) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
    onAnswer(question.id, correct);
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-6 rounded-2xl p-6 glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-amber-400" />
      
      <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#48d6ff] uppercase tracking-wider">
        <HelpCircle className="w-3.5 h-3.5" />
        {question.badge}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-white dark:text-white light:text-slate-900 mb-4 leading-snug">
        {question.question}
      </h3>

      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedIndex === idx;
          const showResult = selectedIndex !== null;

          let btnStyle = "bg-white/5 dark:bg-white/5 light:bg-slate-50 border-white/10 dark:border-white/10 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-orange-500/50 hover:bg-white/10";
          
          if (showResult) {
            if (option.isCorrect) {
              btnStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 dark:text-emerald-300 light:text-emerald-800 shadow-lg shadow-emerald-500/10 font-medium";
            } else if (isSelected && !option.isCorrect) {
              btnStyle = "bg-rose-500/20 border-rose-500/60 text-rose-300 dark:text-rose-300 light:text-rose-800 font-medium";
            } else {
              btnStyle = "opacity-40 border-transparent bg-white/5";
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={!showResult ? { x: 4 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 text-sm ${btnStyle}`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5 ${
                showResult && option.isCorrect
                  ? 'bg-emerald-500 text-slate-950'
                  : showResult && isSelected && !option.isCorrect
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/10 text-slate-400'
              }`}>
                {letter}
              </span>
              <span className="flex-1 leading-relaxed">{option.text}</span>
              {showResult && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              )}
              {showResult && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation Box */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`mt-4 p-4 rounded-xl border text-sm leading-relaxed ${
              question.options[selectedIndex].isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200 dark:text-emerald-200 light:text-emerald-900'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-200 dark:text-rose-200 light:text-rose-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                {question.options[selectedIndex].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Penjelasan Sutradara (Benar)
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    Evaluasi Sutradara (Kurang Tepat)
                  </>
                )}
              </div>
              <p>{question.options[selectedIndex].explanation}</p>
              {!question.options[selectedIndex].isCorrect && (
                <div className="mt-2 pt-2 border-t border-rose-500/20 text-xs font-semibold text-amber-300">
                  💡 Kunci Jawaban:{' '}
                  {question.options.find(o => o.isCorrect)?.explanation}
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Coba Ulangi Pertanyaan Ini
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

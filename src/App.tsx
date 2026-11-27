import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sim1TrackingVsStatic } from './components/Sim1TrackingVsStatic';
import { StepWorkflow } from './components/StepWorkflow';
import { PsychologicalImpact } from './components/PsychologicalImpact';
import { SpeedRiskLab } from './components/SpeedRiskLab';
import { VideoStudio } from './components/VideoStudio';
import { ScorecardSummary } from './components/ScorecardSummary';
import { Footer } from './components/Footer';
import { sound } from './utils/sound';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('sinelab-theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Scores for the 4 questions: questionId -> boolean
  const [scores, setScores] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('sinelab-theme', theme);
    } catch {}
  }, [theme]);

  const handleScoreUpdate = (questionId: number, isCorrect: boolean) => {
    setScores(prev => ({
      ...prev,
      [questionId]: isCorrect,
    }));
  };

  const handleResetAll = () => {
    sound.playClick();
    setScores({});
    window.location.hash = '#p1';
  };

  const currentScore = Object.values(scores).filter(Boolean).length;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'} transition-colors duration-300 font-sans selection:bg-[#ff8a3d] selection:text-slate-950`}>
      {/* Floating Cinematic Header */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Studi Kasus Banner */}
        <section id="kasus" className="py-6 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-6 rounded-2xl border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-500/10 via-slate-900/60 to-slate-900/40 glass-panel border border-white/10"
          >
            <div className="flex items-center gap-2.5 font-bold text-amber-300 text-sm mb-1.5">
              <span>🎬</span> STUDI KASUS PRODUKSI FILM PENDEK
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Saat kamera dipasang diam di sudut lorong, adegan terasa <strong>kaku, mekanis, dan kurang dramatis</strong>. 
              Penonton merasa hanya "mengintip" dari kejauhan. Pecahkan 4 pertanyaan terstruktur di bawah: 
              <strong> tebak terlebih dahulu</strong>, jalankan simulasinya, lalu uji pemahamanmu dengan kuis interaktif!
            </p>
          </motion.div>
        </section>

        {/* Pertanyaan 1: Teknik Kamera */}
        <Sim1TrackingVsStatic
          onScoreUpdate={handleScoreUpdate}
          quizStatus={scores[0] !== undefined}
        />

        {/* Pertanyaan 2: Cara & Alat */}
        <StepWorkflow
          onScoreUpdate={handleScoreUpdate}
          quizStatus={scores[1] !== undefined}
        />

        {/* Pertanyaan 3: Tujuan Psikologis */}
        <PsychologicalImpact
          onScoreUpdate={handleScoreUpdate}
          quizStatus={scores[2] !== undefined}
        />

        {/* Pertanyaan 4: Analisis Risiko Kecepatan */}
        <SpeedRiskLab
          onScoreUpdate={handleScoreUpdate}
          quizStatus={scores[3] !== undefined}
        />

        {/* Video Player Section */}
        <VideoStudio />

        {/* Evaluasi & Rangkuman */}
        <ScorecardSummary
          score={currentScore}
          total={4}
          onResetAll={handleResetAll}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

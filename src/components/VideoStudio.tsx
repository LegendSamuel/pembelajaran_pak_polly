import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, FolderUp, RotateCcw, Clapperboard, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export const VideoStudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>('/TrackingShot.mp4');
  const [isCustomFile, setIsCustomFile] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const togglePlay = () => {
    sound.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    sound.playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    sound.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file || !file.type.startsWith('video/')) return;
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setIsCustomFile(true);
    sound.playClick();
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 100);
  };

  const handleResetVideo = () => {
    sound.playClick();
    setVideoSrc('/TrackingShot.mp4');
    setIsCustomFile(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const chapters = [
    { target: '#p1', title: '① Teknik' },
    { target: '#p2', title: '② Cara & Alat' },
    { target: '#p3', title: '③ Tujuan Psikologis' },
    { target: '#p4', title: '④ Risiko Kecepatan' },
    { target: '#rangkuman', title: '⑤ Rangkuman' },
  ];

  return (
    <section id="video" className="py-16 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl sm:text-7xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] select-none">
            ▶
          </span>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-extrabold uppercase tracking-wider mb-2 border border-cyan-500/20">
              Video Pembahasan Utuh
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
              Lihat Semuanya dalam Satu Video Sinematik
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Video Remotion <code>TrackingShot.mp4</code> telah terpasang secara mulus di sini. Kamu juga dapat memasukkan video buatanmu sendiri via Drag & Drop.
            </p>
          </div>
        </div>

        {/* Video Player Card */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileUpload(e.dataTransfer.files[0]);
            }
          }}
          className={`rounded-3xl glass-panel border overflow-hidden shadow-2xl relative transition-all ${
            isDragOver ? 'border-orange-500 ring-4 ring-orange-500/30' : 'border-white/10 dark:border-white/10 light:border-slate-200'
          }`}
        >
          {/* Video Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            >
              Browser tidak mendukung pemutaran video HTML5.
            </video>

            {/* Drag Drop Overlay */}
            {isDragOver && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30 pointer-events-none">
                <FolderUp className="w-12 h-12 text-orange-400 animate-bounce" />
                <span className="font-extrabold text-lg text-white">
                  Lepaskan file video di sini untuk memutar 🎬
                </span>
              </div>
            )}
          </div>

          {/* Bottom Video Controls & Chapter Navigation */}
          <div className="p-4 sm:p-5 bg-slate-900/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Chapters Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">
                Navigasi Bab:
              </span>
              {chapters.map((chap, idx) => (
                <a
                  key={idx}
                  href={chap.target}
                  onClick={() => sound.playClick()}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  {chap.title}
                </a>
              ))}
            </div>

            {/* Custom Video Uploader Action */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-xs font-bold text-orange-300 flex items-center gap-1.5 transition-all"
              >
                <FolderUp className="w-3.5 h-3.5" />
                Pilih Video Lokal
              </button>

              {isCustomFile && (
                <button
                  onClick={handleResetVideo}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Default
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

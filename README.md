# SINE LAB · Modul Sinematografi Interaktif (React & Framer Motion Edition)

Aplikasi web interaktif pembelajaran sinematografi modern yang dibangun menggunakan **React 19**, **Vite**, **Tailwind CSS**, dan **Framer Motion**.

## 🌟 Fitur Baru & Peningkatan Visual ("Lebih Animated & Lebih Keren")
1. **Cinematic Viewfinder HUD & 3D Interactive Hallway**:
   - Efek 3D parallax interaktif pada poster lorong sekolah saat kursor digerakkan.
   - HUD kamera film (REC blink, Live Timecode counter, ISO 800, Aperture f/2.8, Battery %, Rule of Thirds grid toggle).
   - Audio Engine Web Audio API bawaan (efek jepretan shutter kamera, klik UI, alarm desinkronisasi, dan chime keberhasilan kuis).
2. **Simulasi Interaktif 60 FPS (Pertanyaan 1)**:
   - Komparasi visual dinamis: **Kamera Diam (Static)** vs **Tracking Shot (Follow)**.
   - Animasi langkah karakter siswa, pergeseran loker, dan pintu kelas yang mendekat secara perspektif nyata.
3. **Interactive Step-by-Step Production Workflow (Pertanyaan 2)**:
   - Timeline interaktif 5 langkah kerja sutradara di set.
   - Showcase alat kamera 3D: **Dolly**, **Steadicam**, dan **Gimbal** beserta spesifikasi dan keunggulan.
4. **Cinematic Impact & Depth Psychology (Pertanyaan 3)**:
   - Kartu analisis psikologis penonton dengan efek glow glassmorphism dan animasi hover responsif.
5. **Speed Risk Lab (Pertanyaan 4)**:
   - Slider kecepatan dolly kamera (0.50x s/d 2.00x).
   - Simulasi real-time kamera menyalip karakter, getaran kamera (camera shake), dan motion blur jika tidak sinkron.
6. **Video Player Studio Terintegrasi**:
   - Memutar langsung file `TrackingShot.mp4` dengan navigasi chapter interaktif.
   - Dukungan Drag & Drop video kustom dari perangkat komputer.
7. **Gamifikasi Kuis & Director Scorecard**:
   - 4 kuis interaktif dengan feedback langsung, audio chime, rank sutradara, dan ledakan konfeti jika meraih skor 4/4!
8. **Dark / Light Studio Mode**:
   - Tema studio sinematik yang tersimpan otomatis di browser.

## 🚀 Cara Menjalankan

### 1. Menjalankan Server Pengembangan (Dev Mode):
```bash
npm run dev
```
Akses di browser: `http://localhost:3000`

### 2. Membangun untuk Produksi (Production Build):
```bash
npm run build
```

### 3. Menjalankan Preview Hasil Build:
```bash
npm run preview
```

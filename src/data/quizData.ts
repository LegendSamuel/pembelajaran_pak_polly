import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 0,
    badge: "Kuis 01 · Penentuan Teknik",
    question: "Kamera diam membuat adegan siswa menuju kelas terasa kaku dan datar. Teknik pergerakan apa yang paling tepat untuk menghidupkan adegan ini?",
    options: [
      {
        text: "Tetap pakai kamera diam di sudut lorong, namun minta siswa berjalan lebih lambat",
        isCorrect: false,
        explanation: "Kamera tetap diam, sehingga sudut pandang statis tidak berubah. Masalah rasa kaku berasal dari kamera yang tidak mengikuti pergerakan karakter."
      },
      {
        text: "Tracking shot jenis follow shot dari belakang",
        isCorrect: true,
        explanation: "Tepat sekali! Kamera bergerak bersama karakter dari belakang, menjaga jarak konstan, sehingga penonton merasa seolah-olah ikut berjalan menelusuri lorong."
      },
      {
        text: "Menempatkan kamera diam di dalam kelas lalu merekam siswa yang membuka pintu",
        isCorrect: false,
        explanation: "Kamera masih diam di satu ruangan, dan esensi 'perjalanan siswa menyusuri lorong' menjadi hilang sama sekali."
      }
    ]
  },
  {
    id: 1,
    badge: "Kuis 02 · Eksekusi & Alat",
    question: "Ingin hasil rekaman tetap stabil dan mulus saat kamera bergerak mengikuti langkah siswa. Cara mana yang paling tepat dan profesional?",
    options: [
      {
        text: "Kameramen berlari bebas memegang kamera langsung dengan tangan kosong (handheld)",
        isCorrect: false,
        explanation: "Tanpa alat stabilisasi, setiap hentakan langkah kaki kameramen akan membuat video goyang (shaky), bergetar, dan tidak nyaman ditonton."
      },
      {
        text: "Gunakan Dolly, Steadicam, atau Gimbal, dan sinkronkan kecepatan dengan langkah siswa",
        isCorrect: true,
        explanation: "Luar biasa! Stabilizer meredam hentakan langkah, dan sinkronisasi kecepatan membuat komposisi framing siswa di layar tetap konsisten dan stabil."
      },
      {
        text: "Kamera ditaruh di depan siswa dan kameramen mundur secepat mungkin",
        isCorrect: false,
        explanation: "Materi fokus pada follow shot dari belakang, dan berjalan 'secepat mungkin' akan merusak sinkronisasi kecepatan."
      }
    ]
  },
  {
    id: 2,
    badge: "Kuis 03 · Tujuan Psikologis & Sinematik",
    question: "Apa tujuan utama sutradara memilih teknik tracking shot pada adegan ini dibandingkan shot diam?",
    options: [
      {
        text: "Agar durasi pengambilan adegan bisa selesai jauh lebih cepat",
        isCorrect: false,
        explanation: "Tracking shot justru membutuhkan persiapan blocking, rel/stabilizer, dan latihan sinkronisasi yang lebih teliti."
      },
      {
        text: "Membangun imersi psikologis: penonton diajak ikut berjalan dan adegan terasa hidup",
        isCorrect: true,
        explanation: "Tepat! Pergerakan kamera dinamis merangsang empati spasial penonton, menciptakan rasa penasaran 'apa yang menanti di balik pintu kelas'."
      },
      {
        text: "Supaya ekspresi wajah siswa dapat selalu terlihat jelas dari depan",
        isCorrect: false,
        explanation: "Dalam follow shot dari belakang, kamera memperlihatkan punggung dan orientasi tujuan siswa, bukan ekspresi wajah langsung."
      }
    ]
  },
  {
    id: 3,
    badge: "Kuis 04 · Analisis Risiko Kecepatan",
    question: "Jika kecepatan gerak kamera jauh lebih cepat dibandingkan langkah kaki siswa, risiko apa yang paling fatal terjadi?",
    options: [
      {
        text: "Gambar menjadi jauh lebih tajam dan stabil karena motor kamera berputar kencang",
        isCorrect: false,
        explanation: "Justru sebaliknya — kecepatan berlebih memicu getaran frekuensi tinggi, motion blur, dan ketidakstabilan framing."
      },
      {
        text: "Kamera menyalip karakter, visual goyah/blur, dan penonton mengalami disorientasi pusing",
        isCorrect: true,
        explanation: "Sempurna! Ketidaksinkronan merusak komposisi framing, karakter tertinggal di belakang lensa, dan goncangan cepat membuat mata penonton lelah."
      },
      {
        text: "Tidak ada pengaruh apapun karena fokus penonton hanya pada warna seragam siswa",
        isCorrect: false,
        explanation: "Perubahan kecepatan sangat memengaruhi mood dramatis adegan dan kenyamanan fisiologis penonton."
      }
    ]
  }
];

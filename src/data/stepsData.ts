import { ProductionStep } from '../types';

export const productionSteps: ProductionStep[] = [
  {
    id: 1,
    title: "Pilih Alat Stabilisasi Kamera",
    summary: "Kamera yang digenggam langsung dengan tangan kosong akan bergetar mengikuti hentakan langkah. Gunakan alat khusus peredam guncangan.",
    why: "Meredam hentakan vertikal dan horizontal kaki operator agar gerakan meluncur halus bak di atas awan (cinematic glide).",
    icon: "SlidersHorizontal",
    tools: [
      {
        name: "Dolly Track",
        description: "Dudukan kamera beroda di atas rel lantai lorong sekolah.",
        specs: "Maksimal stabilitas pada lantai datar. Membutuhkan setup rel sebelum take.",
        pros: "Gerakan paling presisi dan bebas getaran 100%."
      },
      {
        name: "Steadicam Rig",
        description: "Sistem suspensi mekanis dengan vest pemberat yang dikenakan operator.",
        specs: "Fleksibel bermanuver di belokan, tangga, dan lorong sempit.",
        pros: "Operator bebas melangkah alami tanpa batas rel fisik."
      },
      {
        name: "3-Axis Motorized Gimbal",
        description: "Stabilizer elektronik bermotor brushless (misal DJI Ronin / Zhiyun).",
        specs: "Kompak, ringan, setup cepat, cocok untuk tim produksi film pendek indie.",
        pros: "Sangat responsif dan mudah dikendalikan dalam ruang kelas."
      }
    ]
  },
  {
    id: 2,
    title: "Posisikan Kamera Tepat di Belakang Siswa",
    summary: "Atur ketinggian kamera sejajar bahu atau mata siswa (eye-level to shoulder level), menghadap lorong yang memanjang lurus ke arah pintu kelas.",
    why: "Inilah esensi Follow Shot dari belakang. Framing ini menempatkan siswa sebagai penuntun dan mengajak penonton berbagi sudut pandang arah tujuan.",
    icon: "Compass"
  },
  {
    id: 3,
    title: "Mulai Rekam & Ikuti Pergerakan Maju",
    summary: "Begitu siswa mulai melangkah, operator kamera langsung bergerak maju secara simultan menjaga komposisi bingkai (framing headroom & leading room).",
    why: "Transisi pergerakan yang mulus dari detik awal mencegah hentakan awal (jerk) yang bisa merusak konsentrasi audiens.",
    icon: "Video"
  },
  {
    id: 4,
    title: "Kunci & Sinkronkan Kecepatan Gerak",
    summary: "Pertahankan jarak konstan (misalnya 1.5 – 2 meter) sepanjang lorong. Jaga kecepatan kamera persis dengan tempo langkah siswa.",
    why: "Jika kamera terlalu cepat akan menyalip siswa; jika terlalu lambat, siswa akan mengecil dan menjauh dari bingkai sinematik.",
    icon: "Gauge"
  },
  {
    id: 5,
    title: "Klimaks: Akhiri Saat Siswa Membuka Pintu Kelas",
    summary: "Ikuti siswa sampai tangannya menyentuh gagang pintu dan membukanya. Tahan kamera sejenak untuk menangkap cahaya atau suasana dari dalam kelas.",
    why: "Pintu adalah punchline dramatis dari adegan. Menutup tracking shot di titik ini memberikan kepuasan naratif (payoff) bagi penonton.",
    icon: "DoorOpen"
  }
];

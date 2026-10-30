import Tools1 from '/assets/tools/Laravel.webp'
import Tools2 from '/assets/tools/reactjs.webp'
import Tools3 from '/assets/tools/php.webp'
import Tools4 from '/assets/tools/js.webp'
import Tools5 from '/assets/tools/tailwind.webp'
import Tools6 from '/assets/tools/github.webp'
import Tools7 from '/assets/tools/html.webp'
import Tools8 from '/assets/tools/css.webp'
import Tools9 from '/assets/tools/mysql.webp'
import Tools10 from '/assets/tools/bootstrap.webp'
import Tools11 from '/assets/tools/firebase.webp'
import Tools12 from '/assets/tools/vscode.webp'
import Tools13 from '/assets/tools/google-colab.webp'
import Tools14 from '/assets/tools/figma.webp'
import Tools15 from '/assets/tools/gcp.webp'
import Tools16 from '/assets/tools/docker.webp'
import Tools17 from '/assets/tools/postman.webp'

import Project1 from '/assets/projects/proj1.webp'
import Project2 from '/assets/projects/proj2.webp'
import Project3 from '/assets/projects/proj3.webp'
import Project4 from '/assets/projects/proj4.webp'
import Project5 from '/assets/projects/proj5.webp'
import Project6 from '/assets/projects/proj6.webp'

export const personalData = {
  name: "Rafi",
  fullName: "Muhammad Rafi Catur Wijayanto",
  title: "Web Developer",
  location: "East Jakarta, Indonesia",
  skillLevel: "Junior",
  description: "Bachelor of Computer Science (S.Kom) graduate with expertise in leading teams and developing end-to-end applications. Adaptive fast learner with high enthusiasm for mastering new technologies.",
  avatarPlaceholder: "Avatar Profile"
};

export const toolsData = [
  {
    id: "tool-1",
    name: "Laravel",
    category: "PHP Framework",
    icon: Tools1
  },
  {
    id: "tool-2",
    name: "ReactJS",
    category: "Front-end Framework ",
    icon: Tools2
  },
  {
    id: "tool-3",
    name: "PHP",
    category: "Programming Language",
    icon: Tools3
  },
  {
    id: "tool-4",
    name: "JavaScript",
    category: "Programming Language",
    icon: Tools4
  },
  {
    id: "tool-5",
    name: "Tailwind CSS",
    category: "Styling & Layout",
    icon: Tools5
  },
  {
    id: "tool-6",
    name: "GitHub",
    category: "Version Control",
    icon: Tools6
  },
  {
    id: "tool-7",
    name: "HTML",
    category: "Styling & Layout",
    icon: Tools7
  },
  {
    id: "tool-8",
    name: "CSS",
    category: "Styling & Layout",
    icon: Tools8
  },
  {
    id: "tool-9",
    name: "MySQL",
    category: "Database",
    icon: Tools9
  },
  {
    id: "tool-10",
    name: "Bootstrap",
    category: "Styling & Layout",
    icon: Tools10
  },
  {
    id: "tool-11",
    name: "Firebase",
    category: "Cloud Services",
    icon: Tools11
  },
  {
    id: "tool-12",
    name: "VSCode",
    category: "Development Tool",
    icon: Tools12
  },
  {
    id: "tool-13",
    name: "Google Colab",
    category: "Development Tool",
    icon: Tools13
  },
  {
    id: "tool-14",
    name: "Figma",
    category: "Web Design & Prototyping",
    icon: Tools14
  },
  {
    id: "tool-15",
    name: "GCP",
    category: "Cloud Computing Platform",
    icon: Tools15
  },
  {
    id: "tool-16",
    name: "Docker",
    category: "App Containerization",
    icon: Tools16
  }
  {
    id: "tool-17",
    name: "Postman",
    category: "API Development & Testing",
    icon: Tools17
  }
];

export const projectsData = [
  {
    id: "proj-1",
    title: "ECDP Working Process Digitalization",
    role: "Fullstack Developer",
    tags: ["Laravel", "Laravel Reverb", "MySQL", "TailwindCSS"],
    description: "Sistem uji kompetensi ECDP menggunakan Laravel 13 untuk Efesiensi dan otomatisasi hasil analisis data karyawan.",
    task: "Merancang dan Membangun sistem ECDP dengan metode SDLC Waterfall, Mulai dari Analisis AS-IS & TO-BE, Merancang Use Case Diagram, Activity Diagram dan ERD, Implementasi Menggunakan Laravel 13, Di Uji Menggunakan Blackbox Testing dan User Acceptance Testing.",
    result: "Berhasil dikembangkan dengan melewati skenario Blackbox testing dan Penerimaan Pengguna (UAT) Sebesar 80%.",
    impact: "Meningkatkan efisiensi operasional, mempermudah pengelolaan dan pemantauan data, mengurangi proses manual serta risiko kesalahan pengolahan data, dan mempercepat penyajian hasil analisis dalam satu sistem terpusat yang telah diuji menggunakan Black Box Testing dan UAT untuk memastikan kesesuaian fungsionalitas aplikasi dengan kebutuhan pengguna.",
    fullDescription: "Menggantikan Proses yang sebelumnya menggunakan Gform dan Spreadsheets menjadi hanya di 1 aplikasi terintegrasi untuk Efesiensi pekerjaan fasilitator Program ECDP dalam menganalisis hasil uji kompetensi Karyawan untuk dibuat Rekomendasi Training.",
    demoUrl: "",
    repoUrl: "https://github.com/mraficaturw/employee-competencies-development-program.git",
    image: Project1
  },
  {
    id: "proj-2",
    title: "SIA Mahasiswa KIP-K UNSIKA",
    role: "Fullstack Developer",
    tags: ["Laravel", "Filament", "PHP"],
    description: "Sistem Informasi Akademik Mahasiswa KIP-K UNSIKA dengan fitur manajemen berita, pendataan KHS, pelacakan pencairan beasiswa, dan layanan pengaduan Menggunakan Framework Laravel 12 dan Package Filament.",
    task: "Merancang dan Membangun Sistem Informasi Akademik (SIA) untuk Mahasiswa KIP-K Unsika dan Staff Pengelola Beasiswa Kampus menggunakan metode SDLC Waterfall, Mulai dari Analisis AS-IS & TO-BE, merancang Use Case Diagram, Activity Diagram, Sequence Diagram, dan ERD. Setelah itu Implementasi Sistem menggunakan Laravel 12 dan Package Filament untuk Panel Admin. Diuji dengan Whitebox Testing (Basis Path Testing), Blackbox Testing dan User Acceptance Testing (UAT)",
    result: "Berhasil Dikembangkan dengan Melewati Skenario Blackbox Testing dan  Basis Path Testing serta mendapatkan penerimaan pengguna Sebesar 95,71%",
    impact: "Mempermudah akses informasi beasiswa, pengelolaan data KHS, pelacakan pencairan beasiswa, pengunduhan SK, serta penyampaian pengaduan. Sistem ini mengurangi ketergantungan pada penyebaran informasi melalui berbagai kanal terpisah, meningkatkan efisiensi administrasi bagi staff pengelola beasiswa, serta memberikan kemudahan akses layanan bagi mahasiswa.",
    fullDescription: "Situs web untuk pusat informasi mahasiswa KIP-K UNSIKA dan Staff Pengelola Beasiswa Kampus menggunakan Laravel dan Filament untuk mengatasi penyebaran informasi KIP terutama dari internal Unsika yang tidak terpusat. Sistem ini menyediakan fitur untuk manajemen berita, pendataan KHS, pelacakan pencairan beasiswa, pengunduhan SK, FAQ, dan layanan pengaduan.",
    demoUrl: "https://kipunsika.vercel.app/",
    repoUrl: "",
    image: Project2
  },
  {
    id: "proj-3",
    title: "SIKARIR",
    role: "Backend Developer",
    tags: ["Laravel", "Filament", "Fullstack", "Web App"],
    description: "Aplikasi web untuk portal informasi magang yang dilengkapi dengan admin panel berbasis Filament untuk memudahkan pencarian magang sesuai jurusan dengan Jaminan Konversi SKS.",
    task: "Berperan sebagai Backend Developer menggunakan Laravel untuk mengimplementasikan logika aplikasi, dengan membuat migration, model, controller, middleware, autentikasi, dan Blade view. Mengintegrasikan Filament Admin Panel untuk menyederhanakan manajemen konten, memungkinkan administrator membuat dan mengelola lowongan magang melalui antarmuka yang ramah pengguna. Meningkatkan performa aplikasi dengan mengoptimalkan kueri database dan menerapkan caching untuk data yang sering diakses.",
    result: "Berhasil mengimplementasikan backend dengan Melewati Skenario Blackbox Testing.",
    impact: "Meningkatkan efisiensi pengelolaan konten, menjaga performa aplikasi melalui optimasi kueri database dan caching, serta memastikan fungsionalitas sistem berjalan sesuai skenario pengujian Black Box Testing untuk mendukung penyediaan informasi magang yang mudah diakses oleh mahasiswa UNSIKA.",
    fullDescription: "Situs web yang dikembangkan untuk menjadi Portal Lowongan Magang untuk Mahasiswa Unsika dengan Jaminan Konversi SKS dan Sesuai Jurusan. Dengan Harapan web ini bisa membuat seluruh mahasiswa UNSIKA mendapatkan pengalaman magang sebelum lulus",
    demoUrl: "https://sikarir-olive.vercel.app",
    repoUrl: "https://github.com/mraficaturw/SIKARIR.git",
    image: Project3
  },
  {
    id: "proj-4",
    title: "Online Invoice Generator",
    role: "Fullstack Developer",
    tags: ["PWA", "Vite", "Web App"],
    description: "Sistem untuk menggantikan pembuatan faktur manual, mengotomatiskan kalkulasi harga total, dan menyediakan format siap send via What's App.",
    task: "Merancang dan membangun sistem pembuatan Invoice Otomatis menggunakan Metode SDLC Waterfall Mulai dari Analisis AS-IS & TO-BE, merancang Use Case dan Activity Diagram, Implementasi menggunakan ReactJS dan melakukan test sistem dengan BlackBox Testing dan User Acceptance Test",
    result: "Berhasil Mengembangkan Sistem pembuatan Invoice Otomatis melewati uji skenario Blacbox dan dengan penerimaan pengguna (UAT) sebesar 97%",
    impact: "Proses pembuatan faktur Yang lebih efisien dan siap kirim ke pelanggan melalui What's App dengan fitur Kalkulasi Harga serta Mengurangi waktu pembuatan faktur dari sekitar 5–10 menit menjadi kurang dari 1 menit per transaksi",
    fullDescription: "Mengembangkan sistem internal usaha laundry untuk menggantikan proses pembuatan faktur manual yang sebelumnya mengharuskan penulisan ulang pada setiap transaksi. Mengotomatiskan penghitungan harga total berdasarkan input berat dan harga satuan, mengurangi risiko salah hitung yang umum terjadi pada pencatatan manual. Menyediakan tampilan faktur yang konsisten dan siap cetak sehingga admin tidak perlu menyesuaikan format ulang sebelum mencetak atau mengirimkan faktur ke pelanggan.",
    demoUrl: "https://invoice-generator-app-liard.vercel.app/",
    repoUrl: "https://github.com/mraficaturw/invoice-generator-app.git",
    image: Project4
  },
  {
    id: "proj-5",
    title: "FindUp",
    role: "Cloud Engineer",
    tags: ["GCP", "Figma", "Cloud Computing", "FastAPI", "Cloud SQL"],
    description: "Design arsitektur aplikasi dengan Figma dan Deploy backend memanfaatkan layanan Google Cloud Platform.",
    task: "Mendesign dan Membangun Arsitektur Cloud",
    result: "Berhasil Membuat Arsitektur Cloud menggunakan Figma dan Deploy Backend serta Integrasi Model Machine Learning ke Aplikasi Menggunakan Google Cloud Platform",
    impact: "",
    fullDescription: "Merancang Arsitektur Aplikasi menggunakan Figma kemudian mengimplementasikan Arsitektur tersebut dengan Google Cloud Platform menggunakan App Engine untuk Deployment Aplikasi, CloudStorage untuk penyimpanan file, Compute Engine untuk Backend, dan CloudSQL untuk Database.",
    demoUrl: "",
    repoUrl: "https://github.com/Timnas-Bangkit",
    image: Project5
  },
  {
    id: "proj-6",
    title: "Employee Competencies Development Program",
    role: "Data Analyst",
    tags: ["Microsoft Excel", "Data Analysis"],
    description: "Menganalisis data pemetaan kompetensi karyawan menggunakan Microsoft Excel untuk menyusun rekomendasi program pelatihan yang tepat sasaran.",
    task: "Mengambil data hasil uji kompetensi karyawan melalui Gform kemudian Membuat Alur data dengan Microsoft Excel untuk menganalisis Gap Competency Karyawan dan Training Need Analysis (TNA)",
    result: "Berhasil Menyajikan Dashboard untuk tiap Karyawan yang berisi Radar Chart untuk melihat Gap Kompetensi terhadap standar yang ditetapkan dan menyajikan Tabel Rekomendasi Training",
    impact: "Mempermudah identifikasi kesenjangan kompetensi (Competency Gap) setiap karyawan melalui dashboard interaktif berbasis Radar Chart, mengotomatisasi perhitungan selisih kompetensi terhadap standar yang ditetapkan, serta menghasilkan rekomendasi program pelatihan (Training Needs Analysis) yang lebih terarah dan berbasis data untuk mendukung perencanaan pengembangan kompetensi karyawan.",
    fullDescription: "Bertugas sebagai Data Analyst, menganalisis data dari pemetaan kompetensi karyawan departemen maintenance menggunakan Microsoft Excel untuk mengidentifikasi kesenjangan kompetensi di setiap subjek. Hasil analisis digunakan sebagai dasar untuk menyusun rekomendasi program pelatihan (Training Needs Analysis) yang memenuhi kebutuhan pengembangan karyawan.",
    demoUrl: "",
    repoUrl: "",
    image: Project6
  }
];

export const experienceData = [
  {
    id: "exp-1",
    role: "Dept. Knowledge Management, Div. Human Resource",
    period: "Feb 2026 - Aug 2026",
    company: "PT Inti Ganda Perdana (Astra Otoparts Group)",
    description: "Berperan sebagai Data Analyst untuk pemetaan kompetensi karyawan, mengubah Working Instruction menjadi video pembelajaran, serta mendigitalisasi proses kerja uji kompetensi menggunakan Laravel 13, MySQL, dan TailwindCSS."
  },
  {
    id: "exp-2",
    role: "Cloud Computing Cohort (Studi Independen MSIB)",
    period: "Sep 2024 - Des 2024",
    company: "Bangkit Academy led by Google, GoTo, Tokopedia, and Traveloka",
    description: "Mempelajari dan menerapkan arsitektur cloud infrastructure menggunakan layanan Google Cloud Platform (GCP) serta berperan sebagai Cloud Engineer dalam merancang backend API aplikasi FindUp."
  },
  {
    id: "exp-3",
    role: "Ketua Divisi Informasi dan Komunikasi",
    period: "Jan 2022 - Sep 2024",
    company: "HIMTIKA (Himpunan Mahasiswa Informatika Unsika)",
    description: "Mengarahkan strategi divisi, menginisiasi pembentukan departemen baru, serta mengembangkan strategi manajemen media sosial yang berhasil meningkatkan lebih dari 1.000 pengikut Instagram."
  },
  {
    id: "exp-4",
    role: "Events and Program Member",
    period: "Des 2023 - Agu 2024",
    company: "GDSC (Google Developer Student Club) Chapter Unsika",
    description: "Mengelola persiapan teknis dan koordinasi pembicara untuk sekitar 10 agenda workshop, serta menyusun laporan evaluasi pasca-acara guna standarisasi efisiensi program."
  },
];

export const contactData = {
  title: "Send me an Email",
  description: "Apakah Anda punya ide proyek atau ingin berdiskusi? Jangan ragu untuk menghubungi saya melalui formulir di bawah ini atau email langsung.",
  email: "raficaturbusiness@gmail.com",
  location: "Indonesia",
};

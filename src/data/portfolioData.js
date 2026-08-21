import Tools1 from '/assets/tools/Laravel.png'
import Tools2 from '/assets/tools/reactjs.png'
import Tools3 from '/assets/tools/php.png'
import Tools4 from '/assets/tools/js.png'
import Tools5 from '/assets/tools/tailwind.png'
import Tools6 from '/assets/tools/github.png'
import Tools7 from '/assets/tools/html.png'
import Tools8 from '/assets/tools/css.png'
import Tools9 from '/assets/tools/mysql.png'
import Tools10 from '/assets/tools/bootstrap.png'
import Tools11 from '/assets/tools/firebase.png'
import Tools12 from '/assets/tools/vscode.png'
import Tools13 from '/assets/tools/google-colab.svg'
import Tools14 from '/assets/tools/figma.png'
import Project1 from '/assets/projects/proj1.webp'
import Project2 from '/assets/projects/proj2.webp'
import Project3 from '/assets/projects/proj3.webp'
import Project4 from '/assets/projects/proj4.webp'
import Project5 from '/assets/projects/proj5.webp'
import Project6 from '/assets/projects/proj6.webp'

export const personalData = {
  name: "Rafi",
  fullName: "Muhammad Rafi Catur Wijayanto",
  badge: "online",
  title: "Web Developer",
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
  }
];

export const projectsData = [
  {
    id: "proj-1",
    title: "ECDP Working Process Digitalization",
    subtitle: "Digitalisasi uji kompetensi ECDP di PT. Inti Ganda Perdana.",
    tags: ["Laravel", "Laravel Reverb", "MySQL", "TailwindCSS"],
    description: "Sistem uji kompetensi ECDP menggunakan Laravel 13 dan TailwindCSS untuk memangkas proses manual dan mengotomatisasi hasil analisis data karyawan.",
    fullDescription: "Efesiensi pekerjaan fasilitator Program ECDP dalam menganalisis hasil uji kompetensi Karyawan untuk dibuat Rekomendasi Training.",
    demoUrl: "",
    repoUrl: "https://github.com/mraficaturw/employee-competencies-development-program.git",
    image: Project1
  },
  {
    id: "proj-2",
    title: "Sistem Informasi KIP-K Unsika",
    subtitle: "Pusat informasi dan layanan administrasi mahasiswa KIP-K UNSIKA.",
    tags: ["Laravel", "Filament", "PHP"],
    description: "Situs web pusat informasi mahasiswa KIP-K UNSIKA dengan fitur manajemen berita, pendataan KHS, pelacakan pencairan beasiswa, dan layanan pengaduan.",
    fullDescription: "Merancang dan mengembangkan situs web untuk pusat informasi mahasiswa KIP-K UNSIKA menggunakan Laravel dan Filament untuk mengatasi penyebaran informasi KIP terutama dari internal Unsika yang tidak terpusat. Sistem ini menyediakan fitur untuk manajemen berita, pendataan KHS, pelacakan pencairan beasiswa, pengunduhan SK, FAQ, dan layanan pengaduan.",
    demoUrl: "https://kipunsika.vercel.app/",
    repoUrl: "",
    image: Project2
  },
  {
    id: "proj-3",
    title: "SIKARIR",
    subtitle: "Platform informasi lowongan magang mahasiswa (Capstone Project).",
    tags: ["Laravel", "Filament", "Fullstack", "Web App"],
    description: "Aplikasi web full-stack untuk portal informasi magang yang dilengkapi dengan admin panel berbasis Filament untuk memudahkan pengelolaan konten.",
    fullDescription: "Membangun aplikasi web full-stack untuk platform informasi magang sebagai Capstone Project universitas menggunakan Laravel. Merancang dan mengembangkan komponen backend dan frontend, termasuk migration, model, controller, middleware, autentikasi, dan Blade view. Mengintegrasikan Filament Admin Panel untuk menyederhanakan manajemen konten, memungkinkan administrator membuat dan mengelola lowongan magang melalui antarmuka yang ramah pengguna. Meningkatkan performa aplikasi dengan mengoptimalkan kueri database dan menerapkan caching untuk data yang sering diakses.",
    demoUrl: "https://sikarir-olive.vercel.app",
    repoUrl: "https://github.com/mraficaturw/SIKARIR.git",
    image: Project3
  },
  {
    id: "proj-4",
    title: "Online Invoice Generator",
    subtitle: "Aplikasi faktur berbasis web untuk otomatisasi pembuatan tagihan.",
    tags: ["PWA", "Vite", "Web App"],
    description: "Aplikasi web untuk menggantikan pembuatan faktur manual, mengotomatiskan kalkulasi harga total, dan menyediakan format siap cetak secara efisien.",
    fullDescription: "Mengembangkan aplikasi faktur berbasis web untuk menggantikan proses pembuatan faktur manual yang sebelumnya mengharuskan penulisan ulang pada setiap transaksi, sehingga mengurangi waktu pembuatan faktur dari sekitar 5–10 menit menjadi kurang dari 1 menit per transaksi. Mengotomatiskan penghitungan harga total berdasarkan input berat dan harga satuan, mengurangi risiko salah hitung yang umum terjadi pada pencatatan manual. Menyediakan tampilan faktur yang konsisten dan siap cetak sehingga admin tidak perlu menyesuaikan format ulang sebelum mencetak atau mengirimkan faktur ke pelanggan.",
    demoUrl: "https://invoice-generator-app-liard.vercel.app/",
    repoUrl: "https://github.com/mraficaturw/invoice-generator-app.git",
    image: Project4
  },
  {
    id: "proj-5",
    title: "FindUp",
    subtitle: "Desain dan implementasi arsitektur cloud untuk backend aplikasi.",
    tags: ["GCP", "Figma", "Cloud Computing", "FastAPI", "Cloud SQL"],
    description: "Merancang arsitektur aplikasi dengan Figma dan melakukan deployment backend serta database memanfaatkan layanan Google Cloud Platform.",
    fullDescription: "Merancang Arsitektur Aplikasi menggunakan Figma kemudian mengimplementasikan Arsitektur tersebut dengan Google Cloud Platform menggunakan App Engine untuk Deployment Aplikasi, CloudStorage untuk penyimpanan file, Compute Engine untuk Backend, dan CloudSQL untuk Database.",
    demoUrl: "",
    repoUrl: "https://github.com/Timnas-Bangkit",
    image: Project5
  },
  {
    id: "proj-6",
    title: "Employee Competencies Development Program",
    subtitle: "Analisis data pemetaan kompetensi karyawan departemen maintenance.",
    tags: ["Microsoft Excel", "Data Analysis"],
    description: "Menganalisis data pemetaan kompetensi karyawan menggunakan Microsoft Excel untuk menyusun rekomendasi program pelatihan yang tepat sasaran.",
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

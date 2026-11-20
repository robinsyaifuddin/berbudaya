# Berbudaya (Ruang Budaya)

[![Production Website](https://img.shields.io/badge/Live-berbudaya.web.id-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://berbudaya.web.id)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Workers](https://img.shields.io/badge/Runtime-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](./LICENSE)

> Platform ekosistem digital terintegrasi untuk preservasi, kolaborasi, edukasi, interaksi sosial, dan monetisasi karya seni serta kebudayaan nusantara.

Akses platform resmi: **[berbudaya.web.id](https://berbudaya.web.id)**

---

## 1. Tentang Berbudaya

**Berbudaya** adalah ekosistem digital terintegrasi yang menjembatani kreator, seniman daerah, pengrajin lokal, paguyuban adat, dan masyarakat luas dalam satu wadah digital interaktif. Platform ini menggabungkan jejaring sosial kebudayaan, pasar karya kriya autentik, penggalangan dana pelestarian tradisi, serta modul edukasi gamifikasi nusantara.

### 4 Pilar Utama Platform

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          BERBUDAYA ECOSYSTEM                           │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 1. JEJARING SOSIAL │ 2. EKONOMI KREATIF │ 3. CROWDFUNDING & PRESERVASI │ 4. EDUKASI & GAME │
│ • Linimasa Budaya  │ • Toko Kriya Asli  │ • Restorasi Cagar Budaya     │ • Kuis Budaya     │
│ • Forum Komunitas  │ • Seller Center    │ • Bantuan Pengrajin Sepuh    │ • Puzzle Budaya   │
│ • Direktori Maestro│ • Pembayaran QRIS  │ • Transparansi Progress Dana │ • Tebak Asal Seni │
└────────────────────┴────────────────────┴──────────────────────────────┴───────────────────┘
```

1. **Jejaring Sosial & Komunitas**: Linimasa interaktif berbagi dokumentasi seni, direktori seniman/maestro, profil sanggar seni daerah, dan sistem pesan langsung.
2. **Ekonomi Kreatif (Marketplace & Seller Center)**: Katalog kriya & busana tradisional berfilosofi tinggi, keranjang multi-item, kasir instan (QRIS & Virtual Account), serta portal manajemen mitra toko pengrajin.
3. **Pendanaan Kolektif (Crowdfunding Budaya)**: Penggalangan dana terverifikasi untuk konservasi situs bersejarah, pementasan kesenian tradisional, dan bantuan maestro seni sepuh dengan pembaruan progres donasi real-time.
4. **Gamifikasi & Edukasi Interaktif**: Sarana belajar menyenangkan dengan 3 minigames edukasi nusantara (Kuis Budaya, Puzzle Budaya, Tebak Daerah), artikel wawasan tradisi, dan kalender agenda festival adat.

---

## 2. Arsitektur & Teknologi

Sistem dirancang dengan arsitektur serverless edge modern untuk menjamin latensi ultra-rendah, skalabilitas tinggi, dan keamanan data:

| Komponen | Teknologi | Peran & Deskripsi |
| :--- | :--- | :--- |
| **Frontend Core** | React 19 + TypeScript | Single Page Application (SPA) responsif dengan lazy code-splitting per rute |
| **Routing** | React Router v7 | Manajemen navigasi terstruktur, route guards (`ProtectedRoute`), dan history state |
| **UI & Styling** | Tailwind CSS + Lucide Icons | Antarmuka adaptif, konsisten, clean aesthetic, serta tactile feedback |
| **Edge API Gateway** | Hono Framework | REST API berkecepatan tinggi yang dieksekusi di edge node Cloudflare Workers |
| **Database Relasional** | Cloudflare D1 | Database serverless SQLite terdistribusi untuk data pengguna, transaksi, dan donasi |
| **Object Storage** | Cloudflare R2 | Penyimpanan aset gambar resolusi tinggi, foto karya, dan media kebudayaan |
| **Autentikasi** | Secure HTTP-Only Cookie | Sesi aman terenkripsi, simulasi Google OAuth, dan fallback demo login |

---

## 3. Peta Rute & Fitur Aplikasi

Platform Berbudaya memiliki matriks rute lengkap yang terbagi atas zona publik dan zona terproteksi:

### Zona Publik
- `/` & `/landing` : Halaman sambutan utama, highlight 4 pilar, metrik dampak, dan modal otentikasi.
- `/gallery` : Katalog showcase visual karya seni dan artefak nusantara.
- `/auth/callback` : Endpoint handler pertukaran token sesi login.

### Zona Terproteksi (Akun Pengguna)
- `/beranda` : Feed sosial kebudayaan, posting aktivitas, interaksi like, komentar, dan bookmark.
- `/cari` : Pencarian global terintegrasi (Postingan, Produk, Proyek Donasi, Komunitas, Acara).
- `/marketplace` : Katalog belanja kriya nusantara dengan filter daerah asal dan filosofi motif.
- `/marketplace/:id` : Rincian produk, latar sejarah karya, dan pemesanan langsung.
- `/cart` & `/checkout` : Alur kasir, kalkulasi ongkos kirim, dan integrasi multi-payment QRIS/VA.
- `/buka-toko` & `/seller` : Dasbor Seller Center untuk manajemen etalase kriya dan pesanan masuk.
- `/crowdfunding` : Indeks kampanye galang dana pelestarian cagar budaya & seni tradisional.
- `/crowdfunding/:id` & `/donate` : Detail transparansi target kampanye dan form pembayaran donasi.
- `/permainan` : Hub hiburan edukatif (Kuis Budaya, Puzzle Budaya, dan Tebak Daerah).
- `/jaringan` : Direktori koneksi dan jejaring pegiat, budayawan, serta seniman nusantara.
- `/lembaga` & `/acara` : Direktori paguyuban/sanggar tari dan kalender agenda festival seni.
- `/berita` & `/edukasi` : Portal artikel budaya terverifikasi dan modul kursus tradisi lokal.
- `/pesan`, `/profil`, `/pengaturan` : Komunikasi privat, portofolio karya pengguna, dan setelan akun.

---

## 4. Panduan Menjalankan Secara Lokal

### Prasyarat
- Node.js (versi 18.x atau lebih baru)
- npm (versi 9.x atau lebih baru)

### Langkah Instalasi

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/robinsyaifuddin/berbudaya.git
   cd berbudaya
   ```

2. **Setup Lingkungan & Dependensi**:
   Jalankan inisialisasi otomatis untuk mengunduh package, membuat definisi worker typegen, dan migrasi database lokal Cloudflare D1:
   ```bash
   npm run setup
   ```

3. **Inisialisasi Database (Opsional / Manual)**:
   Untuk memuat skema awal dan data benih (seeding):
   ```bash
   npm run db:setup
   ```

4. **Jalankan Server Pengembangan**:
   - Menjalankan backend worker & frontend terintegrasi via runtime Cloudflare:
     ```bash
     npm run dev:wrangler
     ```
     Buka browser di: `http://localhost:8787`

   - *(Opsional)* Menjalankan Vite development server frontend saja:
     ```bash
     npm run dev
     ```

---

## 5. Kredensial Uji Coba (Demo Account)

Untuk keperluan review dan pengujian fitur tanpa proses pendaftaran baru, Anda dapat menggunakan akun demo berikut pada modal login:

| Parameter | Kredensial Demo |
| :--- | :--- |
| **Email** | `robinsyaifuddin@gmail.com` |
| **Password** | `robin123` |
| **Akses Rute** | Akses penuh ke seluruh fitur (Feed, Marketplace, Seller Center, Donasi, Permainan) |

---

## 6. Daftar Perintah NPM (NPM Scripts)

| Perintah | Fungsi |
| :--- | :--- |
| `npm run setup` | Instalasi dependensi, typegen Cloudflare, dan migrasi schema D1 lokal |
| `npm run dev:wrangler` | Menjalankan server lokal via Cloudflare Workers runtime (`:8787`) |
| `npm run dev` | Menjalankan server frontend lokal Vite |
| `npm run build` | Kompilasi TypeScript dan pembuatan build bundle production |
| `npm run db:migrate` | Menerapkan berkas migrasi database SQLite ke D1 lokal |
| `npm run db:setup` | Menjalankan seeding data dan konfigurasi database awal |
| `npm run cf-typegen` | Regenerasi definisi tipe TypeScript binding Cloudflare |
| `npm run check` | Validasi tipe data (type-check) dan dry-run verifikasi Cloudflare |
| `npm run lint` | Audit statis kualitas kode dengan ESLint |

---

## 7. Struktur Direktori Proyek

```text
berbudaya/
├── docs/                      # Dokumentasi komprehensif & Product Knowledge
├── migrations/                # Berkas skema SQL & migrasi Cloudflare D1
├── public/                    # Aset statis publik (favicon, ornamen, ilustrasi)
├── src/
│   ├── react-app/             # Lapisan frontend Single Page Application (React 19)
│   │   ├── components/        # Komponen UI modular (Navbar, Modal, PostCard, dsb.)
│   │   ├── pages/             # Komponen halaman (Beranda, Marketplace, Donasi, Games)
│   │   ├── context/           # State management global (Auth, Cart, Notification)
│   │   └── App.tsx            # Pendaftaran rute React Router v7 & layout root
│   ├── worker/                # Lapisan backend API (Hono Framework)
│   │   └── index.ts           # Route handler, middleware otentikasi, binding D1/R2
│   └── shared/                # Skema tipe data TypeScript bersama
├── wrangler.json              # Konfigurasi binding Cloudflare Workers, D1 & R2
├── vite.config.ts             # Konfigurasi bundler Vite
└── package.json               # Konfigurasi dependensi dan script npm
```

---

## 8. Lisensi & Tautan Resmi

- Website Resmi: **[berbudaya.web.id](https://berbudaya.web.id)**
- Repositori: **[github.com/robinsyaifuddin/berbudaya](https://github.com/robinsyaifuddin/berbudaya)**
- Dikelola di bawah lisensi terbuka [MIT License](./LICENSE). Hak Cipta dilindungi undang-undang untuk pelestarian warisan budaya Indonesia.

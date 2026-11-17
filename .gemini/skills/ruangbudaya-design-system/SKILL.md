---
name: Berbudaya-design-system
description: Design System & Visual Guidelines resmi untuk proyek web Berbudaya. Mencegah AI slop, menjaga hierarki konten, tipografi Poppins, token warna terpadu (Tailwind), radius cekungan shape 5% (rounded-lg / rounded-md 6px-8px), icon button taktil (Lucide), dan konsistensi lintas seluruh halaman.
---

# Berbudaya — Design System & Anti-AI Slop Guidelines

Skill ini adalah standar acuan visual dan interaksi mutlak untuk seluruh halaman di proyek **Berbudaya** (Beranda, Profil, Pasar Seni, Donasi/Crowdfunding, Jaringan Budaya, Komunitas, Eksplorasi/Games, dsb.).

---

## 1. Aturan Khusus Bentuk & Cekungan Shape: Maksimal 5% Curvature (Crisp Geometry)

> **PENTING**: Dilarang menggunakan sudut melengkung ekstrem (seperti `rounded-2xl`, `rounded-3xl`, atau `rounded-full` pada kartu/container).
- **Radius Kartu & Panel**: Wajib gunakan **5% curvature** $\rightarrow$ `rounded-lg` (8px) atau `rounded-md` (6px).
- **Radius Tombol & Input**: `rounded-md` (6px) atau `rounded-lg` (8px).
- **Pengecualian Khusus**:
  - Foto Avatar / User Profile: Tetap `rounded-full` (lingkaran sempurna) untuk kenyamanan visual pengenalan wajah.
  - Notification Badge (Counter): `rounded-full`.
- **Hasil Visual**: Tampilan tegas, modern, terstruktur ala platform profesional (LinkedIn / Substack / Linear), bukan aplikasi mainan yang membulat berlebihan.

---

## 2. Zero AI Slop (Karakteristik yang Dilarang Keras)

- **NO Purple / Neon / AI Gradients**: Dilarang memakai gradien ungu-pink klise (`from-indigo-500 to-purple-600`) atau efek glow neon mengambang.
- **NO Background Pill Badges pada Teks**: Dilarang meletakkan wadah kotak/pill berwarna pucat di belakang teks judul hanya untuk hiasan. Teks harus berdiri bersih langsung di atas surface.
- **NO Emoji As Icon**: Dilarang memakai emoji (🚀, 💡, 🔥, ✨) di navigasi, header kartu, atau tombol. Gunakan ikon SVG murni dari `lucide-react` dengan stroke seragam (1.5px / 1.75px).
- **NO 3-Col Identical Cliché Cards**: Hindari menyusun 3 boks card identik berjejer yang monoton. Gunakan layout hierarkis (asimetris, bento grid dengan fokus utama yang jelas).
- **NO Cluttered Decorative Blobs**: Hindari ornamen blur lingkaran acak tanpa fungsi visual terarah.

---

## 3. Ekstraksi Warna & Surface Terpadu (Dari Halaman Beranda)

Mengikuti arsitektur warna 60-30-10:
- **60% Latar Belakang & Surface Netral**:
  - Main Background: `bg-[#F3F4F6]` / `bg-slate-100` (abu-abu lembut natural, membuat kartu putih menonjol).
  - Card & Container Surface: `bg-white`.
  - Border Hairline Taktil: `border border-slate-200/80` (bersih, 1px, tanpa bayangan gelap kotor).
  - Soft Hover Surface: `hover:bg-slate-50`.
- **30% Tipografi & Struktur Konten**:
  - Primary Headings / Nama User: `text-slate-900` font-semibold.
  - Body Text / Status Posting: `text-slate-800` leading-relaxed.
  - Secondary / Jabatan / Meta Time: `text-slate-500` / `text-xs`.
  - Subtle Labels / Counts: `text-slate-400`.
- **10% Aksen Fungsional Budaya (Blue Foundation)**:
  - Header Cover: `bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900` (deep cultural night).
  - Brand Primary: `text-primary-600` (`#2B6CB0`) / `bg-primary-600 hover:bg-primary-700`.
  - Action Category Tints:
    - Foto Galeri: `text-blue-600` / `text-emerald-600`
    - Rekaman Video: `text-rose-500`
    - Artikel Narasi: `text-amber-500`
    - Trending / Analytics: `text-blue-600`

---

## 4. Tipografi & Hierarki Konten (Font Poppins)

- **Font Family**: `font-poppins` (`Poppins`, sans-serif).
- **Skala Hirarki Terpadu**:
  - **Level 1 (Top Identity / Page Title)**: `text-lg sm:text-xl font-bold tracking-tight text-slate-900`.
  - **Level 2 (Author Name / Section Title)**: `text-sm sm:text-base font-semibold text-slate-900`.
  - **Level 3 (Body Content / Narasi)**: `text-xs sm:text-sm font-normal text-slate-800 leading-relaxed`.
  - **Level 4 (Metadata / Waktu / Lokasi)**: `text-[11px] sm:text-xs text-slate-400 font-normal`.
  - **Level 5 (Nav Item Label)**: `text-[10px] sm:text-xs font-medium text-slate-600 hover:text-primary-600`.

---

## 5. Tombol, Ikon & Interaksi Taktil (Button & Icon Anatomy)

- **Top Navigation Bar Icons**:
  - Stack vertikal: Icon di atas (`w-5 h-5`), label teks di bawah (`text-[10px]`).
  - Active state: Indikator garis bawah 2px `border-b-2 border-primary-600 text-primary-600 font-semibold`.
  - Inactive state: `text-slate-500 hover:text-slate-800 hover:bg-slate-50/50`.
- **Action Buttons (Suka, Tanggap, Bagikan, Simpan)**:
  - Format: `flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors`.
  - Icon ukuran seragam: `w-4 h-4 text-slate-500`.
- **Search Bar**:
  - Input rounded 5%: `rounded-md bg-slate-100/90 border border-slate-200/60 px-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-primary-500`.
- **Micro-interactions**:
  - Transisi: `transition duration-150 ease-out`.
  - Klik Taktil: `active:scale-[0.98]`.

---

## 6. Grid Layout 3 Kolom & Spacing Responsif

- **Container Global**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5`.
- **Distribusi Kolom Desktop**:
  - **Kolom Kiri (Profil & Navigasi Cepat)**: `w-64 flex-shrink-0 space-y-3`.
  - **Kolom Tengah (Feed / Konten Utama)**: `flex-1 min-w-0 space-y-3.5`.
  - **Kolom Kanan (Kabar Kebudayaan & Eksplorasi)**: `w-80 flex-shrink-0 space-y-3`.
- **Jarak Antar Kartu**: `gap-4 sm:gap-5` atau `space-y-3.5`.
- **Internal Card Padding**: `p-4` atau `p-5` (tidak terlalu sempit, tidak terlalu boros ruang).

Semua halaman baru atau revisi fitur (Pasar Seni, Donasi/Crowdfunding, Profil, Komunitas, dsb.) WAJIB mengadopsi standar visual, token warna, dan radius 5% di atas.

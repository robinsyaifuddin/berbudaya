# Berbudaya.id

Platform ekosistem digital untuk preservasi, kolaborasi, dan monetisasi karya seni budaya Indonesia. Menghubungkan kreator, komunitas, dan publik melalui marketplace karya, pendanaan proyek kolaboratif, serta modul edukasi interaktif.

---

## Arsitektur & Tech Stack

Aplikasi ini dibangun menggunakan arsitektur serverless fullstack berbasis edge:

- **Frontend**: React 19, TypeScript, React Router v7, Tailwind CSS, Lucide Icons
- **Backend / API**: Hono (edge-compatible framework)
- **Runtime & Deployment**: Cloudflare Workers (via Wrangler)
- **Database**: Cloudflare D1 (Serverless SQLite)
- **Object Storage**: Cloudflare R2
- **Build Tool**: Vite 7

---

## Panduan Instalasi & Menjalankan Lokal

Pastikan Node.js (v18+) dan npm telah terpasang di sistem Anda.

### 1. Inisialisasi Proyek

Jalankan perintah berikut untuk menginstal dependensi, menghasilkan tipe worker, dan menjalankan migrasi database lokal:

```bash
npm run setup
```

> **Catatan:** Script `npm run setup` secara otomatis mengeksekusi `npm install`, `wrangler types`, dan migrasi Cloudflare D1 local.

Jika ingin menjalankan migrasi data awal/seeding manual:
```bash
npm run db:setup
```

### 2. Menjalankan Environment Pengembangan

Untuk menjalankan backend worker dan frontend secara terintegrasi melalui runtime Cloudflare:

```bash
npm run dev:wrangler
```

Aplikasi dapat diakses melalui browser di:
```text
http://localhost:8787
```

*(Opsional: Jalankan `npm run dev` jika hanya ingin menjalankan frontend Vite standalone).*

---

## Kredensial Uji Coba (Demo Account)

Tersedia akun uji coba lokal untuk memverifikasi alur otentikasi dan fitur terproteksi:

| Role / Akun | Email | Password |
| :--- | :--- | :--- |
| Default Demo User | `robinsyaifuddin@gmail.com` | `robin123` |

Simulasi alur Google OAuth dan mekanisme session detail dapat dibaca di [AUTENTIKASI.md](./AUTENTIKASI.md).

---

## Daftar Script NPM

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run setup` | Menjalankan instalasi dependensi, typegen Cloudflare, dan migrasi D1 lokal |
| `npm run dev:wrangler` | Menjalankan local development server via Cloudflare Workers runtime (`:8787`) |
| `npm run dev` | Menjalankan Vite development server (frontend-only) |
| `npm run build` | Melakukan compile TypeScript dan mem-bundle frontend untuk production |
| `npm run db:migrate` | Menjalankan migrasi schema D1 ke environment lokal |
| `npm run db:setup` | Menjalankan setup database tambahan / seed data |
| `npm run cf-typegen` | Regenerasi definisi tipe TypeScript dari binding Cloudflare |
| `npm run check` | Validasi tipe, build test, dan dry-run deploy Cloudflare |
| `npm run lint` | Pengecekan standar kode dengan ESLint |

---

## Struktur Direktori

```text
.
├── migrations/             # Skema D1 SQLite & file migrasi
├── src/
│   ├── react-app/          # Frontend client (React 19)
│   │   ├── components/     # Komponen UI modular
│   │   ├── pages/          # Halaman aplikasi (Public & Protected routes)
│   │   └── App.tsx         # Routing & inisialisasi aplikasi
│   ├── worker/             # Backend API (Hono pada Cloudflare Worker)
│   │   └── index.ts        # Endpoint handler & D1 bindings
│   └── shared/             # Tipe data bersama & utilitas
├── wrangler.json          # Konfigurasi Cloudflare Workers & resource bindings
└── vite.config.ts         # Konfigurasi bundler Vite
```

---

## Modul & Rute Utama

- **Publik**:
  - `/landing` : Pengenalan platform, katalog kurasi, dan call-to-action.
- **Terproteksi (User Session)**:
  - `/` : Dashboard ringkasan aktivitas budaya.
  - `/marketplace` : Kurasi dan transaksi karya seni nusantara.
  - `/proyek` : Crowdfunding & inisiatif kolaborasi kesenian.
  - `/edukasi` : Modul pembelajaran budaya & artikel interaktif.
  - `/komunitas` : Forum diskusi kreator dan pegiat budaya.
  - `/acara` : Manajemen dan direktori agenda kebudayaan.

---

## Dokumentasi Terkait

- Panduan Otentikasi & Database: [AUTENTIKASI.md](./AUTENTIKASI.md)
- Panduan Deployment Production: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Modul Permainan Budaya: [GAMES_README.md](./GAMES_README.md)
- Detail Crowdfunding: [CROWDFUNDING_CONTENT_UPDATE.md](./CROWDFUNDING_CONTENT_UPDATE.md)

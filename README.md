# 🎨 RuangBudaya.id - Platform Kolaborasi Budaya Indonesia

Platform komprehensif untuk kreator, seniman, dan pencinta budaya Indonesia. Jual karya seni, ikuti proyek kolaboratif, dan pelajari budaya nusantara dalam satu platform terintegrasi.

## ✨ Fitur Utama

- 🔐 **Sistem Autentikasi Lengkap** - Login dengan Google OAuth atau Email/Password
- 🎨 **Marketplace Seni** - Jual dan beli karya seni budaya Indonesia
- 👥 **Komunitas Kreatif** - Terhubung dengan sesama seniman
- 📚 **Edukasi Budaya** - Akses materi pembelajaran budaya Indonesia
- 🚀 **Proyek Kolaboratif** - Berkolaborasi dalam proyek seni bersama
- 📅 **Event & Acara** - Temukan dan ikuti acara budaya

## 🚀 Quick Start

### 1. Setup (Pertama Kali)
```bash
npm install
npm run cf-typegen
npm run db:migrate
```

### 2. Jalankan Development Server
```bash
npm run dev:wrangler
```

### 3. Akses Aplikasi
Buka browser: `http://localhost:8787`

## 🔑 Akun Demo

Login dengan kredensial berikut untuk testing:

- **Email**: robinsyaifuddin@gmail.com
- **Password**: robin123

## 📖 Dokumentasi Lengkap

Lihat [AUTENTIKASI.md](./AUTENTIKASI.md) untuk panduan lengkap tentang:
- Cara menjalankan aplikasi
- Alur pengguna (login, register, dll)
- Database management
- Troubleshooting

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Backend**: Hono (Cloudflare Workers)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Auth**: Google OAuth + Manual Login
- **Build**: Vite 7

## 📜 Available Scripts

- `npm run dev:wrangler` - Jalankan dev server dengan Cloudflare Workers
- `npm run dev` - Jalankan Vite dev server (frontend only)
- `npm run build` - Build aplikasi untuk production
- `npm run db:migrate` - Jalankan database migrations
- `npm run cf-typegen` - Generate TypeScript types untuk Cloudflare
- `npm run setup` - Setup lengkap (install + typegen + migrate)

## 📁 Struktur Project

```
├── src/
│   ├── react-app/          # Frontend React
│   │   ├── components/     # Komponen React
│   │   ├── pages/          # Halaman-halaman aplikasi
│   │   └── App.tsx         # Root component
│   ├── worker/             # Backend Cloudflare Worker
│   │   └── index.ts        # API endpoints
│   └── shared/             # Shared utilities
├── migrations/             # Database migrations
├── wrangler.json          # Cloudflare Workers config
└── vite.config.ts         # Vite configuration
```

## 🌟 Halaman Aplikasi

### Publik (Tidak Perlu Login)
- `/landing` - Halaman pembuka

### Terproteksi (Perlu Login)
- `/` - Beranda
- `/marketplace` - Marketplace Seni
- `/proyek` - Proyek Kolaboratif
- `/edukasi` - Edukasi Budaya
- `/komunitas` - Forum Komunitas
- `/acara` - Event & Acara
- `/pesan` - Messaging
- `/profil` - Profil User
- `/pengaturan` - Settings
- `/bantuan` - Help Center

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📄 License

© 2024 RuangBudaya.id. All rights reserved.

---

Built with ❤️ for Indonesian culture and creativity

# 🔐 Panduan Autentikasi RuangBudaya.id

## 📋 Ringkasan

Web RuangBudaya.id sekarang dilengkapi dengan sistem autentikasi lengkap yang meliputi:
- Halaman landing pembuka
- Login dengan email/password
- Pendaftaran akun baru
- Login dengan Google OAuth
- Akun demo untuk testing

## 🚀 Cara Menjalankan Aplikasi

### 1. Setup Awal (Pertama Kali)
```bash
npm run setup
```
Ini akan:
- Install semua dependencies
- Generate TypeScript types untuk Cloudflare
- Setup database lokal dengan akun demo

### 2. Jalankan Development Server
```bash
npm run dev:wrangler
```

Atau gunakan Vite langsung (tanpa Cloudflare Workers):
```bash
npm run dev
```

**Catatan:** Untuk fitur autentikasi lengkap, gunakan `npm run dev:wrangler` karena perlu akses ke D1 database.

### 3. Akses Aplikasi
Buka browser dan akses: `http://localhost:5173`

## 🔑 Akun Demo

Gunakan kredensial berikut untuk login demo:

- **Email**: robinsyaifuddin@gmail.com
- **Password**: robin123

## 🎯 Alur Pengguna

### Pengguna Baru (Pertama Kali Mengakses)
1. Akses website di `http://localhost:5173` → **Halaman landing otomatis terbuka sebagai default**
2. Klik tombol "Daftar" atau "Mulai Berkreasi"
3. Pilih metode registrasi:
   - Google OAuth (recommended)
   - Email & Password manual
4. Setelah berhasil daftar → Login
5. Setelah login → Masuk ke halaman beranda utama (`/beranda`)

### Pengguna Lama
1. Akses website → **Halaman landing sebagai halaman awal**
2. Klik "Masuk"
3. Login dengan:
   - Google OAuth, atau
   - Email & Password, atau
   - Tombol "Login Demo" (untuk testing)
4. Setelah berhasil → Langsung ke halaman beranda (`/beranda`)

## 📄 Struktur Halaman

### Halaman Publik (Tidak Perlu Login)
- `/` - **Halaman landing (Default/Entry Point)** - Halaman pertama yang dilihat pengguna
- `/landing` - Halaman landing (alias untuk `/`)
- `/gallery` - Galeri publik
- `/auth/callback` - Callback OAuth

### Halaman Terproteksi (Perlu Login)
- `/beranda` - Beranda utama (Dashboard)
- `/marketplace` - Marketplace seni budaya
- `/proyek` - Proyek kolaboratif
- `/edukasi` - Konten edukasi budaya
- `/komunitas` - Forum komunitas
- `/acara` - Event dan acara budaya
- `/pesan` - Messaging
- `/profil` - Profil pengguna
- `/pengaturan` - Pengaturan akun
- `/bantuan` - Pusat bantuan

## 🛠️ Database Management

### Menjalankan Migration Baru
```bash
npm run db:migrate
```

### Membuat Migration Baru
```bash
npx wrangler d1 migrations create DB <nama_migration>
```

### Reset Database (Development)
Hapus folder `.wrangler/state` dan jalankan migration lagi:
```bash
Remove-Item -Recurse -Force .wrangler/state
npm run db:migrate
```

## 🔒 Keamanan

- Password di-hash sebelum disimpan (dalam production, gunakan bcrypt)
- Session token disimpan dalam HTTP-only cookies
- Semua route sensitif dilindungi dengan `ProtectedRoute`
- Support CORS yang aman

## 🎨 Fitur Autentikasi

1. **Multi-Provider Login**
   - Google OAuth
   - Email/Password manual
   - Demo account untuk testing

2. **Session Management**
   - **Halaman landing (`/`) sebagai entry point default untuk semua pengguna**
   - Auto-redirect ke landing jika user belum login mencoba akses halaman terproteksi
   - Session persisten menggunakan localStorage
   - Logout menghapus session dan redirect ke halaman landing

3. **User Experience**
   - Loading state saat check autentikasi
   - Error handling yang informatif
   - Responsive design (mobile-friendly)
   - Split-screen design seperti LinkedIn

## 🐛 Troubleshooting

### "Cannot find worker-configuration.d.ts"
```bash
npm run cf-typegen
```

### "Database tidak ditemukan"
```bash
npm run db:migrate
```

### "Login tidak berfungsi"
1. Pastikan menggunakan `npm run dev:wrangler`
2. Check browser console untuk error
3. Pastikan database sudah di-migrate
4. Clear browser cookies dan coba lagi

### Build Error
```bash
npm run build
```
Jika ada error, check:
- TypeScript errors: `tsc --noEmit`
- Vite config issues
- Missing dependencies

## 📞 Support

Jika ada masalah:
1. Check dokumentasi ini
2. Lihat console browser (F12) untuk error
3. Check terminal output untuk error dari server

## 🎉 Selamat!

Sistem autentikasi RuangBudaya.id sudah siap digunakan! 

Akses web Anda dan mulai berkreasi! 🚀

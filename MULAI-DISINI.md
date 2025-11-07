# 🚀 Panduan Cepat - Mulai di Sini!

## Langkah 1️⃣: Akses Website Anda

Server development sudah berjalan di:
**http://localhost:8787**

Atau klik tombol "Open in Browser" di Cascade untuk membuka preview.

## Langkah 2️⃣: Coba Fitur Autentikasi

### Opsi A: Login dengan Akun Demo (Tercepat!)
1. Di halaman landing, klik tombol **"Coba Demo"** atau **"Login Demo"**
2. Otomatis login dengan akun: robinsyaifuddin@gmail.com
3. Langsung masuk ke halaman beranda utama

### Opsi B: Login Manual
1. Klik tombol **"Masuk"** di halaman landing
2. Masukkan kredensial:
   - Email: `robinsyaifuddin@gmail.com`
   - Password: `robin123`
3. Klik **"Masuk"**

### Opsi C: Daftar Akun Baru
1. Klik tombol **"Daftar"** atau **"Mulai Berkreasi"**
2. Isi form pendaftaran dengan:
   - Nama lengkap
   - Email (gunakan email asli Anda)
   - Password (minimal 6 karakter)
3. Klik **"Buat Akun"**
4. Setelah berhasil, login dengan email dan password yang baru dibuat

### Opsi D: Login dengan Google
1. Klik tombol **"Masuk dengan Google"**
2. Ikuti proses OAuth Google
3. Setelah berhasil, otomatis login dan masuk ke beranda

## Langkah 3️⃣: Jelajahi Website

Setelah login, Anda bisa mengakses semua halaman:

- **Beranda (/)** - Feed utama dan posting
- **Marketplace (/marketplace)** - Jual beli karya seni
- **Proyek (/proyek)** - Proyek kolaboratif
- **Edukasi (/edukasi)** - Materi pembelajaran budaya
- **Komunitas (/komunitas)** - Forum diskusi
- **Acara (/acara)** - Event budaya
- **Pesan (/pesan)** - Chat dan messaging
- **Profil (/profil)** - Profil Anda
- **Pengaturan (/pengaturan)** - Atur preferensi
- **Bantuan (/bantuan)** - Pusat bantuan

## 🎯 Apa yang Sudah Berfungsi?

✅ **Halaman Landing** dengan desain modern split-screen
✅ **Halaman Login** dengan multiple options
✅ **Halaman Register** untuk pendaftaran
✅ **Protected Routes** - Halaman otomatis dilindungi
✅ **Session Management** - Login persisten
✅ **Database Integration** - Data tersimpan di D1
✅ **Demo Account** - Testing tanpa perlu registrasi
✅ **Google OAuth** - Login dengan akun Google
✅ **Responsive Design** - Mobile-friendly

## 📝 Alur Pengguna

```
┌─────────────────┐
│  Akses Website  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Halaman Landing │ ◄── Tampilan pertama (seperti LinkedIn)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ Login │ │Daftar │
└───┬───┘ └───┬───┘
    │         │
    └────┬────┘
         │
         ▼
┌─────────────────┐
│ Auth Success    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Beranda Utama   │ ◄── Halaman inti website Anda
│ (Protected)     │
└─────────────────┘
```

## 🔄 Testing Flow

1. **Test Landing Page**: Akses root URL, harus redirect ke `/landing`
2. **Test Login**: Gunakan akun demo, harus masuk ke beranda
3. **Test Register**: Buat akun baru, lalu login
4. **Test Protected Route**: Logout, lalu coba akses `/marketplace`, harus redirect ke `/landing`
5. **Test Session**: Login, refresh page, harus tetap login

## 🛑 Logout

Untuk logout:
1. Akses menu pengaturan atau profil
2. Klik tombol **Logout**
3. Atau buka console browser dan jalankan:
   ```javascript
   fetch('/api/auth/logout', {method: 'POST'}).then(() => location.reload())
   ```

## ⚡ Command Berguna

### Restart Development Server
```bash
# Hentikan server (Ctrl+C)
# Lalu jalankan lagi:
npm run dev:wrangler
```

### Clear Database dan Reset
```bash
Remove-Item -Recurse -Force .wrangler/state
npm run db:migrate
```

### Lihat Log Database (Development)
Database SQLite tersimpan di:
`.wrangler/state/v3/d1/miniflare-D1DatabaseObject/`

## 🎨 Customisasi

Untuk mengubah tampilan landing page, edit:
`src/react-app/pages/Landing.tsx`

Untuk mengubah API endpoint, edit:
`src/worker/index.ts`

Untuk menambah halaman baru:
1. Buat file di `src/react-app/pages/`
2. Import dan tambahkan route di `src/react-app/App.tsx`

## 🎉 Selesai!

Website RuangBudaya.id Anda sudah siap dengan:
- ✅ Halaman landing profesional
- ✅ Sistem login/register lengkap
- ✅ Akun demo untuk testing
- ✅ Protected routes untuk keamanan
- ✅ Database terintegrasi
- ✅ Modern UI/UX

**Selamat berkreasi!** 🚀

---

Untuk pertanyaan atau masalah, lihat:
- [README.md](./README.md) - Overview project
- [AUTENTIKASI.md](./AUTENTIKASI.md) - Panduan autentikasi lengkap

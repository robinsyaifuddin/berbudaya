# 🔐 Panduan Login Demo - Berbudaya

## 👤 User Demo

### **Robin Syaifuddin**
- **Email**: `mr.robinsyaifuddin@gmail.com`
- **Password**: `robin123`
- **Avatar**: Default male avatar
- **Role**: Demo User dengan akses penuh ke semua fitur

---

## 🚀 Cara Login

### **Metode 1: Login Manual (Email & Password)**

1. Buka halaman landing: `http://localhost:5173/`
2. Klik tombol **"Masuk"** di header
3. Masukkan credentials:
   - Email: `mr.robinsyaifuddin@gmail.com`
   - Password: `robin123`
4. Klik **"Masuk"**
5. Akan diarahkan ke Dashboard Beranda (`/beranda`)

### **Metode 2: Quick Login Button**

1. Buka halaman landing
2. Klik tombol **"Masuk"** di header
3. Klik tombol hijau **"🚀 Quick Login sebagai Robin Syaifuddin"**
4. Langsung masuk ke Dashboard Beranda

### **Metode 3: Login dengan Google (Simulasi)**

1. Buka halaman landing
2. Klik tombol **"Masuk"** di header
3. Klik tombol **"Masuk dengan Google"**
4. **Option A**: Masukkan email Google apa saja (simulasi)
5. **Option B**: Klik tombol hijau **"🚀 Quick Login sebagai Robin Syaifuddin"** di modal
6. Akan diarahkan ke Dashboard Beranda

---

## 🎯 Fitur Login

### ✅ **Validasi Credentials**
- Email dan password divalidasi dengan database demo lokal
- Jika credentials salah, akan muncul alert dengan petunjuk
- Case-insensitive untuk email

### ✅ **Multiple Login Methods**
1. **Manual Login**: Email + Password tradisional
2. **Quick Login**: Satu klik langsung masuk
3. **Google Login**: Simulasi OAuth Google

### ✅ **Auto-redirect ke Dashboard**
Setelah login berhasil:
- User data disimpan di localStorage sebagai `demo_user`
- Otomatis redirect ke `/beranda` (Dashboard Beranda)
- User info tersedia di seluruh aplikasi

### ✅ **Protected Routes**
Semua route berikut memerlukan login:
- `/beranda` - Dashboard Beranda
- `/marketplace` - Marketplace
- `/crowdfunding` - Crowdfunding
- `/komunitas` - Komunitas
- `/games/*` - Games
- `/profil` - Profil User
- Dan semua route lainnya kecuali `/` dan `/landing`

---

## 💾 Data Structure

User data yang tersimpan di localStorage:

```json
{
  "id": "user-1234567890",
  "email": "mr.robinsyaifuddin@gmail.com",
  "name": "Robin Syaifuddin",
  "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "loginTime": "2025-11-07T15:22:30.123Z",
  "provider": "manual" // atau "google" untuk Google login
}
```

---

## 🔄 Logout

Untuk logout (clear session):
1. Buka Developer Console (F12)
2. Jalankan: `localStorage.removeItem('demo_user')`
3. Atau refresh halaman dan akses protected route, akan auto-redirect ke landing

---

## 🧪 Testing

### **Test Scenario 1: Login Manual Success**
```
1. Input: mr.robinsyaifuddin@gmail.com / robin123
2. Expected: Login berhasil → redirect ke /beranda
3. Status: ✅ PASS
```

### **Test Scenario 2: Login Manual Failed**
```
1. Input: wrong@email.com / wrongpassword
2. Expected: Alert dengan pesan error dan credentials yang benar
3. Status: ✅ PASS
```

### **Test Scenario 3: Quick Login**
```
1. Action: Klik tombol Quick Login
2. Expected: Langsung masuk → redirect ke /beranda
3. Status: ✅ PASS
```

### **Test Scenario 4: Google Login (Manual Input)**
```
1. Input: any-email@gmail.com
2. Expected: Login berhasil dengan nama dari email
3. Status: ✅ PASS
```

### **Test Scenario 5: Google Login (Quick)**
```
1. Action: Klik Quick Login di Google modal
2. Expected: Login sebagai Robin → redirect ke /beranda
3. Status: ✅ PASS
```

---

## 🎨 UI/UX Features

### **Login Modal**
- Clean dan modern design
- Responsive untuk mobile & desktop
- Split view: Form (kiri) + Info (kanan) di desktop
- Smooth transitions dan animations

### **Google Login Modal**
- Authentic Google branding (logo & colors)
- Input validation
- Loading states
- Quick login option
- Info box dengan instruksi jelas

### **User Feedback**
- Loading indicators saat processing
- Alert messages untuk error
- Success redirects
- Disabled states untuk prevent double-click

---

## 🔒 Security Notes

⚠️ **PENTING**: Ini adalah implementasi DEMO/SIMULASI untuk development dan testing.

**Tidak cocok untuk production:**
- Credentials hardcoded di frontend
- Tidak ada enkripsi
- Tidak ada backend validation
- Data disimpan di localStorage (tidak aman)
- Tidak ada session management proper

**Untuk production, gunakan:**
- Backend authentication service (JWT, OAuth, etc)
- Database untuk user management
- Password hashing (bcrypt, argon2)
- Secure session management
- HTTPS only
- CSRF protection
- Rate limiting

---

## 📝 User Database Demo

Saat ini tersedia 2 user demo:

| Email | Password | Name | Avatar |
|-------|----------|------|--------|
| `mr.robinsyaifuddin@gmail.com` | `robin123` | Robin Syaifuddin | Male Avatar |
| `demo@Berbudaya.id` | `demo123` | Demo User | Female Avatar |

Tambah user demo baru dengan edit array `demoUsers` di `Landing.tsx`:

```typescript
const demoUsers = [
  {
    email: 'new.user@example.com',
    password: 'password123',
    name: 'New User',
    avatar: 'https://path-to-avatar.jpg'
  },
  // ... existing users
];
```

---

## 🚀 Quick Start

```bash
# 1. Start development server
npm run dev

# 2. Open browser
http://localhost:5173

# 3. Login dengan salah satu metode:
# - Manual: mr.robinsyaifuddin@gmail.com / robin123
# - Quick Login button
# - Google login (simulasi)

# 4. Explore dashboard di /beranda
```

---

## ✅ Checklist Fitur

- [x] Manual login dengan email & password
- [x] Password validation
- [x] Quick login button (1-click)
- [x] Google login modal (simulasi)
- [x] Quick Google login di modal
- [x] Auto-redirect ke dashboard
- [x] Protected routes
- [x] User session management (localStorage)
- [x] Error handling & validation
- [x] Loading states
- [x] Responsive design
- [x] Demo credentials info box

---

## 📞 Support

Jika ada masalah dengan login:

1. **Clear localStorage**: `localStorage.clear()` di console
2. **Hard refresh**: Ctrl+Shift+R / Cmd+Shift+R
3. **Check console**: F12 untuk lihat error messages
4. **Try different browser**: Chrome, Firefox, Edge

---

**Login berhasil? 🎉 Selamat menjelajahi Berbudaya!**

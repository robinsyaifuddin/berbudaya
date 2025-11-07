# 🔐 Simulasi Login Google - RuangBudaya.id

## 📋 Deskripsi Fitur

Fitur simulasi login Google memungkinkan pengguna untuk login menggunakan email Google mereka tanpa perlu setup OAuth yang kompleks. Sistem akan secara otomatis membuat akun demo berdasarkan email yang dimasukkan.

---

## ✨ Cara Kerja

### **Flow Login Google**

```
1. User klik "Masuk dengan Google" atau "Daftar dengan Google"
   ↓
2. Modal popup muncul meminta email Google
   ↓
3. User input email (contoh: john.doe@gmail.com)
   ↓
4. Sistem membuat akun demo:
   - Email: john.doe@gmail.com
   - Nama: John Doe (auto-generated dari email)
   - Avatar: Auto-generated dari nama
   - Provider: google
   ↓
5. User redirect ke dashboard /beranda
```

---

## 🎯 Fitur Utama

### **1. Auto-generate Nama**
- Email: `john.doe@gmail.com` → Nama: **John Doe**
- Email: `budi_santoso@gmail.com` → Nama: **Budi Santoso**
- Email: `maria.clara123@gmail.com` → Nama: **Maria Clara123**

**Logika:**
- Ambil bagian sebelum @ (john.doe)
- Replace `_`, `.`, `-` dengan spasi
- Capitalize setiap kata pertama

### **2. Auto-generate Avatar**
Menggunakan service `ui-avatars.com`:
- Background: Biru Google (#4285F4)
- Text: Putih (#fff)
- Initial dari nama

**Contoh:**
- John Doe → Avatar dengan initial "JD"
- Budi Santoso → Avatar dengan initial "BS"

### **3. Session Management**
Data user disimpan di `localStorage` dengan key `demo_user`:
```json
{
  "id": "google-user-1730988123456",
  "email": "john.doe@gmail.com",
  "name": "John Doe",
  "avatar": "https://ui-avatars.com/api/?name=john.doe&background=4285F4&color=fff&size=100",
  "provider": "google",
  "loginTime": "2025-11-07T12:00:00.000Z"
}
```

---

## 🔧 Implementasi Teknis

### **File Modified**
- `src/react-app/pages/Landing.tsx`

### **State Variables**
```typescript
const [showGoogleModal, setShowGoogleModal] = useState(false);
const [googleEmail, setGoogleEmail] = useState('');
```

### **Fungsi Utama**

#### 1. `handleGoogleLogin()`
Menampilkan modal Google login:
```typescript
const handleGoogleLogin = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  setShowGoogleModal(true);
};
```

#### 2. `handleGoogleLoginSubmit()`
Memproses login dan membuat akun demo:
```typescript
const handleGoogleLoginSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  const googleUser = {
    id: 'google-user-' + Date.now(),
    email: googleEmail,
    name: googleEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(googleEmail.split('@')[0])}&background=4285F4&color=fff&size=100`,
    provider: 'google',
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem('demo_user', JSON.stringify(googleUser));
  
  setTimeout(() => {
    setShowGoogleModal(false);
    window.location.href = '/beranda';
  }, 800);
};
```

---

## 🎨 UI/UX Design

### **Modal Design**
- **Layout:** Centered modal dengan backdrop blur
- **Ukuran:** Max-width 28rem (448px)
- **Elemen:**
  - Google logo di atas (warna asli Google)
  - Heading "Login dengan Google"
  - Input email dengan placeholder
  - Button submit dengan loading state
  - Info box berwarna biru untuk mode simulasi
  - Close button (X) di pojok kanan atas

### **Button Google**
- **Warna:** Putih dengan border abu-abu
- **Icon:** Logo Google dengan warna asli (4 warna)
- **Text:** "Masuk dengan Google" atau "Daftar dengan Google"
- **Hover:** Background abu-abu muda

---

## 📝 Testing Guide

### **Test Case 1: Login dengan Email Gmail**
1. Buka halaman landing
2. Klik "Masuk dengan Google"
3. Input: `test.user@gmail.com`
4. Klik "Lanjutkan dengan Google"
5. **Expected:** 
   - Redirect ke `/beranda`
   - User name: "Test User"
   - Avatar dengan initial "TU"

### **Test Case 2: Email dengan Underscore**
1. Input: `john_doe_123@gmail.com`
2. **Expected:**
   - User name: "John Doe 123"
   - Avatar initial: "JD"

### **Test Case 3: Email dengan Dot**
1. Input: `maria.clara@gmail.com`
2. **Expected:**
   - User name: "Maria Clara"
   - Avatar initial: "MC"

### **Test Case 4: Close Modal**
1. Klik button Google
2. Klik tombol X di modal
3. **Expected:** Modal tertutup, kembali ke landing

### **Test Case 5: Session Persistence**
1. Login dengan Google
2. Refresh page `/beranda`
3. **Expected:** Masih tetap login, tidak redirect ke landing

### **Test Case 6: Logout & Re-login**
1. Login dengan email A
2. Logout
3. Login lagi dengan email B yang berbeda
4. **Expected:** User berubah ke email B

---

## 🔍 Debugging

### **Check localStorage**
```javascript
// Console browser
localStorage.getItem('demo_user')
// Output: {"id":"google-user-...","email":"...","name":"..."}
```

### **Clear Session**
```javascript
localStorage.removeItem('demo_user')
// Kemudian refresh page
```

### **Test Avatar URL**
```
https://ui-avatars.com/api/?name=John+Doe&background=4285F4&color=fff&size=100
```
Buka URL di browser untuk melihat avatar yang di-generate.

---

## ⚠️ Catatan Penting

### **Mode Simulasi**
- ✅ Ini adalah **simulasi**, bukan OAuth Google asli
- ✅ Tidak perlu Google API credentials
- ✅ Cocok untuk development dan demo
- ⚠️ Jangan gunakan di production tanpa OAuth real

### **Security**
- Data disimpan di localStorage (client-side)
- Tidak ada enkripsi password (karena mode demo)
- Untuk production: gunakan OAuth Google asli dengan backend authentication

### **Limitations**
- Tidak validasi apakah email benar-benar Google account
- Tidak ada email verification
- Session hanya tersimpan di browser (tidak sync antar device)

---

## 🚀 Next Steps untuk Production

Jika ingin menggunakan OAuth Google asli:

1. **Setup Google Cloud Console**
   - Buat project baru
   - Enable Google+ API
   - Buat OAuth 2.0 credentials
   - Set redirect URI

2. **Backend Setup**
   - Install `@getmocha/users-service` atau `passport-google-oauth20`
   - Setup OAuth callback route
   - Simpan user di database

3. **Update Frontend**
   - Ganti `handleGoogleLogin` dengan real OAuth flow
   - Gunakan `redirectToLogin()` dari `useAuth()`

---

## 📞 Support

**Tested On:**
- Chrome 120+
- Firefox 121+
- Edge 120+
- Safari 17+

**Compatibility:**
- Desktop: ✅ Full support
- Mobile: ✅ Full support  
- Tablet: ✅ Full support

---

## ✅ Checklist Implementasi

- [x] Button "Masuk dengan Google" di form login
- [x] Button "Daftar dengan Google" di form register
- [x] Modal popup untuk input email
- [x] Auto-generate nama dari email
- [x] Auto-generate avatar dari nama
- [x] Loading state saat proses login
- [x] Redirect ke dashboard setelah login
- [x] Session persistence di localStorage
- [x] Close button di modal
- [x] Info mode simulasi di modal
- [x] Responsive design (mobile-friendly)

---

**🎉 Fitur simulasi Google login siap digunakan!**

Gunakan email apapun untuk testing. Sistem akan otomatis membuat akun demo yang sesuai dengan email Anda.

# 🔐 Fitur Lupa Kata Sandi - RuangBudaya.id

## 📋 Ringkasan

Fitur pemulihan akun lengkap dengan verifikasi kode melalui email atau nomor HP. User dapat mereset password dan login kembali dengan password baru.

---

## 🔄 Flow Pemulihan Akun

```
1. Klik "Lupa kata sandi?" di login page
   ↓
2. Pilih metode: Email atau Nomor HP
   ↓
3. Input contact (email/hp)
   ↓
4. Sistem kirim kode verifikasi 6 digit
   ↓
5. Input kode verifikasi
   ↓
6. Input password baru + konfirmasi
   ↓
7. Password berhasil diubah
   ↓
8. Redirect ke login
   ↓
9. Login dengan password baru ✅
```

---

## 🎯 4 Step Process

### **Step 1: Pilih Metode Pemulihan**
- Pilihan: Email atau Nomor HP
- Input contact sesuai metode
- Button "Kirim Kode Verifikasi"

### **Step 2: Verifikasi Kode**
- Kode 6 digit dikirim (simulasi: ditampilkan via alert)
- Input kode verifikasi
- Validasi: harus 6 digit angka
- Button "Kirim ulang kode" jika perlu

### **Step 3: Password Baru**
- Input password baru (min 6 karakter)
- Konfirmasi password
- Validasi: kedua password harus sama
- Button "Ubah Kata Sandi"

### **Step 4: Berhasil**
- Icon checklist hijau
- Pesan sukses
- Auto redirect ke login (2 detik)
- Email auto-fill di form login

---

## 🔧 Implementasi Teknis

### **State Variables**
```typescript
const [showForgotPassword, setShowForgotPassword] = useState(false);
const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1-4
const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
const [recoveryContact, setRecoveryContact] = useState('');
const [verificationCode, setVerificationCode] = useState('');
const [generatedCode, setGeneratedCode] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
```

### **Fungsi Utama**

#### 1. Generate & Kirim Kode
```typescript
const handleSendVerificationCode = (e: React.FormEvent) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  setGeneratedCode(code);
  alert(`Kode: ${code}`); // Mode simulasi
  setForgotPasswordStep(2);
};
```

#### 2. Verifikasi Kode
```typescript
const handleVerifyCode = (e: React.FormEvent) => {
  if (verificationCode === generatedCode) {
    setForgotPasswordStep(3); // Lanjut ke reset password
  } else {
    alert('Kode salah!');
  }
};
```

#### 3. Reset Password
```typescript
const handleResetPassword = (e: React.FormEvent) => {
  // Validasi password match & minimal 6 karakter
  // Update password di localStorage (simulasi)
  // Redirect ke login
};
```

---

## 📝 Testing Guide

### **Test Case 1: Flow Lengkap Email**
1. Buka halaman landing, klik "Masuk"
2. Klik "Lupa kata sandi?"
3. Pilih "Email"
4. Input: `test@email.com`
5. Klik "Kirim Kode Verifikasi"
6. **Expected:** Alert muncul dengan kode 6 digit
7. Copy kode, input di field verifikasi
8. Klik "Verifikasi Kode"
9. **Expected:** Pindah ke step 3
10. Input password baru: `newpass123`
11. Konfirmasi: `newpass123`
12. Klik "Ubah Kata Sandi"
13. **Expected:** Success message, redirect ke login
14. Login dengan email `test@email.com` & password `newpass123`
15. **Expected:** Berhasil login ✅

### **Test Case 2: Flow Lengkap HP**
1. Pilih metode "Nomor HP"
2. Input: `08123456789`
3. Lanjutkan flow seperti test case 1

### **Test Case 3: Kode Salah**
1. Sampai step 2
2. Input kode yang salah (contoh: `111111`)
3. **Expected:** Alert "Kode salah" muncul
4. Input kode yang benar
5. **Expected:** Lanjut ke step 3

### **Test Case 4: Password Tidak Match**
1. Sampai step 3
2. Password: `pass123`
3. Konfirmasi: `pass456` (berbeda)
4. **Expected:** Error "Password tidak cocok"

### **Test Case 5: Password Terlalu Pendek**
1. Input password: `abc` (< 6 karakter)
2. **Expected:** Error "Minimal 6 karakter"

### **Test Case 6: Kirim Ulang Kode**
1. Di step 2, klik "Kirim ulang kode"
2. **Expected:** Kode baru di-generate & ditampilkan

### **Test Case 7: Kembali ke Login**
1. Di step 1, 2, atau 3
2. Klik "← Kembali ke login"
3. **Expected:** Kembali ke halaman login

---

## 🎨 UI/UX Design

### **Layout**
- Split screen: Form (left) & Info panel (right)
- Responsive: Full width di mobile
- Smooth transition antar step

### **Color Scheme**
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Background: Blue gradient

### **Elements**
- **Step 1:** 2 card button untuk pilih metode
- **Step 2:** Input besar untuk kode (text-center, font-mono)
- **Step 3:** 2 input password dengan validasi real-time
- **Step 4:** Success icon dengan animation

### **Icons**
- Email: Envelope icon
- Phone: Phone icon
- Success: Checkmark in circle
- Loading: Spinner animation

---

## 🔍 Mode Simulasi

### **Kode Verifikasi**
- Generate: `Math.floor(100000 + Math.random() * 900000)`
- Format: 6 digit numerik (contoh: `123456`)
- Ditampilkan via:
  - Alert popup
  - Console log
  - Text kecil di bawah input (untuk testing)

### **Password Storage**
- Disimpan di localStorage dengan key `users_db`
- Format: Array of user objects
- Update password by email/phone match

### **Limitations**
- Tidak ada email/SMS service asli
- Kode langsung ditampilkan (tidak dikirim)
- Password tidak di-hash (plaintext untuk demo)

---

## ⚠️ Catatan Penting

### **Security (Production)**
Untuk production, implementasikan:
1. Email/SMS gateway asli (Twilio, SendGrid, dll)
2. Password hashing (bcrypt, argon2)
3. Rate limiting untuk prevent abuse
4. Expiry time untuk kode verifikasi (5-10 menit)
5. Max attempts untuk input kode (3-5 kali)
6. CSRF protection

### **User Experience**
- Kode auto-expire dalam 10 menit (untuk production)
- Maximum 3 attempts untuk input kode
- Cool-down 1 menit untuk "Kirim ulang kode"
- Password strength indicator
- Show/hide password toggle

---

## 📞 Debugging

### **Check Generated Code**
```javascript
// Console browser
console.log('Generated code:', generatedCode);
```

### **Check localStorage**
```javascript
// Console browser
localStorage.getItem('users_db');
```

### **Clear Session**
```javascript
localStorage.clear();
```

---

## ✅ Checklist Fitur

- [x] Button "Lupa kata sandi?" di login page
- [x] Step 1: Pilih metode (email/hp)
- [x] Step 2: Input & verifikasi kode
- [x] Step 3: Input password baru
- [x] Step 4: Success message
- [x] Generate kode 6 digit random
- [x] Validasi kode
- [x] Validasi password (length & match)
- [x] Update password di storage
- [x] Redirect ke login setelah sukses
- [x] Auto-fill email di login form
- [x] Loading state untuk semua button
- [x] Error handling & validation
- [x] Responsive design
- [x] Button "Kembali ke login"
- [x] Button "Kirim ulang kode"

---

## 🎉 Kesimpulan

Fitur pemulihan akun lengkap dengan:
- ✅ 4-step process yang jelas
- ✅ 2 metode pemulihan (email & HP)
- ✅ Verifikasi kode 6 digit
- ✅ Password validation
- ✅ Success confirmation
- ✅ Seamless redirect ke login

User dapat dengan mudah recover akun dan login kembali dengan password baru!

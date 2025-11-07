# 🚀 Panduan Deployment ke Vercel

## Persiapan

### 1. **Install Vercel CLI** (Opsional)
```bash
npm install -g vercel
```

### 2. **Push Code ke GitHub**
Pastikan semua perubahan sudah di-commit dan push ke repository GitHub:
```bash
git add .
git commit -m "Setup Vercel deployment configuration"
git push
```

---

## 🌐 Deploy ke Vercel

### Metode 1: Deploy via Vercel Dashboard (Rekomendasi)

1. **Login ke Vercel**
   - Buka https://vercel.com
   - Login dengan akun GitHub Anda

2. **Import Project**
   - Klik "Add New Project"
   - Pilih repository: `helloruangbudaya/ruangbudaya`
   - Klik "Import"

3. **Konfigurasi Project**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (Jika diperlukan)
   Tambahkan environment variables yang diperlukan seperti:
   - `VITE_API_URL` (jika ada)
   - `VITE_MOCHA_PROJECT_ID` (jika menggunakan Mocha)
   
5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (2-5 menit)

### Metode 2: Deploy via Vercel CLI

```bash
# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

---

## ✅ Verifikasi Deployment

Setelah deployment berhasil, cek hal berikut:

### 1. **Test Routing**
Pastikan semua route berfungsi dengan baik:
- ✅ `/` - Landing page
- ✅ `/beranda` - Home page (protected)
- ✅ `/marketplace` - Marketplace
- ✅ `/crowdfunding` - Crowdfunding
- ✅ `/komunitas` - Komunitas
- ✅ `/games/kuis-budaya` - Games

### 2. **Test Direct URL Access**
Buka URL secara langsung di browser (bukan melalui navigasi):
- `https://your-domain.vercel.app/marketplace`
- `https://your-domain.vercel.app/crowdfunding`
- Harus **TIDAK** menampilkan 404 error

### 3. **Test Browser Refresh**
- Buka halaman mana saja (misal `/marketplace`)
- Refresh browser (F5)
- Harus tetap menampilkan halaman yang sama, **TIDAK** 404

---

## 🔧 Troubleshooting

### Error: 404 pada Direct URL atau Refresh

**Penyebab**: SPA routing tidak dikonfigurasi dengan benar

**Solusi**: Sudah diperbaiki dengan `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Error: Build Failed

**Kemungkinan Penyebab**:
1. Dependencies tidak terinstall dengan benar
2. TypeScript errors
3. Environment variables tidak di-set

**Solusi**:
```bash
# Cek build di local terlebih dahulu
npm run build

# Jika error, perbaiki dulu di local
# Lalu commit dan push lagi
```

### Error: Page Loads but Blank

**Penyebab**: JavaScript errors atau import path salah

**Solusi**:
1. Buka DevTools Console (F12)
2. Cek error messages
3. Biasanya masalah di environment variables atau API endpoints

### Error: Cloudflare Plugin Conflict

**Status**: ✅ Sudah diperbaiki

File `vite.config.ts` sudah diupdate untuk detect Vercel environment dan skip Cloudflare plugins saat deploy ke Vercel.

---

## 📝 Konfigurasi Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### `public/_redirects`
```
/*    /index.html   200
```

### `.vercelignore`
```
node_modules
.wrangler
*.zip
migrations
```

---

## 🔄 Auto-Deploy

Setiap push ke branch `main` akan otomatis trigger deployment baru di Vercel.

```bash
git add .
git commit -m "Update features"
git push
# Vercel akan otomatis deploy
```

---

## 🌍 Custom Domain

1. Buka project di Vercel Dashboard
2. Pilih "Settings" → "Domains"
3. Tambahkan custom domain (misal: `ruangbudaya.id`)
4. Update DNS records sesuai instruksi Vercel
5. Tunggu DNS propagation (5-10 menit)

---

## 📊 Monitoring

### Production Logs
- Buka Vercel Dashboard → Project → Deployments
- Klik deployment yang ingin dilihat
- Pilih tab "Logs" untuk melihat build logs
- Pilih tab "Functions" untuk serverless logs (jika ada)

### Analytics
- Vercel Dashboard → Project → Analytics
- Monitor traffic, performance, dan errors

---

## ✨ Best Practices

1. **Selalu test build di local** sebelum push:
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

2. **Gunakan Environment Variables** untuk sensitive data
   - Jangan hardcode API keys
   - Set di Vercel Dashboard → Settings → Environment Variables

3. **Enable Preview Deployments**
   - Setiap PR akan dapat preview URL
   - Test sebelum merge ke main

4. **Monitor Performance**
   - Gunakan Vercel Analytics
   - Optimize bundle size jika perlu

---

## 🆘 Support

Jika masih ada masalah:
1. Cek Vercel Logs untuk error messages
2. Cek Browser Console untuk JavaScript errors
3. Pastikan semua environment variables sudah di-set
4. Hubungi Vercel Support: https://vercel.com/support

---

**✅ Deployment Ready!** 

Semua konfigurasi sudah dioptimalkan untuk Vercel deployment. Tinggal push ke GitHub dan import di Vercel Dashboard.

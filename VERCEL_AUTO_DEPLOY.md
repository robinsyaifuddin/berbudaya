# 🚀 Setup Auto-Deployment GitHub → Vercel

Panduan lengkap untuk mengaktifkan sinkronisasi otomatis antara GitHub dan Vercel, sehingga setiap commit langsung di-deploy.

---

## 🎯 Tujuan

Setiap kali Anda push commit ke GitHub, Vercel akan **otomatis**:
1. Detect perubahan
2. Pull code terbaru
3. Build aplikasi
4. Deploy ke production
5. Update URL live Anda

**Waktu**: ~2-5 menit per deployment

---

## 📋 Prerequisites

✅ Repository GitHub: `helloruangbudaya/ruangbudaya`  
✅ Akun Vercel sudah dibuat  
✅ File `vercel.json` sudah ada di repository  

---

## 🔧 Langkah Setup Auto-Deployment

### **Step 1: Login ke Vercel**

1. Buka: https://vercel.com
2. Klik **"Log In"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub Anda

---

### **Step 2: Import Project dari GitHub**

1. Setelah login, klik **"Add New..."** → **"Project"**
2. Vercel akan menampilkan list repository GitHub Anda
3. Cari dan pilih: **`ruangbudaya`**
4. Klik **"Import"**

**Catatan**: Jika repository tidak muncul, klik **"Adjust GitHub App Permissions"**

---

### **Step 3: Configure Project**

Vercel akan auto-detect configuration dari `vercel.json`:

```
Framework Preset: Vite ✅ (auto-detected)
Root Directory: ./ ✅ 
Build Command: npm run build ✅ (from vercel.json)
Output Directory: dist ✅ (from vercel.json)
Install Command: npm install ✅
```

**Jangan ubah apapun**, konfigurasi sudah optimal!

---

### **Step 4: Environment Variables (Optional)**

Jika aplikasi Anda memerlukan environment variables:

1. Klik **"Environment Variables"**
2. Tambahkan variables yang diperlukan:
   - `VITE_API_URL` (jika ada)
   - `VITE_MOCHA_PROJECT_ID` (jika menggunakan Mocha)
   - dll.

**Untuk demo ini**: Skip step ini (tidak diperlukan)

---

### **Step 5: Deploy!**

1. Klik tombol **"Deploy"** 🚀
2. Tunggu proses build (2-5 menit)
3. Vercel akan:
   - Clone repository
   - Install dependencies (`npm install`)
   - Build aplikasi (`npm run build`)
   - Deploy ke CDN global

**Status indicator**:
- 🟡 Building... (sedang build)
- ✅ Ready (build berhasil)
- ❌ Failed (build gagal)

---

### **Step 6: Verifikasi Deployment**

Setelah deployment selesai:

1. Vercel akan memberikan URL:
   - **Production**: `https://ruangbudaya.vercel.app`
   - **Preview**: `https://ruangbudaya-xxx.vercel.app`

2. Klik URL untuk test website

3. Cek hal berikut:
   - ✅ Landing page load
   - ✅ Login berfungsi
   - ✅ Routing tidak 404
   - ✅ Assets loaded

---

## 🔄 Auto-Deployment Setup (Git Integration)

### **Vercel sudah otomatis setup Git Integration!**

Setelah import project, Vercel akan:

✅ Install GitHub App di repository Anda  
✅ Setup webhook untuk detect commits  
✅ Auto-deploy setiap push ke branch `main`  

**Tidak perlu setup manual!** 🎉

---

## 🎮 Cara Kerja Auto-Deployment

### **Workflow**:

```
1. Anda membuat perubahan di code
   ↓
2. Commit perubahan
   git add .
   git commit -m "Update fitur"
   ↓
3. Push ke GitHub
   git push
   ↓
4. GitHub mengirim webhook ke Vercel
   ↓
5. Vercel detect perubahan
   ↓
6. Vercel clone repository terbaru
   ↓
7. Vercel build aplikasi
   ↓
8. Vercel deploy ke production
   ↓
9. Website live Anda updated! ✅
```

**Durasi total**: ~3-5 menit

---

## 📊 Monitoring Deployments

### **Di Vercel Dashboard**:

1. Buka project Anda di Vercel
2. Tab **"Deployments"**
3. Lihat list semua deployments:
   - Commit message
   - Branch
   - Status (Building/Ready/Failed)
   - Duration
   - Deployed URL

### **Real-time Monitoring**:

1. Klik deployment yang sedang berjalan
2. Tab **"Build Logs"** - Lihat log real-time
3. Tab **"Functions"** - Serverless logs (jika ada)

---

## 🔔 Notifications

### **Setup Notifikasi (Optional)**:

1. Vercel Dashboard → **Settings** → **Notifications**
2. Enable notifikasi untuk:
   - ✅ Deployment Started
   - ✅ Deployment Ready
   - ✅ Deployment Failed
3. Pilih channel:
   - Email
   - Slack
   - Discord
   - Webhook

---

## 🌿 Branch Deployments

### **Production vs Preview**:

| Branch | Deployment Type | URL |
|--------|----------------|-----|
| `main` | **Production** | `ruangbudaya.vercel.app` |
| `dev` / `feature/*` | **Preview** | `ruangbudaya-git-dev.vercel.app` |
| Pull Requests | **Preview** | `ruangbudaya-pr-123.vercel.app` |

### **Preview Deployments**:

Setiap branch atau PR mendapat preview URL tersendiri untuk testing sebelum merge ke `main`.

**Enable/Disable di**: Settings → Git

---

## 🧪 Testing Auto-Deployment

### **Test 1: Update README**

```bash
# Edit file README.md
echo "# Testing Auto-Deploy" >> README.md

# Commit dan push
git add README.md
git commit -m "test: Auto-deployment test"
git push

# Tunggu 3-5 menit
# Cek Vercel Dashboard untuk lihat deployment baru
```

### **Test 2: Update Landing Page**

```bash
# Edit Landing.tsx (ubah judul atau teks)
# Commit dan push
git add .
git commit -m "feat: Update landing page title"
git push

# Vercel akan auto-deploy
# Refresh website untuk lihat perubahan
```

---

## 🛠️ Troubleshooting

### **Problem 1: Deployment Tidak Auto-Trigger**

**Solusi**:
1. Check GitHub App Permissions:
   - GitHub → Settings → Applications → Vercel
   - Pastikan repository `ruangbudaya` ter-install
2. Re-connect Vercel:
   - Vercel → Project Settings → Git
   - Re-connect repository

### **Problem 2: Build Failed**

**Penyebab umum**:
- Error di TypeScript
- Missing dependencies
- Environment variables tidak di-set

**Solusi**:
1. Lihat Build Logs di Vercel
2. Test build di local: `npm run build`
3. Fix error di local
4. Push lagi

### **Problem 3: Deployment Success tapi Website Error**

**Solusi**:
1. Check Runtime Logs di Vercel
2. Check Browser Console (F12)
3. Verify environment variables
4. Check 404 routing → sudah fixed dengan `vercel.json`

---

## ⚙️ Advanced Configuration

### **Custom Domain**

1. Vercel Dashboard → **Settings** → **Domains**
2. Add domain: `ruangbudaya.id`
3. Update DNS records sesuai instruksi
4. Tunggu DNS propagation (5-10 menit)

### **Build Settings**

Customize di `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps"
}
```

### **Deployment Protection**

Protect production deployments:
1. Settings → **Deployment Protection**
2. Enable password protection
3. Enable Vercel Authentication

---

## 📈 Performance Optimization

### **Vercel Features**:

- ✅ **Global CDN** - Assets served dari edge locations terdekat
- ✅ **Auto Caching** - Static assets cached optimal
- ✅ **Compression** - Gzip/Brotli compression
- ✅ **Image Optimization** - Auto optimize images
- ✅ **Edge Functions** - Serverless functions di edge

### **Monitor Performance**:

1. Vercel Dashboard → **Analytics**
2. Lihat metrics:
   - Page load time
   - Core Web Vitals
   - Traffic
   - Errors

---

## 🔒 Security Best Practices

1. **Environment Variables**: Jangan commit sensitive data
2. **Branch Protection**: Enable di GitHub untuk `main` branch
3. **Vercel Authentication**: Enable untuk staging
4. **Custom Domain**: Gunakan HTTPS only (auto by Vercel)

---

## 📝 Workflow Best Practices

### **Recommended Flow**:

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# ... edit files ...

# 3. Commit
git add .
git commit -m "feat: Add new feature"

# 4. Push feature branch
git push origin feature/new-feature

# 5. Create Pull Request di GitHub
# - Vercel akan create preview deployment
# - Test di preview URL

# 6. Merge to main setelah testing
# - Auto-deploy ke production
# - Website live updated
```

---

## 🎯 Checklist Setup

- [ ] Login ke Vercel dengan GitHub
- [ ] Import repository `ruangbudaya`
- [ ] Verify build configuration
- [ ] Deploy pertama kali
- [ ] Test website di production URL
- [ ] Test auto-deployment (push commit)
- [ ] Verify deployment di dashboard
- [ ] Check website updated
- [ ] Setup notifications (optional)
- [ ] Add custom domain (optional)

---

## 📊 Deployment Stats

Setelah setup, Anda akan mendapat:

- **Deployment Time**: ~3-5 menit
- **Build Time**: ~1-2 menit
- **Upload Time**: ~30 detik
- **CDN Propagation**: ~10 detik

**Total**: ~5 menit dari push ke live! ⚡

---

## 🎉 Success!

Setelah setup ini, workflow Anda menjadi:

```bash
# Edit code → Commit → Push
git add .
git commit -m "feat: New feature"
git push

# Tunggu 5 menit
# Website live updated! ✅
```

**No manual deployment needed!** 🚀

---

## 📞 Support

### **Vercel Resources**:
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

### **GitHub Resources**:
- Webhook Docs: https://docs.github.com/webhooks
- Actions: https://github.com/features/actions

---

## 🚀 Quick Reference

### **Deploy dari Local**:
```bash
git add .
git commit -m "Update"
git push
```

### **Check Deployment**:
- Dashboard: https://vercel.com/dashboard
- Logs: Project → Deployments → [Latest] → Logs

### **Rollback**:
- Dashboard → Deployments → [Previous] → Promote to Production

---

**Auto-Deployment Setup Complete!** 🎉

Setiap push ke GitHub akan otomatis deploy ke Vercel. Enjoy seamless deployment! 🚀

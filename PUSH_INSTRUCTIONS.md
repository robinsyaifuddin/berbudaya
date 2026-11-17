# 📤 Instruksi Push ke GitHub

## ⚠️ Token GitHub Expired

Token GitHub yang tersimpan mungkin sudah expired. Gunakan salah satu cara berikut untuk push:

---

## Metode 1: Push dengan Token Baru (Recommended)

### 1. Generate Token Baru
1. Buka: https://github.com/settings/tokens
2. Klik "Generate new token (classic)"
3. Beri nama: "Berbudaya Deploy"
4. Pilih scope: **repo** (semua)
5. Generate dan **copy token**

### 2. Push dengan Token
```bash
# Set remote dengan token baru
git remote set-url origin https://YOUR_TOKEN@github.com/helloBerbudaya/Berbudaya.git

# Push
git push origin main
```

---

## Metode 2: Push via GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository
3. Pilih folder: `C:\Users\j\Documents\Website\web Berbudaya`
4. Login dengan akun GitHub
5. Klik "Push origin"

---

## Metode 3: Push via VS Code

1. Buka folder di VS Code
2. Source Control tab (Ctrl+Shift+G)
3. Klik "Push" (akan minta login GitHub)
4. Login dengan akun GitHub
5. Done!

---

## Metode 4: Reset Credential dan Push

```bash
# Hapus credential lama
cmdkey /delete:git:https://github.com

# Push (akan minta login)
git push origin main
```

Akan muncul dialog untuk login GitHub.

---

## ✅ Commit yang Perlu di-Push

**Commit**: `c110ab0` - Feature: Profil Menu Mobile dengan Kelola Komunitas

**Files Changed**:
- `src/react-app/pages/ProfilMenu.tsx` (new)
- `src/react-app/App.tsx` (modified)
- `src/react-app/components/TopNavbar.tsx` (modified)
- `src/react-app/pages/Profil.tsx` (modified)
- `src/react-app/index.css` (modified)

**Total**: 547 insertions, 11 deletions

---

## 🔍 Verify Setelah Push

```bash
# Check status
git status

# Check remote
git remote -v

# Check last commit
git log -1
```

---

## 💡 Untuk Selanjutnya

Setup credential helper agar tidak perlu input token berulang:

```bash
git config --global credential.helper manager
```

---

**Need Help?** Contact GitHub Support atau check dokumentasi: https://docs.github.com/authentication

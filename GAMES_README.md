# 🎮 Game Budaya Indonesia

Dokumentasi untuk tiga game interaktif berbasis budaya Indonesia yang telah diimplementasikan.

## 🧠 1. Kuis Budaya

### Fitur Utama:
- ✅ Database 12 pertanyaan tentang budaya Indonesia
- ✅ Sistem kuis dengan 10 pertanyaan acak per sesi
- ✅ Scoring system: +10 poin per jawaban benar (total 0-100)
- ✅ Indikator benar/salah dengan animasi
- ✅ Pembahasan lengkap untuk setiap jawaban
- ✅ Review jawaban salah di akhir game
- ✅ Progress bar 1-10
- ✅ Tombol "Main Lagi" untuk restart

### Topik Pertanyaan:
- Tarian tradisional (Tari Kecak, Tari Saman, dll)
- Candi dan bangunan bersejarah
- Rumah adat (Tongkonan, Rumah Gadang)
- Alat musik tradisional (Angklung, Gamelan)
- Makanan khas (Rendang, Pempek)
- Kesenian (Wayang Kulit, Reog Ponorogo)
- Kain tradisional (Batik, Tenun Ikat)

### UI/UX:
- Modern gradient design (blue-purple-pink)
- Smooth animations
- Responsive untuk desktop dan mobile
- Tombol kembali ke beranda

### Routing:
- Path: `/games/kuis-budaya`
- Component: `KuisBudayaPage`

---

## 🧩 2. Puzzle Budaya

### Fitur Utama:
- ✅ Database 5 gambar budaya Indonesia
- ✅ 3 tingkat kesulitan:
  - Mudah: 3×3 grid (9 potongan)
  - Sedang: 4×4 grid (16 potongan)
  - Sulit: 5×5 grid (25 potongan)
- ✅ Drag & drop puzzle pieces
- ✅ Timer untuk tracking waktu penyelesaian
- ✅ Counter gerakan (moves)
- ✅ Hint system (1x per game): lihat gambar asli selama 3 detik
- ✅ Preview gambar blur di sidebar
- ✅ Bonus untuk menyelesaikan tanpa hint

### Gambar Puzzle:
1. Rumah Adat Tongkonan (Medium)
2. Candi Borobudur (Hard)
3. Batik Indonesia (Easy)
4. Wayang Kulit (Medium)
5. Tari Tradisional (Easy)

### Gameplay:
1. Pilih tingkat kesulitan (3×3, 4×4, atau 5×5)
2. Pilih gambar yang ingin disusun
3. Klik potongan yang adjacent dengan kotak kosong untuk menukar
4. Selesaikan puzzle sebelum waktu habis
5. Gunakan hint jika perlu (mengurangi bonus)

### UI/UX:
- Modern gradient design (purple-pink-rose)
- Animated transitions
- Shadow effects untuk depth
- Responsive grid system
- Celebration screen saat selesai

### Routing:
- Path: `/games/puzzle-budaya`
- Component: `PuzzleBudayaPage`

---

## 🗺️ 3. Tebak Daerah

### Fitur Utama:
- ✅ Database 10 soal tebak daerah
- ✅ Sistem hangman (tebak huruf satu per satu)
- ✅ Virtual keyboard dengan 26 huruf
- ✅ Visual hangman dengan SVG animation
- ✅ Maksimal 6 kesalahan (6 nyawa)
- ✅ Scoring system: +10 poin per jawaban benar
- ✅ Gambar hint untuk setiap pertanyaan
- ✅ Kategori soal (Tarian, Rumah Adat, Kuliner, dll)

### Kategori Soal:
- Tarian (Tari Saman, Tari Kecak)
- Rumah Adat (Tongkonan, Rumah Gadang)
- Pakaian (Batik, Kebaya)
- Bangunan (Candi Borobudur)
- Kuliner (Rendang, Pempek)
- Kain (Tenun Ikat Sumba)
- Alat Musik (Angklung)

### Gameplay:
1. Lihat gambar dan hint
2. Tebak huruf menggunakan keyboard virtual
3. Huruf benar: muncul di jawaban (hijau)
4. Huruf salah: hangman bertambah (merah)
5. Maksimal 6 kesalahan = game over
6. Selesaikan semua huruf = menang (+10 poin)

### UI/UX:
- Modern gradient design (green-emerald-teal)
- Heart icons untuk nyawa
- Animated SVG hangman
- Color-coded keyboard (hijau=benar, merah=salah, abu=unused)
- Category badges
- Responsive layout

### Routing:
- Path: `/games/tebak-daerah`
- Component: `TebakDaerahPage`

---

## 📍 Akses Game

### Dari Sidebar (RightSidebar):
Semua game dapat diakses melalui section "Game hari ini" di sidebar kanan beranda dengan ikon modern:

1. **Kuis Budaya** 🧠
   - Icon: Brain (Lucide)
   - Color: Blue gradient
   - Subtitle: "Uji pengetahuan budaya Nusantara"

2. **Puzzle Budaya** 🧩
   - Icon: Puzzle (Lucide)
   - Color: Purple gradient
   - Subtitle: "Susun gambar kebudayaan Indonesia"

3. **Tebak Daerah** 🗺️
   - Icon: Map (Lucide)
   - Color: Green gradient
   - Subtitle: "Tebak asal daerah dari gambar budaya"

### Direct Links:
- Kuis Budaya: `https://your-domain.com/games/kuis-budaya`
- Puzzle Budaya: `https://your-domain.com/games/puzzle-budaya`
- Tebak Daerah: `https://your-domain.com/games/tebak-daerah`

---

## 🎨 Design System

### Colors:
- **Kuis Budaya**: Blue (#3B82F6) → Purple (#9333EA) gradient
- **Puzzle Budaya**: Purple (#9333EA) → Pink (#EC4899) gradient
- **Tebak Daerah**: Green (#059669) → Teal (#0D9488) gradient

### Typography:
- Headings: Bold, 2xl-4xl
- Body: Regular, sm-base
- Monospace: For puzzle/hangman displays

### Animations:
- Smooth transitions (300ms)
- Hover effects (scale, shadow)
- Progress animations
- Success/fail indicators

---

## 📱 Responsive Design

Semua game telah dioptimasi untuk:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

### Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🔒 Protected Routes

Semua game pages dilindungi dengan `ProtectedRoute` component:
- User harus login untuk mengakses
- Redirect ke landing page jika belum login
- Support demo user dari localStorage

---

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router 7
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **State Management**: React useState/useEffect hooks

---

## 📝 File Structure

```
src/react-app/
├── components/
│   └── games/
│       ├── KuisBudaya.tsx       # Kuis component
│       ├── PuzzleBudaya.tsx     # Puzzle component
│       └── TebakDaerah.tsx      # Tebak Daerah component
├── pages/
│   └── games/
│       ├── KuisBudayaPage.tsx   # Kuis page wrapper
│       ├── PuzzleBudayaPage.tsx # Puzzle page wrapper
│       └── TebakDaerahPage.tsx  # Tebak Daerah page wrapper
├── components/
│   └── RightSidebar.tsx         # Updated dengan game links
└── App.tsx                      # Routes configuration
```

---

## ✅ Checklist Features

### Kuis Budaya:
- [x] Database pertanyaan (10+)
- [x] Random 10 pertanyaan per game
- [x] Scoring system
- [x] Instant feedback
- [x] Pembahasan jawaban
- [x] Review jawaban salah
- [x] Progress bar
- [x] Main lagi button
- [x] Responsive design

### Puzzle Budaya:
- [x] Multiple images
- [x] 3 difficulty levels
- [x] Drag & drop mechanics
- [x] Timer
- [x] Move counter
- [x] Hint system
- [x] Blur preview
- [x] Win screen
- [x] Responsive design

### Tebak Daerah:
- [x] Database soal (10+)
- [x] Hangman mechanics
- [x] Virtual keyboard
- [x] Visual hangman SVG
- [x] Lives/hearts system
- [x] Scoring
- [x] Image hints
- [x] Category tags
- [x] Responsive design

---

## 🎯 Future Enhancements

### Potential Improvements:
1. **Leaderboard System**
   - Track best scores
   - Time leaderboards for puzzle
   - Social sharing

2. **More Content**
   - Expand question database (100+)
   - More puzzle images
   - New game modes

3. **Achievements**
   - Badges for milestones
   - Streak tracking
   - Daily challenges

4. **Sound Effects**
   - Background music (optional)
   - Success/fail sounds
   - Button clicks

5. **Multiplayer**
   - Real-time challenges
   - Friend competitions
   - Live leaderboards

6. **Progressive Difficulty**
   - Adaptive question difficulty
   - Time pressure modes
   - Expert challenges

---

## 📖 Developer Notes

### Adding New Questions (Kuis):
Edit `src/react-app/components/games/KuisBudaya.tsx`:
```typescript
const questions: Question[] = [
  {
    id: 13,
    question: "Your question here?",
    options: ["A", "B", "C", "D"],
    answer: "A",
    explanation: "Your explanation here."
  }
];
```

### Adding New Puzzles:
Edit `src/react-app/components/games/PuzzleBudaya.tsx`:
```typescript
const puzzleImages: PuzzleImage[] = [
  {
    id: 6,
    title: "Your Title",
    image: "image-url",
    difficulty: "medium"
  }
];
```

### Adding New Tebak Daerah Questions:
Edit `src/react-app/components/games/TebakDaerah.tsx`:
```typescript
const questions: GameQuestion[] = [
  {
    id: 11,
    hint: "Your hint",
    answer: "ANSWER",
    image: "image-url",
    category: "Category"
  }
];
```

---

## 🎉 Conclusion

Ketiga game telah berhasil diimplementasikan dengan:
- ✅ UI/UX modern dan profesional
- ✅ Fully functional gameplay
- ✅ Responsive design (desktop & mobile)
- ✅ Complete game mechanics
- ✅ Smooth animations dan transitions
- ✅ Educational content tentang budaya Indonesia

Game siap dimainkan sampai akhir dengan scoring dan win conditions yang jelas!

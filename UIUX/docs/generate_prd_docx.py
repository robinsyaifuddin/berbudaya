import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
import os

doc = docx.Document()

# 1. Page Margins (Normal 1 inch)
for section in doc.sections:
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

# Colors
COLOR_PRIMARY = RGBColor(15, 23, 42)      # Obsidian Slate #0F172A
COLOR_SECONDARY = RGBColor(71, 85, 105)   # Slate 600 #475569
COLOR_ACCENT = RGBColor(194, 65, 12)      # Terracotta #C2410C
COLOR_EMERALD = RGBColor(4, 120, 87)      # Heritage Emerald #047857

def set_run_font(run, font_name='Calibri', size_pt=11, color=COLOR_PRIMARY, bold=False, italic=False):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.font.color.rgb = color
    run.bold = bold
    run.italic = italic

def add_heading_1(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_run_font(run, 'Calibri', 14.5, COLOR_PRIMARY, bold=True)
    return p

def add_heading_2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(11)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_run_font(run, 'Calibri', 12, COLOR_ACCENT, bold=True)
    return p

def add_body(text, bold_prefix='', italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix + ' ')
        set_run_font(r_pre, 'Calibri', 11, COLOR_PRIMARY, bold=True)
    run = p.add_run(text)
    set_run_font(run, 'Calibri', 11, COLOR_SECONDARY, italic=italic)
    return p

def add_bullet(text, bold_prefix=''):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix + ' ')
        set_run_font(r_pre, 'Calibri', 11, COLOR_PRIMARY, bold=True)
    run = p.add_run(text)
    set_run_font(run, 'Calibri', 11, COLOR_SECONDARY)
    return p

# TITLE BLOCK
p_title = doc.add_paragraph()
p_title.paragraph_format.space_before = Pt(0)
p_title.paragraph_format.space_after = Pt(4)
r_t = p_title.add_run('PRODUCT REQUIREMENTS DOCUMENT (PRD)')
set_run_font(r_t, 'Calibri', 22, COLOR_PRIMARY, bold=True)

p_sub = doc.add_paragraph()
p_sub.paragraph_format.space_before = Pt(0)
p_sub.paragraph_format.space_after = Pt(16)
r_s = p_sub.add_run('RUANG BUDAYA: PLATFORM JEJARING SOSIAL, EDUKASI, DAN EKONOMI DIGITAL PEMAJUAN KEBUDAYAAN INDONESIA\n(The Professional and Creative Cultural Network of Indonesia - "LinkedIn Khusus Komunitas dan Pegiat Budaya Nusantara")')
set_run_font(r_s, 'Calibri', 12, COLOR_ACCENT, bold=True)

# 1. EXECUTIVE SUMMARY
add_heading_1('1. Executive Summary dan Visi Produk')
add_body('BUDAYA GO! 2026 (Kompetisi Inovasi Budaya Indonesia)', 'Ajang Kompetisi:')
add_body('Indonesia Cultural Power', 'Tema Utama:')
add_body('Inventing the Future from Indonesian Culture (Promosi dan Kreasi Ekonomi Kebudayaan)', 'Subtema Pilihan:')
add_body('Inovasi Digital (Web Application dan Responsive Progressive Web Application - PWA)', 'Kategori Inovasi:')

add_heading_2('Susunan Tim Pengembang (Sesuai Persyaratan Resmi 3 Anggota Berbasis Peran):')
add_bullet('Memimpin arsitektur teknis platform, rekayasa frontend dan backend, UI/UX engineering, perancangan purwarupa interaktif, integrasi cloud database, serta memastikan implementasi zero-lag dan standar desain modern.', '1. Anggota 1 (Pengembangan Produk Digital dan Purwarupa):')
add_bullet('Merancang tata kelola ekosistem ekonomi digital, skema komersialisasi beretika budaya (Sustainable Culture-Driven Business Model), model transaksi adil marketplace kriya UMKM, alur direct checkout, serta transparansi platform fee crowdfunding pelestarian.', '2. Anggota 2 (Konteks Ekonomi dan Monetisasi Berkelanjutan):')
add_bullet('Memastikan seluruh kurasi konten dan fitur selaras dengan 10 Objek Pemajuan Kebudayaan (UU No. 5 Tahun 2017), menjaga penghormatan hak komunal adat (TKCE), memverifikasi keabsahan data cagar budaya, serta merumuskan metadata Cultural Value Tagging (CVT) dan materi gamifikasi tradisi.', '3. Anggota 3 (Substansi Kebudayaan dan Riset Warisan Tradisi):')

add_body('Ruang Budaya memosisikan diri sebagai Jejaring Sosial-Kreatif-Profesional Kebudayaan Indonesia Terpadu. Sebagaimana LinkedIn menghubungkan para profesional korporat di seluruh dunia, Ruang Budaya menjadi ruang kredibel tempat maestro seni tradisi, pengrajin kriya lokal, akademisi budaya, pengelola sanggar, komunitas adat, serta generasi muda saling membangun portofolio budaya terverifikasi, berkolaborasi, bertransaksi kriya otentik tangan pertama, dan mendanai restorasi cagar budaya secara gotong royong.', 'Visi Inti Platform:')

# 2. DESIGN PHILOSOPHY
add_heading_1('2. Filosofi Desain: Anti-Slop UI dan High-Taste Cultural Aesthetics')
add_body('Platform Ruang Budaya menolak keras segala bentuk desain generik ala AI (AI Slop) atau template murah. Mengacu pada standar visual kelas dunia (Stripe, Linear, dan LinkedIn Modern) yang berpadu dengan estetika Nusantara:')
add_bullet('Menghapus gradien ungu-pink murahan dan efek glow berlebihan.', 'Zero AI Purple / Neon:')
add_bullet('Teks berdiri murni (pure typography) di atas kanvas/surface yang bersih tanpa shape/blob dekoratif.', 'Pure Typography:')
add_bullet('Seluruh icon wajib menggunakan icon vektor SVG modern (Lucide Icons) dengan stroke tipis konsisten (1.5px / 1.75px).', 'Zero Emoji pada Header dan Tombol:')
add_bullet('Menerapkan proporsi bento grid asimetris (60/40 atau 70/30) dengan hierarki visual yang jelas dan teratur.', 'Bento Grid Asimetris:')
add_bullet('Pengganti drop shadow kabur; gunakan separator garis tipis taktil (border-slate-200 pada tema terang).', 'Hairline Border 1px Taktil:')

add_heading_2('Palet Warna Harmonis (Aturan 60-30-10):')
add_bullet('Slate White (#FFFFFF) dan Surface Layer Slate 50/100 (#F8FAFC) sebagai basis kanvas yang bersih.', '60% Base Canvas dan Surface:')
add_bullet('Hairline Borders rgba(15, 23, 42, 0.08) serta Slate 900/600 untuk tipografi berbobot.', '30% Struktur dan Tipografi:')
add_bullet('Terracotta Earth (#C2410C) untuk kriya tradisi dan Deep Heritage Emerald (#047857) untuk pelestarian cagar budaya.', '10% Aksen Nusantara:')

# 3. USER FLOW & ARSITEKTUR ALUR (IMAGE EMBEDDED)
add_heading_1('3. Peta Koneksi Antar-Halaman dan Alur Pengguna (User Flow)')
add_body('Berikut merupakan visualisasi komprehensif diagram alur pengguna yang menghubungkan Landing Page, Beranda Feed bergaya LinkedIn, hingga 4 Pilar Terpadu Ruang Budaya:')

# Insert Diagram 1
flow_img = r'c:\Users\j\Documents\Dokumen\Draft\Budayago\sc ruangbudaya\UIUX\docs\user_flow_diagram.png'
if os.path.exists(flow_img):
    doc.add_picture(flow_img, width=Inches(6.2))
    p_cap = doc.add_paragraph()
    p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_cap = p_cap.add_run('Gambar 1. Diagram Arsitektur Alur Pengguna dan Peta Navigasi Ekosistem Ruang Budaya')
    set_run_font(r_cap, 'Calibri', 9.5, COLOR_SECONDARY, italic=True)

# 4. RINCIAN SPESIFIKASI 10 HALAMAN LENGKAP
add_heading_1('4. Rincian Spesifikasi 10 Halaman Lengkap dan Modul Ekosistem')

halaman_data = [
    ('4.1 Halaman 1: Landing Page (Landing.tsx)', 'Etalase utama publik yang memperkenalkan 4 pilar Ruang Budaya, menampilkan karya kurasi terbaik, serta mengajak maestro, perajin, dan anak muda bergabung.', 'Sticky glassmorphism nav bar, Bento Hero 60/40, Showcase 4 pilar terpadu, dan Direktori cagar budaya per wilayah.', 'Masuk, Gabung Komunitas, Mulai Eksplorasi Budaya, Pelajari 4 Pilar.'),
    ('4.2 Halaman 2: Beranda Feed Utama (Home.tsx + ModernLayout.tsx)', 'Pusat aktivitas pengguna bergaya LinkedIn Feed tempat anggota membagikan karya kriya, liputan tradisi, dan diskusi budaya.', 'Layout 3-Kolom Asimetris: Sidebar Profil dan Navigasi (kiri), Post Composer dan Feed Card (tengah), Contextual Widgets dan Kuis Harian (kanan).', 'Publikasikan Cerita, Apresiasi, Beri Komentar, Bagikan, Simpan Arsip.'),
    ('4.3 Halaman 3: Jaringan dan Komunitas Budaya (Jaringan.tsx & Komunitas.tsx)', 'Jejaring profesional pegiat budaya layaknya fitur My Network LinkedIn untuk memperluas kolaborasi sanggar dan budayawan.', 'Tab pengelompokan (Maestro, Sanggar, Akademisi, Relawan), Filter provinsi, dan User Connection Card dengan info mutual connections.', '+ Hubungkan / Ikuti, Kirim Pesan Kolaborasi.'),
    ('4.4 Halaman 4: Marketplace Kriya Budaya (Marketplace.tsx & CheckoutPage.tsx)', 'Platform transaksi kriya otentik tangan pertama dengan fitur unik Cultural Value Tagging (CVT: asal daerah, filosofi motif, bahan alami, profil pengrajin).', 'Katalog filter cerdas, Kartu kriya 4:3, Slide-over Drawer keranjang, dan Form direct checkout terpercaya.', '+ Keranjang, Lihat Detail CVT, Lanjut ke Pembayaran, Bayar Pesanan.'),
    ('4.5 Halaman 5: Crowdfunding Pelestarian Budaya (Crowdfunding.tsx)', 'Wadah gotong royong pendanaan konservasi rumah adat, cagar budaya fisik, manuskrip kuno, dan kesenian tradisi terancam punah.', 'Direktori kampanye terkurasi, Detail transparansi RAB dan milestone material restorasi, serta Form donasi cepat QRIS/VA.', 'Donasi Sekarang, Selesaikan Donasi Budaya.'),
    ('4.6 Halaman 6: Ruang Edukasi dan 3 Gamifikasi (Edukasi.tsx & Games)', 'Modul penguatan literasi kebudayaan generasi muda melalui 3 permainan nusantara yang adaptif dan interaktif.', 'Game 1: Kuis Budaya (pilihan ganda timer 15s), Game 2: Puzzle Candi 3x3, Game 3: Tebak Daerah siluet pusaka.', 'Mulai Kuis, Acak Ulang Puzzle, Tebak Provinsi, Bantuan Preview.'),
    ('4.7 Halaman 7: Kalender Agenda dan Festival (Acara.tsx)', 'Direktori terpusat agenda upacara adat, karnaval budaya, pawai seni, dan pameran kriya di seluruh nusantara.', 'Tampilan kalender bulanan / list view, detail tata krama busana adat daerah, dan kuota pendaftar.', 'Tambahkan ke Google Calendar, Reservasi Tiket.'),
    ('4.8 Halaman 8: Profil Profesional Budayawan (Profil.tsx & UserProfile.tsx)', 'Portofolio digital resmi dan CV kebudayaan pegiat tradisi (setara resume profesional LinkedIn).', 'Banner cagar budaya, avatar terakreditasi lembaga adat, tab showcase (Postingan, Katalog Kriya, Riwayat Kampanye, Sertifikasi).', '+ Hubungkan / Ikuti, Kirim Pesan.'),
    ('4.9 Halaman 9: Pesan dan Kolaborasi Komunitas (Pesan.tsx)', 'Saluran komunikasi langsung yang aman dan terenkripsi antar budayawan, pembeli dengan pengrajin, atau donatur dengan sanggar.', 'Daftar obrolan aktif, unread counter, bubble chat rapi, dan pengiriman sampel foto kriya/naskah.', 'Kirim Pesan, Lampirkan Dokumen Tradisi.'),
    ('4.10 Halaman 10: Koleksi Tersimpan (SavedPosts.tsx)', 'Arsip pribadi pengguna untuk menyimpan tutorial kriya, narasi sejarah, atau inspirasi karya budaya favorit.', 'Grid kartu tersimpan dengan pengelompokan kategori dan status bookmark.', 'Hapus dari Simpanan, Bagikan Ulang.')
]

for title, desc, comp, btns in halaman_data:
    add_heading_2(title)
    add_body(desc, 'Fungsi Utama:')
    add_body(comp, 'Komponen Utama:')
    add_body(btns, 'Tombol dan Aksi Kunci:')

# 5. MODAL BOXES
add_heading_1('5. Rincian Seluruh Kotak Modal dan Dialog Interaktif')
add_body('Seluruh dialog interaktif dirancang dengan backdrop blur halus (backdrop-blur-sm), animasi masuk mikro (zoom-in 95% to 100% durasi 150ms), dan tombol tutup taktil:')

table_modals = doc.add_table(rows=1, cols=4)
table_modals.alignment = WD_TABLE_ALIGNMENT.CENTER
hdr_cells = table_modals.rows[0].cells
headers = ['Nama Modal', 'Komponen File', 'Form dan Konten', 'Tombol Aksi']
for idx, text in enumerate(headers):
    hdr_cells[idx].text = text
    shading = parse_xml(r'<w:shd {} w:fill="0F172A"/>'.format(nsdecls('w')))
    hdr_cells[idx]._tc.get_or_add_tcPr().append(shading)
    p = hdr_cells[idx].paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for r in p.runs:
        set_run_font(r, 'Calibri', 10, RGBColor(255, 255, 255), bold=True)

modal_rows = [
    ('Modal Buat Postingan', 'CreatePostModal.tsx', 'Dropdown 10 Objek Pemajuan Kebudayaan, input judul narasi, textarea cerita, zona drop foto/video dokumen tradisi, picker lokasi daerah.', 'Batal, Simpan Draf, Publikasikan Cerita'),
    ('Modal Komentar', 'CommentModal.tsx', 'Thread list komentar bersarang (nested replies), mention budayawan @nama, textarea respon, tombol apresiasi.', 'Tutup, Kirim Respon'),
    ('Modal Bagikan (Share)', 'ShareModal.tsx', 'Quick share icons (WhatsApp, X/Twitter, Facebook, LinkedIn), field link URL dengan tombol salin taktil berstatus.', 'Salin Tautan, Tutup'),
    ('Modal Keranjang Belanja', 'CartContext.tsx', 'List item kriya terpilih, tombol counter kuantitas (+/-), input catatan khusus pengrajin, kalkulasi subtotal dinamis.', 'Lanjut Belanja, Checkout Sekarang'),
    ('Modal Donasi Cepat', 'CrowdfundingDonate.tsx', 'Chip pilihan nominal instan (Rp 25k, 50k, 100k, 250k, 500k), input nominal bebas, toggle anonim, pilihan QRIS/VA.', 'Batal, Konfirmasi Donasi'),
    ('Modal Autentikasi Masuk', 'AuthCallbackPage.tsx', 'Pilihan login satu klik Google OAuth, form email & sandi, form registrasi nama lengkap, pemilihan asal daerah dan minat budaya.', 'Masuk, Daftar Baru, Lupa Sandi')
]

for name, comp, content, acts in modal_rows:
    row_cells = table_modals.add_row().cells
    data = [name, comp, content, acts]
    for idx, text in enumerate(data):
        row_cells[idx].text = text
        p = row_cells[idx].paragraphs[0]
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(3)
        for r in p.runs:
            set_run_font(r, 'Calibri', 9.5, COLOR_PRIMARY, bold=(idx==0))

# 6. SYSTEM ARCHITECTURE & SECURITY (IMAGE EMBEDDED)
add_heading_1('6. Arsitektur Kode, Keamanan, dan Infrastruktur (Vercel + GitHub + Supabase)')
add_body('Sistem dibangun dengan standar Clean Architecture enterprise yang memisahkan layer presentasi, logika bisnis, dan basis data cloud untuk menjamin kecepatan akses bebas lag (<50ms latensi) di seluruh Indonesia:')

# Insert Diagram 2
arch_img = r'c:\Users\j\Documents\Dokumen\Draft\Budayago\sc ruangbudaya\UIUX\docs\system_architecture_diagram.png'
if os.path.exists(arch_img):
    doc.add_picture(arch_img, width=Inches(6.2))
    p_cap2 = doc.add_paragraph()
    p_cap2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_cap2 = p_cap2.add_run('Gambar 2. Diagram Arsitektur Cloud Enterprise: React 19 + GitHub CI/CD + Vercel Edge + Supabase')
    set_run_font(r_cap2, 'Calibri', 9.5, COLOR_SECONDARY, italic=True)

add_heading_2('A. Frontend Layer (React 19, TypeScript, Tailwind, Vite):')
add_bullet('Vite bundler dengan Hot Module Replacement (HMR) instan dan bundle ukuran teroptimasi di bawah 150KB (Gzip).', 'Framework dan Bundler:')
add_bullet('React Context terenkripsi untuk keranjang belanja dan TanStack Query untuk caching data dengan background revalidation tanpa flicker.', 'Manajemen State dan Data:')
add_bullet('100% menggunakan icon vektor modern Lucide Icons yang konsisten dan ringan.', 'Iconography Modern:')

add_heading_2('B. Hosting dan CI/CD Pipeline (GitHub + Vercel):')
add_bullet('Branch protection rules pada main branch dengan validasi otomatis linting dan TypeScript compiler checks.', 'GitHub Repository:')
add_bullet('Deployment edge otomatis pada setiap push ke main dengan caching header aset statis agresif dan rewrite fallback SPA aman tanpa error 404.', 'Vercel Global Edge:')

add_heading_2('C. Database dan Keamanan Berlapis (Supabase PostgreSQL):')
add_bullet('Enkripsi sesi, otentikasi Google OAuth terverifikasi, dan integrasi GoTrue auth engine.', 'Supabase Authentication:')
add_bullet('Setiap tabel dikunci dengan policy RLS ketat; pengguna hanya dapat memodifikasi data miliknya sendiri (auth.uid() = author_id).', 'Row-Level Security (RLS):')
add_bullet('Seluruh entitas menggunakan UUID v4 acak (bukan serial integer) untuk mencegah pembobolan IDOR.', 'Proteksi Anti-IDOR:')
add_bullet('Validasi skema input ganda menggunakan Zod schemas di client dan server untuk mencegah SQL Injection & payload berbahaya.', 'Validasi Skema Zod:')
add_bullet('Sanitasi seluruh konten narasi tradisi menggunakan DOMPurify sebelum di-render ke antarmuka untuk mencegah serangan XSS.', 'Sanitasi Anti-XSS:')
add_bullet('Gambar kriya dan cagar budaya dioptimasi otomatis via Supabase Image Transform (format WebP/AVIF dengan lazy loading).', 'Optimasi Media dan Zero-Lag:')

# 7. MILESTONE & ROADMAP
add_heading_1('7. Milestone dan Roadmap Pengerjaan Proyek')
add_body('Pengerjaan dibagi ke dalam 5 fase terukur dengan target kesiapan menyeluruh:')

# Insert Diagram 3 (Roadmap Milestone)
road_img = r'c:\Users\j\Documents\Dokumen\Draft\Budayago\sc ruangbudaya\UIUX\docs\roadmap_milestone_diagram.png'
if os.path.exists(road_img):
    doc.add_picture(road_img, width=Inches(6.2))
    p_cap3 = doc.add_paragraph()
    p_cap3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_cap3 = p_cap3.add_run('Gambar 3. Diagram Roadmap Alur 5 Milestone Pengembangan Ruang Budaya 2026')
    set_run_font(r_cap3, 'Calibri', 9.5, COLOR_SECONDARY, italic=True)

add_bullet('Penyusunan PRD komprehensif, arsitektur database, dan penyesuaian 100% persyaratan lomba.', 'Milestone 1 (Selesai): Perencanaan dan Dokumen PRD')
add_bullet('Pembuatan kanvas desain lengkap di file Figma tim (dLq19zRHpGSJZB7JNeRcUO): Design Tokens, 10 Halaman Lengkap, Varian Komponen, dan Seluruh Modal Interaktif.', 'Milestone 2 (Target: 7 Hari): Desain Hi-Fi UI/UX di Figma')
add_bullet('Implementasi bento layout asimetris, tipografi bersih, pembersihan AI slop, dan integrasi Lucide Icons.', 'Milestone 3 (Target: 7 Hari): Refaktor Frontend React dan Tailwind')
add_bullet('Pemasangan skema tabel PostgreSQL, RLS policies, autentikasi sesi, serta integrasi storage gambar kriya.', 'Milestone 4 (Target: 5 Hari): Integrasi Database Supabase dan Keamanan')
add_bullet('Audit Google Lighthouse (target performa >90, accessibility 100) dan deployment live production di Vercel.', 'Milestone 5 (Target: 3 Hari): Testing, Audit, dan Live Deploy Vercel')

# Output Path
os.makedirs(r'C:\Users\j\Documents\Dokumen\Draft', exist_ok=True)
output_path = r'C:\Users\j\Documents\Dokumen\Draft\PRD_Ruang_Budaya_2026.docx'
doc.save(output_path)
print('Document saved successfully at:', output_path)

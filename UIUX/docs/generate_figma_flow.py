import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Kanvas ekstra lebar horizontal persis layout flowchart gambar referensi
fig, ax = plt.subplots(figsize=(18, 9), dpi=300)
ax.set_xlim(0, 18)
ax.set_ylim(0, 9)
ax.axis('off')

# Tag judul di pojok kiri atas seperti di screenshot
def draw_tag(x, y, text):
    tag = patches.FancyBboxPatch(
        (x, y), len(text)*0.11 + 0.3, 0.45,
        boxstyle='round,pad=0.1,rounding_size=0.08',
        facecolor='#FFFFFF', edgecolor='#94A3B8', lw=1.0
    )
    ax.add_patch(tag)
    ax.text(x + (len(text)*0.11 + 0.3)/2, y + 0.22, text, color='#0F172A', fontsize=8, fontweight='bold', ha='center', va='center')

draw_tag(0.4, 8.4, 'Flowchart Ekosistem RuangBudaya')

# Fungsi menggambar kotak proses (White card, dark border, rounded)
def draw_card(x, y, w, h, text):
    box = patches.FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.2,rounding_size=0.15',
        facecolor='#FFFFFF',
        edgecolor='#1E293B',
        linewidth=1.3
    )
    ax.add_patch(box)
    ax.text(x + w/2, y + h/2, text, color='#0F172A', fontsize=8.2, fontweight='bold', ha='center', va='center', multialignment='center')

# Fungsi menggambar belah ketupat keputusan (Decision diamond)
def draw_diamond(cx, cy, r_w, r_h, text):
    pts = [[cx, cy + r_h], [cx + r_w, cy], [cx, cy - r_h], [cx - r_w, cy]]
    poly = patches.Polygon(pts, closed=True, facecolor='#FFFFFF', edgecolor='#1E293B', linewidth=1.3)
    ax.add_patch(poly)
    ax.text(cx, cy, text, color='#0F172A', fontsize=8, fontweight='bold', ha='center', va='center', multialignment='center')

# Fungsi konektor lengkung halus tanpa tabrakan teks
def draw_curve(p1, p2, rad=0.2, arrow=True):
    con = f'arc3,rad={rad}'
    arr = '->,head_width=2.5,head_length=4.5' if arrow else '-'
    ax.annotate(
        '', xy=p2, xytext=p1,
        arrowprops=dict(arrowstyle=arr, color='#64748B', lw=1.2, connectionstyle=con)
    )

def draw_straight(p1, p2, label=''):
    ax.annotate(
        '', xy=p2, xytext=p1,
        arrowprops=dict(arrowstyle='->,head_width=2.5,head_length=4.5', color='#64748B', lw=1.2)
    )
    if label:
        mid_x = (p1[0] + p2[0]) / 2
        mid_y = (p1[1] + p2[1]) / 2
        ax.text(mid_x, mid_y, label, color='#475569', fontsize=7.5, ha='center', va='center',
                bbox=dict(boxstyle='square,pad=0.15', fc='white', ec='none'))

# 1. Start Node: Landing & Masuk
draw_card(0.5, 5.0, 1.8, 1.0, 'Masuk Halaman\nLanding Page')

# Cabang 1: Eksplorasi Publik / Galeri
draw_card(3.0, 6.7, 2.0, 0.9, 'Lihat Galeri\nWarisan Budaya')
draw_curve((2.3, 5.7), (3.0, 7.15), rad=0.25)

# Cabang 2: Masuk / Daftar Akun
draw_card(3.0, 5.0, 2.0, 0.9, 'Masuk / Daftar\nAkun Pegiat')
draw_straight((2.3, 5.5), (3.0, 5.5))

# Cabang 3: Kemitraan Sanggar
draw_card(3.0, 3.3, 2.0, 0.9, 'Ajukan Profil\nSanggar Adat')
draw_curve((2.3, 5.3), (3.0, 3.75), rad=-0.25)

# 2. Main Hub: Beranda Feed Utama
draw_card(5.6, 5.0, 2.2, 0.9, 'Beranda Utama\n(Feed Budaya)')
draw_straight((5.0, 5.5), (5.6, 5.5))
draw_curve((5.0, 7.15), (5.6, 5.8), rad=-0.2)

# Dari Beranda bercabang ke 4 Pilar
# Pilar 1: Jejaring Komunitas
draw_card(8.5, 7.3, 2.1, 0.85, 'Jejaring Budayawan\n& Sanggar')
draw_curve((7.8, 5.8), (8.5, 7.72), rad=0.25)

# Pilar 2: Pasar Kriya
draw_card(8.5, 5.8, 2.1, 0.85, 'Pasar Kriya Otentik\n(Cultural Tagging)')
draw_straight((7.8, 5.5), (8.5, 6.22))

# Pilar 3: Crowdfunding
draw_card(8.5, 4.2, 2.1, 0.85, 'Crowdfunding Cagar\n(Pelestarian Budaya)')
draw_straight((7.8, 5.4), (8.5, 4.62))

# Pilar 4: Edukasi & Game
draw_card(8.5, 2.7, 2.1, 0.85, 'Ruang Edukasi &\n3 Game Nusantara')
draw_curve((7.8, 5.1), (8.5, 3.12), rad=-0.25)

# --- ALUR TRANSAKSI PASAR KRIYA ---
draw_card(11.3, 5.8, 1.8, 0.85, 'Detail Kriya &\nMakna Filosofis')
draw_straight((10.6, 6.22), (11.3, 6.22))

draw_card(13.7, 5.8, 1.8, 0.85, 'Drawer Keranjang\n& Pilih Kurir')
draw_straight((13.1, 6.22), (13.7, 6.22))

draw_diamond(16.5, 6.22, 0.7, 0.45, 'Data\nValid?')
draw_straight((15.5, 6.22), (15.8, 6.22))

# Hasil Keputusan Kriya
draw_card(16.0, 7.4, 1.6, 0.75, 'Perbaiki Alamat\nPengiriman')
draw_curve((16.5, 6.67), (16.8, 7.4), rad=0.2)
ax.text(16.3, 6.9, 'Tidak', color='#475569', fontsize=7, bbox=dict(boxstyle='square,pad=0.1', fc='white', ec='none'))

# Selesai Transaksi
draw_card(16.0, 4.6, 1.6, 0.85, 'Pembayaran QRIS/\nVirtual Account')
draw_curve((16.5, 5.77), (16.8, 5.45), rad=-0.2)
ax.text(16.3, 5.6, 'Ya', color='#475569', fontsize=7, bbox=dict(boxstyle='square,pad=0.1', fc='white', ec='none'))

# --- ALUR CROWDFUNDING & DONASI ---
draw_card(11.3, 4.2, 1.8, 0.85, 'Detail Kampanye &\nTransparansi RAB')
draw_straight((10.6, 4.62), (11.3, 4.62))

draw_card(13.7, 4.2, 1.8, 0.85, 'Modal Donasi Cepat\n(Pilih Nominal)')
draw_straight((13.1, 4.62), (13.7, 4.62))

# --- ALUR VERIFIKASI SANGGAR (CABANG BAWAH) ---
draw_card(5.6, 3.3, 2.2, 0.9, 'Isi Formulir Profil\n& Data Akreditasi')
draw_straight((5.0, 3.75), (5.6, 3.75))

draw_diamond(9.5, 1.4, 0.8, 0.5, 'Verifikasi\nLolos?')
draw_curve((7.8, 3.75), (8.7, 1.4), rad=-0.25)

draw_card(11.3, 1.8, 2.0, 0.75, 'Lencana Maestro /\nSanggar Resmi')
draw_curve((10.3, 1.4), (11.3, 2.15), rad=0.2)
ax.text(10.5, 1.7, 'Ya', color='#475569', fontsize=7, bbox=dict(boxstyle='square,pad=0.1', fc='white', ec='none'))

draw_card(11.3, 0.6, 2.0, 0.75, 'Catatan Perbaikan\nKurator Budaya')
draw_curve((10.3, 1.4), (11.3, 0.95), rad=-0.2)
ax.text(10.5, 1.1, 'Tidak', color='#475569', fontsize=7, bbox=dict(boxstyle='square,pad=0.1', fc='white', ec='none'))

plt.tight_layout()
plt.savefig(r'c:\Users\j\Documents\Dokumen\Draft\Budayago\sc ruangbudaya\UIUX\docs\user_flow_diagram.png', dpi=300)
print('User flow diagram updated in perfect Figma wireframe style!')

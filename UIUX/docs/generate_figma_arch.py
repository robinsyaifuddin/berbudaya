import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Kanvas ekstra lega horizontal & vertikal agar tidak ada teks overflow sama sekali
fig, ax = plt.subplots(figsize=(16, 8.5), dpi=300)
ax.set_xlim(0, 16)
ax.set_ylim(0, 8.5)
ax.axis('off')

# Tag judul di pojok kiri atas persis gaya Figma
tag = patches.FancyBboxPatch(
    (0.4, 7.8), 5.5, 0.45,
    boxstyle='round,pad=0.1,rounding_size=0.08',
    facecolor='#FFFFFF', edgecolor='#94A3B8', lw=1.0
)
ax.add_patch(tag)
ax.text(3.15, 8.02, 'Diagram Arsitektur Sistem & Alur Cloud RuangBudaya', color='#0F172A', fontsize=8.5, fontweight='bold', ha='center', va='center')

# Outer Subgraph Containers (Lapang, abu-abu halus)
def draw_subgraph(x, y, w, h, title):
    box = patches.FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.25,rounding_size=0.15',
        facecolor='#F8FAFC',
        edgecolor='#CBD5E1',
        linewidth=1.2
    )
    ax.add_patch(box)
    ax.text(x + w/2, y + h - 0.4, title, color='#475569', fontsize=9.5, fontweight='bold', ha='center', va='center')

# Kartu Node (Putih murni, border tegas 1.3px, padding lapang anti-overflow)
def draw_card(x, y, w, h, title, subtitle=''):
    box = patches.FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.2,rounding_size=0.12',
        facecolor='#FFFFFF',
        edgecolor='#1E293B',
        linewidth=1.3
    )
    ax.add_patch(box)
    if subtitle:
        ax.text(x + w/2, y + h/2 + 0.16, title, color='#0F172A', fontsize=8.5, fontweight='bold', ha='center', va='center')
        ax.text(x + w/2, y + h/2 - 0.18, subtitle, color='#64748B', fontsize=7.5, ha='center', va='center')
    else:
        ax.text(x + w/2, y + h/2, title, color='#0F172A', fontsize=8.5, fontweight='bold', ha='center', va='center')

def draw_straight_arrow(p1, p2, label=''):
    ax.annotate(
        '', xy=p2, xytext=p1,
        arrowprops=dict(arrowstyle='->,head_width=2.5,head_length=4.5', color='#64748B', lw=1.3)
    )
    if label:
        mid_x = (p1[0] + p2[0]) / 2
        mid_y = (p1[1] + p2[1]) / 2
        ax.text(mid_x, mid_y, label, color='#334155', fontsize=7.5, ha='center', va='center',
                bbox=dict(boxstyle='square,pad=0.15', fc='white', ec='none'))

def draw_step_arrow(p1, p2, p3, label=''):
    ax.plot([p1[0], p2[0]], [p1[1], p2[1]], color='#64748B', lw=1.3)
    ax.annotate(
        '', xy=p3, xytext=p2,
        arrowprops=dict(arrowstyle='->,head_width=2.5,head_length=4.5', color='#64748B', lw=1.3)
    )
    if label:
        ax.text(p2[0], (p1[1] + p2[1])/2, label, color='#334155', fontsize=7.5, ha='center', va='center',
                bbox=dict(boxstyle='square,pad=0.15', fc='white', ec='none'))

# 1. SUBGRAPH 1: CI/CD & HOSTING (KIRI)
draw_subgraph(0.4, 0.8, 3.4, 6.6, 'CI/CD & Deployment')
draw_card(0.7, 5.0, 2.8, 1.2, 'GitHub Repository', 'Branch Protection & Actions')
draw_card(0.7, 2.6, 2.8, 1.2, 'Vercel Production Edge', 'Global CDN & Low Latency')
draw_straight_arrow((2.1, 5.0), (2.1, 3.8), label='Auto Deploy')

# 2. SUBGRAPH 2: FRONTEND CLIENT (TENGAH KIRI)
draw_subgraph(4.2, 0.8, 3.5, 6.6, 'Frontend Client (React 19)')
draw_card(4.5, 5.0, 2.9, 1.2, 'Modern UI Components', 'Tailwind & Anti-Slop Layout')
draw_card(4.5, 3.3, 2.9, 1.1, 'Zustand / Cart Context', 'Persistent Local State')
draw_card(4.5, 1.6, 2.9, 1.1, 'Zod Client Validator', 'Validasi Input Skema')

# Arrow Vercel to Client
draw_straight_arrow((3.5, 3.2), (4.5, 3.8), label='Serve SPA')

# 3. SUBGRAPH 3: EDGE API & AUTH GATEWAY (TENGAH KANAN)
draw_subgraph(8.1, 0.8, 3.5, 6.6, 'Edge API & Keamanan')
draw_card(8.4, 5.0, 2.9, 1.2, 'Hono.js Edge Handlers', 'REST API Routes (<50ms)')
draw_card(8.4, 3.3, 2.9, 1.1, 'Rate Limiter & Anti-DDoS', 'Proteksi Beban Trafik')
draw_card(8.4, 1.6, 2.9, 1.1, 'DOMPurify Sanitizer', 'Proteksi XSS Narasi Tradisi')

# Arrow Client to Hono Edge
draw_straight_arrow((7.4, 5.6), (8.4, 5.6), label='HTTPS / REST')

# 4. SUBGRAPH 4: DATABASE & PERSISTENCE (KANAN)
draw_subgraph(12.0, 0.8, 3.6, 6.6, 'Database & Storage (Supabase)')
draw_card(12.3, 5.2, 3.0, 1.1, 'PostgreSQL Database', 'Skema Relasional (UUID v4)')
draw_card(12.3, 3.9, 3.0, 1.0, 'Row-Level Security (RLS)', 'Strict Data Access Rules')
draw_card(12.3, 2.6, 3.0, 1.0, 'Supabase GoTrue Auth', 'JWT Session Management')
draw_card(12.3, 1.3, 3.0, 1.0, 'S3 Media Storage', 'Foto Kriya & Cagar Budaya')

# Connections from Gateway to DB
draw_straight_arrow((11.3, 5.6), (12.3, 5.6), label='Service Role')

# Direct Authenticated Connection
draw_step_arrow((7.4, 3.8), (11.6, 3.8), (12.3, 3.1), label='Auth Read')

plt.tight_layout()
plt.savefig(r'c:\Users\j\Documents\Dokumen\Draft\Budayago\sc ruangbudaya\UIUX\docs\system_architecture_diagram.png', dpi=300)
print('System architecture diagram regenerated with zero overflow!')

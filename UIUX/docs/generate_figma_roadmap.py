import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
ax.set_xlim(0, 11)
ax.set_ylim(0, 10.5)
ax.axis('off')

def draw_phase(x, y, w, h, title, items, status=''):
    box = patches.FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.25',
        facecolor='#FFFFFF',
        edgecolor='#1E293B',
        linewidth=1.4
    )
    ax.add_patch(box)
    
    # Title
    ax.text(x + 0.35, y + h - 0.4, title, color='#0F172A', fontsize=10, fontweight='bold', va='center')
    if status:
        ax.text(x + w - 0.35, y + h - 0.4, status, color='#64748B', fontsize=8, fontweight='bold', ha='right', va='center')
    
    # Divider
    ax.plot([x + 0.25, x + w - 0.25], [y + h - 0.7, y + h - 0.7], color='#E2E8F0', lw=1.0)
    
    # Bullet points
    for i, item in enumerate(items):
        ax.text(x + 0.4, y + h - 1.05 - (i * 0.35), item, color='#334155', fontsize=8.2, va='center')

draw_phase(0.5, 8.4, 10.0, 1.8, 'Milestone 1: Perencanaan & Dokumen PRD', 
           ['• Finalisasi PRD tunggal & penyelaras regulasi resmi BUDAYA GO! 2026', '• Spesifikasi arsitektur database PostgreSQL & Clean Architecture multi-layer'],
           '[SELESAI]')

draw_phase(0.5, 6.4, 10.0, 1.8, 'Milestone 2: Desain Hi-Fi UI/UX di Figma', 
           ['• Design tokens, palet 60-30-10 bumi Nusantara, & sistem tipografi taktil', '• Hi-Fi Desktop 3-column bento & mobile responsive boards (360px-480px)'],
           '[TARGET: 7 HARI]')

draw_phase(0.5, 4.4, 10.0, 1.8, 'Milestone 3: Refaktor Frontend React & Anti-Slop', 
           ['• ModernLayout & LinkedIn-style home feed anti-slop tanpa gradien AI', '• Marketplace kriya (CVT), crowdfunding RAB transparan, & 3 game budaya'],
           '[TARGET: 7 HARI]')

draw_phase(0.5, 2.4, 10.0, 1.8, 'Milestone 4: Integrasi Database Supabase & Keamanan', 
           ['• Skema Supabase, UUID v4, GoTrue Auth, & Row-Level Security (RLS)', '• Validasi Zod berlapis, sanitasi DOMPurify (anti-XSS), & S3 media storage'],
           '[TARGET: 5 HARI]')

draw_phase(0.5, 0.4, 10.0, 1.8, 'Milestone 5: Pengujian Kinerja & Live Deploy Vercel', 
           ['• Audit performa Google Lighthouse (>90 performance & 100 accessibility)', '• Cross-device QA & live production deployment di Vercel global edge network'],
           '[TARGET: 3 HARI]')

# Connectors between milestones
for y_arr in [8.4, 6.4, 4.4, 2.4]:
    ax.annotate(
        '', xy=(5.5, y_arr - 0.15), xytext=(5.5, y_arr + 0.05),
        arrowprops=dict(arrowstyle='->', color='#64748B', lw=1.3, mutation_scale=11)
    )

plt.tight_layout()
plt.savefig(r'c:\Users\j\Documents\Dokumen\Draft\Budayago\sc ruangbudaya\UIUX\docs\roadmap_milestone_diagram.png', dpi=300)
print('Figma-style roadmap diagram created successfully!')

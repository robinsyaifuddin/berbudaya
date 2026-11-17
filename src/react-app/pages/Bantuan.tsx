import ModernLayout from '@/react-app/components/ModernLayout';
import { Search, BookOpen, MessageCircle, Mail, Phone, HelpCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    category: 'Seputar Platform',
    questions: [
      {
        q: 'Apa itu Berbudaya.id?',
        a: 'Berbudaya.id adalah jejaring sosial kebudayaan nasional Indonesia yang menghubungkan pelaku budaya, pengrajin kriya, sanggar tari, dalang, akademisi, dan generasi muda pecinta seni budaya Indonesia.'
      },
      {
        q: 'Bagaimana cara mendaftar dan verifikasi profil budayawan?',
        a: 'Klik tombol Masuk/Daftar di halaman utama, isi data diri, dan pilih bidang minat kebudayaan Anda. Anda dapat mengajukan lencana verifikasi budayawan melalui halaman Profil.'
      }
    ]
  },
  {
    category: 'Marketplace Kriya Otentik',
    questions: [
      {
        q: 'Bagaimana jaminan keaslian karya seni kriya?',
        a: 'Setiap karya kriya terkurasi yang dijual oleh maestro dan sanggar perajin dilengkapi dengan Cultural Value Tagging (CVT) dan sertifikat digital otentisitas asal daerah.'
      },
      {
        q: 'Metode pembayaran apa saja yang didukung?',
        a: 'Kami mendukung QRIS, Transfer Virtual Account bank nasional (BCA, Mandiri, BNI, BRI), serta dompet digital terintegrasi.'
      }
    ]
  },
  {
    category: 'Crowdfunding Pelestarian',
    questions: [
      {
        q: 'Bagaimana transparansi penyaluran dana donasi budaya?',
        a: 'Setiap inisiatif proyek dan kampanye crowdfunding memiliki laporan berkala yang dapat dipantau langsung oleh seluruh donatur melalui tab Perkembangan Proyek.'
      },
      {
        q: 'Bagaimana cara mengajukan inisiatif pelestarian sanggar kami?',
        a: 'Buka menu Proyek & Crowdfunding, klik tombol "Buat Proyek Baru", dan lengkapi deskripsi sasaran pelestarian beserta rincian target pendanaan.'
      }
    ]
  }
];

const resources = [
  {
    title: 'Panduan Ekosistem Budaya',
    description: 'Pelajari navigasi fitur sosial, marketplace, dan donasi pelestarian.',
    icon: BookOpen,
  },
  {
    title: 'Katalog Masterclass Edukasi',
    description: 'Panduan mengikuti kursus tari, membatik, dan aksara daerah.',
    icon: BookOpen,
  },
  {
    title: 'Forum Komunitas & Sanggar',
    description: 'Ruang diskusi dan kolaborasi antar-pegiat budaya se-Nusantara.',
    icon: MessageCircle,
  }
];

export default function BantuanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setActiveFaq(activeFaq === key ? null : key);
  };

  const handleStartChat = () => {
    setToastMessage('Menghubungkan ke layanan bantuan budayawan...');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredFaqs = faqs.map(sec => ({
    ...sec,
    questions: sec.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(sec => sec.questions.length > 0);

  return (
    <ModernLayout showLeftSidebar={false} showRightSidebar={false}>
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Pusat Bantuan & Layanan Komunitas
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Temukan jawaban terpercaya mengenai jejaring, kriya marketplace, dan donasi pelestarian budaya
          </p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik bantuan atau pertanyaan..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Quick Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1">{resource.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{resource.description}</p>
              </div>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              <p className="text-xs text-gray-500">Jawaban cepat untuk hal-hal yang sering ditanyakan</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredFaqs.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">Tidak ada jawaban yang sesuai dengan kata kunci pencarian Anda.</p>
            ) : (
              filteredFaqs.map((section, sIdx) => (
                <div key={sIdx}>
                  <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                    {section.category}
                  </h3>
                  <div className="space-y-2">
                    {section.questions.map((faq, qIdx) => {
                      const itemKey = `${sIdx}-${qIdx}`;
                      const isOpen = activeFaq === itemKey;
                      return (
                        <div
                          key={qIdx}
                          className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => toggleFaq(itemKey)}
                            className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90 text-blue-600' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 text-sm text-gray-600 bg-gray-50/50 border-t border-gray-100 leading-relaxed">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Email Dukungan</h3>
              <p className="text-xs text-gray-600 mb-3">
                Kirim pertanyaan detail atau permohonan kemitraan
              </p>
            </div>
            <a
              href="mailto:bantuan@Berbudaya.id"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              bantuan@Berbudaya.id →
            </a>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Pusat Panggilan</h3>
              <p className="text-xs text-gray-600 mb-3">
                Senin - Jumat, pukul 09:00 - 17:00 WIB
              </p>
            </div>
            <a
              href="tel:+622112345678"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              (021) 1234-5678 →
            </a>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Live Chat Bantuan</h3>
              <p className="text-xs text-gray-600 mb-3">
                Respon langsung dari tim moderator kebudayaan
              </p>
            </div>
            <button
              onClick={handleStartChat}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors text-center"
            >
              Mulai Percakapan
            </button>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}

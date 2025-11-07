import ModernLayout from '@/react-app/components/ModernLayout';
import { Search, Book, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Umum',
    questions: [
      {
        q: 'Apa itu RuangBudaya.id?',
        a: 'RuangBudaya.id adalah jejaring sosial budaya nasional Indonesia yang menghubungkan pelaku budaya, pengrajin, komunitas, dan pecinta seni budaya Indonesia.'
      },
      {
        q: 'Bagaimana cara mendaftar?',
        a: 'Klik tombol "Daftar" di halaman utama, isi formulir dengan data diri Anda, dan verifikasi email Anda untuk mengaktifkan akun.'
      }
    ]
  },
  {
    category: 'Marketplace',
    questions: [
      {
        q: 'Bagaimana cara menjual produk?',
        a: 'Masuk ke menu Marketplace, klik tombol "Jual Produk", lalu isi informasi produk seperti foto, deskripsi, harga, dan kategori.'
      },
      {
        q: 'Apa metode pembayaran yang tersedia?',
        a: 'Kami mendukung transfer bank, e-wallet, dan kartu kredit/debit. Semua transaksi dilindungi oleh sistem keamanan terpercaya.'
      }
    ]
  },
  {
    category: 'Crowdfunding',
    questions: [
      {
        q: 'Bagaimana cara membuat proyek crowdfunding?',
        a: 'Buka menu Proyek & Crowdfunding, klik "Buat Proyek Baru", dan lengkapi informasi proyek termasuk deskripsi, target dana, dan timeline.'
      },
      {
        q: 'Berapa lama waktu untuk pencairan dana?',
        a: 'Dana akan dicairkan dalam 7-14 hari kerja setelah proyek mencapai target atau periode kampanye berakhir.'
      }
    ]
  }
];

const resources = [
  {
    title: 'Panduan Pengguna Lengkap',
    description: 'Pelajari semua fitur RuangBudaya.id',
    icon: Book,
    color: 'terracotta'
  },
  {
    title: 'Video Tutorial',
    description: 'Tonton panduan video step-by-step',
    icon: Book,
    color: 'gold'
  },
  {
    title: 'Komunitas Forum',
    description: 'Diskusi dengan pengguna lain',
    icon: MessageCircle,
    color: 'terracotta'
  }
];

export default function BantuanPage() {
  return (
    <ModernLayout showLeftSidebar={false} showRightSidebar={false}>
      
      <div className="p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold font-playfair text-dark-brown mb-3">
            Pusat Bantuan
          </h1>
          <p className="text-gray-600 mb-6">
            Temukan jawaban untuk pertanyaan Anda atau hubungi tim dukungan kami
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari bantuan..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 shadow-sm"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Quick Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-${resource.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${resource.color}`} />
                  </div>
                  <h3 className="font-bold text-dark-brown mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              );
            })}
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-terracotta" />
              <h2 className="text-2xl font-bold font-playfair text-dark-brown">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-lg font-bold text-terracotta mb-4">
                    {section.category}
                  </h3>
                  <div className="space-y-4">
                    {section.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-l-4 border-gold pl-4 py-2">
                        <h4 className="font-semibold text-dark-brown mb-2">
                          {faq.q}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-terracotta/10 to-gold/10 rounded-2xl p-6 border border-terracotta/20">
              <div className="w-12 h-12 bg-terracotta rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-dark-brown mb-2">Email Kami</h3>
              <p className="text-sm text-gray-600 mb-4">
                Kirim pertanyaan detail Anda
              </p>
              <a
                href="mailto:bantuan@ruangbudaya.id"
                className="text-terracotta font-semibold hover:text-gold transition-colors"
              >
                bantuan@ruangbudaya.id
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-gold/10 to-terracotta/10 rounded-2xl p-6 border border-gold/20">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-dark-brown mb-2">Telepon</h3>
              <p className="text-sm text-gray-600 mb-4">
                Senin - Jumat, 09:00 - 17:00 WIB
              </p>
              <a
                href="tel:+622112345678"
                className="text-gold font-semibold hover:text-terracotta transition-colors"
              >
                (021) 1234-5678
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-terracotta/10 to-gold/10 rounded-2xl p-6 border border-terracotta/20">
              <div className="w-12 h-12 bg-terracotta rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-dark-brown mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Respon cepat dari tim kami
              </p>
              <button className="text-terracotta font-semibold hover:text-gold transition-colors">
                Mulai Chat →
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}

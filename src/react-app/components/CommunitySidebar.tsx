import { Plus, Users } from 'lucide-react';
import { Link } from 'react-router';

export default function CommunitySidebar() {
  // Check if user has a community
  const hasCommunity = false; // This should come from state/props

  if (hasCommunity) {
    return (
      <div className="sticky top-20 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Komunitas Saya</h3>
        {/* Community info would go here */}
      </div>
    );
  }

  return (
    <div className="sticky top-20 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          Lestarikan Budaya Bersama
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          Mari bersama-sama melestarikan kekayaan budaya Indonesia dengan menciptakan kegiatan kebudayaan yang bermakna.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Dapatkan dukungan dari seluruh masyarakat, komunitas, organisasi, dan berbagai sektor lainnya untuk mewujudkan program pelestarian budaya Anda.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
          <p className="text-xs text-gray-700">
            <strong className="text-blue-800">Buat Kampanye</strong> dan galang dana untuk kegiatan budaya, workshop, festival, atau proyek pelestarian warisan budaya lainnya.
          </p>
        </div>
      </div>

      <Link
        to="/komunitas"
        className="w-full bg-[#133384] hover:bg-[#1844A6] text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span>Buat Komunitas</span>
      </Link>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-sm text-gray-900 mb-3">Manfaat Membuat Komunitas:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-gray-600">
            <span className="text-blue-600 mt-0.5">✓</span>
            <span>Galang dana untuk kegiatan budaya</span>
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-600">
            <span className="text-blue-600 mt-0.5">✓</span>
            <span>Jangkau ribuan pendukung</span>
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-600">
            <span className="text-blue-600 mt-0.5">✓</span>
            <span>Kelola kampanye dengan mudah</span>
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-600">
            <span className="text-blue-600 mt-0.5">✓</span>
            <span>Laporan transparan ke donatur</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Sudah memiliki komunitas?{' '}
          <Link to="/komunitas" className="text-blue-600 hover:text-blue-700 font-medium">
            Gabung Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

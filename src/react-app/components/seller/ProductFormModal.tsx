import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ShopProduct, useSeller } from '@/react-app/contexts/SellerContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: ShopProduct | null;
}

const PRODUCT_CATEGORIES = [
  'Batik, Tenun & Songket',
  'Wayang, Topeng & Seni Teater',
  'Kriya Kayu, Pahat & Ukiran',
  'Keramik, Gerabah & Tembikar',
  'Senjata Tradisional, Keris & Tosan Aji',
  'Alat Musik Tradisional Nusantara',
  'Aksesoris, Manik & Perhiasan Etnik',
  'Lukisan & Kaligrafi Tradisional'
];

export default function ProductFormModal({ isOpen, onClose, productToEdit }: ProductFormModalProps) {
  const { addProduct, updateProduct } = useSeller();
  const { success } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    category: PRODUCT_CATEGORIES[0],
    price: 150000,
    oldPrice: 0,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=600&fit=crop',
    description: '',
    cultureOrigin: 'Surakarta, Jawa Tengah',
    material: 'Bahan Alami Tradisional',
    isActive: true
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        oldPrice: productToEdit.oldPrice || 0,
        stock: productToEdit.stock,
        image: productToEdit.image,
        description: productToEdit.description,
        cultureOrigin: productToEdit.cultureOrigin,
        material: productToEdit.material,
        isActive: productToEdit.isActive
      });
    } else {
      setFormData({
        name: '',
        category: PRODUCT_CATEGORIES[0],
        price: 250000,
        oldPrice: 0,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&h=600&fit=crop',
        description: '',
        cultureOrigin: 'Yogyakarta, D.I. Yogyakarta',
        material: 'Kayu Jati & Cat Alami',
        isActive: true
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Nama karya seni budaya tidak boleh kosong!');
      return;
    }

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        stock: Number(formData.stock),
        image: formData.image,
        description: formData.description,
        cultureOrigin: formData.cultureOrigin,
        material: formData.material,
        isActive: formData.isActive
      });
      success('Karya berhasil diperbarui di etalase dan Pasar Seni!', 'Produk Diperbarui');
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        stock: Number(formData.stock),
        image: formData.image,
        description: formData.description || 'Karya kriya otentik buatan tangan pengrajin dengan nilai tradisi tinggi.',
        cultureOrigin: formData.cultureOrigin,
        material: formData.material,
        isActive: formData.isActive
      });
      success('Karya seni baru berhasil ditambahkan dan langsung tampil di Pasar Seni!', 'Karya Diterbitkan');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {productToEdit ? 'Edit Karya Budaya' : 'Tambah Karya Budaya Baru'}
            </h2>
            <p className="text-xs text-slate-500">
              Isi spesifikasi karya seni & kerajinan Anda dengan lengkap
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Nama Karya Seni / Produk <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Wayang Golek Cepot Kayu Albasiah Halus"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Kategori Budaya <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
              >
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Asal Daerah Pengrajin <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Bandung, Jawa Barat"
                value={formData.cultureOrigin}
                onChange={e => setFormData({ ...formData, cultureOrigin: e.target.value })}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Harga Jual (Rp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min={1000}
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Harga Coret (Opsional)
              </label>
              <input
                type="number"
                min={0}
                placeholder="0 jika tidak diskon"
                value={formData.oldPrice}
                onChange={e => setFormData({ ...formData, oldPrice: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Jumlah Stok <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Bahan & Material Pembuatan
            </label>
            <input
              type="text"
              placeholder="Contoh: Kayu Jati, Pewarna Alami Kulit Pohon, Perak 925"
              value={formData.material}
              onChange={e => setFormData({ ...formData, material: e.target.value })}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Foto Produk (URL Gambar) <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-3 items-center">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
              />
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Nilai Filosofis & Deskripsi Karya
            </label>
            <textarea
              rows={3}
              placeholder="Ceritakan latar belakang makna filosofis motif atau teknik pembuatan karya ini..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384] resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActiveCheck"
              checked={formData.isActive}
              onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-[#133384] rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="isActiveCheck" className="text-xs font-semibold text-slate-700 select-none cursor-pointer">
              Tampilkan langsung di etalase Pasar Seni (Status: Aktif)
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? 'Simpan Perubahan' : 'Terbitkan Karya'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

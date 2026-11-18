import { Camera, Smile, Video, Sparkles } from 'lucide-react';

export default function PostComposer() {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-0 mb-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3.5 sm:p-4">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
          alt="Your avatar" 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-100 shadow-xs" 
        />
        <button className="flex-1 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-500 border border-slate-200/60">
          Bagikan karya, kisah tradisi, atau kegiatan budaya Anda hari ini...
        </button>
      </div>

      {/* Actions */}
      <div className="border-t border-slate-100 px-3 py-2 bg-slate-50/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-white hover:shadow-xs transition-all text-xs font-medium text-slate-700 whitespace-nowrap">
              <Camera className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="sm:hidden">Foto</span>
              <span className="hidden sm:inline">Foto Galeri</span>
            </button>
            
            <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-white hover:shadow-xs transition-all text-xs font-medium text-slate-700 whitespace-nowrap">
              <Video className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span className="sm:hidden">Video</span>
              <span className="hidden sm:inline">Rekaman Tari/Musik</span>
            </button>
            
            <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-white hover:shadow-xs transition-all text-xs font-medium text-slate-700 whitespace-nowrap">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="sm:hidden">Kisah</span>
              <span className="hidden sm:inline">Kisah Budaya</span>
            </button>
          </div>
          
          <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600">
            <Smile className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

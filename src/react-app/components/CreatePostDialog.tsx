import { useState } from 'react';
import { X, Image, Video, Calendar, Award, Briefcase, BarChart3, FileText, Smile, Clock } from 'lucide-react';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar: string;
  userName: string;
}

export default function CreatePostDialog({ isOpen, onClose, userAvatar, userName }: CreatePostDialogProps) {
  const [postContent, setPostContent] = useState('');
  const [visibility] = useState('Semua orang');
  const [isPosting, setIsPosting] = useState(false);

  if (!isOpen) return null;

  const handlePost = () => {
    setIsPosting(true);
    // Simulasi posting
    setTimeout(() => {
      setIsPosting(false);
      setPostContent('');
      onClose();
      // TODO: Add actual post creation logic
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop tap to close */}
      <div 
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
      
      {/* Modal Container: Fullscreen on mobile, perfectly sized centered card on desktop */}
      <div 
        className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border border-slate-100"
            />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-tight">{userName}</h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <span>Posting ke {visibility}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Apa karya budaya atau cerita yang ingin Anda bagikan?"
            className="w-full flex-1 min-h-[160px] sm:min-h-[220px] text-slate-900 placeholder-slate-400 resize-none focus:outline-none text-base leading-relaxed"
            autoFocus
          />

          {/* Emoji trigger / extras row */}
          <div className="pt-2 flex items-center">
            <button 
              type="button" 
              className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Footer Action */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6 py-3 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Quick Media / Tool Attachments */}
            <div className="flex items-center gap-1 overflow-x-auto py-1 -mx-1 px-1 scrollbar-none">
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 active:scale-95 transition-all"
                title="Tambahkan foto"
              >
                <Image className="w-5 h-5 text-blue-600" />
              </button>
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/60 active:scale-95 transition-all"
                title="Tambahkan video"
              >
                <Video className="w-5 h-5 text-emerald-600" />
              </button>
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 active:scale-95 transition-all"
                title="Tambahkan acara"
              >
                <Calendar className="w-5 h-5 text-amber-600" />
              </button>
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-purple-50/60 active:scale-95 transition-all"
                title="Rayakan"
              >
                <Award className="w-5 h-5 text-purple-600" />
              </button>
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 active:scale-95 transition-all"
                title="Tambahkan polling"
              >
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </button>
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50/60 active:scale-95 transition-all"
                title="Tambahkan dokumen"
              >
                <FileText className="w-5 h-5 text-rose-600" />
              </button>
              <button 
                type="button"
                className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 active:scale-95 transition-all"
                title="Jadwalkan posting"
              >
                <Clock className="w-5 h-5" />
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handlePost}
                disabled={!postContent.trim() || isPosting}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
              >
                {isPosting ? 'Memposting...' : 'Posting'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

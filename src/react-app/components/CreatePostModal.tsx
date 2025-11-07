import { useState } from 'react';
import { X, Image, Video, Calendar, Award, Briefcase, BarChart3, FileText, Smile, Clock } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar: string;
  userName: string;
}

export default function CreatePostModal({ isOpen, onClose, userAvatar, userName }: CreatePostModalProps) {
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
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-in fade-in slide-in-from-top-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={userAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{userName}</h3>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <span>Posting ke {visibility}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Apa yang ingin Anda bicarakan?"
              className="w-full min-h-[200px] text-gray-900 placeholder-gray-400 resize-none focus:outline-none text-base"
              autoFocus
            />
          </div>

          {/* Emoji Picker Button */}
          <div className="px-6 pb-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Smile className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Toolbar */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Tambahkan foto"
                >
                  <Image className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Tambahkan video"
                >
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Tambahkan acara"
                >
                  <Calendar className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Rayakan"
                >
                  <Award className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Tambahkan pekerjaan"
                >
                  <Briefcase className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Tambahkan polling"
                >
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  className="p-2.5 rounded hover:bg-gray-100 transition-colors"
                  title="Tambahkan dokumen"
                >
                  <FileText className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Jadwalkan posting"
                >
                  <Clock className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end">
            <button
              onClick={handlePost}
              disabled={!postContent.trim() || isPosting}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isPosting ? 'Memposting...' : 'Posting'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

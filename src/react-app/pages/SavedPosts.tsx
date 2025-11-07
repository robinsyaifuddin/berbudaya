import { useState, useEffect } from 'react';
import ModernLayout from '@/react-app/components/ModernLayout';
import { Bookmark, Trash2, ExternalLink, Calendar, User } from 'lucide-react';

interface SavedPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    subtitle?: string;
  };
  content: string;
  image?: string;
  savedAt: string;
}

export default function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    loadSavedPosts();
    
    const handleUpdate = () => {
      loadSavedPosts();
    };

    window.addEventListener('savedPostsUpdated', handleUpdate);
    return () => window.removeEventListener('savedPostsUpdated', handleUpdate);
  }, []);

  const loadSavedPosts = () => {
    const saved = localStorage.getItem('saved_posts');
    if (saved) {
      try {
        setSavedPosts(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved posts:', error);
      }
    }
  };

  const handleRemove = (postId: number) => {
    const updated = savedPosts.filter(p => p.id !== postId);
    setSavedPosts(updated);
    localStorage.setItem('saved_posts', JSON.stringify(updated));
    window.dispatchEvent(new Event('savedPostsUpdated'));
  };

  if (savedPosts.length === 0) {
    return (
      <ModernLayout>
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bookmark className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Item Tersimpan</h1>
                <p className="text-sm text-gray-600">Postingan yang Anda simpan</p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Bookmark className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Belum Ada Postingan Tersimpan
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Simpan postingan yang menarik untuk Anda agar mudah ditemukan kembali nanti.
              </p>
              <a
                href="/beranda"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Jelajahi Postingan
              </a>
            </div>
          </div>
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout>
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bookmark className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Item Tersimpan</h1>
                <p className="text-sm text-gray-600">{savedPosts.length} postingan tersimpan</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Terakhir diperbarui</p>
              <p className="text-sm font-semibold text-gray-900">Hari ini</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-4">
          {savedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-4">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      {post.author.subtitle && (
                        <p className="text-xs text-gray-500">{post.author.subtitle}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Disimpan {post.savedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`/post/${post.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Lihat postingan"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-600" />
                    </a>
                    <button
                      onClick={() => handleRemove(post.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      title="Hapus dari tersimpan"
                    >
                      <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 text-sm leading-relaxed mb-3">
                  {post.content}
                </p>

                {/* Post Image */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {/* Post Footer */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Postingan publik
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(post.id)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Postingan tersimpan hanya dapat dilihat oleh Anda
          </p>
        </div>
      </div>
    </ModernLayout>
  );
}

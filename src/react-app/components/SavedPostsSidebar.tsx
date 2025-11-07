import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Bookmark, X, ExternalLink } from 'lucide-react';

interface SavedPost {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  savedAt: string;
}

export default function SavedPostsSidebar() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    // Load saved posts from localStorage
    const saved = localStorage.getItem('saved_posts');
    if (saved) {
      try {
        setSavedPosts(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved posts:', error);
      }
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const saved = localStorage.getItem('saved_posts');
      if (saved) {
        try {
          setSavedPosts(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading saved posts:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener('savedPostsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedPostsUpdated', handleStorageChange);
    };
  }, []);

  const handleRemove = (postId: number) => {
    const updated = savedPosts.filter(p => p.id !== postId);
    setSavedPosts(updated);
    localStorage.setItem('saved_posts', JSON.stringify(updated));
    window.dispatchEvent(new Event('savedPostsUpdated'));
  };

  if (savedPosts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-gray-900 text-sm">Item tersimpan</h4>
          </div>
          <p className="text-xs text-gray-500">Belum ada postingan yang disimpan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-3 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-gray-900 text-sm">Item tersimpan</h4>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {savedPosts.length}
            </span>
          </div>
          {savedPosts.length > 2 && (
            <Link
              to="/saved"
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Lihat semua
            </Link>
          )}
        </div>

        <div className="space-y-2">
          {savedPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="group relative bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(post.id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                title="Hapus"
              >
                <X className="w-3 h-3 text-gray-600 hover:text-red-600" />
              </button>

              <div className="flex gap-2">
                {/* Image/Avatar */}
                {post.image ? (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-900 text-xs mb-1">
                    {post.author.name}
                  </h5>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {post.savedAt}
                    </p>
                    <a
                      href={`/post/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Lihat postingan"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedPosts.length > 2 && (
          <Link
            to="/saved"
            className="block w-full mt-3 text-xs text-blue-600 hover:text-blue-700 font-semibold text-center py-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Lihat semua {savedPosts.length} postingan
          </Link>
        )}
      </div>
    </div>
  );
}

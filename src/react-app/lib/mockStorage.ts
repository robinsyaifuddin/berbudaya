// Service sentral pengelola data simulasi LocalStorage untuk demo Ruang Budaya

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar: string;
  loginTime: string;
}

export interface PostComment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface PostItem {
  id: number;
  author: {
    name: string;
    subtitle: string;
    avatar: string;
    timestamp: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  bookmarks: number;
  category?: string;
  createdAt?: string;
}

const STORAGE_KEYS = {
  USER: 'demo_user',
  POSTS: 'rb_posts',
  SAVED_POSTS: 'saved_posts',
  LIKES: 'rb_likes',
  COMMENTS: 'rb_comments_map'
};

const INITIAL_POSTS: PostItem[] = [
  {
    id: 1,
    author: {
      name: 'Dewi Lestari Hadiningrat',
      subtitle: 'Maestro Pembatik • Surakarta',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      timestamp: '25 menit yang lalu'
    },
    content: 'Pagi ini selesai proses nglorot sehelai kain batik tulis motif Kawung Nitik. Warna soganya diracik murni dari rebusan kulit kayu tingi dan jambal tanpa pewarna sintetis. Senang sekali modul pembelajarannya kini sudah bisa diakses teman-teman generasi muda di pilar Edukasi Berbudaya! 🌿✨ #BatikTulisSoga #PucuakRabuang #KriyaNusantara',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600&auto=format&fit=crop&q=80',
    likes: 1245,
    comments: 88,
    bookmarks: 194
  },
  {
    id: 2,
    author: {
      name: 'Ki Gendon Giri',
      subtitle: 'Pengrajin Wayang Kulit • Banyumas',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      timestamp: '1 jam yang lalu'
    },
    content: 'Menatah wayang tokoh Raden Gatotkaca memerlukan ketenangan nafas dan ketelitian memegang tatah baja. Setiap ornamen prada emas melambangkan watak ksatria yang kokoh berotot kawat bertulang besi. Karya terkurasi ini sudah resmi tersedia di Marketplace Budaya. 🎭🛡️ #WayangKulit #Gatotkaca #SeniTatahBanyumas',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&auto=format&fit=crop&q=80',
    likes: 2580,
    comments: 142,
    bookmarks: 310
  },
  {
    id: 3,
    author: {
      name: 'Komunitas Peduli Lontar Bali',
      subtitle: 'Pelestari Manuskrip Kuno • Karangasem',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      timestamp: '3 jam yang lalu'
    },
    content: 'Kabar Baik Crowdfunding: Berkat gotong royong 500+ donatur di Berbudaya, 85 cakep naskah lontar usada pengobatan kuno abad ke-17 di Puri Karangasem telah selesai dibersihkan dari parasit jamur menggunakan minyak kemiri organik. Siap memasuki fase alih media digital! 📜🌿 #PusakaLontar #UsadaBali #BudayaGo2026',
    image: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=800&h=600&auto=format&fit=crop&q=80',
    likes: 3410,
    comments: 215,
    bookmarks: 520
  }
];

export const mockStorage = {
  // Current user
  getCurrentUser: (): UserProfile | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Posts
  getPosts: (): PostItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_POSTS;
    }
  },

  savePosts: (posts: PostItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
      window.dispatchEvent(new Event('rb_posts_updated'));
    } catch (e) {
      console.error('Failed to save posts to localStorage', e);
    }
  },

  addPost: (newPostData: Partial<PostItem>): PostItem => {
    const currentPosts = mockStorage.getPosts();
    const user = mockStorage.getCurrentUser();

    const post: PostItem = {
      id: Date.now(),
      author: {
        name: user?.name || 'Pengguna Ruang Budaya',
        subtitle: user?.role || 'Kreator Budaya Muda • Indonesia',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        timestamp: 'Baru saja'
      },
      content: newPostData.content || '',
      image: newPostData.image,
      likes: 0,
      comments: 0,
      bookmarks: 0,
      category: newPostData.category || 'Umum',
      createdAt: new Date().toISOString(),
      ...newPostData
    };

    const updated = [post, ...currentPosts];
    mockStorage.savePosts(updated);
    return post;
  },

  // Likes state: { [postId]: { liked: boolean, count: number } }
  getLikes: (): Record<number, { liked: boolean; count: number }> => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIKES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  toggleLike: (postId: number, defaultCount: number = 0) => {
    const current = mockStorage.getLikes();
    const existing = current[postId] || { liked: false, count: defaultCount };
    const nextState = {
      liked: !existing.liked,
      count: existing.liked ? Math.max(0, existing.count - 1) : existing.count + 1
    };

    current[postId] = nextState;
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(current));
    return nextState;
  },

  // Comments per post
  getComments: (postId: number): PostComment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      const commentsMap = data ? JSON.parse(data) : {};
      return commentsMap[postId] || [
        {
          id: 1,
          author: {
            name: 'Dewi Lestari',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
          },
          content: 'Wah luar biasa karya pelestarian ini! Semangat terus melestarikan warisan leluhur 🌿',
          timestamp: '2 jam yang lalu'
        }
      ];
    } catch {
      return [];
    }
  },

  addComment: (postId: number, content: string, user: { name: string; avatar: string }): PostComment => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      const commentsMap = data ? JSON.parse(data) : {};
      const currentList: PostComment[] = commentsMap[postId] || [];

      const newComment: PostComment = {
        id: Date.now(),
        author: {
          name: user.name,
          avatar: user.avatar
        },
        content,
        timestamp: 'Baru saja'
      };

      commentsMap[postId] = [newComment, ...currentList];
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(commentsMap));

      // Update count on post
      const posts = mockStorage.getPosts();
      const updatedPosts = posts.map(p => p.id === postId ? { ...p, comments: (p.comments || 0) + 1 } : p);
      mockStorage.savePosts(updatedPosts);

      return newComment;
    } catch {
      return {
        id: Date.now(),
        author: user,
        content,
        timestamp: 'Baru saja'
      };
    }
  },

  // Reset simulator
  resetDemoData: () => {
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.LIKES);
    localStorage.removeItem(STORAGE_KEYS.COMMENTS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_POSTS);
    mockStorage.getPosts(); // Re-seed initial
  }
};

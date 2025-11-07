import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  MapPin, Calendar, Link as LinkIcon, Mail, Phone, Briefcase,
  Award, Users, Image as ImageIcon, FileText, Heart, MessageCircle,
  UserPlus, Send, MoreVertical, ArrowLeft
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

// Mock user data - dalam implementasi nyata, data ini akan dari API
const getUserData = (userId: string) => {
  const users: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Dewi Lestari',
      username: '@dewilestari',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      cover: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=1200&h=300&fit=crop',
      bio: 'Pengrajin batik tulis dari Solo. Melestarikan warisan budaya Indonesia melalui karya seni batik. 🎨',
      location: 'Solo, Jawa Tengah',
      website: 'batikdewi.com',
      email: 'dewi@batikdewi.com',
      phone: '+62 812-3456-7890',
      profession: 'Pengrajin Batik',
      joinedDate: 'Bergabung Maret 2023',
      verified: true,
      followers: 2450,
      following: 892,
      posts: 145,
      isFollowing: false,
      posts_list: [
        {
          id: 1,
          type: 'image',
          image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=600&fit=crop',
          likes: 234,
          comments: 45
        },
        {
          id: 2,
          type: 'image',
          image: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&h=600&fit=crop',
          likes: 189,
          comments: 32
        },
        {
          id: 3,
          type: 'image',
          image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
          likes: 312,
          comments: 56
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Budi Santoso',
      username: '@budisantoso',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      cover: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=1200&h=300&fit=crop',
      bio: 'Pengukir kayu Jepara. Membawa tradisi ukiran klasik ke era modern.',
      location: 'Jepara, Jawa Tengah',
      website: 'ukiranjepara.com',
      email: 'budi@ukiranjepara.com',
      phone: '+62 813-4567-8901',
      profession: 'Pengukir Kayu',
      joinedDate: 'Bergabung Januari 2023',
      verified: true,
      followers: 1890,
      following: 543,
      posts: 98,
      isFollowing: false,
      posts_list: [
        {
          id: 1,
          type: 'image',
          image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=600&h=600&fit=crop',
          likes: 178,
          comments: 28
        },
        {
          id: 2,
          type: 'image',
          image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=600&fit=crop',
          likes: 245,
          comments: 41
        }
      ]
    },
    '3': {
      id: '3',
      name: 'Siti Nurhaliza',
      username: '@sitinurhaliza',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      cover: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&h=300&fit=crop',
      bio: 'Penenun songket Palembang. Melestarikan seni tenun tradisional Indonesia.',
      location: 'Palembang, Sumatera Selatan',
      website: 'songketsiti.com',
      email: 'siti@songketsiti.com',
      phone: '+62 814-5678-9012',
      profession: 'Penenun Songket',
      joinedDate: 'Bergabung Mei 2023',
      verified: false,
      followers: 1234,
      following: 678,
      posts: 67,
      isFollowing: false,
      posts_list: [
        {
          id: 1,
          type: 'image',
          image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
          likes: 156,
          comments: 23
        }
      ]
    }
  };

  return users[userId] || null;
};

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userId) {
      const data = getUserData(userId);
      setUserData(data);
      setIsFollowing(data?.isFollowing || false);
    }
  }, [userId]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pengguna Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">Profil yang Anda cari tidak tersedia.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      <div className="pt-16">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
          <img
            src={userData.cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-16 md:-mt-20 pb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white shadow-xl"
                  />
                  {userData.verified && (
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {userData.name}
                      </h1>
                      <p className="text-gray-600 mb-2">{userData.username}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{userData.profession}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleFollowToggle}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
                          isFollowing
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <Users className="w-4 h-4" />
                            Mengikuti
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4" />
                            Ikuti
                          </>
                        )}
                      </button>
                      <button className="p-2.5 border-2 border-gray-300 rounded-xl hover:bg-blue-50 hover:border-blue-600 transition-all">
                        <Send className="w-5 h-5 text-gray-700" />
                      </button>
                      <button className="p-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all">
                        <MoreVertical className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{userData.bio}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div>
                      <span className="font-bold text-gray-900">{userData.posts}</span>
                      <span className="text-gray-600 text-sm ml-1">Postingan</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">{userData.followers.toLocaleString()}</span>
                      <span className="text-gray-600 text-sm ml-1">Pengikut</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">{userData.following.toLocaleString()}</span>
                      <span className="text-gray-600 text-sm ml-1">Mengikuti</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      <a href={`https://${userData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {userData.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{userData.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === 'posts'
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ImageIcon className="w-5 h-5" />
                  Postingan
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === 'about'
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Tentang
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === 'posts' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {userData.posts_list.map((post: any) => (
                    <div
                      key={post.id}
                      className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Kontak</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span>{userData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <LinkIcon className="w-5 h-5 text-blue-600" />
                        <a href={`https://${userData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {userData.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tentang</h3>
                    <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                  </div>

                  {/* Join Date */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Bergabung</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>{userData.joinedDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

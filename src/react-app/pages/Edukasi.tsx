import { useState } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { 
  Clock, Users, Star, BookOpen, Trophy, 
  Calendar, ChevronLeft, ChevronRight, 
  Video, HelpCircle, BarChart3, Timer, Heart, MessageCircle, Eye, Bookmark
} from 'lucide-react';

// Data Kursus Budaya
const topCourses = [
  {
    id: 1,
    title: 'Masterclass Membatik Tulis Soga Alam Surakarta',
    instructor: { name: 'Dewi Lestari Hadiningrat', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=400',
    level: 'Pemula',
    students: 1420,
    rating: 4.96,
    category: 'Batik & Kriya'
  },
  {
    id: 2,
    title: 'Literasi Aksara Jawa Kuno: Dari Hanacaraka ke Naskah Babad',
    instructor: { name: 'Ki Danang Daniswara, M.Hum', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=400',
    level: 'Pemula',
    students: 2180,
    rating: 4.98,
    category: 'Aksara & Bahasa'
  },
  {
    id: 3,
    title: 'Sinkronisasi Ritme & Gerak Cepat Tari Saman Gayo',
    instructor: { name: 'Cut Mutia Syahrani', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    level: 'Menengah',
    students: 980,
    rating: 4.92,
    category: 'Tari Nusantara'
  },
  {
    id: 4,
    title: 'Harmoni Karawitan: Teknik Tabuhan Bonang & Saron Laras Slendro',
    instructor: { name: 'Bambang Sukotjo', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    level: 'Menengah',
    students: 760,
    rating: 4.9,
    category: 'Karawitan & Musik'
  }
];

const myCourses = [
  {
    id: 1,
    title: 'Teknik Membatik Tulis',
    progress: 9,
    total: 12,
    icon: '🎨',
    students: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
    ],
    extraStudents: 17
  },
  {
    id: 2,
    title: 'Koreografi Tari Saman',
    progress: 16,
    total: 24,
    icon: '💃',
    students: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50',
    ],
    extraStudents: 9
  },
  {
    id: 3,
    title: 'Tenun Songket Palembang',
    progress: 11,
    total: 16,
    icon: '🧵',
    students: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50',
    ],
    extraStudents: 11
  },
  {
    id: 4,
    title: 'Gamelan & Karawitan Jawa',
    progress: 18,
    total: 37,
    icon: '🎵',
    students: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50',
    ],
    extraStudents: 8
  }
];

const scheduleEvents = [
  {
    id: 1,
    title: 'Workshop Membatik untuk Pemula',
    date: '25',
    time: '11:00-12:00',
    type: 'Course'
  },
  {
    id: 2,
    title: 'Live: Teknik Tenun Tradisional',
    date: '27',
    time: '14:30-15:30',
    type: 'Tutoring'
  }
];

// Data Artikel Budaya dari Pengguna
const culturalArticles = [
  {
    id: 1,
    title: 'Mengenal Lebih Dekat Filosofi di Balik Motif Batik Kawung',
    author: {
      name: 'Siti Nurhaliza',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      role: 'Pengrajin Batik'
    },
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600',
    excerpt: 'Motif Kawung merupakan salah satu motif batik tertua di Indonesia yang memiliki makna filosofis mendalam tentang kesempurnaan dan kebijaksanaan...',
    category: 'Batik',
    readTime: '5 menit',
    views: 2340,
    likes: 186,
    comments: 24,
    publishedAt: '2 hari lalu'
  },
  {
    id: 2,
    title: 'Perjalanan Sejarah Wayang Kulit: Dari Ritual Hingga Seni Pertunjukan',
    author: {
      name: 'Pak Sutrisno',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      role: 'Dalang Wayang'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
    excerpt: 'Wayang kulit telah menjadi bagian integral dari budaya Jawa selama berabad-abad, berkembang dari ritual keagamaan menjadi bentuk seni yang kompleks...',
    category: 'Wayang',
    readTime: '8 menit',
    views: 1890,
    likes: 142,
    comments: 31,
    publishedAt: '3 hari lalu'
  },
  {
    id: 3,
    title: 'Teknik Tenun Songket: Warisan Budaya dari Tanah Melayu',
    author: {
      name: 'Ratna Dewi',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      role: 'Penenun Songket'
    },
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    excerpt: 'Songket adalah kain tenun tradisional yang dihiasi dengan benang emas atau perak. Proses pembuatannya membutuhkan kesabaran dan ketelitian tinggi...',
    category: 'Tenun',
    readTime: '6 menit',
    views: 1567,
    likes: 98,
    comments: 19,
    publishedAt: '5 hari lalu'
  },
  {
    id: 4,
    title: 'Gamelan Jawa: Harmoni Musik Tradisional yang Mendunia',
    author: {
      name: 'Bambang Wijaya',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      role: 'Musisi Gamelan'
    },
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
    excerpt: 'Gamelan adalah ansambel musik tradisional yang terdiri dari berbagai instrumen perkusi, menciptakan harmoni yang unik dan mempesona...',
    category: 'Musik',
    readTime: '7 menit',
    views: 2103,
    likes: 167,
    comments: 28,
    publishedAt: '1 minggu lalu'
  }
];

const quizData = [
  {
    id: 1,
    title: 'Kuis: Sejarah Batik Nusantara',
    questions: 10,
    duration: '15 menit',
    difficulty: 'Easy',
    icon: '📝'
  },
  {
    id: 2,
    title: 'Kuis: Teknik Tenun Tradisional',
    questions: 15,
    duration: '20 menit',
    difficulty: 'Medium',
    icon: '🧵'
  }
];

export default function Edukasi() {
  const [selectedDate, setSelectedDate] = useState(24);
  const [currentMonth] = useState('April 2024');

  const getDaysInMonth = () => {
    return Array.from({ length: 7 }, (_, i) => 23 + i);
  };

  const getDayName = (day: number) => {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Sun'];
    return days[(day - 23) % 7];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-18 sm:pt-20 pb-20 md:pb-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Courses Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Kursus Pilihan Untuk Anda</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topCourses.map((course) => (
                  <div key={course.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {course.level}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <img src={course.instructor.avatar} alt={course.instructor.name} className="w-6 h-6 rounded-full" />
                        <span className="text-xs text-gray-600">{course.instructor.name}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Courses Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Kursus Saya</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {myCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl">{course.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{course.title}</h3>
                        <p className="text-xs text-gray-600">Sessions completed: {course.progress}/{course.total}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {course.students.map((student, idx) => (
                          <img key={idx} src={student} alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded-full">+{course.extraStudents}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Kuis Budaya Nusantara</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Uji dan pertajam wawasan adat & kesenian daerah</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData.map((quiz) => (
                  <div 
                    key={quiz.id} 
                    className="relative group bg-slate-900 rounded-2xl p-5 text-white overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-800 flex flex-col justify-between"
                  >
                    {/* Subtle decorative motif behind text */}
                    <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 select-none pointer-events-none">
                      {quiz.icon}
                    </div>

                    <div className="relative z-10 mb-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full text-[10px] font-medium border border-slate-700">
                          {quiz.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Timer className="w-3.5 h-3.5" />
                          <span>{quiz.duration}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-white text-sm mb-1.5 leading-snug">
                        {quiz.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                        <span>{quiz.questions} pertanyaan interaktif</span>
                      </div>
                    </div>

                    <button className="relative z-10 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] shadow-xs">
                      Mulai Kuis
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Artikel Budaya dari Komunitas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Artikel Budaya dari Komunitas</h2>
                  <p className="text-sm text-gray-600">Karya tulis terbaik dari para ahli budaya</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {culturalArticles.map((article) => (
                  <article key={article.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Article Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {article.category}
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                        <Bookmark className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Article Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                        <img 
                          src={article.author.avatar} 
                          alt={article.author.name} 
                          className="w-8 h-8 rounded-full" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900">{article.author.name}</h4>
                          <p className="text-xs text-gray-500">{article.author.role}</p>
                        </div>
                        <span className="text-xs text-gray-500">{article.publishedAt}</span>
                      </div>

                      {/* Article Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Productivity Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Aktivitas Belajar Mingguan</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                  Lihat Detail <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="h-64 flex items-end justify-between gap-2">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => {
                  const heights = [60, 80, 70, 85, 75, 65, 90];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <div style={{ height: `${heights[idx] * 0.4}%` }} className="w-full bg-blue-400 rounded-t" />
                        <div style={{ height: `${heights[idx] * 0.3}%` }} className="w-full bg-indigo-400 rounded-t" />
                        <div style={{ height: `${heights[idx] * 0.3}%` }} className="w-full bg-blue-300 rounded-t" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 text-xs flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span className="text-gray-600">Video Tutorial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full" />
                  <span className="text-gray-600">Artikel Budaya</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-300 rounded-full" />
                  <span className="text-gray-600">Kuis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* Calendar Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Friday</h3>
                <span className="text-sm text-gray-600">April 5, 2024</span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="font-semibold text-gray-900">{currentMonth}</span>
                  <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {getDaysInMonth().map((day) => (
                    <div key={day} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{getDayName(day)}</div>
                      <button
                        onClick={() => setSelectedDate(day)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          selectedDate === day
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {day}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Events */}
              <div className="space-y-3">
                {scheduleEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      event.type === 'Course' ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {event.type === 'Course' ? <BookOpen className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-1">{event.type}</div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>April {event.date}</span>
                        <Clock className="w-3 h-3 ml-1" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6">Statistik Pembelajaran</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">85</div>
                  <div className="text-xs text-gray-600 mb-1">Poin Budaya</div>
                  <div className="text-xs text-green-600 font-semibold">+13%</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">4</div>
                  <div className="text-xs text-gray-600 mb-1">Kursus Selesai</div>
                  <div className="text-xs text-green-600 font-semibold">+1 bulan ini</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
                  <div className="text-xs text-gray-600 mb-1">Artikel Dibaca</div>
                  <div className="text-xs text-green-600 font-semibold">+25%</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">34h</div>
                  <div className="text-xs text-gray-600 mb-1">Waktu Belajar</div>
                  <div className="text-xs text-green-600 font-semibold">+8%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

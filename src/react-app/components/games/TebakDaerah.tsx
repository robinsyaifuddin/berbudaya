import { useState, useEffect } from 'react';
import { Trophy, RefreshCw, Heart, ArrowLeft, Keyboard, CheckCircle2, AlertCircle, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import ModernLayout from '@/react-app/components/ModernLayout';
import GameTutorialModal, { TutorialStep } from './GameTutorialModal';

const tebakTutorialSteps: TutorialStep[] = [
  {
    title: 'Amati Gambar & Petunjuk Asal Daerah',
    description: 'Setiap ronde menampilkan foto artefak, kuliner, tarian, atau arsitektur adat lengkap dengan petunjuk deskriptifnya.',
    tip: 'Perhatikan jumlah garis bawah yang merepresentasikan banyaknya huruf nama daerah.',
    badge: 'Orientasi Soal'
  },
  {
    title: 'Tebak Huruf demi Huruf atau Ketik Langsung',
    description: 'Pilih huruf menggunakan keyboard virtual di layar atau ketik langsung melalui keyboard fisik Anda untuk menebak susunan kata.',
    tip: 'Jika huruf ada dalam kata, huruf akan otomatis terbuka di tempatnya.',
    badge: 'Metode Tebak'
  },
  {
    title: 'Jaga 6 Nyawa & Kumpulkan Poin',
    description: 'Anda memiliki batas toleransi maksimal 6 kali kesalahan tebak (disimbolkan ikon nyawa). Setiap daerah yang tertebak sempurna bernilai +10 Poin.',
    tip: 'Tuntaskan seluruh 10 soal untuk mendapatkan akurasi pengetahuan budaya nusantara tertinggi!',
    badge: 'Aturan & Nyawa'
  }
];

interface GameQuestion {
  id: number;
  hint: string;
  answer: string;
  image: string;
  category: string;
}

const questions: GameQuestion[] = [
  {
    id: 1,
    hint: "Tari Saman berasal dari daerah ini",
    answer: "ACEH",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Tarian"
  },
  {
    id: 2,
    hint: "Rumah Adat Tongkonan adalah rumah adat dari",
    answer: "TORAJA",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Rumah Adat"
  },
  {
    id: 3,
    hint: "Batik dan Kebaya identik dengan tradisi suku",
    answer: "JAWA",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Pakaian"
  },
  {
    id: 4,
    hint: "Rumah Gadang dengan atap gonjong khas dari",
    answer: "MINANG",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Rumah Adat"
  },
  {
    id: 5,
    hint: "Candi Borobudur mahakarya bersejarah di",
    answer: "JAWA TENGAH",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Bangunan"
  },
  {
    id: 6,
    hint: "Rendang kuliner pusaka kaya rempah asal",
    answer: "PADANG",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Kuliner"
  },
  {
    id: 7,
    hint: "Kain Tenun Ikat bernilai mistis tinggi dari pulau",
    answer: "SUMBA",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Kain"
  },
  {
    id: 8,
    hint: "Tari Kecak dengan lingkaran paduan suara sakral dari",
    answer: "BALI",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Tarian"
  },
  {
    id: 9,
    hint: "Alat musik bambu Angklung berakar kuat di",
    answer: "JAWA BARAT",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Alat Musik"
  },
  {
    id: 10,
    hint: "Pempek kuliner ikan dan kuah cuko autentik dari",
    answer: "PALEMBANG",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&auto=format&fit=crop&q=80",
    category: "Kuliner"
  }
];

const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const MAX_WRONG_GUESSES = 6;

interface Props {
  onClose?: () => void;
}

export default function TebakDaerah({ onClose }: Props) {
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost' | 'complete'>('playing');
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  // Cek kondisi menang / kalah
  useEffect(() => {
    if (!currentQuestion) return;

    const answerLetters = currentQuestion.answer.replace(/\s/g, '').split('');
    const allLettersGuessed = answerLetters.every(letter => guessedLetters.has(letter));

    if (allLettersGuessed && answerLetters.length > 0 && gameState === 'playing') {
      setGameState('won');
      setScore(prev => prev + 10);
      setTotalQuestionsAnswered(prev => prev + 1);
    } else if (wrongGuesses >= MAX_WRONG_GUESSES && gameState === 'playing') {
      setGameState('lost');
      setTotalQuestionsAnswered(prev => prev + 1);
    }
  }, [guessedLetters, wrongGuesses, currentQuestion, gameState]);

  const handleLetterGuess = (letter: string) => {
    if (gameState !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!currentQuestion.answer.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const upperValue = value.toUpperCase();
    const lastChar = upperValue[upperValue.length - 1];
    if (lastChar && /[A-Z]/.test(lastChar)) {
      handleLetterGuess(lastChar);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setGuessedLetters(new Set());
      setWrongGuesses(0);
      setGameState('playing');
      setInputValue('');
    } else {
      setGameState('complete');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setScore(0);
    setGameState('playing');
    setTotalQuestionsAnswered(0);
    setInputValue('');
  };

  const displayWord = currentQuestion.answer
    .split('')
    .map(letter => {
      if (letter === ' ') return '  ';
      return guessedLetters.has(letter) ? letter : '_';
    })
    .join(' ');

  // COMPLETE SCREEN
  if (gameState === 'complete') {
    return (
      <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
            <Link 
              to="/permainan"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Daftar Permainan</span>
            </Link>
            <span className="text-xs font-semibold text-slate-500">Tantangan Geografi Budaya Tuntas</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-6 text-center border-b border-slate-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-[#133384] mb-3 border border-blue-100">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Eksplorasi Selesai!</h1>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Anda telah menyelesaikan seluruh 10 putaran tebak daerah asal pusaka nusantara.
              </p>

              <div className="inline-block mt-4 px-6 py-2 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block">Total Poin Diperoleh</span>
                <span className="text-3xl font-extrabold text-[#133384]">{score}</span>
                <span className="text-xs text-slate-400 font-medium"> Poin</span>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100 bg-slate-50/60 border-b border-slate-100">
              <div className="p-3.5 text-center">
                <p className="text-base font-bold text-emerald-600">{score / 10} / {questions.length}</p>
                <p className="text-[11px] text-slate-500 font-medium">Tebakan Tuntas</p>
              </div>
              <div className="p-3.5 text-center">
                <p className="text-base font-bold text-[#133384]">{Math.round((score / (questions.length * 10)) * 100)}%</p>
                <p className="text-[11px] text-slate-500 font-medium">Akurasi Budaya</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-2">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#133384] hover:bg-[#0e245e] text-white text-xs font-semibold rounded-lg transition-all active:scale-[0.98] shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Main Ulang</span>
              </button>
              <Link
                to="/permainan"
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                Daftar Permainan
              </Link>
            </div>
          </div>
        </div>
      </ModernLayout>
    );
  }

  // PLAYING SCREEN
  return (
    <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
      <GameTutorialModal
        gameTitle="Tebak Daerah"
        steps={tebakTutorialSteps}
        isOpen={showTutorial}
        onComplete={() => setShowTutorial(false)}
      />
      <div className="space-y-4">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
          <Link 
            to="/permainan"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Nyawa */}
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-xs font-semibold text-slate-700">
                {MAX_WRONG_GUESSES - wrongGuesses}
              </span>
            </div>

            {/* Poin */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#133384] text-xs font-bold">
              <span>{score} Pts</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Hairline */}
        <div className="w-full bg-slate-200/80 rounded-full h-1 overflow-hidden">
          <div 
            className="bg-[#133384] h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question + Hint Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Visual Banner */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
            <img
              src={currentQuestion.image}
              alt={currentQuestion.category}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-white/90 text-slate-800 backdrop-blur-xs border border-slate-200/60 uppercase tracking-wider">
                Kategori: {currentQuestion.category}
              </span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                Soal {currentQuestionIndex + 1} dari {questions.length}
              </span>
            </div>
          </div>

          <div className="p-5">
            {/* Hint Question */}
            <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-4 leading-relaxed">
              {currentQuestion.hint}
            </p>

            {/* Guess Letter Display */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 mb-4 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nama Daerah</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-[0.25em] font-mono select-none">
                {displayWord}
              </p>
            </div>

            {/* Status Feedback: Won */}
            {gameState === 'won' && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Tebakan Tepat!</p>
                      <p className="text-[11px] text-emerald-700">Daerah asal: <strong>{currentQuestion.answer}</strong> (+10 Poin)</p>
                    </div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md transition-all active:scale-[0.98]"
                  >
                    <span>Lanjut</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Status Feedback: Lost */}
            {gameState === 'lost' && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Kesempatan Habis</p>
                      <p className="text-[11px] text-rose-700">Jawaban yang tepat: <strong>{currentQuestion.answer}</strong></p>
                    </div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-md transition-all active:scale-[0.98]"
                  >
                    <span>Lanjut</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Direct Input Field (Optional Keyboard Shortcut) */}
            {gameState === 'playing' && (
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Ketik huruf via keyboard atau klik tombol di bawah..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#133384] focus:ring-1 focus:ring-[#133384] focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  <Keyboard className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Virtual Keyboard */}
            {gameState === 'playing' && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                {KEYBOARD.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
                    {row.map((letter) => {
                      const isGuessed = guessedLetters.has(letter);
                      const isCorrect = isGuessed && currentQuestion.answer.includes(letter);
                      const isWrong = isGuessed && !currentQuestion.answer.includes(letter);

                      let keyStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
                      if (isCorrect) {
                        keyStyle = 'bg-emerald-600 border-emerald-600 text-white';
                      } else if (isWrong) {
                        keyStyle = 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed';
                      } else if (isGuessed) {
                        keyStyle = 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed';
                      }

                      return (
                        <button
                          key={letter}
                          onClick={() => handleLetterGuess(letter)}
                          disabled={isGuessed}
                          className={`w-7 h-9 sm:w-9 sm:h-10 rounded text-xs font-semibold border transition-all flex items-center justify-center ${keyStyle} ${
                            !isGuessed ? 'active:scale-95 cursor-pointer shadow-2xs' : ''
                          }`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}

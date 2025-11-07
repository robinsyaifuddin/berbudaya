import { useState, useEffect } from 'react';
import { Map, Trophy, RefreshCw, Heart, ArrowLeft, Keyboard } from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

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
    image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&h=400&fit=crop",
    category: "Tarian"
  },
  {
    id: 2,
    hint: "Rumah Adat Tongkonan adalah rumah adat dari",
    answer: "TORAJA",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
    category: "Rumah Adat"
  },
  {
    id: 3,
    hint: "Batik dan Kebaya identik dengan",
    answer: "JAWA",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop",
    category: "Pakaian"
  },
  {
    id: 4,
    hint: "Rumah Gadang adalah rumah adat dari",
    answer: "MINANG",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    category: "Rumah Adat"
  },
  {
    id: 5,
    hint: "Candi Borobudur terletak di",
    answer: "JAWA TENGAH",
    image: "https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=600&h=400&fit=crop",
    category: "Bangunan"
  },
  {
    id: 6,
    hint: "Rendang adalah makanan khas dari",
    answer: "PADANG",
    image: "https://images.unsplash.com/photo-1596040033229-a0b13b4e0d16?w=600&h=400&fit=crop",
    category: "Kuliner"
  },
  {
    id: 7,
    hint: "Kain Tenun Ikat terkenal dari",
    answer: "SUMBA",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop",
    category: "Kain"
  },
  {
    id: 8,
    hint: "Tari Kecak adalah tarian dari",
    answer: "BALI",
    image: "https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=600&h=400&fit=crop",
    category: "Tarian"
  },
  {
    id: 9,
    hint: "Angklung adalah alat musik dari",
    answer: "JAWA BARAT",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    category: "Alat Musik"
  },
  {
    id: 10,
    hint: "Pempek adalah makanan khas dari",
    answer: "PALEMBANG",
    image: "https://images.unsplash.com/photo-1596040033229-a0b13b4e0d16?w=600&h=400&fit=crop",
    category: "Kuliner"
  }
];

const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

interface Props {
  onClose?: () => void;
}

export default function TebakDaerah({ onClose }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost' | 'complete'>('playing');
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const MAX_WRONG_GUESSES = 6;
  const currentQuestion = questions[currentQuestionIndex];
  
  const displayWord = currentQuestion.answer.split('').map(char => {
    if (char === ' ') return ' ';
    return guessedLetters.has(char) ? char : '_';
  }).join(' ');

  const isWordComplete = currentQuestion.answer.split('').every(char => 
    char === ' ' || guessedLetters.has(char)
  );

  useEffect(() => {
    if (isWordComplete && gameState === 'playing') {
      setGameState('won');
      setScore(score + 10);
      setTotalQuestionsAnswered(totalQuestionsAnswered + 1);
    }
  }, [isWordComplete]);

  useEffect(() => {
    if (wrongGuesses >= MAX_WRONG_GUESSES && gameState === 'playing') {
      setGameState('lost');
      setTotalQuestionsAnswered(totalQuestionsAnswered + 1);
    }
  }, [wrongGuesses]);

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter) || gameState !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!currentQuestion.answer.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleInputChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setInputValue(upperValue);
    
    // Auto-guess letters as user types
    const lastChar = upperValue.slice(-1);
    if (lastChar && /[A-Z]/.test(lastChar)) {
      handleLetterGuess(lastChar);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setGuessedLetters(new Set());
      setWrongGuesses(0);
      setGameState('playing');
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

  const handleNextQuestion = () => {
    setInputValue('');
    handleNext();
  };

  // Complete Screen
  if (gameState === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="pt-16 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
              <Trophy className="w-20 h-20 mx-auto text-yellow-300 mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Permainan Selesai!</h1>
              <p className="text-xl text-green-100">Kamu telah menyelesaikan semua pertanyaan</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-600">{score}</p>
                  <p className="text-sm text-gray-600">Total Skor</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <Map className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-600">{totalQuestionsAnswered}</p>
                  <p className="text-sm text-gray-600">Pertanyaan Dijawab</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <RefreshCw className="w-5 h-5" />
                  Main Lagi
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all hover:scale-[1.02]"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="pt-16 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">{score} Poin</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-bold text-gray-900">{MAX_WRONG_GUESSES - wrongGuesses}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-600 mb-1">Pertanyaan</p>
          <p className="text-2xl font-bold text-gray-900">{currentQuestionIndex + 1} / {questions.length}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image and Hint */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img
                src={currentQuestion.image}
                alt="Hint"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {currentQuestion.category}
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-4">💡 {currentQuestion.hint}</p>
                
                {/* Word Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4">
                  <p className="text-3xl md:text-4xl font-bold text-center text-gray-900 tracking-wider font-mono">
                    {displayWord}
                  </p>
                </div>

                {/* Input Field untuk ketik langsung */}
                {gameState === 'playing' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Keyboard className="w-4 h-4" />
                      Ketik jawabanmu (opsional)
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ketik huruf atau kata di sini..."
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-lg font-semibold uppercase"
                      disabled={gameState !== 'playing'}
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Setiap huruf yang kamu ketik akan otomatis ditebak</p>
                  </div>
                )}

                {/* Result Message */}
                {gameState === 'won' && (
                  <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-6 mb-4">
                    <div className="text-center">
                      <div className="text-5xl mb-3">🎉</div>
                      <h3 className="text-2xl font-bold text-blue-700 mb-2">Benar!</h3>
                      <p className="text-lg text-gray-700 mb-1">
                        {currentQuestion.hint.replace('berasal dari', 'berasal dari')} <strong>{currentQuestion.answer}</strong>
                      </p>
                      <p className="text-sm text-blue-600 mt-2">+10 Poin</p>
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-[1.02]"
                    >
                      {currentQuestionIndex + 1 < questions.length ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil'}
                    </button>
                  </div>
                )}

                {gameState === 'lost' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-4">
                    <div className="text-center">
                      <div className="text-5xl mb-3">😔</div>
                      <h3 className="text-2xl font-bold text-red-700 mb-2">Waktu Habis!</h3>
                      <p className="text-lg text-gray-700 mb-1">
                        Jawaban yang benar: <strong>{currentQuestion.answer}</strong>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{currentQuestion.hint}</p>
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-[1.02]"
                    >
                      {currentQuestionIndex + 1 < questions.length ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Keyboard */}
            {gameState === 'playing' && (
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-center">Pilih Huruf</h3>
                <div className="space-y-2">
                  {KEYBOARD.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-2">
                      {row.map((letter) => {
                        const isGuessed = guessedLetters.has(letter);
                        const isCorrect = isGuessed && currentQuestion.answer.includes(letter);
                        const isWrong = isGuessed && !currentQuestion.answer.includes(letter);

                        return (
                          <button
                            key={letter}
                            onClick={() => handleLetterGuess(letter)}
                            disabled={isGuessed}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-sm md:text-base transition-all ${
                              isCorrect
                                ? 'bg-blue-500 text-white'
                                : isWrong
                                ? 'bg-red-500 text-white'
                                : isGuessed
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-gray-900 hover:from-blue-200 hover:to-indigo-200 hover:scale-110 hover:shadow-lg cursor-pointer'
                            }`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Hangman Visual */}
          <div className="space-y-6">
            {/* Lives Display */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Nyawa Tersisa</h3>
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: MAX_WRONG_GUESSES }).map((_, index) => (
                  <Heart
                    key={index}
                    className={`w-8 h-8 ${
                      index < MAX_WRONG_GUESSES - wrongGuesses
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-300'
                    } transition-all`}
                  />
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {wrongGuesses} kesalahan dari {MAX_WRONG_GUESSES}
                </p>
              </div>
            </div>

            {/* Hangman Visual */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Status</h3>
              <div className="relative h-64 flex items-center justify-center">
                <svg viewBox="0 0 200 250" className="w-full h-full">
                  {/* Base */}
                  <line x1="20" y1="230" x2="180" y2="230" stroke="#374151" strokeWidth="4" />
                  <line x1="50" y1="230" x2="50" y2="20" stroke="#374151" strokeWidth="4" />
                  <line x1="50" y1="20" x2="130" y2="20" stroke="#374151" strokeWidth="4" />
                  <line x1="130" y1="20" x2="130" y2="50" stroke="#374151" strokeWidth="4" />
                  
                  {/* Head */}
                  {wrongGuesses >= 1 && (
                    <circle cx="130" cy="70" r="20" stroke="#EF4444" strokeWidth="4" fill="none" />
                  )}
                  
                  {/* Body */}
                  {wrongGuesses >= 2 && (
                    <line x1="130" y1="90" x2="130" y2="150" stroke="#EF4444" strokeWidth="4" />
                  )}
                  
                  {/* Left Arm */}
                  {wrongGuesses >= 3 && (
                    <line x1="130" y1="110" x2="100" y2="130" stroke="#EF4444" strokeWidth="4" />
                  )}
                  
                  {/* Right Arm */}
                  {wrongGuesses >= 4 && (
                    <line x1="130" y1="110" x2="160" y2="130" stroke="#EF4444" strokeWidth="4" />
                  )}
                  
                  {/* Left Leg */}
                  {wrongGuesses >= 5 && (
                    <line x1="130" y1="150" x2="100" y2="190" stroke="#EF4444" strokeWidth="4" />
                  )}
                  
                  {/* Right Leg */}
                  {wrongGuesses >= 6 && (
                    <line x1="130" y1="150" x2="160" y2="190" stroke="#EF4444" strokeWidth="4" />
                  )}
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-2">💡 Cara Bermain</h3>
              <ul className="text-sm space-y-1 text-blue-50">
                <li>• Tebak huruf satu per satu</li>
                <li>• Atau ketik langsung jawabanmu</li>
                <li>• Maksimal 6 kesalahan</li>
                <li>• Setiap jawaban benar: +10 poin</li>
                <li>• Selesaikan semua pertanyaan!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Brain, Check, X, Trophy, RefreshCw, ChevronRight, ArrowLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Kain Songket Pandai Sikek di Minangkabau terkenal dengan motif rebung berfilosofi luhur. Apa nama motif tersebut?',
    options: ['Pucuak Rabuang', 'Itik Pulang Patang', 'Kaluak Paku', 'Bungo Lado'],
    answer: 'Pucuak Rabuang',
    explanation: 'Pucuak Rabuang bermakna: kecil berguna menjadi rebung, besar bermanfaat menjadi bambu penopang kehidupan bersama.'
  },
  {
    id: 2,
    question: 'Dalam seni kriya Keris Jawa, apakah yang dimaksud dengan Pamor pada permukaan bilah keris?',
    options: [
      'Pola guratan lipatan logam besi, baja, dan batu meteorit nikel',
      'Ukiran kayu pada warangka sarung keris',
      'Gagang keris dari tanduk kerbau',
      'Mantra doa saat memandikan pusaka'
    ],
    answer: 'Pola guratan lipatan logam besi, baja, dan batu meteorit nikel',
    explanation: 'Pamor adalah mahakarya seni metalurgi nusantara yang dihasilkan melalui teknik lipat tempa berulang ratusan kali.'
  },
  {
    id: 3,
    question: 'Tas tradisional Noken asal Papua telah diakui UNESCO. Apakah keunikan utama teknik pembuatannya?',
    options: [
      'Dirajut dari pilinan serat kulit kayu alami langsung dengan jemari tangan tanpa jarum',
      'Dijahit menggunakan mesin bordir elektrik modern',
      'Ditenun dari benang sutra impor',
      'Dicetak dari bahan sintetis getah karet'
    ],
    answer: 'Dirajut dari pilinan serat kulit kayu alami langsung dengan jemari tangan tanpa jarum',
    explanation: 'Noken dirajut oleh Mama-mama Papua menggunakan serat kayu ganemo/anggrek hutan secara teliti tanpa alat bantu jarum.'
  },
  {
    id: 4,
    question: 'Dua sistem laras tangga nada pentatonik utama dalam musik Karawitan dan Gamelan Jawa adalah?',
    options: [
      'Slendro (5 nada) dan Pelog (7 nada)',
      'Diatonis Mayor dan Minor',
      'Kromatik dan Blues',
      'Dorian dan Phrygian'
    ],
    answer: 'Slendro (5 nada) dan Pelog (7 nada)',
    explanation: 'Laras Slendro berkarakter gembira dan tegas, sedangkan Laras Pelog bernuansa hening, sakral, dan tenang.'
  },
  {
    id: 5,
    question: 'Arsitektur rumah adat Uma Kelada di Sumba Timur tidak memakai satu paku besi pun, mengapa?',
    options: [
      'Memakai sambungan pasak kayu bertingkat dan ikatan tali rotan lentur peredam gempa',
      'Karena dilekatkan dengan semen cor purba',
      'Karena digantung di dahan pohon beringin',
      'Karena menggunakan perekat getah pohon karet'
    ],
    answer: 'Memakai sambungan pasak kayu bertingkat dan ikatan tali rotan lentur peredam gempa',
    explanation: 'Prinsip arsitektur vernakular Nusantara mengutamakan kelenturan kinetik pasak kayu alami yang terbukti sangat tahan gempa.'
  }
];

interface Props {
  onClose?: () => void;
}

export default function KuisBudaya({ onClose }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; selected: string; correct: string; isCorrect: boolean }[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Acak dan ambil 10 pertanyaan
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    setSelectedQuestions(shuffled);
  }, []);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    const isCorrect = option === selectedQuestions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setAnswers([...answers, {
      question: selectedQuestions[currentQuestion].question,
      selected: option,
      correct: selectedQuestions[currentQuestion].answer,
      isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    setSelectedQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setIsAnswered(false);
  };

  if (selectedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showResult) {
    const wrongAnswers = answers.filter(a => !a.isCorrect);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </button>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <Trophy className="w-20 h-20 mx-auto text-yellow-300 mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Selamat!</h1>
              <p className="text-xl text-blue-100 mb-4">Anda telah menyelesaikan Kuis Budaya</p>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
                <p className="text-sm text-blue-100 mb-1">Skor Anda</p>
                <p className="text-5xl font-bold text-white">{score}/100</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{answers.filter(a => a.isCorrect).length}</p>
                  <p className="text-xs text-gray-600">Benar</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">{wrongAnswers.length}</p>
                  <p className="text-xs text-gray-600">Salah</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{score}%</p>
                  <p className="text-xs text-gray-600">Akurasi</p>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <RefreshCw className="w-5 h-5" />
                Main Lagi
              </button>
            </div>
          </div>

          {/* Wrong Answers Review */}
          {wrongAnswers.length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <X className="w-6 h-6 text-red-600" />
                Pembahasan Jawaban Salah
              </h2>
              <div className="space-y-4">
                {wrongAnswers.map((answer, index) => {
                  const questionData = selectedQuestions.find(q => q.question === answer.question);
                  return (
                    <div key={index} className="border border-red-200 rounded-xl p-4 bg-red-50/50">
                      <p className="font-semibold text-gray-900 mb-3">{answer.question}</p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <X className="w-4 h-4 text-red-600" />
                          <span className="text-red-700">Jawaban Anda: <strong>{answer.selected}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-700">Jawaban Benar: <strong>{answer.correct}</strong></span>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          <strong className="text-blue-700">Penjelasan:</strong> {questionData?.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const question = selectedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-gray-900">{score} Poin</span>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-full h-3 mb-6 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Number */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-600 mb-1">Pertanyaan</p>
          <p className="text-2xl font-bold text-gray-900">{currentQuestion + 1} / {selectedQuestions.length}</p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
              {question.question}
            </h2>
          </div>

          <div className="p-6 md:p-8 space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;
              const showCorrect = isAnswered && isCorrect;
              const showWrong = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 md:p-5 rounded-2xl font-semibold text-left transition-all duration-300 flex items-center justify-between group ${
                    showCorrect
                      ? 'bg-green-100 border-2 border-green-500 text-green-900'
                      : showWrong
                      ? 'bg-red-100 border-2 border-red-500 text-red-900'
                      : isSelected
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-900'
                      : 'bg-gray-50 border-2 border-gray-200 text-gray-900 hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg'
                  } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
                >
                  <span className="flex-1">{option}</span>
                  {showCorrect && (
                    <div className="bg-green-500 rounded-full p-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {showWrong && (
                    <div className="bg-red-500 rounded-full p-1">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {!isAnswered && !isSelected && (
                    <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className={`p-4 rounded-xl mb-4 ${
                selectedAnswer === question.answer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className="text-sm font-semibold text-gray-900 mb-2">💡 Penjelasan:</p>
                <p className="text-sm text-gray-700">{question.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                {currentQuestion + 1 === selectedQuestions.length ? 'Lihat Hasil' : 'Lanjut'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Brain, Check, X, Trophy, RefreshCw, ChevronRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';
import ModernLayout from '@/react-app/components/ModernLayout';

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
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled);
  }, []);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    const isCorrect = option === selectedQuestions[currentQuestion].answer;
    if (isCorrect) {
      setScore(prev => prev + 20);
    }
    
    setAnswers(prev => [...prev, {
      question: selectedQuestions[currentQuestion].question,
      selected: option,
      correct: selectedQuestions[currentQuestion].answer,
      isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
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
      <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
        <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-[#133384]" />
          <p className="mt-3 text-xs text-slate-500">Menyiapkan butir kuis budaya...</p>
        </div>
      </ModernLayout>
    );
  }

  if (showResult) {
    const wrongAnswers = answers.filter(a => !a.isCorrect);
    const correctCount = answers.filter(a => a.isCorrect).length;
    
    return (
      <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
        <div className="space-y-4">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
            <Link 
              to="/permainan"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Daftar Permainan</span>
            </Link>
            <span className="text-xs font-semibold text-slate-500">Hasil Sesi Kuis</span>
          </div>

          {/* Result Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-6 text-center border-b border-slate-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-[#133384] mb-3 border border-blue-100">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Kuis Selesai!</h1>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Evaluasi pemahaman seni kriya, filosofi tradisi, dan arsitektur nusantara Anda.
              </p>
              
              <div className="inline-block mt-4 px-6 py-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block">Total Skor</span>
                <span className="text-3xl font-extrabold text-[#133384]">{score}</span>
                <span className="text-xs text-slate-400 font-medium"> / 100</span>
              </div>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50/60 border-b border-slate-100">
              <div className="p-3.5 text-center">
                <p className="text-base font-bold text-emerald-600">{correctCount}</p>
                <p className="text-[11px] text-slate-500 font-medium">Benar</p>
              </div>
              <div className="p-3.5 text-center">
                <p className="text-base font-bold text-rose-600">{wrongAnswers.length}</p>
                <p className="text-[11px] text-slate-500 font-medium">Salah</p>
              </div>
              <div className="p-3.5 text-center">
                <p className="text-base font-bold text-[#133384]">{score}%</p>
                <p className="text-[11px] text-slate-500 font-medium">Akurasi</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 flex items-center justify-center gap-2">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#133384] hover:bg-[#0e245e] text-white text-xs font-semibold rounded-lg transition-all active:scale-[0.98] shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
              <Link
                to="/permainan"
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                Pilih Game Lain
              </Link>
            </div>
          </div>

          {/* Pembahasan Jawaban Salah */}
          {wrongAnswers.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                Pembahasan Soal yang Perlu Ditinjau
              </h2>
              <div className="space-y-3">
                {wrongAnswers.map((answer, index) => {
                  const qData = selectedQuestions.find(q => q.question === answer.question);
                  return (
                    <div key={index} className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 space-y-2">
                      <p className="text-xs font-semibold text-slate-900 leading-snug">{answer.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-rose-50/70 border border-rose-100 text-rose-800">
                          <span className="block text-[10px] font-semibold text-rose-500 uppercase">Pilihan Anda:</span>
                          <span className="font-medium">{answer.selected}</span>
                        </div>
                        <div className="p-2 rounded bg-emerald-50/70 border border-emerald-100 text-emerald-800">
                          <span className="block text-[10px] font-semibold text-emerald-600 uppercase">Jawaban Benar:</span>
                          <span className="font-medium">{answer.correct}</span>
                        </div>
                      </div>
                      {qData?.explanation && (
                        <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded border border-slate-150 leading-relaxed">
                          <strong className="text-slate-800 font-medium">Ulasan: </strong>
                          {qData.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ModernLayout>
    );
  }

  const question = selectedQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / selectedQuestions.length) * 100;

  return (
    <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
      <div className="space-y-4">
        {/* Game Navigation Header */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
          <Link 
            to="/permainan"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Permainan</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-medium">
              Soal {currentQuestion + 1} dari {selectedQuestions.length}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#133384] text-xs font-bold">
              <Brain className="w-3.5 h-3.5" />
              <span>{score} Poin</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Hairline */}
        <div className="w-full bg-slate-200/80 rounded-full h-1 overflow-hidden">
          <div 
            className="bg-[#133384] h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Question Text Surface */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/40">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider mb-2.5">
              Pertanyaan {currentQuestion + 1}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="p-5 space-y-2.5">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;
              const showCorrect = isAnswered && isCorrect;
              const showWrong = isAnswered && isSelected && !isCorrect;

              let buttonStyle = 'bg-white border-slate-200/90 text-slate-800 hover:border-[#133384]/40 hover:bg-slate-50/80';
              if (showCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
              } else if (showWrong) {
                buttonStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-medium';
              } else if (isSelected) {
                buttonStyle = 'bg-blue-50 border-[#133384] text-[#133384] font-medium';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-lg border text-left text-xs sm:text-sm transition-all duration-150 flex items-center justify-between gap-3 group ${buttonStyle} ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  <span className="flex-1 leading-relaxed">{option}</span>
                  
                  {showCorrect && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  )}
                  {showWrong && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  )}
                  {!isAnswered && !isSelected && (
                    <span className="text-slate-300 group-hover:text-slate-500 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Section */}
          {isAnswered && (
            <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30">
              <div className={`p-3.5 rounded-lg border mt-3 text-xs leading-relaxed ${
                selectedAnswer === question.answer
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                  : 'bg-blue-50/60 border-blue-200 text-slate-800'
              }`}>
                <p className="font-semibold mb-1 text-[11px] uppercase tracking-wider text-slate-700">
                  Ulasan Filosofi:
                </p>
                <p className="text-slate-600">{question.explanation}</p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#133384] hover:bg-[#0e245e] text-white text-xs font-semibold rounded-lg transition-all active:scale-[0.98] shadow-2xs"
                >
                  <span>{currentQuestion + 1 === selectedQuestions.length ? 'Lihat Hasil Akhir' : 'Lanjut Soal Berikutnya'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModernLayout>
  );
}

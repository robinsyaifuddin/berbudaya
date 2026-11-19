import { useState, useEffect } from 'react';
import { Trophy, RefreshCw, Lightbulb, Clock, ArrowLeft, Zap, Flame, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import ModernLayout from '@/react-app/components/ModernLayout';

interface PuzzleImage {
  id: number;
  title: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

const puzzleImages: PuzzleImage[] = [
  { 
    id: 1, 
    title: "Rumah Adat Tongkonan", 
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=600&fit=crop", 
    difficulty: "medium",
    description: "Arsitektur perahu khas Toraja dengan filosofi hubungan leluhur dan alam."
  },
  { 
    id: 2, 
    title: "Candi Borobudur", 
    image: "https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=600&h=600&fit=crop", 
    difficulty: "hard",
    description: "Mahakarya stupa batu andesit abad ke-8 warisan Dinasti Syailendra."
  },
  { 
    id: 3, 
    title: "Batik Indonesia", 
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop", 
    difficulty: "easy",
    description: "Pola canting malam klasik bernilai filosofis dan diakui warisan dunia UNESCO."
  },
  { 
    id: 4, 
    title: "Wayang Kulit", 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop", 
    difficulty: "medium",
    description: "Kesenian seni tatah dan bayangan kulit kerbau yang sarat hikmah kehidupan."
  },
  { 
    id: 5, 
    title: "Tari Tradisional", 
    image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&h=600&fit=crop", 
    difficulty: "easy",
    description: "Gerak harmonis penari nusantara yang mengekspresikan keluhuran budi pekerti."
  }
];

interface Props {
  onClose?: () => void;
}

export default function PuzzleBudaya({ onClose }: Props) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleImage | null>(null);
  const [gridSize, setGridSize] = useState(3);
  const [pieces, setPieces] = useState<number[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [moves, setMoves] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startGame = (puzzle: PuzzleImage, size: number) => {
    setSelectedPuzzle(puzzle);
    setGridSize(size);
    
    // Inisialisasi puzzle pieces
    const totalPieces = size * size;
    const shuffled = Array.from({ length: totalPieces }, (_, i) => i).sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    
    setGameState('playing');
    setIsRunning(true);
    setTimeElapsed(0);
    setMoves(0);
    setHintUsed(false);
  };

  const handlePieceClick = (index: number) => {
    const newPieces = [...pieces];
    const emptyIndex = newPieces.indexOf(gridSize * gridSize - 1);
    
    // Cek adjacent potongan
    const clickedRow = Math.floor(index / gridSize);
    const clickedCol = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;
    
    const isAdjacent = 
      (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) ||
      (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1);
    
    if (isAdjacent) {
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(prev => prev + 1);
      
      const isSolved = newPieces.every((piece, idx) => piece === idx);
      if (isSolved) {
        setIsRunning(false);
        setGameState('completed');
      }
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setHintUsed(true);
    setTimeout(() => {
      setShowHint(false);
    }, 3000);
  };

  const handleRestart = () => {
    setGameState('menu');
    setIsRunning(false);
    setTimeElapsed(0);
    setMoves(0);
    setShowHint(false);
  };

  // MENU SCREEN
  if (gameState === 'menu') {
    return (
      <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
        <div className="space-y-4">
          {/* Header Nav */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
            <Link 
              to="/permainan"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Daftar Permainan</span>
            </Link>
            <span className="text-xs font-semibold text-slate-500">Puzzle Budaya Nusantara</span>
          </div>

          {/* Level Grid Selector */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5">
            <div className="mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Langkah 1</span>
              <h2 className="text-sm font-bold text-slate-900">Pilih Tingkat Kesulitan Matriks</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setGridSize(3)}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  gridSize === 3
                    ? 'border-[#133384] bg-blue-50/60 text-[#133384]'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">3 × 3 Grid</span>
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500">9 Potongan • Santai</p>
              </button>

              <button
                onClick={() => setGridSize(4)}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  gridSize === 4
                    ? 'border-[#133384] bg-blue-50/60 text-[#133384]'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">4 × 4 Grid</span>
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <p className="text-[11px] text-slate-500">16 Potongan • Sedang</p>
              </button>

              <button
                onClick={() => setGridSize(5)}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  gridSize === 5
                    ? 'border-[#133384] bg-blue-50/60 text-[#133384]'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">5 × 5 Grid</span>
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <p className="text-[11px] text-slate-500">25 Potongan • Ahli</p>
              </button>
            </div>
          </div>

          {/* Puzzle Image Selection */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5">
            <div className="mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Langkah 2</span>
              <h2 className="text-sm font-bold text-slate-900">Pilih Objek Warisan Budaya</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {puzzleImages.map((puzzle) => (
                <div
                  key={puzzle.id}
                  onClick={() => startGame(puzzle, gridSize)}
                  className="group rounded-lg border border-slate-200/90 overflow-hidden hover:border-[#133384]/60 transition-all cursor-pointer bg-white flex flex-col justify-between"
                >
                  <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                    <img
                      src={puzzle.image}
                      alt={puzzle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs ${
                        puzzle.difficulty === 'easy' ? 'bg-emerald-500/90 text-white' :
                        puzzle.difficulty === 'medium' ? 'bg-amber-500/90 text-white' :
                        'bg-rose-500/90 text-white'
                      }`}>
                        {puzzle.difficulty === 'easy' ? 'Mudah' : puzzle.difficulty === 'medium' ? 'Sedang' : 'Tantangan'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#133384] transition-colors">
                      {puzzle.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {puzzle.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-[#133384]">
                      <span>Susun Puzzle Sekarang</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModernLayout>
    );
  }

  // COMPLETED SCREEN
  if (gameState === 'completed' && selectedPuzzle) {
    return (
      <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Pilih Gambar Lain</span>
            </button>
            <span className="text-xs font-semibold text-slate-500">Puzzle Selesai Disusun</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-6 text-center border-b border-slate-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 mb-3 border border-emerald-100">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Rekonstruksi Berhasil!</h1>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Anda berhasil merangkai seluruh kepingan {selectedPuzzle.title} dengan presisi.
              </p>

              {/* Solved Image Preview */}
              <div className="max-w-xs mx-auto mt-4 rounded-lg overflow-hidden border border-slate-200 shadow-2xs">
                <img
                  src={selectedPuzzle.image}
                  alt={selectedPuzzle.title}
                  className="w-full h-44 object-cover"
                />
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50/60 border-b border-slate-100">
              <div className="p-3 text-center">
                <p className="text-base font-bold text-[#133384]">{formatTime(timeElapsed)}</p>
                <p className="text-[11px] text-slate-500 font-medium">Waktu</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-slate-800">{moves}</p>
                <p className="text-[11px] text-slate-500 font-medium">Langkah Geser</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-base font-bold text-emerald-600">{gridSize} × {gridSize}</p>
                <p className="text-[11px] text-slate-500 font-medium">Matriks</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-2">
              <button
                onClick={() => startGame(selectedPuzzle, gridSize)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#133384] hover:bg-[#0e245e] text-white text-xs font-semibold rounded-lg transition-all active:scale-[0.98] shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Susun Ulang</span>
              </button>
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                Pilih Objek Lain
              </button>
            </div>
          </div>
        </div>
      </ModernLayout>
    );
  }

  // PLAYING SCREEN
  if (!selectedPuzzle) return null;

  return (
    <ModernLayout showLeftSidebar={true} showRightSidebar={true}>
      <div className="space-y-4">
        {/* Game Stats Bar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs">
          <button 
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#133384] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ganti Puzzle</span>
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#133384] text-xs font-semibold">
              <span>{moves} Langkah</span>
            </div>
          </div>
        </div>

        {/* Puzzle Board Container */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{selectedPuzzle.title}</h2>
              <p className="text-[11px] text-slate-500">Klik kepingan di dekat celah kosong untuk menukar posisi.</p>
            </div>
            
            {/* Hint Button */}
            <button
              onClick={handleHint}
              disabled={showHint}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                hintUsed 
                  ? 'bg-slate-100 text-slate-600 border border-slate-200' 
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showHint ? 'Menampilkan (3s)...' : hintUsed ? 'Petunjuk Terpakai' : 'Lihat Bantuan'}</span>
            </button>
          </div>

          {/* Interactive Board */}
          <div className="max-w-[420px] mx-auto">
            <div 
              className="grid gap-1 bg-slate-200/70 p-1.5 rounded-xl border border-slate-200"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                aspectRatio: '1 / 1'
              }}
            >
              {pieces.map((piece, index) => {
                const row = Math.floor(piece / gridSize);
                const col = piece % gridSize;
                const isEmpty = piece === gridSize * gridSize - 1;

                return (
                  <button
                    key={index}
                    onClick={() => handlePieceClick(index)}
                    className={`aspect-square rounded-md transition-all duration-150 relative overflow-hidden ${
                      isEmpty 
                        ? 'bg-slate-100/90 border border-dashed border-slate-300 cursor-default' 
                        : 'bg-white border border-black/10 hover:brightness-105 active:scale-[0.98] cursor-pointer shadow-2xs'
                    }`}
                    style={{
                      backgroundImage: isEmpty ? 'none' : `url(${selectedPuzzle.image})`,
                      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                      backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Reference Preview Drawer / Popup under board */}
          {showHint && (
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-amber-200 flex items-center gap-3">
              <img 
                src={selectedPuzzle.image} 
                alt="Referensi Asli" 
                className="w-16 h-16 rounded object-cover border border-slate-200"
              />
              <div className="text-xs">
                <p className="font-semibold text-slate-800">Pratinjau Gambar Asli</p>
                <p className="text-slate-500 text-[11px]">Bantuan visual aktif selama 3 detik untuk memandu susunan Anda.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModernLayout>
  );
}

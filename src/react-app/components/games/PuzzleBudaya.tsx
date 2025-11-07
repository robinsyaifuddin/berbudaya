import { useState, useEffect } from 'react';
import { Puzzle, Trophy, RefreshCw, Lightbulb, Clock, ArrowLeft } from 'lucide-react';

interface PuzzleImage {
  id: number;
  title: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const puzzleImages: PuzzleImage[] = [
  { id: 1, title: "Rumah Adat Tongkonan", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=600&fit=crop", difficulty: "medium" },
  { id: 2, title: "Candi Borobudur", image: "https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=600&h=600&fit=crop", difficulty: "hard" },
  { id: 3, title: "Batik Indonesia", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop", difficulty: "easy" },
  { id: 4, title: "Wayang Kulit", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop", difficulty: "medium" },
  { id: 5, title: "Tari Tradisional", image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&h=600&fit=crop", difficulty: "easy" }
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
    
    // Check if clicked piece is adjacent to empty space
    const clickedRow = Math.floor(index / gridSize);
    const clickedCol = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;
    
    const isAdjacent = 
      (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) ||
      (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1);
    
    if (isAdjacent) {
      // Swap pieces
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(prev => prev + 1);
      
      // Check if puzzle is solved
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
    setTimeout(() => setShowHint(false), 3000);
  };

  const handleRestart = () => {
    setGameState('menu');
    setSelectedPuzzle(null);
    setIsRunning(false);
    setTimeElapsed(0);
    setMoves(0);
    setHintUsed(false);
  };

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-full p-4 shadow-xl mb-4">
              <Puzzle className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Puzzle Budaya</h1>
            <p className="text-lg text-gray-600">Susun potongan gambar budaya Indonesia</p>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pilih Tingkat Kesulitan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setGridSize(3)}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  gridSize === 3
                    ? 'bg-green-50 border-green-500'
                    : 'bg-gray-50 border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-4xl mb-2">🌱</div>
                <h3 className="font-bold text-gray-900 mb-1">Mudah</h3>
                <p className="text-sm text-gray-600">3 × 3 Grid</p>
                <p className="text-xs text-gray-500 mt-2">9 Potongan</p>
              </button>
              <button
                onClick={() => setGridSize(4)}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  gridSize === 4
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-4xl mb-2">🌟</div>
                <h3 className="font-bold text-gray-900 mb-1">Sedang</h3>
                <p className="text-sm text-gray-600">4 × 4 Grid</p>
                <p className="text-xs text-gray-500 mt-2">16 Potongan</p>
              </button>
              <button
                onClick={() => setGridSize(5)}
                className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  gridSize === 5
                    ? 'bg-red-50 border-red-500'
                    : 'bg-gray-50 border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="font-bold text-gray-900 mb-1">Sulit</h3>
                <p className="text-sm text-gray-600">5 × 5 Grid</p>
                <p className="text-xs text-gray-500 mt-2">25 Potongan</p>
              </button>
            </div>
          </div>

          {/* Image Selection */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pilih Gambar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {puzzleImages.map((puzzle) => (
                <button
                  key={puzzle.id}
                  onClick={() => startGame(puzzle, gridSize)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  <img
                    src={puzzle.image}
                    alt={puzzle.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-left">
                      <h3 className="font-bold text-white mb-1">{puzzle.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          puzzle.difficulty === 'easy' ? 'bg-green-500' :
                          puzzle.difficulty === 'medium' ? 'bg-blue-500' :
                          'bg-red-500'
                        } text-white`}>
                          {puzzle.difficulty === 'easy' ? 'Mudah' :
                           puzzle.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completed Screen
  if (gameState === 'completed' && selectedPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
              <Trophy className="w-20 h-20 mx-auto text-yellow-300 mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Selamat!</h1>
              <p className="text-xl text-purple-100">Kamu berhasil menyusun</p>
              <p className="text-2xl font-bold text-white mt-2">{selectedPuzzle.title}</p>
            </div>

            <div className="p-8">
              {/* Completed Image */}
              <img
                src={selectedPuzzle.image}
                alt={selectedPuzzle.title}
                className="w-full rounded-2xl shadow-lg mb-6"
              />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</p>
                  <p className="text-xs text-gray-600">Waktu</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Puzzle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{moves}</p>
                  <p className="text-xs text-gray-600">Gerakan</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <Trophy className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-pink-600">{gridSize}×{gridSize}</p>
                  <p className="text-xs text-gray-600">Level</p>
                </div>
              </div>

              {!hintUsed && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-yellow-800 text-center">
                    🎉 <strong>Bonus!</strong> Kamu menyelesaikan tanpa hint!
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
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
    );
  }

  // Playing Screen
  if (!selectedPuzzle) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleRestart}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Menu</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-900">{formatTime(timeElapsed)}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold text-gray-900">{moves} gerakan</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{selectedPuzzle.title}</h2>
          <p className="text-gray-600">Susun puzzle dengan benar</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Puzzle Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <div 
                className="grid gap-1 mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: '500px'
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
                      className={`aspect-square border-2 rounded-lg transition-all ${
                        isEmpty 
                          ? 'bg-gray-100 border-gray-300 cursor-default' 
                          : 'bg-white border-purple-200 hover:border-purple-400 hover:scale-105 cursor-pointer shadow-sm'
                      }`}
                      style={{
                        backgroundImage: isEmpty ? 'none' : `url(${selectedPuzzle.image})`,
                        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                        backgroundPosition: `${(col * 100)}% ${(row * 100)}%`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Hint Button */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Bantuan</h3>
              <button
                onClick={handleHint}
                disabled={showHint}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02]"
              >
                <Lightbulb className="w-5 h-5" />
                {hintUsed ? 'Hint Terpakai' : 'Lihat Hint'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Lihat gambar lengkap selama 3 detik
              </p>
            </div>

            {/* Reference Image */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Gambar Asli</h3>
              <div className={`relative rounded-xl overflow-hidden ${showHint ? 'ring-4 ring-yellow-400' : ''}`}>
                <img
                  src={selectedPuzzle.image}
                  alt="Reference"
                  className={`w-full ${showHint ? '' : 'blur-lg opacity-30'} transition-all duration-300`}
                />
                {!showHint && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm font-bold text-gray-600">Gunakan Hint</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

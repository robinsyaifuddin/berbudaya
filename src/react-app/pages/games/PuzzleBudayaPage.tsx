import { useNavigate } from 'react-router';
import PuzzleBudaya from '@/react-app/components/games/PuzzleBudaya';

export default function PuzzleBudayaPage() {
  const navigate = useNavigate();

  return <PuzzleBudaya onClose={() => navigate('/beranda')} />;
}

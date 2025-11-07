import { useNavigate } from 'react-router';
import TebakDaerah from '@/react-app/components/games/TebakDaerah';

export default function TebakDaerahPage() {
  const navigate = useNavigate();

  return <TebakDaerah onClose={() => navigate('/beranda')} />;
}

import { useNavigate } from 'react-router';
import KuisBudaya from '@/react-app/components/games/KuisBudaya';

export default function KuisBudayaPage() {
  const navigate = useNavigate();

  return <KuisBudaya onClose={() => navigate('/beranda')} />;
}

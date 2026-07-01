import { useNavigate } from 'react-router-dom';
import LeaderDashboard from '../components/LeaderDashboard';

export default function HRConsolePage() {
  const navigate = useNavigate();
  return <LeaderDashboard isOpen onClose={() => navigate('/')} />;
}

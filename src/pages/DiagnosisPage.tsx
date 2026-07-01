import { useNavigate } from 'react-router-dom';
import OnboardingWizard from '../components/OnboardingWizard';

export default function DiagnosisPage() {
  const navigate = useNavigate();
  return (
    <OnboardingWizard
      isOpen
      onComplete={() => navigate('/')}
    />
  );
}

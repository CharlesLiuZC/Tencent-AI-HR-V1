import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import AssessPage from './pages/AssessPage';
import DiagnosisPage from './pages/DiagnosisPage';
import HRConsolePage from './pages/HRConsolePage';
import OnboardingWizard from './components/OnboardingWizard';
import PenguinCompanion from './components/PenguinCompanion';
import { Component, type ErrorInfo, type ReactNode, useState } from 'react';

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application render failed', error, info);
  }

  private resetLocalData = () => {
    ['gd-role', 'gd-progress', 'gd-profile', 'gd-avatar'].forEach(key => localStorage.removeItem(key));
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background: '#f3f7fb',
        color: '#172033',
      }}>
        <section style={{ maxWidth: '460px', padding: '32px', background: 'white', border: '1px solid #dbe5ee', borderRadius: '8px' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: '22px' }}>成长副本需要恢复本地数据</h1>
          <p style={{ margin: '0 0 20px', color: '#64748b', lineHeight: 1.7 }}>
            检测到旧版本缓存与当前数据结构不兼容。恢复后可以重新进入应用，学习内容不会影响线上版本。
          </p>
          <button
            onClick={this.resetLocalData}
            style={{ padding: '10px 16px', border: 0, borderRadius: '6px', color: 'white', background: '#0284c7', cursor: 'pointer', fontWeight: 700 }}
          >
            恢复并重新进入
          </button>
        </section>
      </main>
    );
  }
}

function AppContent() {
  const { userProfile } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(!userProfile?.isOnboarded);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      <OnboardingWizard
        isOpen={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assess/:phase" element={<AssessPage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/hr-console" element={<HRConsolePage />} />
        </Routes>
      </main>

      {/* 企鹅陪伴Agent - 始终可见 */}
      <PenguinCompanion />

      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: '#9ca3af',
        fontSize: '12px',
      }}>
        <p style={{ margin: 0 }}>
          成长副本 — AI Native 组织学习路径设计器 | Built with React + TypeScript + Vite
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

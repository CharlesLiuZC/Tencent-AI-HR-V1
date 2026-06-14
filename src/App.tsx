import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import AssessPage from './pages/AssessPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <div style={{
          minHeight: '100vh',
          background: '#f8fafc',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/assess/:phase" element={<AssessPage />} />
            </Routes>
          </main>
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
      </AppProvider>
    </BrowserRouter>
  );
}

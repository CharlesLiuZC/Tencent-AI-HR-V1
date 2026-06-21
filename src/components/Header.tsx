import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CAPABILITIES } from '../data/learningPaths';
import { getLevel, getLevelProgress, getNextLevel } from '../data/gamification';
import PenguinMentor from './PenguinMentor';
import TencentkenShop from './TencentkenShop';

export default function Header() {
  const { role, setRole, progress } = useApp();
  const location = useLocation();
  const [showMentor, setShowMentor] = useState(false);
  const [showShop, setShowShop] = useState(false);

  // Calculate XP and Tencentken
  const xp = progress.completedUnits.length * 100 +
    (progress.assessmentScores.day30 !== null ? 200 : 0) +
    (progress.assessmentScores.day60 !== null ? 300 : 0) +
    (progress.assessmentScores.day90 !== null ? 500 : 0);
  const level = getLevel(xp);
  const levelProgress = getLevelProgress(xp);
  const nextLevel = getNextLevel(xp);
  const tencentken = progress.completedUnits.length * 10 +
    (progress.assessmentScores.day30 !== null ? 50 : 0) +
    (progress.assessmentScores.day60 !== null ? 80 : 0) +
    (progress.assessmentScores.day90 !== null ? 120 : 0);

  const navItems = [
    { path: '/', label: '学习路径', icon: '🗺️' },
    { path: '/dashboard', label: '进度仪表盘', icon: '📊' },
    { path: '/assess/day30', label: 'AI 对战', icon: '⚔️' },
  ];

  return (
    <>
      <header style={{
        background: 'linear-gradient(135deg, #12b7f5 0%, #0099e5 50%, #0077b6 100%)',
        color: 'white',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        {/* Top bar */}
        <div style={{
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
            }}>
              🐧
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, letterSpacing: '1px' }}>
                腾讯 · 成长副本
              </h1>
              <p style={{ margin: 0, fontSize: '10px', opacity: 0.7, letterSpacing: '2px' }}>
                TENCENT AI NATIVE LEARNING PATH
              </p>
            </div>
          </Link>

          {/* Right side: Level + Tencentken + Capability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Level badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px 12px',
            }}>
              <span style={{ fontSize: '18px' }}>{level.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 600 }}>Lv.{level.level} {level.title}</p>
                <div style={{
                  width: '80px', height: '4px', borderRadius: '2px',
                  background: 'rgba(255,255,255,0.2)', marginTop: '2px',
                }}>
                  <div style={{
                    height: '100%', width: `${levelProgress}%`,
                    background: 'white', borderRadius: '2px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            </div>

            {/* Tencentken */}
            <button
              onClick={() => setShowShop(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.12)', borderRadius: '12px',
                padding: '6px 12px', border: 'none', cursor: 'pointer', color: 'white',
              }}
            >
              <span style={{ fontSize: '16px' }}>🪙</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{tencentken} TK</span>
            </button>

            {/* Penguin mentor button */}
            <button
              onClick={() => setShowMentor(true)}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'white', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              title="企鹅导师"
            >
              🐧
            </button>
          </div>
        </div>

        {/* Capability selector + Nav */}
        <div style={{
          padding: '8px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Capability Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>角色：</span>
            {Object.values(CAPABILITIES).map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                style={{
                  background: role === r.key ? 'rgba(255,255,255,0.25)' : 'transparent',
                  color: 'white',
                  border: role === r.key ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid transparent',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: role === r.key ? 600 : 400,
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                <span>{r.icon}</span>
                <span>{r.title}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '0' }}>
            {navItems.map(item => {
              const isActive = location.pathname === item.path ||
                (item.path === '/assess/day30' && location.pathname.startsWith('/assess'));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    borderBottom: isActive ? '2px solid white' : '2px solid transparent',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Penguin Mentor Chat */}
      <PenguinMentor isOpen={showMentor} onClose={() => setShowMentor(false)} />

      {/* Tencentken Shop */}
      <TencentkenShop isOpen={showShop} onClose={() => setShowShop(false)} />
    </>
  );
}

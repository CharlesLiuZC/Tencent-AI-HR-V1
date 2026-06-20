import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PHASES, CAPABILITIES, getLearningPath } from '../data/learningPaths';
import PathTimeline from '../components/PathTimeline';
import ToolRecom from '../components/ToolRecom';
import InnovationPath from '../components/InnovationPath';
import PenguinGame from '../components/PenguinGame';
import { Phase } from '../types';

export default function Home() {
  const { role, progress } = useApp();
  const [activePhase, setActivePhase] = useState<Phase | undefined>(undefined);
  const [gamePhase, setGamePhase] = useState<Phase | null>(null);
  const roleInfo = CAPABILITIES[role] || CAPABILITIES['ai-image'];

  const totalUnits = getLearningPath(role).length;
  const completedCount = getLearningPath(role).filter(u => progress.completedUnits.includes(u.id)).length;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #12b7f5 0%, #0099e5 50%, #0077b6 100%)',
        borderRadius: '24px',
        padding: '40px',
        color: 'white',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(167,139,250,0.15)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '30%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(99,102,241,0.1)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px',
            }}>
              🐧
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, letterSpacing: '2px' }}>
                腾讯 · 成长副本
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.7, letterSpacing: '3px' }}>
                TENCENT AI NATIVE LEARNING PATH
              </p>
            </div>
          </div>

          <p style={{ margin: '0 0 24px', fontSize: '15px', lineHeight: '1.6', opacity: 0.9, maxWidth: '600px' }}>
            欢迎加入腾讯！这是你的成长副本 — 和 AI 组队，90 天完成从新手到 AI 先锋的蜕变。每一次学习都赚取 Tencentken，每一次挑战都是升级。
          </p>

          {/* Role badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '8px 16px',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '20px' }}>{roleInfo.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>当前角色</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{roleInfo.title} - {roleInfo.description}</p>
            </div>
          </div>

          {/* Stats + Game Button */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <StatPill label="总学习单元" value={`${totalUnits}`} />
            <StatPill label="已完成" value={`${completedCount}`} />
            <StatPill label="总学习时长" value={`${getLearningPath(role).reduce((s, u) => s + u.duration, 0)} 分钟`} />
            <StatPill label="当前阶段" value={progress.currentPhase === 'day30' ? '新手村' : progress.currentPhase === 'day60' ? '副本挑战' : 'Boss战'} />
            <button
              onClick={() => setGamePhase(progress.currentPhase)}
              style={{
                padding: '10px 20px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.4)',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '6px',
                animation: 'pulse 2s infinite',
              }}
            >
              🎮 开始冒险
            </button>
          </div>
        </div>
      </div>

      {/* Innovation Path - Personal Journey */}
      <InnovationPath />

      {/* Phase Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
      }}>
        <PhaseTab
          label="全部阶段"
          icon="🗺️"
          isActive={activePhase === undefined}
          color="#6366f1"
          onClick={() => setActivePhase(undefined)}
        />
        {Object.values(PHASES).map(phase => (
          <PhaseTab
            key={phase.key}
            label={`${phase.icon} ${phase.title} ${phase.subtitle}`}
            icon=""
            isActive={activePhase === phase.key}
            color={phase.color}
            onClick={() => setActivePhase(phase.key)}
          />
        ))}
      </div>

      {/* AI Tools Recommendation */}
      {activePhase && (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
            🛠️ {PHASES[activePhase].title} 推荐 AI 工具
          </h3>
          <ToolRecom phase={activePhase} role={role} />
        </div>
      )}

      {/* Learning Path Timeline */}
      <PathTimeline role={role} activePhase={activePhase} />

      {/* Penguin Game */}
      {gamePhase && (
        <PenguinGame phase={gamePhase} onClose={() => setGamePhase(null)} />
      )}

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
        }
      `}</style>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.12)',
      borderRadius: '10px',
      padding: '8px 14px',
    }}>
      <p style={{ margin: 0, fontSize: '10px', opacity: 0.7 }}>{label}</p>
      <p style={{ margin: '2px 0 0', fontSize: '14px', fontWeight: 600 }}>{value}</p>
    </div>
  );
}

function PhaseTab({ label, isActive, color, onClick }: {
  label: string; icon: string; isActive: boolean; color: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: '10px',
        border: isActive ? `2px solid ${color}` : '2px solid #e5e7eb',
        background: isActive ? `${color}12` : 'white',
        color: isActive ? color : '#6b7280',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  );
}

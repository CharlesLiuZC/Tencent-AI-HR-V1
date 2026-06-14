import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phase } from '../types';
import Assessment from '../components/Assessment';
import AIBattle from '../components/AIBattle';
import { PHASES } from '../data/learningPaths';

export default function AssessPage() {
  const { phase } = useParams<{ phase: string }>();
  const validPhase = (phase as Phase) || 'day30';
  const [mode, setMode] = useState<'select' | 'battle' | 'quiz'>('select');

  return (
    <div style={{ padding: '24px' }}>
      {/* Phase selector */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 24px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
      }}>
        {(['day30', 'day60', 'day90'] as Phase[]).map(p => (
          <Link
            key={p}
            to={`/assess/${p}`}
            style={{
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              border: validPhase === p ? `2px solid ${PHASES[p].color}` : '2px solid #e5e7eb',
              background: validPhase === p ? `${PHASES[p].color}12` : 'white',
              color: validPhase === p ? PHASES[p].color : '#6b7280',
              fontSize: '13px',
              fontWeight: validPhase === p ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            {PHASES[p].icon} {PHASES[p].subtitle}
          </Link>
        ))}
      </div>

      {/* Mode selection */}
      {mode === 'select' && (
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px' }}>
            {PHASES[validPhase].icon} 选择评估方式
          </h2>

          {/* AI Battle option */}
          <button
            onClick={() => setMode('battle')}
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #dc2626',
              background: 'linear-gradient(135deg, #fef2f2, #fff1f2)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '32px' }}>⚔️</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#dc2626' }}>
                  AI 对战模式
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#ef4444' }}>
                  推荐 · 像打游戏一样完成评估
                </p>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#7f1d1d', lineHeight: '1.5' }}>
              和 AI 评审官进行 4 回合对话 PK，它提问你回答，即时反馈，像打 Boss 一样刺激！
            </p>
          </button>

          {/* Traditional quiz option */}
          <button
            onClick={() => setMode('quiz')}
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '32px' }}>📝</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#374151' }}>
                  传统答题模式
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#9ca3af' }}>
                  选择题，快速测试
                </p>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
              5 道选择题，自动评分，适合快速检验知识掌握程度。
            </p>
          </button>
        </div>
      )}

      {/* AI Battle */}
      {mode === 'battle' && (
        <AIBattle phase={validPhase} onClose={() => setMode('select')} />
      )}

      {/* Traditional Quiz */}
      {mode === 'quiz' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <button
              onClick={() => setMode('select')}
              style={{
                padding: '6px 14px', borderRadius: '8px',
                border: '1px solid #e5e7eb', background: 'white',
                cursor: 'pointer', fontSize: '12px', color: '#6b7280',
              }}
            >
              ← 返回选择
            </button>
          </div>
          <Assessment phase={validPhase} />
        </div>
      )}
    </div>
  );
}

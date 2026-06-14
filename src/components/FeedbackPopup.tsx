import { useState, useEffect } from 'react';

interface Props {
  show: boolean;
  xpGained: number;
  tencentkenGained: number;
  message: string;
  onClose: () => void;
}

export default function FeedbackPopup({ show, xpGained, tencentkenGained, message, onClose }: Props) {
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');

  useEffect(() => {
    if (show) {
      setPhase('enter');
      setTimeout(() => setPhase('show'), 50);
      setTimeout(() => {
        setPhase('exit');
        setTimeout(onClose, 300);
      }, 2500);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      pointerEvents: 'none',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        borderRadius: '24px',
        padding: '32px 48px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        transform: phase === 'enter' ? 'scale(0.5)' : phase === 'exit' ? 'scale(1.2)' : 'scale(1)',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Celebration emoji */}
        <div style={{
          fontSize: '48px',
          marginBottom: '12px',
          animation: phase === 'show' ? 'bounce 0.5s ease' : 'none',
        }}>
          🎉
        </div>

        <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 700 }}>
          任务完成！
        </h2>

        <p style={{ margin: '0 0 16px', fontSize: '14px', opacity: 0.8 }}>
          {message}
        </p>

        {/* Rewards */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '12px 20px',
          }}>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#a78bfa' }}>
              +{xpGained}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.7 }}>经验值</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '12px 20px',
          }}>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#12b7f5' }}>
              +{tencentkenGained} 🪙
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.7 }}>Tencentken</p>
          </div>
        </div>
      </div>

      {/* Confetti particles */}
      {phase === 'show' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: '-10px',
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                background: ['#12b7f5', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
                animation: `confettiFall ${1 + Math.random() * 2}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

import { useState } from 'react';
import { TENCENTKEN_REWARDS, getRarityColor } from '../data/gamification';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TencentkenShop({ isOpen, onClose }: Props) {
  const { progress } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [redeemed, setRedeemed] = useState<string[]>([]);

  // Calculate total Tencentken (from XP)
  const totalTk = progress.completedUnits.length * 10 +
    (progress.assessmentScores.day30 !== null ? 50 : 0) +
    (progress.assessmentScores.day60 !== null ? 80 : 0) +
    (progress.assessmentScores.day90 !== null ? 120 : 0);

  const categories = [
    { key: 'all', label: '全部', icon: '🏪' },
    { key: 'token', label: 'Token', icon: '🪙' },
    { key: 'snack', label: '零食', icon: '🍪' },
    { key: 'gift', label: '周边', icon: '🎁' },
    { key: 'privilege', label: '特权', icon: '⭐' },
  ];

  const filteredRewards = selectedCategory === 'all'
    ? TENCENTKEN_REWARDS
    : TENCENTKEN_REWARDS.filter(r => r.category === selectedCategory);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        width: '500px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #12b7f5 0%, #0099e5 100%)',
          padding: '24px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>🐧 腾讯币商城</h2>
            <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.8 }}>
              用学习赚取的 Tencentken 兑换奖励
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>🪙 {totalTk}</p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>我的 Tencentken</p>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '12px 16px',
          borderBottom: '1px solid #e5e7eb',
          overflowX: 'auto',
        }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: selectedCategory === cat.key ? '2px solid #12b7f5' : '2px solid #e5e7eb',
                background: selectedCategory === cat.key ? '#f0f9ff' : 'white',
                color: selectedCategory === cat.key ? '#12b7f5' : '#6b7280',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: selectedCategory === cat.key ? 600 : 400,
                whiteSpace: 'nowrap',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Rewards grid */}
        <div style={{
          padding: '16px',
          maxHeight: '400px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {filteredRewards.map(reward => {
            const canAfford = totalTk >= reward.cost;
            const isRedeemed = redeemed.includes(reward.id);
            return (
              <div key={reward.id} style={{
                borderRadius: '16px',
                padding: '16px',
                border: isRedeemed ? '2px solid #22c55e' : canAfford ? '2px solid #12b7f5' : '2px solid #e5e7eb',
                background: isRedeemed ? '#f0fdf4' : 'white',
                opacity: isRedeemed ? 0.7 : 1,
                transition: 'all 0.2s',
              }}>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '36px' }}>{reward.icon}</span>
                </div>
                <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
                  {reward.name}
                </h4>
                <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#6b7280', textAlign: 'center' }}>
                  {reward.description}
                </p>
                <button
                  onClick={() => {
                    if (canAfford && !isRedeemed) {
                      setRedeemed(prev => [...prev, reward.id]);
                    }
                  }}
                  disabled={!canAfford || isRedeemed}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isRedeemed ? '#22c55e' : canAfford ? 'linear-gradient(135deg, #12b7f5, #0099e5)' : '#e5e7eb',
                    color: isRedeemed || canAfford ? 'white' : '#9ca3af',
                    cursor: canAfford && !isRedeemed ? 'pointer' : 'not-allowed',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {isRedeemed ? '✅ 已兑换' : `🪙 ${reward.cost} TK`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Close */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151',
            }}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

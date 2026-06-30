import { useState } from 'react';
import {
  TENCENTKEN_REWARDS,
  TencentkenReward,
  getEarnedTencentken,
  getRarityColor,
  getTencentkenBalance,
} from '../data/gamification';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { key: 'all', label: '全部奖励', icon: '🏪' },
  { key: 'token', label: '算力补给', icon: '⚡' },
  { key: 'snack', label: '能量补给', icon: '☕' },
  { key: 'gift', label: '限定周边', icon: '🎁' },
  { key: 'privilege', label: '成长特权', icon: '⭐' },
];

const RARITY_LABELS: Record<TencentkenReward['rarity'], string> = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
};

export default function TencentkenShop({ isOpen, onClose }: Props) {
  const { progress, redeemReward } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pendingReward, setPendingReward] = useState<TencentkenReward | null>(null);
  const [successReward, setSuccessReward] = useState<TencentkenReward | null>(null);

  const earned = getEarnedTencentken(progress);
  const balance = getTencentkenBalance(progress);
  const spent = progress.spentTencentken || 0;
  const redeemed = progress.redeemedRewards || [];
  const filteredRewards = selectedCategory === 'all'
    ? TENCENTKEN_REWARDS
    : TENCENTKEN_REWARDS.filter(reward => reward.category === selectedCategory);

  if (!isOpen) return null;

  const closeShop = () => {
    setPendingReward(null);
    setSuccessReward(null);
    onClose();
  };

  const confirmRedemption = () => {
    if (!pendingReward) return;
    if (redeemReward(pendingReward.id, pendingReward.cost)) {
      setSuccessReward(pendingReward);
      setPendingReward(null);
    }
  };

  return (
    <div className="tk-shop-backdrop" role="dialog" aria-modal="true" aria-label="Tencentken 商城">
      <div className="tk-shop-shell">
        <header className="tk-shop-header">
          <div className="tk-shop-brand">
            <div className="tk-shop-logo">🪙</div>
            <div>
              <p className="tk-shop-eyebrow">TENCENTKEN REWARD STATION</p>
              <h2>Tencentken 补给站</h2>
              <p>把每一次学习胜利，兑换成真实奖励。</p>
            </div>
          </div>
          <button className="tk-icon-button" onClick={closeShop} aria-label="关闭商城">×</button>
        </header>

        <section className="tk-wallet">
          <div>
            <span>可用余额</span>
            <strong><i>TK</i>{balance}</strong>
          </div>
          <div className="tk-wallet-meter">
            <div>
              <span>累计获得</span>
              <b>{earned} TK</b>
            </div>
            <div>
              <span>已兑换</span>
              <b>{spent} TK</b>
            </div>
            <div>
              <span>收藏进度</span>
              <b>{redeemed.length}/{TENCENTKEN_REWARDS.length}</b>
            </div>
          </div>
        </section>

        <nav className="tk-category-tabs" aria-label="奖励分类">
          {CATEGORIES.map(category => (
            <button
              key={category.key}
              className={selectedCategory === category.key ? 'is-active' : ''}
              onClick={() => setSelectedCategory(category.key)}
            >
              <span>{category.icon}</span>{category.label}
            </button>
          ))}
        </nav>

        <main className="tk-reward-grid">
          {filteredRewards.map(reward => {
            const isRedeemed = redeemed.includes(reward.id);
            const canAfford = balance >= reward.cost;
            const rarityColor = getRarityColor(reward.rarity);
            return (
              <article
                key={reward.id}
                className={`tk-reward-card ${isRedeemed ? 'is-redeemed' : ''}`}
                style={{ '--rarity-color': rarityColor } as React.CSSProperties}
              >
                <div className="tk-reward-topline">
                  <span className="tk-rarity">{RARITY_LABELS[reward.rarity]}</span>
                  <span className="tk-stock">库存 {Math.max(0, reward.stock - (isRedeemed ? 1 : 0))}</span>
                </div>
                <div className="tk-reward-visual">
                  <span>{reward.icon}</span>
                  {reward.rarity === 'legendary' && <em>LEGENDARY</em>}
                </div>
                <div className="tk-reward-copy">
                  <small>{reward.badge}</small>
                  <h3>{reward.name}</h3>
                  <p>{reward.description}</p>
                </div>
                <button
                  className="tk-redeem-button"
                  disabled={isRedeemed || !canAfford}
                  onClick={() => setPendingReward(reward)}
                >
                  {isRedeemed ? (
                    <>✓ 已收入背包</>
                  ) : canAfford ? (
                    <><span>🪙</span> {reward.cost} TK · 立即兑换</>
                  ) : (
                    <>还差 {reward.cost - balance} TK</>
                  )}
                </button>
              </article>
            );
          })}
        </main>
      </div>

      {pendingReward && (
        <div className="tk-confirm-layer">
          <div className="tk-confirm-card">
            <button className="tk-icon-button tk-confirm-close" onClick={() => setPendingReward(null)} aria-label="取消兑换">×</button>
            <div className="tk-confirm-icon">{pendingReward.icon}</div>
            <p className="tk-shop-eyebrow">REDEMPTION CHECK</p>
            <h3>确认兑换「{pendingReward.name}」？</h3>
            <p>将从你的账户扣除 <strong>{pendingReward.cost} TK</strong>，兑换后余额为 <strong>{balance - pendingReward.cost} TK</strong>。</p>
            <div className="tk-confirm-actions">
              <button onClick={() => setPendingReward(null)}>再想想</button>
              <button onClick={confirmRedemption}>确认兑换</button>
            </div>
          </div>
        </div>
      )}

      {successReward && (
        <div className="tk-success-layer">
          <div className="tk-coin-burst" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} style={{ '--coin-index': index } as React.CSSProperties}>●</span>
            ))}
          </div>
          <div className="tk-success-card">
            <p className="tk-shop-eyebrow">REWARD UNLOCKED</p>
            <div className="tk-success-box">
              <div>{successReward.icon}</div>
            </div>
            <h3>兑换成功</h3>
            <p>「{successReward.name}」已收入奖励背包</p>
            <strong>- {successReward.cost} TK</strong>
            <button onClick={() => setSuccessReward(null)}>继续逛逛</button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';

// 可换装部件
interface AvatarPart {
  id: string;
  name: string;
  emoji: string;
  options: { id: string; label: string; color: string; emoji: string }[];
}

const AVATAR_PARTS: AvatarPart[] = [
  {
    id: 'body',
    name: '身体颜色',
    emoji: '🎨',
    options: [
      { id: 'black', label: '经典黑', color: '#1a1a2e', emoji: '🐧' },
      { id: 'blue', label: '腾讯蓝', color: '#12b7f5', emoji: '🐧' },
      { id: 'purple', label: '极客紫', color: '#8b5cf6', emoji: '🐧' },
      { id: 'pink', label: '元气粉', color: '#ec4899', emoji: '🐧' },
      { id: 'green', label: '活力绿', color: '#22c55e', emoji: '🐧' },
      { id: 'orange', label: '元气橙', color: '#f97316', emoji: '🐧' },
    ],
  },
  {
    id: 'hat',
    name: '帽子',
    emoji: '🧢',
    options: [
      { id: 'none', label: '不戴帽', color: 'transparent', emoji: '' },
      { id: 'cap', label: '棒球帽', color: '#ef4444', emoji: '🧢' },
      { id: 'crown', label: '皇冠', color: '#f59e0b', emoji: '👑' },
      { id: 'beanie', label: '毛线帽', color: '#3b82f6', emoji: '🎩' },
      { id: 'headset', label: '耳机', color: '#06b6d4', emoji: '🎧' },
      { id: 'bow', label: '蝴蝶结', color: '#ec4899', emoji: '🎀' },
    ],
  },
  {
    id: 'accessory',
    name: '配饰',
    emoji: '💎',
    options: [
      { id: 'none', label: '无配饰', color: 'transparent', emoji: '' },
      { id: 'scarf', label: '红围巾', color: '#ef4444', emoji: '🧣' },
      { id: 'tie', label: '领带', color: '#1e40af', emoji: '👔' },
      { id: 'glasses', label: '墨镜', color: '#1f2937', emoji: '🕶️' },
      { id: 'necklace', label: '项链', color: '#f59e0b', emoji: '💎' },
      { id: 'bowtie', label: '领结', color: '#ef4444', emoji: '🎀' },
    ],
  },
  {
    id: 'weapon',
    name: '装备',
    emoji: '⚔️',
    options: [
      { id: 'none', label: '无装备', color: 'transparent', emoji: '' },
      { id: 'sword', label: '光剑', color: '#a78bfa', emoji: '⚔️' },
      { id: 'shield', label: '盾牌', color: '#3b82f6', emoji: '🛡️' },
      { id: 'wand', label: '魔杖', color: '#f59e0b', emoji: '🪄' },
      { id: 'book', label: '知识书', color: '#10b981', emoji: '📖' },
      { id: 'keyboard', label: '机械键盘', color: '#6366f1', emoji: '⌨️' },
    ],
  },
];

export interface AvatarConfig {
  body: string;
  hat: string;
  accessory: string;
  weapon: string;
}

const defaultConfig: AvatarConfig = {
  body: 'blue',
  hat: 'none',
  accessory: 'none',
  weapon: 'none',
};

// Canvas 绘制头像
function drawAvatar(ctx: CanvasRenderingContext2D, config: AvatarConfig, size: number, frame: number) {
  const cx = size / 2;
  const cy = size / 2;
  const bounce = Math.sin(frame * 0.03) * 2;

  ctx.clearRect(0, 0, size, size);

  // Body color
  const bodyColor = AVATAR_PARTS.find(p => p.id === 'body')?.options.find(o => o.id === config.body)?.color || '#1a1a2e';

  // Background circle
  ctx.save();
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy + bounce);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(0, size * 0.28, size * 0.25, size * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.25, size * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly
  ctx.fillStyle = bodyColor === '#1a1a2e' ? '#ffffff' : '#ffffffcc';
  ctx.beginPath();
  ctx.ellipse(0, size * 0.05, size * 0.16, size * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(-size * 0.07, -size * 0.08, size * 0.05, 0, Math.PI * 2);
  ctx.arc(size * 0.07, -size * 0.08, size * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1f2937';
  ctx.beginPath();
  ctx.arc(-size * 0.06, -size * 0.07, size * 0.025, 0, Math.PI * 2);
  ctx.arc(size * 0.08, -size * 0.07, size * 0.025, 0, Math.PI * 2);
  ctx.fill();

  // Beak
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(-size * 0.03, size * 0.02);
  ctx.lineTo(size * 0.03, size * 0.02);
  ctx.lineTo(0, size * 0.06);
  ctx.closePath();
  ctx.fill();

  // Hat
  const hatOpt = AVATAR_PARTS.find(p => p.id === 'hat')?.options.find(o => o.id === config.hat);
  if (hatOpt && hatOpt.id !== 'none') {
    ctx.font = `${size * 0.2}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText(hatOpt.emoji, 0, -size * 0.22);
  }

  // Accessory
  const accOpt = AVATAR_PARTS.find(p => p.id === 'accessory')?.options.find(o => o.id === config.accessory);
  if (accOpt && accOpt.id !== 'none') {
    ctx.font = `${size * 0.15}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText(accOpt.emoji, 0, -size * 0.05);
  }

  // Weapon
  const wepOpt = AVATAR_PARTS.find(p => p.id === 'weapon')?.options.find(o => o.id === config.weapon);
  if (wepOpt && wepOpt.id !== 'none') {
    ctx.font = `${size * 0.18}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText(wepOpt.emoji, size * 0.2, size * 0.05);
  }

  ctx.restore();
}

// ==================== Props ====================
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AvatarConfig) => void;
  savedConfig?: AvatarConfig;
}

export default function AvatarDressUp({ isOpen, onClose, onSave, savedConfig }: Props) {
  const [config, setConfig] = useState<AvatarConfig>(savedConfig || defaultConfig);
  const [step, setStep] = useState(0); // 当前编辑步骤
  const [frame, setFrame] = useState(0);
  const canvasRef = useState<HTMLCanvasElement | null>(null);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => setFrame(f => f + 1), 50);
    return () => clearInterval(interval);
  }, []);

  // Draw on canvas
  useEffect(() => {
    const el = document.getElementById('avatar-canvas') as HTMLCanvasElement;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    drawAvatar(ctx, config, 280, frame);
  }, [config, frame]);

  if (!isOpen) return null;

  const currentPart = AVATAR_PARTS[step];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '560px',
        maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #12b7f5, #0099e5, #0077b6)',
          padding: '20px 24px', color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
                🐧 捏造你的数字孪生体
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.8 }}>
                Step {step + 1}/{AVATAR_PARTS.length} — 选择{currentPart.name}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {AVATAR_PARTS.map((_, i) => (
                <div key={i} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: i <= step ? 'white' : 'rgba(255,255,255,0.3)',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Avatar preview */}
          <div style={{
            flexShrink: 0,
            borderRadius: '20px',
            overflow: 'hidden',
            border: '3px solid #e0e7ff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            <canvas
              id="avatar-canvas"
              width="280"
              height="280"
              style={{ display: 'block' }}
            />
          </div>

          {/* Options */}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
              {currentPart.emoji || ''} {currentPart.name}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {currentPart.options.map(opt => {
                const isSelected = config[currentPart.id as keyof AvatarConfig] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setConfig(prev => ({ ...prev, [currentPart.id]: opt.id }))}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      border: isSelected ? `2.5px solid #12b7f5` : '2px solid #e5e7eb',
                      background: isSelected ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: opt.color !== 'transparent' ? opt.color : '#f3f4f6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px',
                      border: opt.color === 'transparent' ? '1px dashed #d1d5db' : 'none',
                    }}>
                      {opt.emoji || (isSelected ? '✓' : '')}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: isSelected ? 600 : 400, color: '#374151' }}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          padding: '16px 24px', borderTop: '1px solid #e5e7eb',
          display: 'flex', justifyContent: 'space-between',
        }}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} style={{
              padding: '10px 20px', borderRadius: '10px',
              border: '1px solid #e5e7eb', background: 'white',
              cursor: 'pointer', fontSize: '14px', color: '#374151',
            }}>
              ← 上一步
            </button>
          ) : <div />}

          {step < AVATAR_PARTS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} style={{
              padding: '10px 24px', borderRadius: '10px', border: 'none',
              background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
              color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
            }}>
              下一步 →
            </button>
          ) : (
            <button onClick={() => { onSave(config); onClose(); }} style={{
              padding: '10px 24px', borderRadius: '10px', border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
            }}>
              ✨ 生成我的数字孪生体！
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

interface PartOption {
  id: string; label: string; color?: string; emoji: string; style: string;
}

interface AvatarPart {
  id: string; name: string; emoji: string;
  options: PartOption[];
  category: 'body' | 'style' | 'accessory' | 'theme';
}

const AVATAR_PARTS: AvatarPart[] = [
  {
    id: 'bodyColor', name: '企鹅颜色', emoji: '🎨', category: 'body',
    options: [
      { id: 'classic', label: '经典企鹅', color: '#1a1a2e', emoji: '🐧', style: '经典' },
      { id: 'blue', label: '腾讯蓝', color: '#12b7f5', emoji: '🐧', style: '科技' },
      { id: 'purple', label: '极客紫', color: '#8b5cf6', emoji: '🐧', style: '创意' },
      { id: 'pink', label: '元气粉', color: '#ec4899', emoji: '🐧', style: '可爱' },
      { id: 'green', label: '活力绿', color: '#22c55e', emoji: '🐧', style: '清新' },
      { id: 'orange', label: '元气橙', color: '#f97316', emoji: '🐧', style: '阳光' },
      { id: 'gold', label: '黄金企鹅', color: '#f59e0b', emoji: '🐧', style: '稀有' },
      { id: 'rainbow', label: '彩虹企鹅', color: 'rainbow', emoji: '🌈', style: '炫彩' },
    ],
  },
  {
    id: 'hairstyle', name: '发型/帽子', emoji: '💇', category: 'style',
    options: [
      { id: 'none', label: '企鹅原装', emoji: '🐧', style: '经典' },
      { id: 'mohawk', label: '莫西干', emoji: '🦰', style: '摇滚' },
      { id: 'ponytail', label: '双马尾', emoji: '🎀', style: '可爱' },
      { id: 'cap', label: '棒球帽', emoji: '🧢', style: '运动' },
      { id: 'crown', label: '皇冠', emoji: '👑', style: '尊贵' },
      { id: 'headphones', label: '猫耳耳机', emoji: '🎧', style: '电竞' },
      { id: 'cowboy', label: '牛仔帽', emoji: '🤠', style: '西部' },
    ],
  },
  {
    id: 'outfit', name: '套装', emoji: '👔', category: 'style',
    options: [
      { id: 'none', label: '原皮企鹅', emoji: '🐧', style: '经典' },
      { id: 'suit', label: '商务西装', emoji: '🤵', style: '正式' },
      { id: 'hoodie', label: '卫衣潮人', emoji: '🧥', style: '休闲' },
      { id: 'qipao', label: '企鹅旗袍', emoji: '👘', style: '国风' },
      { id: 'armor', label: '勇士铠甲', emoji: '🛡️', style: '战斗' },
      { id: 'astronaut', label: '宇航服', emoji: '🚀', style: '科幻' },
      { id: 'magician', label: '魔法袍', emoji: '🧙', style: '魔法' },
      { id: 'sportswear', label: '运动套装', emoji: '🏃', style: '运动' },
    ],
  },
  {
    id: 'glasses', name: '眼镜', emoji: '👓', category: 'accessory',
    options: [
      { id: 'none', label: '不戴眼镜', emoji: '', style: '' },
      { id: 'round', label: '圆框眼镜', emoji: '👓', style: '文艺' },
      { id: 'sunglasses', label: '酷炫墨镜', emoji: '🕶️', style: '潮人' },
      { id: 'vr', label: 'VR眼镜', emoji: '🥽', style: '科技' },
      { id: 'heart', label: '爱心眼镜', emoji: '😍', style: '可爱' },
    ],
  },
  {
    id: 'neckwear', name: '领饰', emoji: '🧣', category: 'accessory',
    options: [
      { id: 'none', label: '无领饰', emoji: '', style: '' },
      { id: 'scarf', label: 'QQ红围巾', emoji: '🧣', style: '经典' },
      { id: 'bowtie', label: '绅士领结', emoji: '🎀', style: '正式' },
      { id: 'tie', label: '商务领带', emoji: '👔', style: '商务' },
      { id: 'necklace', label: '钻石项链', emoji: '💎', style: '奢华' },
      { id: 'collar', label: '铆钉项圈', emoji: '⛓️', style: '酷炫' },
    ],
  },
  {
    id: 'weapon', name: '装备', emoji: '⚔️', category: 'accessory',
    options: [
      { id: 'none', label: '空手', emoji: '✋', style: '和平' },
      { id: 'sword', label: '光剑', emoji: '⚔️', style: '战士' },
      { id: 'shield', label: 'AI盾牌', emoji: '🛡️', style: '防御' },
      { id: 'wand', label: '魔法杖', emoji: '🪄', style: '魔法' },
      { id: 'book', label: '知识法典', emoji: '📖', style: '学者' },
      { id: 'keyboard', label: '机械键盘', emoji: '⌨️', style: '程序员' },
      { id: 'microphone', label: '金话筒', emoji: '🎤', style: '演讲家' },
      { id: 'brush', label: '神笔', emoji: '🖌️', style: '艺术家' },
    ],
  },
  {
    id: 'background', name: '背景', emoji: '🖼️', category: 'theme',
    options: [
      { id: 'default', label: '腾讯蓝', emoji: '🔵', style: '科技' },
      { id: 'stars', label: '星空', emoji: '✨', style: '梦幻' },
      { id: 'ocean', label: '海洋', emoji: '🌊', style: '清新' },
      { id: 'fire', label: '烈焰', emoji: '🔥', style: '热血' },
      { id: 'forest', label: '森林', emoji: '🌲', style: '自然' },
      { id: 'neon', label: '赛博朋克', emoji: '🌃', style: '酷炫' },
      { id: 'candy', label: '糖果世界', emoji: '🍬', style: '甜美' },
      { id: 'dungeon', label: '地下城', emoji: '🏰', style: '冒险' },
    ],
  },
];

export const OUTFIT_PRESETS = [
  { name: '经典企鹅', config: { bodyColor: 'classic', hairstyle: 'none', outfit: 'none', glasses: 'none', neckwear: 'scarf', weapon: 'none', background: 'default' } },
  { name: '商务精英', config: { bodyColor: 'blue', hairstyle: 'none', outfit: 'suit', glasses: 'round', neckwear: 'tie', weapon: 'none', background: 'default' } },
  { name: '程序大牛', config: { bodyColor: 'purple', hairstyle: 'headphones', outfit: 'hoodie', glasses: 'vr', neckwear: 'none', weapon: 'keyboard', background: 'neon' } },
  { name: '魔法画师', config: { bodyColor: 'pink', hairstyle: 'ponytail', outfit: 'magician', glasses: 'heart', neckwear: 'necklace', weapon: 'brush', background: 'stars' } },
  { name: '战神企鹅', config: { bodyColor: 'orange', hairstyle: 'mohawk', outfit: 'armor', glasses: 'sunglasses', neckwear: 'collar', weapon: 'sword', background: 'fire' } },
  { name: '宇宙探险家', config: { bodyColor: 'gold', hairstyle: 'cowboy', outfit: 'astronaut', glasses: 'vr', neckwear: 'none', weapon: 'shield', background: 'stars' } },
];

export interface AvatarConfig {
  bodyColor: string; hairstyle: string; outfit: string;
  glasses: string; neckwear: string; weapon: string; background: string;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  bodyColor: 'classic', hairstyle: 'none', outfit: 'none',
  glasses: 'none', neckwear: 'scarf', weapon: 'none', background: 'default',
};

function drawQQPenguin(ctx: CanvasRenderingContext2D, config: AvatarConfig, size: number, frame: number) {
  const cx = size / 2; const cy = size / 2;
  const bounce = Math.sin(frame * 0.03) * 2;
  ctx.clearRect(0, 0, size, size);

  const bgMap: Record<string, [string, string]> = {
    default: ['#dbeafe', '#bfdbfe'], stars: ['#1e1b4b', '#312e81'],
    ocean: ['#cffafe', '#67e8f9'], fire: ['#1f2937', '#7f1d1d'],
    forest: ['#dcfce7', '#86efac'], neon: ['#0f172a', '#1e1b4b'],
    candy: ['#fce7f3', '#fbcfe8'], dungeon: ['#1c1917', '#292524'],
  };
  const bg = bgMap[config.background] || bgMap.default;
  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, bg[0]); grad.addColorStop(1, bg[1]);
  ctx.fillStyle = grad; ctx.fillRect(0, 0, size, size);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath(); ctx.ellipse(cx, cy + size * 0.38, size * 0.35, size * 0.06, 0, 0, Math.PI * 2); ctx.fill();

  ctx.save(); ctx.translate(cx, cy + bounce);

  const bodyOpt = AVATAR_PARTS[0].options.find(o => o.id === config.bodyColor);
  const bodyColor = bodyOpt?.color || '#1a1a2e';
  const isRainbow = config.bodyColor === 'rainbow';

  // Body
  if (isRainbow) {
    const rg = ctx.createLinearGradient(-size * 0.3, 0, size * 0.3, 0);
    ['#ef4444','#f59e0b','#22c55e','#3b82f6','#8b5cf6','#ec4899'].forEach((c,i) => { rg.addColorStop(i/5, c); });
    ctx.fillStyle = rg;
  } else {
    ctx.fillStyle = bodyColor;
  }
  ctx.beginPath(); ctx.ellipse(0, 0, size * 0.3, size * 0.36, 0, 0, Math.PI * 2); ctx.fill();

  // Belly
  ctx.fillStyle = (isRainbow || config.bodyColor !== 'classic') ? 'rgba(255,255,255,0.7)' : '#ffffff';
  ctx.beginPath(); ctx.ellipse(0, size * 0.05, size * 0.18, size * 0.24, 0, 0, Math.PI * 2); ctx.fill();

  // Eyes
  ctx.fillStyle = 'white';
  ctx.beginPath(); ctx.arc(-size * 0.07, -size * 0.08, size * 0.055, 0, Math.PI * 2);
  ctx.arc(size * 0.07, -size * 0.08, size * 0.055, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1f2937';
  ctx.beginPath(); ctx.arc(-size * 0.06, -size * 0.07, size * 0.028, 0, Math.PI * 2);
  ctx.arc(size * 0.08, -size * 0.07, size * 0.028, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath(); ctx.arc(-size * 0.05, -size * 0.09, size * 0.012, 0, Math.PI * 2);
  ctx.arc(size * 0.09, -size * 0.09, size * 0.012, 0, Math.PI * 2); ctx.fill();

  // Beak
  ctx.fillStyle = '#f97316';
  ctx.beginPath(); ctx.moveTo(-size * 0.03, size * 0.02); ctx.lineTo(size * 0.03, size * 0.02); ctx.lineTo(0, size * 0.06); ctx.closePath(); ctx.fill();

  // Blush
  ctx.fillStyle = 'rgba(255,150,150,0.3)';
  ctx.beginPath(); ctx.ellipse(-size * 0.12, size * 0.03, size * 0.04, size * 0.025, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(size * 0.12, size * 0.03, size * 0.04, size * 0.025, 0, 0, Math.PI * 2); ctx.fill();

  // Hairstyle
  const hairOpt = AVATAR_PARTS[1].options.find(o => o.id === config.hairstyle);
  if (hairOpt && hairOpt.id !== 'none') {
    ctx.font = `${size * 0.2}px serif`; ctx.textAlign = 'center'; ctx.fillText(hairOpt.emoji, 0, -size * 0.26);
  }

  // Outfit
  const outfitOpt = AVATAR_PARTS[2].options.find(o => o.id === config.outfit);
  if (outfitOpt && outfitOpt.id !== 'none') {
    ctx.font = `${size * 0.22}px serif`; ctx.textAlign = 'center'; ctx.fillText(outfitOpt.emoji, 0, size * 0.02);
  }

  // Glasses
  const glassOpt = AVATAR_PARTS[3].options.find(o => o.id === config.glasses);
  if (glassOpt && glassOpt.id !== 'none') {
    ctx.font = `${size * 0.16}px serif`; ctx.textAlign = 'center'; ctx.fillText(glassOpt.emoji, 0, -size * 0.06);
  }

  // Neckwear
  const neckOpt = AVATAR_PARTS[4].options.find(o => o.id === config.neckwear);
  if (neckOpt && neckOpt.id !== 'none') {
    ctx.font = `${size * 0.12}px serif`; ctx.textAlign = 'center'; ctx.fillText(neckOpt.emoji, 0, size * 0.12);
  }

  // Weapon
  const wepOpt = AVATAR_PARTS[5].options.find(o => o.id === config.weapon);
  if (wepOpt && wepOpt.id !== 'none') {
    ctx.font = `${size * 0.18}px serif`; ctx.textAlign = 'center'; ctx.fillText(wepOpt.emoji, size * 0.22, size * 0.05);
  }

  // Wings
  const flapAngle = Math.sin(frame * 0.4) * 0.3;
  ctx.fillStyle = bodyColor;
  ctx.save(); ctx.translate(-size * 0.3, -size * 0.02); ctx.rotate(-0.3 + flapAngle);
  ctx.beginPath(); ctx.ellipse(0, 0, size * 0.07, size * 0.2, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(size * 0.3, -size * 0.02); ctx.rotate(0.3 - flapAngle);
  ctx.beginPath(); ctx.ellipse(0, 0, size * 0.07, size * 0.2, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

  // Feet
  ctx.fillStyle = '#f97316';
  ctx.beginPath(); ctx.ellipse(-size * 0.14, size * 0.33, 7, 3, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(size * 0.14, size * 0.33, 7, 3, 0.2, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AvatarConfig) => void;
  savedConfig?: AvatarConfig;
}

export default function AvatarDressUp({ isOpen, onClose, onSave, savedConfig }: Props) {
  const [config, setConfig] = useState<AvatarConfig>(savedConfig || DEFAULT_AVATAR);
  const [activeCategory, setActiveCategory] = useState<string>('body');
  const [activePartIdx, setActivePartIdx] = useState(0);
  const [frame, setFrame] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => f + 1), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('qq-avatar-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawQQPenguin(ctx, config, 300, frame);
  }, [config, frame]);

  if (!isOpen) return null;

  const categoryParts = AVATAR_PARTS.filter(p => p.category === activeCategory);
  const currentPart = categoryParts[activePartIdx] || AVATAR_PARTS[0];

  if (showSuccess) {
    setTimeout(() => { setShowSuccess(false); onSave(config); onClose(); }, 2000);
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 2000,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', animation: 'bounceIn 0.5s ease' }}>🐧</div>
          <h2 style={{ color: 'white', marginTop: '16px', fontSize: '24px', fontWeight: 700 }}>你的数字孪生体已生成！</h2>
          <p style={{ color: '#12b7f5', fontSize: '16px' }}>开始你的成长副本冒险吧！</p>
        </div>
        <style>{`@keyframes bounceIn{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 2000,
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '660px',
        maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #12b7f5, #0099e5, #0077b6)',
          padding: '14px 20px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🐧</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>QQ秀换装 — 捏造你的数字孪生体</h2>
              <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>参考QQ炫舞/QQ飞车换装系统 · 7个部位 · 50+选项</p>
            </div>
          </div>
          <button onClick={() => { onSave(config); onClose(); }} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', cursor: 'pointer', color: 'white', fontSize: '14px',
          }}>✕</button>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
          {(['body', 'style', 'accessory', 'theme'] as const).map(cat => {
            const catInfo = { body: '🎨 外观', style: '👔 装扮', accessory: '💎 配饰', theme: '🖼️ 背景' }[cat];
            return (
              <button key={cat} onClick={() => { setActiveCategory(cat); setActivePartIdx(0); }}
                style={{
                  flex: 1, padding: '8px', border: 'none',
                  background: activeCategory === cat ? '#f0f9ff' : 'white',
                  borderBottom: activeCategory === cat ? '3px solid #12b7f5' : '3px solid transparent',
                  cursor: 'pointer', fontSize: '12px', fontWeight: activeCategory === cat ? 600 : 400,
                  color: activeCategory === cat ? '#12b7f5' : '#6b7280', transition: 'all 0.2s',
                }}
              >{catInfo}</button>
            );
          })}
        </div>

        {/* Sub-tabs */}
        {categoryParts.length > 1 && (
          <div style={{ display: 'flex', padding: '6px 16px', gap: '4px', overflowX: 'auto', borderBottom: '1px solid #f3f4f6' }}>
            {categoryParts.map((part, idx) => (
              <button key={part.id} onClick={() => setActivePartIdx(idx)}
                style={{
                  padding: '4px 12px', borderRadius: '8px',
                  border: activePartIdx === idx ? '2px solid #12b7f5' : '2px solid #e5e7eb',
                  background: activePartIdx === idx ? '#f0f9ff' : 'white',
                  cursor: 'pointer', fontSize: '11px', fontWeight: activePartIdx === idx ? 600 : 400,
                  whiteSpace: 'nowrap', color: activePartIdx === idx ? '#12b7f5' : '#6b7280',
                }}
              >{part.emoji} {part.name}</button>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
          <div style={{
            borderRadius: '16px', overflow: 'hidden', flexShrink: 0,
            border: '3px solid #e0e7ff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <canvas id="qq-avatar-canvas" width="300" height="300" style={{ display: 'block' }} />
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600 }}>
              {currentPart.emoji} {currentPart.name}
            </h3>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px',
              maxHeight: '230px', overflowY: 'auto',
            }}>
              {currentPart.options.map(opt => {
                const key = currentPart.id as keyof AvatarConfig;
                const isSelected = config[key] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setConfig(prev => ({ ...prev, [key]: opt.id }))}
                    style={{
                      padding: '6px 4px', borderRadius: '8px',
                      border: isSelected ? '2.5px solid #12b7f5' : '2px solid #e5e7eb',
                      background: isSelected ? '#f0f9ff' : 'white',
                      cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: '22px' }}>{opt.emoji}</div>
                    <div style={{ fontSize: '10px', fontWeight: isSelected ? 600 : 400, color: '#374151' }}>{opt.label}</div>
                    <div style={{ fontSize: '9px', color: '#9ca3af' }}>{opt.style}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div style={{ padding: '6px 16px', borderTop: '1px solid #f3f4f6' }}>
          <p style={{ margin: '0 0 6px', fontSize: '11px', color: '#9ca3af' }}>🎭 一键换装预设：</p>
          <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
            {OUTFIT_PRESETS.map(preset => (
              <button key={preset.name} onClick={() => setConfig(preset.config)}
                style={{
                  padding: '4px 10px', borderRadius: '8px', border: '1px solid #e5e7eb',
                  background: 'white', cursor: 'pointer', fontSize: '11px', whiteSpace: 'nowrap',
                  fontWeight: JSON.stringify(config) === JSON.stringify(preset.config) ? 600 : 400,
                }}
              >{preset.name}</button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{
          padding: '10px 16px', borderTop: '1px solid #e5e7eb',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button onClick={() => setShowSuccess(true)}
            style={{
              padding: '10px 28px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
            }}
          >✨ 确认形象，生成数字孪生体！</button>
        </div>
      </div>
    </div>
  );
}

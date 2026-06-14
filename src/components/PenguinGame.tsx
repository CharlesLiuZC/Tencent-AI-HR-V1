import { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { PHASES, LEARNING_UNITS } from '../data/learningPaths';
import { Phase, Role } from '../types';

// ==================== 游戏配置 ====================
const TILE_SIZE = 48;
const MAP_WIDTH = 16;
const MAP_HEIGHT = 12;

// 地图图例: 0=草地 1=路径 2=树 3=水 4=建筑 5=Boss 6=宝箱 7=门
const MAPS: Record<Phase, number[][]> = {
  day30: [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,1,1,1,0,0,0,0,1,1,0,0,2],
    [2,0,0,0,1,0,1,0,6,0,0,1,0,0,0,2],
    [2,0,0,0,1,0,1,1,1,1,0,1,0,0,0,2],
    [2,1,1,1,1,0,0,0,0,1,0,1,1,1,1,2],
    [2,1,0,0,0,0,6,0,0,1,0,0,0,0,1,2],
    [2,1,0,0,0,0,0,0,0,1,0,0,6,0,1,2],
    [2,1,1,1,0,0,0,0,0,1,1,1,1,0,1,2],
    [2,0,0,1,0,0,0,0,0,0,0,0,1,0,1,2],
    [2,0,0,1,1,1,1,1,1,1,1,0,1,0,1,2],
    [2,0,0,0,0,0,0,0,0,0,1,1,1,0,5,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  ],
  day60: [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,5,1,1,0,0,0,0,0,0,0,0,1,1,5,2],
    [2,0,0,1,0,6,0,0,0,0,6,0,1,0,0,2],
    [2,0,0,1,1,1,1,0,0,1,1,1,1,0,0,2],
    [2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2],
    [2,0,0,0,0,0,1,1,1,1,0,0,0,0,0,2],
    [2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2],
    [2,0,0,1,1,1,1,0,0,1,1,1,1,0,0,2],
    [2,0,0,1,0,6,0,0,0,0,6,0,1,0,0,2],
    [2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2],
    [2,5,1,1,0,0,0,0,0,0,0,0,1,1,5,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  ],
  day90: [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,5,5,0,0,0,0,0,0,2],
    [2,0,6,1,1,0,0,1,1,0,0,1,1,6,0,2],
    [2,0,0,0,1,0,0,1,1,0,0,1,0,0,0,2],
    [2,0,0,0,1,1,1,1,1,1,1,1,0,0,0,2],
    [2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,2],
    [2,0,0,0,1,1,1,1,1,1,1,1,0,0,0,2],
    [2,0,0,0,1,0,0,1,1,0,0,1,0,0,0,2],
    [2,0,6,1,1,0,0,1,1,0,0,1,1,6,0,2],
    [2,0,0,0,0,0,0,5,5,0,0,0,0,0,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  ],
};

// Boss 数据
const BOSSES: Record<Phase, { name: string; emoji: string; hp: number; attack: number; description: string }[]> = {
  day30: [
    { name: 'Prompt 混沌兽', emoji: '👹', hp: 100, attack: 15, description: '只会用模糊指令的怪物' },
    { name: '幻觉蝙蝠', emoji: '🦇', hp: 80, attack: 20, description: '散布虚假信息的AI幻觉' },
  ],
  day60: [
    { name: '工作流断裂龙', emoji: '🐉', hp: 150, attack: 20, description: '破坏人机协作的恶龙' },
    { name: '数据焦虑蝎', emoji: '🦂', hp: 120, attack: 25, description: '让人害怕数据的毒蝎' },
  ],
  day90: [
    { name: '创新枯竭巨人', emoji: '🧌', hp: 200, attack: 30, description: '吞噬创造力的远古巨人' },
    { name: '终极AI评审官', emoji: '🤖', hp: 250, attack: 35, description: '最终Boss，考验所有AI能力' },
  ],
};

// ==================== 企鹅精灵绘制 ====================
function drawPenguin(ctx: CanvasRenderingContext2D, x: number, y: number, dir: number, frame: number, size: number = TILE_SIZE) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const bounce = Math.sin(frame * 0.3) * 2;

  ctx.save();
  ctx.translate(cx, cy + bounce);

  // Body (black)
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.ellipse(0, 2, size * 0.35, size * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly (white)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 4, size * 0.22, size * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  const eyeOffsetX = dir === 0 ? -4 : dir === 2 ? 4 : 0;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-5 + eyeOffsetX, -6, 5, 0, Math.PI * 2);
  ctx.arc(5 + eyeOffsetX, -6, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(-4 + eyeOffsetX, -6, 2.5, 0, Math.PI * 2);
  ctx.arc(6 + eyeOffsetX, -6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Beak (orange)
  ctx.fillStyle = '#ff8c00';
  ctx.beginPath();
  ctx.moveTo(-3 + eyeOffsetX, -1);
  ctx.lineTo(3 + eyeOffsetX, -1);
  ctx.lineTo(0 + eyeOffsetX, 3);
  ctx.closePath();
  ctx.fill();

  // Feet
  ctx.fillStyle = '#ff8c00';
  ctx.beginPath();
  ctx.ellipse(-8, size * 0.35, 6, 3, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(8, size * 0.35, 6, 3, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Wings (flap animation)
  const flapAngle = Math.sin(frame * 0.4) * 0.3;
  ctx.save();
  ctx.translate(-size * 0.32, 0);
  ctx.rotate(-0.3 + flapAngle);
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.08, size * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(size * 0.32, 0);
  ctx.rotate(0.3 - flapAngle);
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.08, size * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Hat (Tencent blue)
  ctx.fillStyle = '#12b7f5';
  ctx.beginPath();
  ctx.arc(0, -14, 10, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#0099e5';
  ctx.fillRect(-12, -14, 24, 3);

  ctx.restore();
}

// ==================== 地图绘制 ====================
function drawMap(ctx: CanvasRenderingContext2D, map: number[][], frame: number) {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tile = map[y][x];
      const px = x * TILE_SIZE;
      const py = y * TILE_SIZE;

      switch (tile) {
        case 0: // Grass
          ctx.fillStyle = '#90c695';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          // Grass detail
          if ((x + y) % 3 === 0) {
            ctx.fillStyle = '#7ab87f';
            ctx.fillRect(px + 10, py + 10, 4, 8);
            ctx.fillRect(px + 30, py + 20, 4, 8);
          }
          break;
        case 1: // Path
          ctx.fillStyle = '#d4a574';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = '#c49564';
          ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
          break;
        case 2: // Tree/Wall
          ctx.fillStyle = '#4a7c59';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = '#3d6b4a';
          ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
          // Tree top
          ctx.fillStyle = '#2d5a3a';
          ctx.beginPath();
          ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE/2, 16, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 3: // Water
          ctx.fillStyle = '#4a90d9';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = '#3a80c9';
          const wave = Math.sin(frame * 0.05 + x) * 3;
          ctx.fillRect(px, py + 20 + wave, TILE_SIZE, 4);
          break;
        case 4: // Building
          ctx.fillStyle = '#8b7355';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = '#a08060';
          ctx.fillRect(px + 8, py + 8, TILE_SIZE - 16, TILE_SIZE - 16);
          break;
        case 5: // Boss
          ctx.fillStyle = '#90c695';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          // Boss glow
          const glow = Math.sin(frame * 0.1) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(239, 68, 68, ${glow * 0.4})`;
          ctx.beginPath();
          ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE/2, 20 + Math.sin(frame * 0.08) * 4, 0, Math.PI * 2);
          ctx.fill();
          // Skull
          ctx.font = '28px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('💀', px + TILE_SIZE/2, py + TILE_SIZE/2);
          break;
        case 6: // Treasure
          ctx.fillStyle = '#90c695';
          ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
          const sparkle = Math.sin(frame * 0.15 + x * 2) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(255, 215, 0, ${sparkle})`;
          ctx.beginPath();
          ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE/2, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = '22px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('📦', px + TILE_SIZE/2, py + TILE_SIZE/2);
          break;
        case 7: // Door
          ctx.fillStyle = '#8b4513';
          ctx.fillRect(px + 8, py, TILE_SIZE - 16, TILE_SIZE);
          ctx.fillStyle = '#a0522d';
          ctx.fillRect(px + 12, py + 4, TILE_SIZE - 24, TILE_SIZE - 4);
          ctx.fillStyle = '#ffd700';
          ctx.beginPath();
          ctx.arc(px + TILE_SIZE - 16, py + TILE_SIZE/2, 3, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    }
  }
}

// ==================== 战斗系统 ====================
interface BattleState {
  active: boolean;
  bossIdx: number;
  playerHP: number;
  bossHP: number;
  maxPlayerHP: number;
  maxBossHP: number;
  turn: 'player' | 'boss' | 'animating';
  log: string[];
  shakePlayer: number;
  shakeBoss: number;
}

// ==================== 主组件 ====================
interface Props {
  phase: Phase;
  onClose: () => void;
}

export default function PenguinGame({ phase, onClose }: Props) {
  const { role, progress, toggleUnit } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [frame, setFrame] = useState(0);
  const [dir, setDir] = useState(1); // 0=up 1=right 2=down 3=left
  const [hp, setHp] = useState(100);
  const [maxHp] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [treasures, setTreasures] = useState(0);
  const [battle, setBattle] = useState<BattleState | null>(null);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const map = MAPS[phase];
  const bosses = BOSSES[phase];
  const phaseInfo = PHASES[phase];

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => f + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = MAP_WIDTH * TILE_SIZE;
    canvas.height = MAP_HEIGHT * TILE_SIZE;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map
    drawMap(ctx, map, frame);

    // Draw player
    drawPenguin(ctx, playerPos.x * TILE_SIZE, playerPos.y * TILE_SIZE, dir, frame);
  }, [playerPos, frame, map]);

  // Show message
  const showMsg = useCallback((msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  }, []);

  // Move player
  const move = useCallback((dx: number, dy: number) => {
    if (battle?.active || gameComplete) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Direction
    if (dy < 0) setDir(0);
    else if (dx > 0) setDir(1);
    else if (dy > 0) setDir(2);
    else if (dx < 0) setDir(3);

    // Bounds check
    if (newX < 0 || newX >= MAP_WIDTH || newY < 0 || newY >= MAP_HEIGHT) return;

    const tile = map[newY][newX];

    // Collision
    if (tile === 2) return; // Wall

    setPlayerPos({ x: newX, y: newY });

    // Tile events
    if (tile === 5) {
      // Boss encounter
      const bossIdx = bosses.findIndex((_, i) => {
        // Find nearest boss
        for (let by = 0; by < MAP_HEIGHT; by++) {
          for (let bx = 0; bx < MAP_WIDTH; bx++) {
            if (map[by][bx] === 5 && bx === newX && by === newY) return true;
          }
        }
        return false;
      });
      const idx = bossIdx >= 0 ? bossIdx : 0;
      const boss = bosses[idx];
      setBattle({
        active: true,
        bossIdx: idx,
        playerHP: hp,
        bossHP: boss.hp,
        maxPlayerHP: maxHp,
        maxBossHP: boss.hp,
        turn: 'player',
        log: [`${boss.emoji} ${boss.name} 出现了！`, boss.description],
        shakePlayer: 0,
        shakeBoss: 0,
      });
    } else if (tile === 6) {
      // Treasure
      setTreasures(t => t + 1);
      setXp(x => x + 20);
      showMsg('🎁 获得宝箱！+20 XP');
      // Remove treasure from map
      map[newY][newX] = 0;
    }
  }, [playerPos, map, battle, gameComplete, hp, maxHp, bosses, showMsg]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': move(0, -1); break;
        case 'ArrowDown': case 's': case 'S': move(0, 1); break;
        case 'ArrowLeft': case 'a': case 'A': move(-1, 0); break;
        case 'ArrowRight': case 'd': case 'D': move(1, 0); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move]);

  // Battle actions
  const playerAttack = useCallback(() => {
    if (!battle || battle.turn !== 'player') return;
    const damage = 20 + Math.floor(Math.random() * 15) + level * 3;
    const newBossHP = Math.max(0, battle.bossHP - damage);
    setBattle(prev => prev ? {
      ...prev,
      bossHP: newBossHP,
      shakeBoss: 10,
      log: [...prev.log, `🐧 企鹅攻击！造成 ${damage} 点伤害！`],
      turn: 'boss',
    } : null);

    setTimeout(() => {
      if (newBossHP <= 0) {
        // Boss defeated
        const boss = bosses[battle.bossIdx];
        setBattle(prev => prev ? { ...prev, log: [...prev.log, `🎉 ${boss.name} 被击败了！`] } : null);
        setXp(x => x + 100);
        setLevel(l => l + 1);
        setTimeout(() => {
          setBattle(null);
          // Remove boss from map
          for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
              if (map[y][x] === 5) map[y][x] = 0;
            }
          }
          // Check if all bosses defeated
          const hasBoss = map.some(row => row.includes(5));
          if (!hasBoss) {
            setGameComplete(true);
          }
        }, 1500);
      } else {
        // Boss turn
        setTimeout(() => {
          const boss = bosses[battle.bossIdx];
          const damage = boss.attack + Math.floor(Math.random() * 10);
          const newPlayerHP = Math.max(0, (battle.playerHP) - damage);
          setHp(newPlayerHP);
          setBattle(prev => prev ? {
            ...prev,
            playerHP: newPlayerHP,
            shakePlayer: 10,
            log: [...prev.log, `${boss.emoji} ${boss.name} 攻击！造成 ${damage} 点伤害！`],
            turn: 'player',
          } : null);

          if (newPlayerHP <= 0) {
            setBattle(prev => prev ? { ...prev, log: [...prev.log, '💀 你被击败了...使用回复药水复活！'], turn: 'player' } : null);
            setHp(50);
          }
        }, 800);
      }
    }, 300);
  }, [battle, bosses, level, map]);

  const playerHeal = useCallback(() => {
    if (!battle || battle.turn !== 'player') return;
    const heal = 25 + level * 2;
    const newHP = Math.min(maxHp, battle.playerHP + heal);
    setHp(newHP);
    setBattle(prev => prev ? {
      ...prev,
      playerHP: newHP,
      log: [...prev.log, `💚 使用回复术！恢复 ${heal} HP！`],
      turn: 'boss',
    } : null);

    setTimeout(() => {
      const boss = bosses[battle.bossIdx];
      const damage = boss.attack + Math.floor(Math.random() * 10);
      const newPlayerHP = Math.max(0, newHP - damage);
      setHp(newPlayerHP);
      setBattle(prev => prev ? {
        ...prev,
        playerHP: newPlayerHP,
        shakePlayer: 10,
        log: [...prev.log, `${boss.emoji} ${boss.name} 攻击！造成 ${damage} 点伤害！`],
        turn: 'player',
      } : null);
    }, 800);
  }, [battle, bosses, level, maxHp]);

  const playerSpecial = useCallback(() => {
    if (!battle || battle.turn !== 'player') return;
    if (xp < 50) {
      showMsg('XP 不足！需要 50 XP');
      return;
    }
    setXp(x => x - 50);
    const damage = 50 + level * 5;
    const newBossHP = Math.max(0, battle.bossHP - damage);
    setBattle(prev => prev ? {
      ...prev,
      bossHP: newBossHP,
      shakeBoss: 15,
      log: [...prev.log, `⚡ 释放 AI 必杀技！造成 ${damage} 点伤害！`],
      turn: 'boss',
    } : null);

    setTimeout(() => {
      if (newBossHP <= 0) {
        const boss = bosses[battle.bossIdx];
        setBattle(prev => prev ? { ...prev, log: [...prev.log, `🎉 ${boss.name} 被击败了！`] } : null);
        setXp(x => x + 100);
        setLevel(l => l + 1);
        setTimeout(() => {
          setBattle(null);
          for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
              if (map[y][x] === 5) map[y][x] = 0;
            }
          }
          const hasBoss = map.some(row => row.includes(5));
          if (!hasBoss) setGameComplete(true);
        }, 1500);
      } else {
        setTimeout(() => {
          const boss = bosses[battle.bossIdx];
          const damage = boss.attack + Math.floor(Math.random() * 10);
          const newPlayerHP = Math.max(0, battle.playerHP - damage);
          setHp(newPlayerHP);
          setBattle(prev => prev ? {
            ...prev,
            playerHP: newPlayerHP,
            shakePlayer: 10,
            log: [...prev.log, `${boss.emoji} ${boss.name} 攻击！造成 ${damage} 点伤害！`],
            turn: 'player',
          } : null);
        }, 800);
      }
    }, 300);
  }, [battle, bosses, level, xp, map, showMsg]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        borderRadius: '24px', padding: '24px', color: 'white',
        maxWidth: '900px', width: '100%',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🐧</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                {phaseInfo.icon} {phaseInfo.subtitle} — 企鹅大冒险
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '12px', opacity: 0.7 }}>
                方向键/WASD 移动 · 走到 💀 上触发战斗
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', cursor: 'pointer', color: 'white', fontSize: '16px',
            }}
          >✕</button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: '16px', marginBottom: '12px',
          background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px 16px',
        }}>
          <div>
            <span style={{ fontSize: '11px', opacity: 0.6 }}>HP</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '100px', height: '8px', borderRadius: '4px', background: '#374151',
              }}>
                <div style={{
                  height: '100%', width: `${(hp / maxHp) * 100}%`,
                  background: hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444',
                  borderRadius: '4px', transition: 'width 0.3s',
                }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>{hp}/{maxHp}</span>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', opacity: 0.6 }}>等级</span>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#a78bfa' }}>Lv.{level}</p>
          </div>
          <div>
            <span style={{ fontSize: '11px', opacity: 0.6 }}>XP</span>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#f59e0b' }}>{xp}</p>
          </div>
          <div>
            <span style={{ fontSize: '11px', opacity: 0.6 }}>宝箱</span>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#22c55e' }}>{treasures}</p>
          </div>
        </div>

        {/* Game canvas + Mobile controls */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ position: 'relative' }}>
            <canvas
              ref={canvasRef}
              style={{
                borderRadius: '12px',
                border: '2px solid #334155',
                imageRendering: 'pixelated',
                maxWidth: '100%',
              }}
            />
            {/* Message overlay */}
            {showMessage && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.85)', borderRadius: '12px',
                padding: '12px 24px', fontSize: '16px', fontWeight: 600,
                color: '#f59e0b', whiteSpace: 'nowrap',
                animation: 'fadeInUp 0.3s ease',
              }}>
                {message}
              </div>
            )}
          </div>

          {/* Mobile D-pad */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          }}>
            <button onClick={() => move(0, -1)} style={dpadStyle}>▲</button>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => move(-1, 0)} style={dpadStyle}>◀</button>
              <div style={{ width: '44px', height: '44px' }} />
              <button onClick={() => move(1, 0)} style={dpadStyle}>▶</button>
            </div>
            <button onClick={() => move(0, 1)} style={dpadStyle}>▼</button>
          </div>
        </div>

        {/* Battle overlay */}
        {battle?.active && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', borderRadius: '24px',
            display: 'flex', flexDirection: 'column', padding: '24px',
          }}>
            <h3 style={{ textAlign: 'center', margin: '0 0 16px', fontSize: '20px', color: '#ef4444' }}>
              ⚔️ 战斗！
            </h3>

            {/* Battle scene */}
            <div style={{
              display: 'flex', justifyContent: 'space-around', alignItems: 'center',
              marginBottom: '16px', flex: 1,
            }}>
              {/* Player */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  animation: battle.shakePlayer > 0 ? 'shake 0.3s ease' : 'none',
                }}>🐧</div>
                <p style={{ margin: '8px 0 4px', fontWeight: 600 }}>企鹅勇士 Lv.{level}</p>
                <div style={{
                  width: '120px', height: '10px', borderRadius: '5px', background: '#374151',
                  margin: '0 auto',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '5px',
                    width: `${(battle.playerHP / battle.maxPlayerHP) * 100}%`,
                    background: battle.playerHP > 30 ? '#22c55e' : '#ef4444',
                    transition: 'width 0.3s',
                  }} />
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>{battle.playerHP}/{battle.maxPlayerHP}</p>
              </div>

              <span style={{ fontSize: '24px', color: '#ef4444', fontWeight: 700 }}>VS</span>

              {/* Boss */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  animation: battle.shakeBoss > 0 ? 'shake 0.3s ease' : 'none',
                }}>{bosses[battle.bossIdx]?.emoji}</div>
                <p style={{ margin: '8px 0 4px', fontWeight: 600 }}>{bosses[battle.bossIdx]?.name}</p>
                <div style={{
                  width: '120px', height: '10px', borderRadius: '5px', background: '#374151',
                  margin: '0 auto',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '5px',
                    width: `${(battle.bossHP / battle.maxBossHP) * 100}%`,
                    background: '#ef4444',
                    transition: 'width 0.3s',
                  }} />
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>{battle.bossHP}/{battle.maxBossHP}</p>
              </div>
            </div>

            {/* Battle log */}
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '10px',
              padding: '10px', maxHeight: '80px', overflowY: 'auto', marginBottom: '12px',
              fontSize: '12px', lineHeight: '1.6',
            }}>
              {battle.log.map((msg, i) => (
                <p key={i} style={{ margin: '2px 0', color: i === battle.log.length - 1 ? '#f59e0b' : '#9ca3af' }}>
                  {msg}
                </p>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                onClick={playerAttack}
                disabled={battle.turn !== 'player'}
                style={battleBtnStyle('#ef4444', battle.turn !== 'player')}
              >
                ⚔️ 攻击
              </button>
              <button
                onClick={playerHeal}
                disabled={battle.turn !== 'player'}
                style={battleBtnStyle('#22c55e', battle.turn !== 'player')}
              >
                💚 回复
              </button>
              <button
                onClick={playerSpecial}
                disabled={battle.turn !== 'player' || xp < 50}
                style={battleBtnStyle('#8b5cf6', battle.turn !== 'player' || xp < 50)}
              >
                ⚡ AI必杀 (-50XP)
              </button>
            </div>
          </div>
        )}

        {/* Game complete */}
        {gameComplete && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', borderRadius: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '24px',
          }}>
            <span style={{ fontSize: '64px', animation: 'bounce 0.5s ease infinite alternate' }}>🎉</span>
            <h2 style={{ margin: '16px 0 8px', fontSize: '24px', fontWeight: 700, color: '#f59e0b' }}>
              通关！{phaseInfo.subtitle} 已征服！
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: '14px', opacity: 0.8, textAlign: 'center' }}>
              你击败了所有 Boss，收集了 {treasures} 个宝箱<br />
              最终等级：Lv.{level} | 总 XP：{xp}
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '12px 32px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 600,
              }}
            >
              🏆 领取奖励并返回
            </button>
          </div>
        )}

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-10px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate(-50%, -40%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
          }
        `}</style>
      </div>
    </div>
  );
}

const dpadStyle: React.CSSProperties = {
  width: '44px', height: '44px', borderRadius: '10px',
  border: '2px solid #334155', background: '#1e293b',
  color: 'white', cursor: 'pointer', fontSize: '16px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

function battleBtnStyle(color: string, disabled: boolean): React.CSSProperties {
  return {
    padding: '10px 20px', borderRadius: '10px', border: 'none',
    background: disabled ? '#374151' : color,
    color: 'white', cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px', fontWeight: 600, opacity: disabled ? 0.5 : 1,
  };
}

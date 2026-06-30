import type { UserProgress } from '../types';

// 腾讯积分系统 - Tencentken (腾讯币)
export interface TencentkenReward {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  category: 'token' | 'snack' | 'gift' | 'privilege';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stock: number;
  badge: string;
}

export const TENCENTKEN_REWARDS: TencentkenReward[] = [
  { id: 'r001', name: 'AI Token 加油包', description: '额外 10,000 次模型调用额度', cost: 50, icon: '⚡', category: 'token', rarity: 'common', stock: 99, badge: '效率补给' },
  { id: 'r002', name: '零食惊喜盲盒', description: '随机解锁办公室隐藏零食一份', cost: 30, icon: '🍪', category: 'snack', rarity: 'common', stock: 26, badge: '人气兑换' },
  { id: 'r003', name: '限定企鹅公仔', description: 'AI 先锋限定款 QQ 企鹅公仔', cost: 200, icon: '🐧', category: 'gift', rarity: 'epic', stock: 8, badge: '限量周边' },
  { id: 'r004', name: '弹性下班卡', description: '兑换一次提前 1 小时下班权益', cost: 80, icon: '🏃', category: 'privilege', rarity: 'rare', stock: 12, badge: '本周可用' },
  { id: 'r005', name: '灵感咖啡券', description: '瑞幸或星巴克任意中杯饮品', cost: 40, icon: '☕', category: 'snack', rarity: 'common', stock: 42, badge: '即时到账' },
  { id: 'r006', name: 'AI 先锋战袍', description: '腾讯 AI 先锋限定文化衫', cost: 300, icon: '👕', category: 'gift', rarity: 'legendary', stock: 5, badge: '传奇藏品' },
  { id: 'r007', name: '导师 1v1 密谈', description: '与高级 AI 导师深度交流 30 分钟', cost: 100, icon: '🎓', category: 'privilege', rarity: 'rare', stock: 15, badge: '成长加速' },
  { id: 'r008', name: '创新展示席位', description: '在公司级展示会上发布你的 AI 方案', cost: 150, icon: '🎤', category: 'privilege', rarity: 'epic', stock: 6, badge: '高光时刻' },
];

export function getEarnedTencentken(progress: UserProgress): number {
  return progress.completedUnits.length * 10 +
    (progress.assessmentScores.day30 !== null ? 50 : 0) +
    (progress.assessmentScores.day60 !== null ? 80 : 0) +
    (progress.assessmentScores.day90 !== null ? 120 : 0);
}

export function getTencentkenBalance(progress: UserProgress): number {
  return Math.max(0, getEarnedTencentken(progress) - (progress.spentTencentken || 0));
}

// 成就系统
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  xpReward: number;
  tencentkenReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a001', name: '初出茅庐', description: '完成第一个学习单元',
    icon: '🌱', condition: 'completeFirstUnit', xpReward: 50, tencentkenReward: 10, rarity: 'common',
  },
  {
    id: 'a002', name: 'Prompt 学徒', description: '完成 Prompt Engineering 入门',
    icon: '✍️', condition: 'completePrompt', xpReward: 100, tencentkenReward: 20, rarity: 'common',
  },
  {
    id: 'a003', name: '工具收藏家', description: '学习使用 5 个不同的 AI 工具',
    icon: '🧰', condition: 'useTools5', xpReward: 150, tencentkenReward: 30, rarity: 'rare',
  },
  {
    id: 'a004', name: '新手村毕业', description: '完成 30 天阶段所有学习单元',
    icon: '🎓', condition: 'complete30', xpReward: 300, tencentkenReward: 50, rarity: 'epic',
  },
  {
    id: 'a005', name: '副本征服者', description: '完成 60 天阶段所有学习单元',
    icon: '⚔️', condition: 'complete60', xpReward: 500, tencentkenReward: 80, rarity: 'epic',
  },
  {
    id: 'a006', name: 'AI 先锋', description: '完成 90 天阶段所有学习单元',
    icon: '👑', condition: 'complete90', xpReward: 1000, tencentkenReward: 200, rarity: 'legendary',
  },
  {
    id: 'a007', name: '评估达人', description: '通过 3 次阶段评估',
    icon: '📝', condition: 'passAssess3', xpReward: 200, tencentkenReward: 40, rarity: 'rare',
  },
  {
    id: 'a008', name: '知识贡献者', description: '提交 3 条知识基因',
    icon: '💡', condition: 'contribute3', xpReward: 200, tencentkenReward: 50, rarity: 'rare',
  },
  {
    id: 'a009', name: '连续签到', description: '连续 7 天登录学习',
    icon: '🔥', condition: 'streak7', xpReward: 150, tencentkenReward: 30, rarity: 'rare',
  },
  {
    id: 'a010', name: '探索者', description: '尝试所有 4 种角色路径',
    icon: '🗺️', condition: 'tryAllRoles', xpReward: 250, tencentkenReward: 50, rarity: 'epic',
  },
];

// 等级系统
export interface Level {
  level: number;
  title: string;
  xpRequired: number;
  icon: string;
  perks: string[];
}

export const LEVELS: Level[] = [
  { level: 1, title: '实习生', xpRequired: 0, icon: '🐣', perks: ['基础学习路径'] },
  { level: 2, title: '初级玩家', xpRequired: 100, icon: '🐤', perks: ['解锁 AI 工具推荐'] },
  { level: 3, title: '中级冒险者', xpRequired: 300, icon: '🦅', perks: ['解锁知识基因库'] },
  { level: 4, title: '高级战士', xpRequired: 600, icon: '⚔️', perks: ['解锁进阶任务'] },
  { level: 5, title: '副本大师', xpRequired: 1000, icon: '🏆', perks: ['解锁导师 1v1'] },
  { level: 6, title: 'AI 先锋', xpRequired: 1500, icon: '👑', perks: ['解锁创新路径', '可指导新人'] },
  { level: 7, title: '传奇英雄', xpRequired: 2500, icon: '🌟', perks: ['全功能解锁', '限定周边'] },
];

// 获取等级
export function getLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) return LEVELS[i];
  }
  return LEVELS[0];
}

// 获取下一等级
export function getNextLevel(xp: number): Level | null {
  const current = getLevel(xp);
  const nextIdx = LEVELS.findIndex(l => l.level === current.level + 1);
  return nextIdx >= 0 ? LEVELS[nextIdx] : null;
}

// 计算升级进度百分比
export function getLevelProgress(xp: number): number {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const progress = (xp - current.xpRequired) / (next.xpRequired - current.xpRequired);
  return Math.min(100, Math.max(0, progress * 100));
}

// 获取稀有度颜色
export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return '#9ca3af';
    case 'rare': return '#3b82f6';
    case 'epic': return '#8b5cf6';
    case 'legendary': return '#f59e0b';
    default: return '#9ca3af';
  }
}

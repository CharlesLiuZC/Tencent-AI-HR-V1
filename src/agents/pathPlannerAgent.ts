import type { UserProfile } from '../context/AppContext';
import type { Capability, LearningUnit } from '../types';

export interface PersonalizedPathPlan {
  pace: 'slow' | 'standard' | 'fast';
  weeklyMinutes: number;
  orderedUnits: LearningUnit[];
  priorityUnitIds: string[];
  reasons: string[];
  riskSignals: string[];
  generatedBy: 'ai-rules';
}

const FOUNDATION_TERMS = ['提示', '基础', '入门', '搭建', '安全', '认知'];
const ADVANCED_TERMS = ['Agent', 'RAG', '自动', '工作流', 'LoRA', '生产'];

function matchesAny(unit: LearningUnit, terms: string[]) {
  const haystack = `${unit.title} ${unit.description} ${unit.objectives.join(' ')}`.toLowerCase();
  return terms.some(term => haystack.includes(term.toLowerCase()));
}

export function generatePersonalizedPath(
  profile: UserProfile | null,
  capability: Capability,
  units: LearningUnit[],
): PersonalizedPathPlan {
  const aiLevel = profile?.aiLevel || 2;
  const pace = profile?.recommendedPace.includes('加速')
    ? 'fast'
    : profile?.recommendedPace.includes('慢速')
      ? 'slow'
      : 'standard';
  const preferredTerms = aiLevel <= 2 ? FOUNDATION_TERMS : aiLevel >= 4 ? ADVANCED_TERMS : [];
  const weaknessTerms = profile?.weaknesses.flatMap(item => item.split(/[、，,\s]/).filter(Boolean)) || [];

  const scored = units.map((unit, index) => {
    let score = 100 - index;
    if (matchesAny(unit, preferredTerms)) score += 35;
    if (matchesAny(unit, weaknessTerms)) score += 45;
    if (aiLevel <= 2 && unit.phase === 'day30') score += 25;
    if (aiLevel >= 4 && unit.phase !== 'day30') score += 20;
    return { unit, score };
  });
  const priorityUnitIds = [...scored]
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(item => item.unit.id);

  const weeklyMinutes = pace === 'slow' ? 150 : pace === 'fast' ? 420 : 300;
  const reasons = [
    `${profile?.aiLevelLabel || '初级使用者'}：${aiLevel <= 2 ? '先补齐 AI Native、Prompt 与工具基础' : aiLevel >= 4 ? '减少重复入门，优先进入工作流与团队复用' : '保持基础与岗位实战平衡'}`,
    `${profile?.roleSpecific || `围绕 ${capability} 方向强化真实交付`}`,
    `按${profile?.recommendedPace || '标准进度'}安排，每周建议投入 ${weeklyMinutes} 分钟`,
  ];
  const riskSignals = [
    ...(profile?.weaknesses || []).slice(0, 2),
    ...(pace === 'slow' ? ['任务颗粒度已降低，连续停滞时建议进一步减载'] : []),
  ];

  return {
    pace,
    weeklyMinutes,
    orderedUnits: units,
    priorityUnitIds,
    reasons,
    riskSignals,
    generatedBy: 'ai-rules',
  };
}

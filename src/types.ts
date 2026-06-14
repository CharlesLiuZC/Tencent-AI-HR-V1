// 学习阶段
export type Phase = 'day30' | 'day60' | 'day90';

// 角色类型
export type Role = 'art' | 'design' | 'dev' | 'ops';

// 学习单元分类
export type UnitCategory = 'theory' | 'practice' | 'project' | 'sharing';

// 学习单元
export interface LearningUnit {
  id: string;
  title: string;
  description: string;
  phase: Phase;
  roles: Role[];          // 适用角色，空数组=通用
  duration: number;        // 预估时长（分钟）
  difficulty: 1 | 2 | 3;   // 难度等级
  tools: string[];         // 推荐的 AI 工具
  objectives: string[];    // 学习目标
  prerequisites: string[]; // 前置单元 ID
  category: UnitCategory;
  week: number;            // 第几周
}

// 学习进度
export interface UserProgress {
  completedUnits: string[];
  currentPhase: Phase;
  assessmentScores: Record<Phase, number | null>;
  startDate: string;
  lastActiveDate: string;
}

// AI 工具
export interface AITool {
  id: string;
  name: string;
  category: 'text' | 'image' | 'code' | 'audio' | 'video';
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  useCases: string[];
  roles: Role[];
  phases: Phase[];
  url: string;
}

// 评估题目
export interface AssessmentQuestion {
  id: string;
  phase: Phase;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

// 阶段信息
export interface PhaseInfo {
  key: Phase;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  goals: string[];
  milestones: string[];
  color: string;
  icon: string;
}

// 角色信息
export interface RoleInfo {
  key: Role;
  title: string;
  description: string;
  icon: string;
  color: string;
}

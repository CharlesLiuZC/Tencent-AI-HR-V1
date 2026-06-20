// ==================== 成长副本 V3: 能力方向系统 ====================
// 核心逻辑：基于AI能力方向选择，而非岗位选择
// 30天=该能力的基础知识 → 60天=该能力的进阶提升 → 90天=该能力的项目挑战

// AI能力方向（替代原来的 Role）
export type Capability =
  | 'ai-image'      // AI生图：SD/Midjourney/ControlNet/LoRA
  | 'ai-video'      // AI视频：Seedance/Runway/Sora
  | 'ai-code'       // AI编程：Copilot/Cursor/Agent SDK
  | 'ai-writing'    // AI文案：策划/运营/内容创作
  | 'ai-agent'      // AI Agent：构建自主执行的智能体
  | 'ai-research';  // AI研究：前沿论文/模型训练/SFT

// 能力方向信息
export interface CapabilityInfo {
  key: Capability;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  realProjectExample: string; // 90天终极挑战示例
  tencentTools: string[];     // 推荐的腾讯工具
  entryLevel: 'beginner' | 'intermediate' | 'advanced';
}

// 学习阶段
export type Phase = 'day30' | 'day60' | 'day90';

// 学习单元分类
export type UnitCategory = 'knowledge' | 'practice' | 'challenge' | 'sharing';

// 学习单元（重新设计）
export interface LearningUnit {
  id: string;
  title: string;
  description: string;
  phase: Phase;
  capabilities: Capability[]; // 适用能力方向，空数组=通用
  duration: number;            // 预估时长（分钟）
  difficulty: 1 | 2 | 3;      // 难度等级
  tools: string[];             // 涉及的AI工具
  objectives: string[];        // 学习目标
  prerequisites: string[];     // 前置单元ID
  category: UnitCategory;
  week: number;
  isRealChallenge: boolean;    // 是否为真实挑战任务
  deliverable?: string;        // 交付物描述（挑战任务必填）
}

// 学习进度
export interface UserProgress {
  completedUnits: string[];
  currentPhase: Phase;
  assessmentScores: Record<Phase, number | null>;
  startDate: string;
  lastActiveDate: string;
  selectedCapability: Capability | null;
}

// AI 工具
export interface AITool {
  id: string;
  name: string;
  category: 'text' | 'image' | 'code' | 'audio' | 'video' | 'agent';
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  useCases: string[];
  capabilities: Capability[];
  phases: Phase[];
  url: string;
}

// 评估题目
export interface AssessmentQuestion {
  id: string;
  phase: Phase;
  capability: Capability | 'all';
  question: string;
  type: 'choice' | 'open' | 'challenge';
  options?: string[];
  correctIndex?: number;
  challengePrompt?: string;   // 挑战题的Prompt
  evaluationCriteria?: string; // 评估标准
  explanation: string;
  category: string;
}

// 阶段信息
export interface PhaseInfo {
  key: Phase;
  title: string;
  subtitle: string;
  description: string;
  motto: string; // 功夫熊猫语录
  duration: string;
  color: string;
  icon: string;
}

// 论坛帖子
export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar: string; // AvatarConfig JSON
  authorCapability: Capability;
  title: string;
  content: string;
  deliverable?: string; // 交付物链接/描述
  unitId: string;       // 关联的学习单元
  likes: number;
  comments: ForumComment[];
  createdAt: string;
  isExcellent: boolean; // 是否被标记为优秀作品
  xpReward: number;
}

export interface ForumComment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

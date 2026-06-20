import { PhaseInfo, CapabilityInfo, LearningUnit, Phase, Capability } from '../types';

// ==================== 阶段信息（功夫熊猫语录） ====================
export const PHASES: Record<Phase, PhaseInfo> = {
  day30: {
    key: 'day30', title: 'Day 1-30', subtitle: '静心修炼',
    description: '打基础，建立AI能力的第一块基石',
    motto: '昨天是历史，明天是谜团，只有今天是天赐的礼物。',
    duration: '30天', color: '#10B981', icon: '🌱',
  },
  day60: {
    key: 'day60', title: 'Day 31-60', subtitle: '磨砺精进',
    description: '进阶提升，让AI成为你的第二本能',
    motto: '真正的力量来自内心的平静。',
    duration: '30天', color: '#3B82F6', icon: '⚔️',
  },
  day90: {
    key: 'day90', title: 'Day 61-90', subtitle: '神龙挑战',
    description: '完成一个真实的、有交付物的项目挑战',
    motto: '不是神龙大侠选中了你，而是你选择了成为神龙大侠。',
    duration: '30天', color: '#8B5CF6', icon: '🏆',
  },
};

// ==================== 能力方向定义 ====================
export const CAPABILITIES: Record<Capability, CapabilityInfo> = {
  'ai-image': {
    key: 'ai-image', title: 'AI 生图', subtitle: '用AI创造视觉世界',
    description: '从Stable Diffusion到Midjourney，掌握AI图像生成的完整技能链',
    icon: '🎨', color: '#F59E0B',
    realProjectExample: '生成"腾讯&三角洲行动三周年"游戏Banner',
    tencentTools: ['腾讯混元图像3.0', '腾讯妙境Miora'], entryLevel: 'beginner',
  },
  'ai-video': {
    key: 'ai-video', title: 'AI 视频', subtitle: '用AI驱动动态影像',
    description: '从Seedance到Runway，掌握AI视频生成和编辑',
    icon: '🎬', color: '#EF4444',
    realProjectExample: '制作"三角洲行动新赛季"30秒宣传PV',
    tencentTools: ['腾讯混元视频', '腾讯混元世界模型'], entryLevel: 'intermediate',
  },
  'ai-code': {
    key: 'ai-code', title: 'AI 编程', subtitle: '用AI重构开发方式',
    description: '从Copilot到Agent SDK，让AI成为你的编程搭档',
    icon: '💻', color: '#06B6D4',
    realProjectExample: '训练"唇齿音算法模型"增强AI配音真实感',
    tencentTools: ['CodeBuddy', 'TokenHub'], entryLevel: 'beginner',
  },
  'ai-writing': {
    key: 'ai-writing', title: 'AI 文案', subtitle: '用AI赋能内容创作',
    description: '从策划案到运营文案，用AI提升内容产出效率10倍',
    icon: '✍️', color: '#8B5CF6',
    realProjectExample: '用AI完成一套完整的游戏版本更新策划案',
    tencentTools: ['腾讯元宝', '腾讯文档AI', 'WorkBuddy'], entryLevel: 'beginner',
  },
  'ai-agent': {
    key: 'ai-agent', title: 'AI Agent', subtitle: '构建会自主执行的智能体',
    description: '从对话到行动，让AI不仅能回答问题，还能自主完成任务',
    icon: '🤖', color: '#10B981',
    realProjectExample: '构建一个"自动竞品分析Agent"，每周自动输出报告',
    tencentTools: ['WorkBuddy', '腾讯混元API', 'ADP 4.0'], entryLevel: 'intermediate',
  },
  'ai-research': {
    key: 'ai-research', title: 'AI 研究', subtitle: '探索AI的前沿边界',
    description: '从论文到模型训练，成为团队的AI技术专家',
    icon: '🔬', color: '#EC4899',
    realProjectExample: '基于Seedance 2.0论文复现并改进视频生成模型',
    tencentTools: ['腾讯混元大模型', 'TokenHub', 'HunyuanT1'], entryLevel: 'advanced',
  },
};

// ==================== 学习单元 ====================
export const LEARNING_UNITS: LearningUnit[] = [
  // 通用基础
  { id: 'u000', title: 'AI认知觉醒：从工具到伙伴', description: '理解AI的本质，建立正确的AI协作心态。你不是来"学AI"的，你是来和AI一起战斗的。', phase: 'day30', capabilities: [], duration: 30, difficulty: 1, tools: ['腾讯元宝', 'ChatGPT', 'Claude'], objectives: ['理解大语言模型核心原理', '建立AI伙伴心态', '完成第一个AI对话'], prerequisites: [], category: 'knowledge', week: 1, isRealChallenge: false },
  { id: 'u001', title: 'Prompt Engineering：和AI说人话', description: '掌握与AI高效沟通的艺术，学会用结构化Prompt引导AI产出高质量结果。', phase: 'day30', capabilities: [], duration: 45, difficulty: 1, tools: ['ChatGPT', 'Claude'], objectives: ['掌握CRISPE框架', '编写5个有效Prompt', '识别低质量Prompt'], prerequisites: ['u000'], category: 'practice', week: 1, isRealChallenge: false },
  { id: 'u002', title: 'AI伦理与安全：负责任地使用AI', description: '了解AI使用中的伦理边界、数据隐私和版权问题。', phase: 'day30', capabilities: [], duration: 30, difficulty: 1, tools: [], objectives: ['识别AI幻觉和偏见', '理解数据隐私红线', '掌握AI使用政策'], prerequisites: [], category: 'knowledge', week: 1, isRealChallenge: false },

  // AI生图 30天
  { id: 'img30-1', title: 'Midjourney入门：从文字到画面', description: '学习Midjourney的基本使用，掌握Prompt结构和风格控制。', phase: 'day30', capabilities: ['ai-image'], duration: 60, difficulty: 1, tools: ['Midjourney'], objectives: ['掌握MJ Prompt公式', '生成10张不同风格图像', '理解--ar/--v/--s参数'], prerequisites: ['u001'], category: 'practice', week: 2, isRealChallenge: false },
  { id: 'img30-2', title: 'Stable Diffusion本地部署', description: '使用秋葉整合包一键部署SD，理解WebUI界面和核心参数。', phase: 'day30', capabilities: ['ai-image'], duration: 90, difficulty: 2, tools: ['Stable Diffusion', 'ComfyUI'], objectives: ['完成SD本地部署', '理解CFG/Steps/Sampler参数', '生成第一张AI图像'], prerequisites: ['u001'], category: 'practice', week: 2, isRealChallenge: false },
  { id: 'img30-3', title: '基础挑战：为游戏角色生成概念图', description: '用AI为一款游戏角色生成3个不同风格的概念设计方案。', phase: 'day30', capabilities: ['ai-image'], duration: 120, difficulty: 2, tools: ['Midjourney', 'Stable Diffusion'], objectives: ['完成3个风格的角色概念图', '撰写Prompt迭代日志', '对比MJ和SD差异'], prerequisites: ['img30-1', 'img30-2'], category: 'challenge', week: 4, isRealChallenge: true, deliverable: '3张角色概念图 + Prompt迭代日志' },

  // AI生图 60天
  { id: 'img60-1', title: 'ControlNet精确控制：让AI画你想画的', description: '掌握ControlNet，实现姿势控制、边缘检测、深度图等精确控制。', phase: 'day60', capabilities: ['ai-image'], duration: 90, difficulty: 3, tools: ['Stable Diffusion', 'ControlNet'], objectives: ['理解ControlNet各预处理器', '实现姿势到角色精确控制', '组合多个ControlNet'], prerequisites: ['img30-3'], category: 'practice', week: 5, isRealChallenge: false },
  { id: 'img60-2', title: 'LoRA训练：定制你的专属画风', description: '学习LoRA微调技术，用少量数据训练出特定风格或角色的模型。', phase: 'day60', capabilities: ['ai-image'], duration: 120, difficulty: 3, tools: ['Stable Diffusion', 'LoRA Training'], objectives: ['准备训练数据集', '完成LoRA训练', '生成一致风格图像'], prerequisites: ['img60-1'], category: 'practice', week: 6, isRealChallenge: false },
  { id: 'img60-3', title: 'AI美术工作流搭建', description: '用ComfyUI搭建完整的AI美术工作流，实现从概念到成品的自动化。', phase: 'day60', capabilities: ['ai-image'], duration: 120, difficulty: 3, tools: ['ComfyUI', 'Stable Diffusion'], objectives: ['搭建ComfyUI工作流', '实现批量生成', '导出可复用模板'], prerequisites: ['img60-2'], category: 'practice', week: 7, isRealChallenge: false },

  // AI生图 90天
  { id: 'img90-1', title: '终极挑战：生成腾讯&三角洲行动三周年Banner', description: '真实项目挑战：为"三角洲行动"三周年活动设计并生成游戏Banner，要求风格统一、质量达标、可直接使用。', phase: 'day90', capabilities: ['ai-image'], duration: 480, difficulty: 3, tools: ['Stable Diffusion', 'ComfyUI', 'LoRA', 'ControlNet'], objectives: ['理解品牌视觉规范', '生成符合要求的Banner', '输出多尺寸适配版本', '撰写创作过程文档'], prerequisites: ['img60-3'], category: 'challenge', week: 11, isRealChallenge: true, deliverable: '三角洲行动三周年Banner（多尺寸）+ 创作过程文档 + LoRA模型' },

  // AI视频
  { id: 'vid30-1', title: 'Seedance 2.0论文精读', description: '深入理解Seedance 2.0的模型架构、训练方法和生成原理。', phase: 'day30', capabilities: ['ai-video'], duration: 90, difficulty: 2, tools: [], objectives: ['理解视频生成模型基本原理', '掌握Seedance 2.0核心创新点', '对比HappyHorse等竞品架构'], prerequisites: ['u001'], category: 'knowledge', week: 2, isRealChallenge: false },
  { id: 'vid30-2', title: 'AI视频工具入门：Runway/Sora体验', description: '体验主流AI视频生成工具，理解各自的能力边界。', phase: 'day30', capabilities: ['ai-video'], duration: 60, difficulty: 1, tools: ['Runway', 'Sora', '腾讯混元视频'], objectives: ['体验3个AI视频工具', '理解文生视频和图生视频区别', '生成第一个AI视频'], prerequisites: ['u001'], category: 'practice', week: 3, isRealChallenge: false },
  { id: 'vid60-1', title: '视频生成模型SFT实战', description: '基于开源视频生成模型进行Supervised Fine-Tuning。', phase: 'day60', capabilities: ['ai-video'], duration: 180, difficulty: 3, tools: ['PyTorch', 'HuggingFace Transformers'], objectives: ['准备视频数据集', '完成SFT训练', '评估生成质量'], prerequisites: ['vid30-2'], category: 'practice', week: 6, isRealChallenge: false },
  { id: 'vid90-1', title: '终极挑战：制作三角洲行动新赛季30秒宣传PV', description: '用AI视频工具制作一段30秒的游戏宣传PV。', phase: 'day90', capabilities: ['ai-video'], duration: 480, difficulty: 3, tools: ['Runway', 'Sora', 'ComfyUI'], objectives: ['设计分镜脚本', '生成各镜头素材', '剪辑合成完整PV'], prerequisites: ['vid60-1'], category: 'challenge', week: 11, isRealChallenge: true, deliverable: '30秒宣传PV + 分镜脚本 + 制作过程文档' },

  // AI编程
  { id: 'code30-1', title: 'Copilot/Cursor入门：与AI结对编程', description: '配置并使用AI编程助手，体验AI辅助编程的效率提升。', phase: 'day30', capabilities: ['ai-code'], duration: 60, difficulty: 1, tools: ['GitHub Copilot', 'Cursor'], objectives: ['配置AI编程助手', '完成3个编程任务', '掌握AI辅助编程最佳实践'], prerequisites: ['u001'], category: 'practice', week: 2, isRealChallenge: false },
  { id: 'code30-2', title: 'Seedance 2.0 vs HappyHorse架构对比', description: '深入分析两个视频生成模型的架构差异。', phase: 'day30', capabilities: ['ai-code', 'ai-research'], duration: 120, difficulty: 3, tools: [], objectives: ['理解两个模型架构设计', '对比训练策略差异', '撰写技术分析报告'], prerequisites: ['u001'], category: 'knowledge', week: 3, isRealChallenge: false },
  { id: 'code60-1', title: '模型SFT/Finetuning实战', description: '基于开源模型进行Supervised Fine-Tuning。', phase: 'day60', capabilities: ['ai-code', 'ai-research'], duration: 180, difficulty: 3, tools: ['PyTorch', 'HuggingFace', 'LoRA'], objectives: ['准备训练数据', '完成模型SFT', '评估微调效果'], prerequisites: ['code30-2'], category: 'practice', week: 6, isRealChallenge: false },
  { id: 'code90-1', title: '终极挑战：训练唇齿音算法模型', description: '训练一个增强AI配音唇齿音真实感的算法模型。', phase: 'day90', capabilities: ['ai-code', 'ai-research'], duration: 720, difficulty: 3, tools: ['PyTorch', 'Wav2Lip', '自定义模型'], objectives: ['收集唇齿音数据集', '设计模型架构', '训练并评估模型', '撰写技术文档'], prerequisites: ['code60-1'], category: 'challenge', week: 11, isRealChallenge: true, deliverable: '唇齿音增强模型 + 训练代码 + 评估报告 + 技术文档' },

  // AI文案
  { id: 'wri30-1', title: 'AI辅助策划案撰写', description: '用AI从零开始撰写一份完整的游戏策划案。', phase: 'day30', capabilities: ['ai-writing'], duration: 90, difficulty: 1, tools: ['腾讯元宝', 'ChatGPT', 'Notion AI'], objectives: ['用AI生成策划案框架', 'AI辅助内容填充', '人工审核和优化'], prerequisites: ['u001'], category: 'practice', week: 2, isRealChallenge: false },
  { id: 'wri30-2', title: 'AI数据分析与洞察提取', description: '用AI分析游戏数据，提取可执行的运营洞察。', phase: 'day30', capabilities: ['ai-writing'], duration: 60, difficulty: 2, tools: ['腾讯元宝', 'ChatGPT'], objectives: ['用AI分析CSV/Excel数据', '生成数据可视化', '提取可执行洞察'], prerequisites: ['u001'], category: 'practice', week: 3, isRealChallenge: false },
  { id: 'wri60-1', title: 'AI驱动的竞品分析工作流', description: '搭建完整的AI竞品分析工作流。', phase: 'day60', capabilities: ['ai-writing'], duration: 120, difficulty: 2, tools: ['腾讯元宝', 'WorkBuddy'], objectives: ['设计竞品分析框架', '用AI自动化数据收集', '生成周度竞品报告'], prerequisites: ['wri30-2'], category: 'practice', week: 6, isRealChallenge: false },
  { id: 'wri90-1', title: '终极挑战：用AI完成完整版本更新策划案', description: '用AI辅助完成一套完整的游戏版本更新策划案。', phase: 'day90', capabilities: ['ai-writing'], duration: 480, difficulty: 3, tools: ['腾讯元宝', 'ChatGPT', 'Notion AI', 'WorkBuddy'], objectives: ['设计版本主题和玩法', 'AI辅助数值平衡', '生成完整活动方案', '通过评审'], prerequisites: ['wri60-1'], category: 'challenge', week: 11, isRealChallenge: true, deliverable: '完整版本更新策划案 + AI使用过程文档' },

  // AI Agent
  { id: 'agt30-1', title: '什么是AI Agent？从对话到行动', description: '理解AI Agent的核心概念，体验Coze/Dify等零代码Agent搭建工具。', phase: 'day30', capabilities: ['ai-agent'], duration: 60, difficulty: 1, tools: ['Coze', 'Dify'], objectives: ['理解Agent核心架构', '用Coze搭建第一个Agent', '测试Agent自主决策能力'], prerequisites: ['u001'], category: 'practice', week: 2, isRealChallenge: false },
  { id: 'agt30-2', title: 'Agent设计模式：ReAct/CoT/Tool Use', description: '学习主流的Agent设计模式。', phase: 'day30', capabilities: ['ai-agent'], duration: 90, difficulty: 2, tools: [], objectives: ['理解ReAct模式', '掌握Tool Use机制', '设计简单Agent工作流'], prerequisites: ['agt30-1'], category: 'knowledge', week: 3, isRealChallenge: false },
  { id: 'agt60-1', title: '用Claude Agent SDK构建生产级Agent', description: '基于Claude Agent SDK构建一个可以实际使用的Agent。', phase: 'day60', capabilities: ['ai-agent'], duration: 180, difficulty: 3, tools: ['Claude Agent SDK', 'TypeScript'], objectives: ['搭建Agent开发环境', '实现工具调用和记忆功能', '部署Agent到生产环境'], prerequisites: ['agt30-2'], category: 'practice', week: 6, isRealChallenge: false },
  { id: 'agt90-1', title: '终极挑战：构建自动竞品分析Agent', description: '构建一个每周自动运行的竞品分析Agent。', phase: 'day90', capabilities: ['ai-agent'], duration: 480, difficulty: 3, tools: ['Claude Agent SDK', 'WorkBuddy', '腾讯文档AI'], objectives: ['设计Agent架构', '实现数据收集和分析', '设置定时任务', '输出可读报告'], prerequisites: ['agt60-1'], category: 'challenge', week: 11, isRealChallenge: true, deliverable: '自动竞品分析Agent + 首份自动报告 + 部署文档' },

  // AI研究
  { id: 'res30-1', title: 'Transformer架构深度解析', description: '深入理解Transformer的核心机制。', phase: 'day30', capabilities: ['ai-research'], duration: 120, difficulty: 3, tools: [], objectives: ['理解Self-Attention数学原理', '实现简化版Transformer', '分析注意力可视化'], prerequisites: ['u001'], category: 'knowledge', week: 2, isRealChallenge: false },
  { id: 'res30-2', title: 'Seedance 2.0论文精读与复现', description: '精读Seedance 2.0论文，尝试复现核心模块。', phase: 'day30', capabilities: ['ai-research'], duration: 180, difficulty: 3, tools: ['PyTorch'], objectives: ['精读论文并撰写笔记', '复现核心模块', '对比实验结果'], prerequisites: ['res30-1'], category: 'knowledge', week: 4, isRealChallenge: false },
  { id: 'res60-1', title: '模型微调实战：SFT + LoRA + RLHF', description: '掌握模型微调的三大技术路线。', phase: 'day60', capabilities: ['ai-research'], duration: 240, difficulty: 3, tools: ['PyTorch', 'HuggingFace', 'DeepSpeed'], objectives: ['完成SFT微调', '实现LoRA高效微调', '理解RLHF原理'], prerequisites: ['res30-2'], category: 'practice', week: 7, isRealChallenge: false },
  { id: 'res90-1', title: '终极挑战：复现并改进视频生成模型', description: '基于Seedance 2.0论文复现核心模块，并提出改进方案。', phase: 'day90', capabilities: ['ai-research'], duration: 720, difficulty: 3, tools: ['PyTorch', 'DeepSpeed', 'Wandb'], objectives: ['复现核心模块', '设计改进方案', '训练并评估', '撰写技术报告'], prerequisites: ['res60-1'], category: 'challenge', week: 11, isRealChallenge: true, deliverable: '改进后的模型 + 训练代码 + 评估报告 + 技术论文' },
];

// ==================== 辅助函数 ====================
export function getLearningPath(capability: Capability, phase?: Phase): LearningUnit[] {
  return LEARNING_UNITS.filter(unit => {
    const phaseMatch = phase ? unit.phase === phase : true;
    const capMatch = unit.capabilities.length === 0 || unit.capabilities.includes(capability);
    return phaseMatch && capMatch;
  });
}

export function getPhaseInfo(phase: Phase): PhaseInfo { return PHASES[phase]; }
export function getAllPhases(): PhaseInfo[] { return Object.values(PHASES); }
export function getAllCapabilities(): CapabilityInfo[] { return Object.values(CAPABILITIES); }
export function getCapabilityInfo(cap: Capability): CapabilityInfo { return CAPABILITIES[cap]; }

import { AssessmentQuestion } from '../types';

export const ASSESSMENTS: AssessmentQuestion[] = [
  // ==================== Day 30 评估 ====================
  {
    id: 'q001',
    phase: 'day30',
    question: '大语言模型（LLM）的核心工作原理是什么？',
    options: [
      '通过规则引擎匹配预设答案',
      '通过统计学习预测下一个最可能的词',
      '通过数据库检索精确答案',
      '通过人工编写所有可能的回复',
    ],
    correctIndex: 1,
    explanation: 'LLM 本质上是一个概率模型，通过在海量文本上训练，学习预测下一个最可能的词（token）。',
    category: 'AI基础',
  },
  {
    id: 'q002',
    phase: 'day30',
    question: '以下哪种 Prompt 写法最有效？',
    options: [
      '帮我写点东西',
      '帮我写一封邮件',
      '你是一位专业的项目经理，请帮我写一封催促供应商交付的邮件，语气要坚定但礼貌，约200字',
      '写邮件催供应商',
    ],
    correctIndex: 2,
    explanation: '有效的 Prompt 应包含角色设定（Role）、具体任务（Instruction）、约束条件（Style/Length）等要素。',
    category: 'Prompt Engineering',
  },
  {
    id: 'q003',
    phase: 'day30',
    question: '使用 AI 工具时，以下哪种做法存在数据安全风险？',
    options: [
      '用 AI 润色公开发表的博客文章',
      '将公司未公开的财务数据粘贴到 ChatGPT 中分析',
      '用 AI 翻译公开的技术文档',
      '用 AI 生成会议议程模板',
    ],
    correctIndex: 1,
    explanation: '将公司敏感数据输入公共 AI 服务可能导致数据泄露。应使用企业级 AI 服务或脱敏后处理。',
    category: 'AI伦理与安全',
  },
  {
    id: 'q004',
    phase: 'day30',
    question: 'Chain of Thought（思维链）Prompt 技巧的核心思想是什么？',
    options: [
      '让 AI 一次只回答一个问题',
      '让 AI 展示推理过程，逐步思考',
      '让 AI 记住之前的对话内容',
      '让 AI 使用特定的代码格式',
    ],
    correctIndex: 1,
    explanation: 'CoT 通过要求 AI "逐步思考"来引导其展示推理过程，通常能显著提升复杂任务的准确率。',
    category: 'Prompt Engineering',
  },
  {
    id: 'q005',
    phase: 'day30',
    question: '以下哪个不是 AI 图像生成工具的常见参数？',
    options: [
      'CFG Scale（提示词引导强度）',
      'Steps（采样步数）',
      'Seed（随机种子）',
      'FPS（帧率）',
    ],
    correctIndex: 3,
    explanation: 'CFG Scale、Steps、Seed 都是 AI 图像生成的常见参数。FPS 是视频帧率参数，不直接用于静态图像生成。',
    category: 'AI图像生成',
  },
  {
    id: 'q006',
    phase: 'day30',
    question: 'GitHub Copilot 的工作原理是？',
    options: [
      '从 GitHub 仓库中复制粘贴现有代码',
      '根据上下文和注释生成代码建议',
      '自动修复所有 Bug',
      '替代程序员编写整个项目',
    ],
    correctIndex: 1,
    explanation: 'Copilot 根据当前文件的上下文（代码、注释、文件名等）生成代码建议，是一个智能补全工具。',
    category: 'AI编程',
  },
  {
    id: 'q007',
    phase: 'day30',
    question: 'Few-shot Prompting 是指什么？',
    options: [
      '只问 AI 很少的问题',
      '在 Prompt 中提供几个示例来引导 AI',
      '限制 AI 的回答字数',
      '使用最少的 API 调用',
    ],
    correctIndex: 1,
    explanation: 'Few-shot 通过在 Prompt 中提供少量示例（通常 2-5 个），让 AI 理解期望的输出格式和风格。',
    category: 'Prompt Engineering',
  },
  {
    id: 'q008',
    phase: 'day30',
    question: 'AI 生成的内容可能存在哪些问题？（单选）',
    options: [
      '完全准确，无需人工审核',
      '可能存在事实错误（幻觉），需要人工验证',
      '只能生成英文内容',
      '无法处理中文',
    ],
    correctIndex: 1,
    explanation: 'AI 可能产生"幻觉"（Hallucination），即生成看似合理但实际错误的内容。所有 AI 输出都需要人工审核。',
    category: 'AI基础',
  },
  // ==================== Day 60 评估 ====================
  {
    id: 'q009',
    phase: 'day60',
    question: '设计 AI 工作流时，首要考虑的原则是什么？',
    options: [
      '尽可能多地使用 AI 工具',
      '以业务目标为导向，AI 服务于目标',
      '选择最贵的 AI 工具',
      '完全替代人工',
    ],
    correctIndex: 1,
    explanation: 'AI 工作流设计应以业务目标为导向，选择合适的 AI 工具来提升效率，而非为了用 AI 而用 AI。',
    category: 'AI工作流',
  },
  {
    id: 'q010',
    phase: 'day60',
    question: '在团队中推广 AI 使用的最佳策略是？',
    options: [
      '强制所有人使用 AI',
      '自上而下制定 AI 使用规范',
      '通过成功案例和实践分享，让团队成员看到价值',
      '只培训技术岗位',
    ],
    correctIndex: 2,
    explanation: '通过展示成功案例和实际效果，让团队成员自发认同 AI 的价值，比强制推广更有效。',
    category: 'AI推广',
  },
  {
    id: 'q011',
    phase: 'day60',
    question: '量化 AI 带来的效率提升，应该关注哪些指标？',
    options: [
      '只看 AI 工具的使用次数',
      '任务完成时间、质量评分、人力成本节省',
      '只看 AI 生成内容的数量',
      '只看员工满意度',
    ],
    correctIndex: 1,
    explanation: '应从时间效率、质量提升、成本节省等多维度量化 AI 的价值。',
    category: 'AI效果评估',
  },
  {
    id: 'q012',
    phase: 'day60',
    question: 'LoRA 模型微调的核心优势是什么？',
    options: [
      '需要大量计算资源',
      '只需少量数据和资源即可定制模型',
      '完全替代原始模型',
      '只能用于文本生成',
    ],
    correctIndex: 1,
    explanation: 'LoRA（Low-Rank Adaptation）通过低秩分解的方式微调模型，只需少量数据和计算资源即可定制模型行为。',
    category: 'AI模型',
  },
  // ==================== Day 90 评估 ====================
  {
    id: 'q013',
    phase: 'day90',
    question: 'AI Agent 与传统 AI 工具的本质区别是什么？',
    options: [
      'Agent 更贵',
      'Agent 能自主规划和执行多步任务',
      'Agent 只能回答问题',
      'Agent 不需要 Prompt',
    ],
    correctIndex: 1,
    explanation: 'AI Agent 的核心特征是自主性 -- 能够理解目标、制定计划、调用工具、执行任务并根据反馈调整。',
    category: 'AI Agent',
  },
  {
    id: 'q014',
    phase: 'day90',
    question: '评估一个 AI 创新方案的价值，最重要的标准是？',
    options: [
      '技术是否足够新',
      '是否解决了真实的业务痛点',
      '使用了多少个 AI 工具',
      '代码量有多大',
    ],
    correctIndex: 1,
    explanation: 'AI 创新方案的核心价值在于解决真实业务问题，技术新颖度和工具数量只是手段。',
    category: 'AI创新',
  },
  {
    id: 'q015',
    phase: 'day90',
    question: '在 AI Native 组织中，人的核心价值是什么？',
    options: [
      '写代码',
      '创意、判断、同理心和复杂决策',
      '操作 AI 工具',
      '管理数据库',
    ],
    correctIndex: 1,
    explanation: '在 AI Native 组织中，重复性工作交给 AI，人的核心价值在于创造力、判断力、同理心和处理复杂情境的能力。',
    category: 'AI Native',
  },
];

export function getAssessmentByPhase(phase: string): AssessmentQuestion[] {
  return ASSESSMENTS.filter(q => q.phase === phase);
}

export function getRandomAssessment(phase: string, count: number = 5): AssessmentQuestion[] {
  const phaseQuestions = getAssessmentByPhase(phase);
  const shuffled = [...phaseQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

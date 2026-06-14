import { Role, Phase } from '../types';

// 基因类型
export type GeneType = 'prompt' | 'pitfall' | 'collaboration' | 'insight';

// 基因类型信息
export const GENE_TYPES: Record<GeneType, { label: string; icon: string; color: string; description: string }> = {
  prompt: {
    label: '提示词基因',
    icon: '📜',
    color: '#3b82f6',
    description: '经过验证的高效提示词模板',
  },
  pitfall: {
    label: '翻车基因',
    icon: '⚠️',
    color: '#ef4444',
    description: '前人踩过的坑和教训',
  },
  collaboration: {
    label: '协作模式基因',
    icon: '🤝',
    color: '#22c55e',
    description: '人机协作的标准化 SOP',
  },
  insight: {
    label: '顿悟时刻基因',
    icon: '💡',
    color: '#f59e0b',
    description: '关键认知突破',
  },
};

// 知识基因
export interface KnowledgeGene {
  geneId: string;
  type: GeneType;
  title: string;
  content: string;
  source: {
    contributor: string;
    questId: string;
    originalContext: string;
  };
  quality: {
    rating: number;        // 1-5
    validatedBy: number;   // 验证人数
    lastValidated: string;
  };
  applicable: {
    roles: Role[] | 'all';
    phases: Phase[];
    abilityLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
    taskCategories: string[];
    emotionalStates?: string[];
  };
  evolution: {
    version: number;
    mergedFrom?: string[];
    changelog: string;
  };
  innovationDeviation?: number; // 创新偏离度 0-1
}

// 知识基因库
export const KNOWLEDGE_GENES: KnowledgeGene[] = [
  // ==================== 提示词基因 ====================
  {
    geneId: 'GENE_0001',
    type: 'prompt',
    title: '角色扮演审稿法',
    content: '请你扮演[某知名制作人/设计师]，用 ta 的设计哲学审视以下方案，逐一指出违背其理念的地方，并给出改进方向。',
    source: {
      contributor: '张小萌',
      questId: 'u009',
      originalContext: '做 30 天实战项目时，发现让 AI 扮演特定角色能大幅提升反馈质量',
    },
    quality: { rating: 5, validatedBy: 12, lastValidated: '2026-06-10' },
    applicable: {
      roles: ['design', 'ops'],
      phases: ['day30', 'day60', 'day90'],
      abilityLevel: 'all',
      taskCategories: ['策划案撰写', '方案评审', '文案优化'],
      emotionalStates: ['自信不足'],
    },
    evolution: { version: 2, changelog: 'V2: 增加了"给出反例"的要求，使反馈更具体' },
  },
  {
    geneId: 'GENE_0002',
    type: 'prompt',
    title: 'CRISPE 框架万能 Prompt',
    content: 'Context(背景): [描述场景]\nRole(角色): [AI 扮演谁]\nInstruction(指令): [具体任务]\nStyle(风格): [输出风格]\nPurpose(目的): [用途]\nExample(示例): [参考样例]',
    source: {
      contributor: '李大力',
      questId: 'u002',
      originalContext: 'Prompt Engineering 入门课程中总结的最佳实践',
    },
    quality: { rating: 5, validatedBy: 25, lastValidated: '2026-06-12' },
    applicable: {
      roles: 'all',
      phases: ['day30'],
      abilityLevel: 'beginner',
      taskCategories: ['所有 AI 交互'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0003',
    type: 'prompt',
    title: '分段审阅法',
    content: '不要一次把整个文档丢给 AI。拆成 3-5 段，每段给不同的审视角：\n第 1 段：逻辑一致性\n第 2 段：用户价值\n第 3 段：可行性\n第 4 段：创新性\n最后让 AI 综合点评。',
    source: {
      contributor: '王小花',
      questId: 'u013',
      originalContext: '做策划 AI 深度探索时发现 AI 只关注长文档的开头部分',
    },
    quality: { rating: 4, validatedBy: 8, lastValidated: '2026-06-08' },
    applicable: {
      roles: ['design', 'ops'],
      phases: ['day60', 'day90'],
      abilityLevel: 'intermediate',
      taskCategories: ['文档审阅', '方案评审'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0004',
    type: 'prompt',
    title: '代码审查三步法',
    content: '第 1 步：让 AI 列出代码中的潜在 Bug\n第 2 步：让 AI 评估代码的可维护性和性能\n第 3 步：让 AI 给出重构建议并生成单元测试',
    source: {
      contributor: '赵大锤',
      questId: 'u014',
      originalContext: '程序 AI 深度探索中总结的代码审查最佳实践',
    },
    quality: { rating: 5, validatedBy: 15, lastValidated: '2026-06-11' },
    applicable: {
      roles: ['dev'],
      phases: ['day60', 'day90'],
      abilityLevel: 'intermediate',
      taskCategories: ['代码审查', '代码重构'],
    },
    evolution: { version: 2, changelog: 'V2: 增加了单元测试生成步骤' },
  },
  {
    geneId: 'GENE_0005',
    type: 'prompt',
    title: '数据洞察提取术',
    content: '请分析以下数据，按这个框架输出：\n1. 最出乎意料的发现是什么？\n2. 数据中隐藏的最大风险是什么？\n3. 如果只能做一件事来改善，应该做什么？\n4. 这个数据的局限性是什么？',
    source: {
      contributor: '陈小美',
      questId: 'u006',
      originalContext: '运营数据分析入门时发现 AI 给的分析太表面',
    },
    quality: { rating: 4, validatedBy: 10, lastValidated: '2026-06-09' },
    applicable: {
      roles: ['ops', 'design'],
      phases: ['day30', 'day60'],
      abilityLevel: 'all',
      taskCategories: ['数据分析', '运营决策'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0006',
    type: 'prompt',
    title: 'AI 图像生成精准控制术',
    content: 'Midjourney 提示词公式：\n[主体描述] + [风格] + [构图] + [光照] + [色调] + [细节]\n\n示例：\nA brave knight standing on a cliff, fantasy art style, wide angle, dramatic lighting, warm golden tones, highly detailed armor --ar 16:9 --v 6',
    source: {
      contributor: '孙小艺',
      questId: 'u004',
      originalContext: 'AI 图像生成课程中总结的提示词结构化方法',
    },
    quality: { rating: 5, validatedBy: 18, lastValidated: '2026-06-12' },
    applicable: {
      roles: ['art', 'design'],
      phases: ['day30', 'day60'],
      abilityLevel: 'all',
      taskCategories: ['概念设计', '场景原画', '角色设计'],
    },
    evolution: { version: 3, changelog: 'V3: 增加了 --ar 和 --v 参数说明' },
  },

  // ==================== 翻车基因 ====================
  {
    geneId: 'GENE_0007',
    type: 'pitfall',
    title: 'AI 中英文混杂陷阱',
    content: '用 AI 分析数据时，不加"请用中文回答"，AI 常中英文混杂输出，导致报告需要大量人工翻译。\n\n解法：在 Prompt 开头加"请全程使用中文回复"。',
    source: {
      contributor: '李大力',
      questId: 'u006',
      originalContext: '第一次用 AI 做数据分析报告时踩的坑',
    },
    quality: { rating: 4, validatedBy: 20, lastValidated: '2026-06-10' },
    applicable: {
      roles: 'all',
      phases: ['day30'],
      abilityLevel: 'beginner',
      taskCategories: ['数据分析', '报告生成'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0008',
    type: 'pitfall',
    title: '一次性喂太长的文档',
    content: '把 10 页策划案一次性丢给 AI，AI 只关注开头和结尾，中间内容被忽略。\n\n解法：拆成 3-5 段分别处理，或使用 Claude 等擅长长文本的模型。',
    source: {
      contributor: '王小花',
      questId: 'u013',
      originalContext: '做策划案评审时发现 AI 只回复了前两页的内容',
    },
    quality: { rating: 5, validatedBy: 15, lastValidated: '2026-06-11' },
    applicable: {
      roles: 'all',
      phases: ['day30', 'day60'],
      abilityLevel: 'beginner',
      taskCategories: ['文档处理', '方案评审'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0009',
    type: 'pitfall',
    title: 'AI 幻觉当真用',
    content: 'AI 编造的数据、引用的论文、给出的代码 API 可能不存在。直接用会导致项目出错。\n\n解法：所有 AI 给出的"事实"都必须人工验证，特别是数据、引用、API 调用。',
    source: {
      contributor: '赵大锤',
      questId: 'u005',
      originalContext: '用 Copilot 生成的代码引用了一个不存在的 API',
    },
    quality: { rating: 5, validatedBy: 30, lastValidated: '2026-06-12' },
    applicable: {
      roles: 'all',
      phases: ['day30', 'day60', 'day90'],
      abilityLevel: 'all',
      taskCategories: ['所有 AI 交互'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0010',
    type: 'pitfall',
    title: '敏感数据泄露风险',
    content: '把公司未公开的财务数据、用户数据、代码粘贴到公共 AI 服务中，存在数据泄露风险。\n\n解法：使用企业级 AI 服务，或对数据脱敏后再处理。',
    source: {
      contributor: 'HR 安全部',
      questId: 'u008',
      originalContext: 'AI 伦理与安全课程中的典型案例',
    },
    quality: { rating: 5, validatedBy: 35, lastValidated: '2026-06-12' },
    applicable: {
      roles: 'all',
      phases: ['day30'],
      abilityLevel: 'all',
      taskCategories: ['数据处理'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0011',
    type: 'pitfall',
    title: '过度依赖 AI 直出',
    content: 'AI 生成的内容直接使用，不经过人工审核和调整，导致质量不稳定、缺乏个人风格。\n\n解法：AI 产出只是"初稿"，必须经过人工审核、调整、润色后才能使用。',
    source: {
      contributor: '张小萌',
      questId: 'u017',
      originalContext: '60 天项目复盘时发现团队成员过度依赖 AI 直出',
    },
    quality: { rating: 4, validatedBy: 12, lastValidated: '2026-06-10' },
    applicable: {
      roles: 'all',
      phases: ['day30', 'day60'],
      abilityLevel: 'beginner',
      taskCategories: ['所有 AI 交互'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },

  // ==================== 协作模式基因 ====================
  {
    geneId: 'GENE_0012',
    type: 'collaboration',
    title: '竞品拆解 10 步法',
    content: '第 1 步：喂资料（竞品官网、用户评价、行业报告）\n第 2 步：让 AI 列维度（功能、定价、用户群、优劣势）\n第 3 步：人逐条校验\n第 4 步：让 AI 做对比矩阵\n第 5 步：人补充 AI 遗漏的维度\n第 6 步：让 AI 生成 SWOT 分析\n第 7 步：人判断战略含义\n第 8 步：让 AI 生成行动建议\n第 9 步：人筛选可行方案\n第 10 步：整合输出报告',
    source: {
      contributor: '陈小美',
      questId: 'u017',
      originalContext: '60 天实战项目中使用的竞品分析方法',
    },
    quality: { rating: 5, validatedBy: 8, lastValidated: '2026-06-09' },
    applicable: {
      roles: ['design', 'ops'],
      phases: ['day60', 'day90'],
      abilityLevel: 'intermediate',
      taskCategories: ['竞品分析', '市场调研'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0013',
    type: 'collaboration',
    title: 'AI 辅助代码重构 SOP',
    content: '第 1 步：让 AI 分析现有代码的架构问题\n第 2 步：人确认哪些问题需要解决\n第 3 步：让 AI 生成重构方案\n第 4 步：人评估方案的可行性\n第 5 步：逐模块执行重构\n第 6 步：每步用 AI 生成单元测试\n第 7 步：人运行测试确认通过\n第 8 步：让 AI 生成重构文档',
    source: {
      contributor: '赵大锤',
      questId: 'u014',
      originalContext: '程序 AI 深度探索中总结的重构方法',
    },
    quality: { rating: 5, validatedBy: 10, lastValidated: '2026-06-11' },
    applicable: {
      roles: ['dev'],
      phases: ['day60', 'day90'],
      abilityLevel: 'intermediate',
      taskCategories: ['代码重构', '技术债清理'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0014',
    type: 'collaboration',
    title: 'AI 辅助会议纪要 SOP',
    content: '会前：用 AI 生成会议议程模板\n会中：录音 + 实时转写\n会后：\n  1. 让 AI 提取关键决策和待办事项\n  2. 人审核确认\n  3. 让 AI 生成执行计划\n  4. 人分配任务\n  5. 自动同步到项目管理工具',
    source: {
      contributor: '孙小艺',
      questId: 'u016',
      originalContext: 'AI 辅助团队协作课程中总结的方法',
    },
    quality: { rating: 4, validatedBy: 6, lastValidated: '2026-06-08' },
    applicable: {
      roles: 'all',
      phases: ['day60'],
      abilityLevel: 'all',
      taskCategories: ['团队协作', '会议管理'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },

  // ==================== 顿悟时刻基因 ====================
  {
    geneId: 'GENE_0015',
    type: 'insight',
    title: 'AI 给不出好答案，往往是我没定义清楚"什么叫好"',
    content: '以前我总抱怨 AI 给的答案不够好，后来发现是自己没说清楚什么是"好"。当我把评判标准写进 Prompt（比如"好的方案需要满足：1. 可执行 2. 有数据支撑 3. 有风险预案"），AI 的输出质量直接翻倍。',
    source: {
      contributor: '张小萌',
      questId: 'u007',
      originalContext: 'Prompt 进阶课程中的个人反思',
    },
    quality: { rating: 5, validatedBy: 22, lastValidated: '2026-06-12' },
    applicable: {
      roles: 'all',
      phases: ['day30', 'day60'],
      abilityLevel: 'all',
      taskCategories: ['所有 AI 交互'],
      emotionalStates: ['困惑', '挫败感'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0016',
    type: 'insight',
    title: 'AI 不是替代我，是放大我',
    content: '一开始我把 AI 当"自动写手"，什么都让它干。后来发现 AI 最强的不是独立创作，而是放大我的创意。我出 idea，AI 帮我扩展；我出框架，AI 帮我填充；我出标准，AI 帮我评估。人机协作的效率是单独工作的 10 倍。',
    source: {
      contributor: '李大力',
      questId: 'u011',
      originalContext: 'AI 工作流设计思维课程中的核心领悟',
    },
    quality: { rating: 5, validatedBy: 18, lastValidated: '2026-06-11' },
    applicable: {
      roles: 'all',
      phases: ['day30', 'day60'],
      abilityLevel: 'all',
      taskCategories: ['所有 AI 交互'],
      emotionalStates: ['焦虑', '迷茫'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0017',
    type: 'insight',
    title: 'Prompt 是一种思维方式，不是打字技巧',
    content: '学 Prompt 不是为了会写提示词，而是为了学会"结构化表达需求"。当我能把模糊的想法拆解成清晰的指令时，不仅 AI 更好用，跟人沟通也更高效了。',
    source: {
      contributor: '王小花',
      questId: 'u002',
      originalContext: 'Prompt Engineering 入门课程的课后反思',
    },
    quality: { rating: 5, validatedBy: 20, lastValidated: '2026-06-12' },
    applicable: {
      roles: 'all',
      phases: ['day30'],
      abilityLevel: 'beginner',
      taskCategories: ['所有 AI 交互'],
      emotionalStates: ['不耐烦'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
  {
    geneId: 'GENE_0018',
    type: 'insight',
    title: '从"使用者"变成"指挥官"',
    content: '用 AI 的最高境界不是"我会用这个工具"，而是"我知道什么时候该用什么工具"。就像指挥官不需要会开每一辆坦克，但必须知道在什么地形部署什么兵力。',
    source: {
      contributor: '赵大锤',
      questId: 'u020',
      originalContext: 'AI 创新思维课程中的核心领悟',
    },
    quality: { rating: 5, validatedBy: 14, lastValidated: '2026-06-10' },
    applicable: {
      roles: 'all',
      phases: ['day60', 'day90'],
      abilityLevel: 'intermediate',
      taskCategories: ['AI 工作流设计', '工具选型'],
    },
    evolution: { version: 1, changelog: 'V1: 初始版本' },
  },
];

// 根据上下文获取匹配的知识基因
export function getMatchingGenes(context: {
  unitId?: string;
  role?: Role;
  phase?: Phase;
  category?: string;
  emotionalState?: string;
}): KnowledgeGene[] {
  return KNOWLEDGE_GENES.filter(gene => {
    // 按角色过滤
    if (context.role && gene.applicable.roles !== 'all') {
      if (!gene.applicable.roles.includes(context.role)) return false;
    }
    // 按阶段过滤
    if (context.phase) {
      if (!gene.applicable.phases.includes(context.phase)) return false;
    }
    // 按任务类别过滤
    if (context.category) {
      if (!gene.applicable.taskCategories.some(cat =>
        cat.includes(context.category!) || context.category!.includes(cat)
      )) return false;
    }
    return true;
  }).sort((a, b) => b.quality.rating - a.quality.rating);
}

// 按基因类型分组
export function groupGenesByType(genes: KnowledgeGene[]): Record<GeneType, KnowledgeGene[]> {
  const grouped: Record<GeneType, KnowledgeGene[]> = {
    prompt: [],
    pitfall: [],
    collaboration: [],
    insight: [],
  };
  genes.forEach(gene => grouped[gene.type].push(gene));
  return grouped;
}

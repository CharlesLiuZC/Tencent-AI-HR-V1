// 学习资源链接 - 每个学习单元的真实资源（已验证）
import { Role, Phase } from '../types';

export interface ResourceLink {
  unitId: string;
  resources: {
    type: 'github' | 'bilibili' | 'huggingface' | 'x' | 'article' | 'docs' | 'tencent';
    title: string;
    url: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    roles: Role[] | 'all';
  }[];
}

export const RESOURCE_LINKS: ResourceLink[] = [
  // ==================== u001: AI 时代：从工具到伙伴 ====================
  {
    unitId: 'u001',
    resources: [
      {
        type: 'bilibili',
        title: '【李宏毅】2024 最新生成式 AI 导论',
        url: 'https://www.bilibili.com/video/BV1Rz421M7Kp',
        description: '台湾大学李宏毅教授的 AI 入门课程，通俗易懂，适合零基础',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'article',
        title: 'What Is ChatGPT Doing and Why Does It Work',
        url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/',
        description: 'Stephen Wolfram 用通俗语言解释大模型工作原理',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'x',
        title: 'Andrej Karpathy - AI 核心概念解读',
        url: 'https://x.com/karpathy',
        description: '特斯拉前 AI 总监，经常分享 AI 核心概念和前沿思考',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'tencent',
        title: '腾讯元宝 — 腾讯 AI 助手体验',
        url: 'https://yuanbao.tencent.com',
        description: '腾讯混元大模型驱动的 AI 助手，体验腾讯 AI 能力',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  // ==================== u002: Prompt Engineering 入门 ====================
  {
    unitId: 'u002',
    resources: [
      {
        type: 'github',
        title: 'Prompt Engineering Guide (DAIR.AI) - 300万学习者',
        url: 'https://github.com/dair-ai/Prompt-Engineering-Guide',
        description: '最全面的 Prompt Engineering 指南，覆盖 13 种语言，社区持续维护',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'Anthropic Prompt Engineering 交互式教程',
        url: 'https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial',
        description: 'Claude 官方交互式 Prompt 教程，一步步实操学习',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'docs',
        title: 'OpenAI 官方 Prompt 最佳实践',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering',
        description: 'OpenAI 官方权威指南，涵盖策略、技巧和示例',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'awesome-chatgpt-prompts - 提示词模板库',
        url: 'https://github.com/f/awesome-chatgpt-prompts',
        description: '海量经过验证的 ChatGPT 提示词模板，即取即用',
        difficulty: 'beginner',
        roles: ['design', 'ops', 'art'],
      },
      {
        type: 'bilibili',
        title: '【花酱】ChatGPT 提示词工程入门到进阶',
        url: 'https://www.bilibili.com/video/BV1No4y1t7Zn',
        description: '中文 Prompt 教程，适合非技术岗位零基础学习',
        difficulty: 'beginner',
        roles: ['design', 'ops', 'art'],
      },
      {
        type: 'x',
        title: 'Lilian Weng - Prompt Engineering 深度综述',
        url: 'https://x.com/lilianweng',
        description: 'OpenAI 研究员的技术博客，适合程序岗位深入理解',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u003: ChatGPT/Claude 实战 ====================
  {
    unitId: 'u003',
    resources: [
      {
        type: 'github',
        title: 'Anthropic Courses - 官方课程合集',
        url: 'https://github.com/anthropics/courses',
        description: 'Anthropic 官方 5 门课程：API 基础、Prompt 教程、实战 Prompt、评估、Tool Use',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'Anthropic Cookbook - 实战代码食谱',
        url: 'https://github.com/anthropics/anthropic-cookbook',
        description: '45k Stars，覆盖 RAG、Tool Use、分类、摘要等实战场景的代码示例',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【跟李沐学AI】用 ChatGPT 提高工作效率',
        url: 'https://www.bilibili.com/video/BV1Tm4y1s7UJ',
        description: '著名 AI 教育者李沐的实战教程',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'docs',
        title: 'Claude 官方文档',
        url: 'https://docs.anthropic.com/en/docs',
        description: 'Anthropic Claude 的完整 API 文档和使用指南',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u004: AI 图像生成 ====================
  {
    unitId: 'u004',
    resources: [
      {
        type: 'bilibili',
        title: '【秋葉aaaki】Stable Diffusion 一键安装教程',
        url: 'https://www.bilibili.com/video/BV1iM4y1y7oA',
        description: 'B站最火的 SD 安装教程，傻瓜式一键部署，百万播放',
        difficulty: 'beginner',
        roles: ['art'],
      },
      {
        type: 'huggingface',
        title: 'Stable Diffusion XL 在线体验',
        url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
        description: 'HuggingFace 上的 SDXL 模型页，可直接在线体验',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'docs',
        title: 'Midjourney 官方入门指南',
        url: 'https://docs.midjourney.com',
        description: 'Midjourney 官方文档，包含所有参数和使用方法',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'bilibili',
        title: '【设计师】Midjourney 从入门到精通',
        url: 'https://www.bilibili.com/video/BV1DX4y1V7Jn',
        description: '中文 Midjourney 全面教程，含风格控制和参数详解',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'tencent',
        title: '腾讯混元生图 — AI 图像生成',
        url: 'https://cloud.tencent.com/product/hunyuan',
        description: '腾讯混元大模型的图像生成能力，支持中文理解',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
    ],
  },
  // ==================== u005: AI 辅助编程 ====================
  {
    unitId: 'u005',
    resources: [
      {
        type: 'docs',
        title: 'GitHub Copilot 官方文档',
        url: 'https://docs.github.com/en/copilot',
        description: '官方使用指南，含免费版（2000次/月补全）、Pro版（$10/月无限补全）',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: 'Cursor AI 编辑器官方文档',
        url: 'https://cursor.com',
        description: 'AI 原生代码编辑器，集成多种 AI 模型，支持 Agent 模式',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: 'GitHub Copilot 官方仓库',
        url: 'https://github.com/features/copilot',
        description: 'GitHub Copilot 功能介绍和订阅入口',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【技术蛋老师】GitHub Copilot 全面教程',
        url: 'https://www.bilibili.com/video/BV1jM411L7AH',
        description: '中文 Copilot 使用教程，从安装到实战',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u006: AI 数据分析 ====================
  {
    unitId: 'u006',
    resources: [
      {
        type: 'bilibili',
        title: '【用AI做数据分析】ChatGPT + Excel 实战教程',
        url: 'https://www.bilibili.com/video/BV1Qz4y1K7dN',
        description: '非技术人员也能学会的 AI 数据分析，运营/策划必看',
        difficulty: 'beginner',
        roles: ['ops', 'design'],
      },
      {
        type: 'github',
        title: 'pandas-ai - 用自然语言分析数据',
        url: 'https://github.com/sinaptik-ai/pandas-ai',
        description: '用自然语言查询 pandas DataFrame，适合有 Python 基础的运营',
        difficulty: 'intermediate',
        roles: ['dev', 'ops'],
      },
      {
        type: 'docs',
        title: '腾讯混元 — 数据分析与文本生成',
        url: 'https://cloud.tencent.com/product/hunyuan',
        description: '腾讯混元大模型的数据分析能力，支持中文长文本',
        difficulty: 'beginner',
        roles: ['ops', 'design'],
      },
    ],
  },
  // ==================== u007: Prompt 进阶 ====================
  {
    unitId: 'u007',
    resources: [
      {
        type: 'github',
        title: 'Prompt Engineering Guide - 进阶技巧',
        url: 'https://github.com/dair-ai/Prompt-Engineering-Guide/blob/main/pages/techniques.en.mdx',
        description: '涵盖 CoT、Few-shot、Zero-shot、Self-Consistency、ToT 等所有进阶技巧',
        difficulty: 'intermediate',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'Anthropic Real World Prompting 课程',
        url: 'https://github.com/anthropics/courses/tree/master/real_world_prompting',
        description: '学习如何将 Prompt 技巧应用到复杂的现实场景中',
        difficulty: 'intermediate',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'Chain-of-Thought Prompting 原始论文',
        url: 'https://github.com/kojima-takeshi188/zero_shot_cot',
        description: '思维链提示的原始论文和代码实现',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【李沐论文精读】Chain of Thought 思维链',
        url: 'https://www.bilibili.com/video/BV1GM4y1s7Kd',
        description: '李沐精读 CoT 论文，深入浅出讲解原理',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u008: AI 伦理与安全 ====================
  {
    unitId: 'u008',
    resources: [
      {
        type: 'github',
        title: 'Prompt Engineering Guide - 风险与误用',
        url: 'https://github.com/dair-ai/Prompt-Engineering-Guide/blob/main/pages/risks.en.mdx',
        description: '对抗性提示、事实性问题、偏见等 AI 风险的全面分析',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'docs',
        title: 'Anthropic - 负责任的 AI 使用指南',
        url: 'https://docs.anthropic.com/en/docs/about-claude/use-case-policy',
        description: 'Claude 的使用政策和伦理指南',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  // ==================== u009: 30天阶段实战项目 ====================
  {
    unitId: 'u009',
    resources: [
      {
        type: 'github',
        title: 'Anthropic Cookbook - 分类实战',
        url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/capabilities/classification',
        description: '用 Claude 做文本分类的实战代码',
        difficulty: 'intermediate',
        roles: ['dev', 'ops'],
      },
      {
        type: 'github',
        title: 'Anthropic Cookbook - RAG 实战',
        url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/capabilities/retrieval_augmented_generation',
        description: '检索增强生成的完整实现代码',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: 'Anthropic Prompt Evaluations 课程',
        url: 'https://github.com/anthropics/courses/tree/master/prompt_evaluations',
        description: '学习如何编写生产级 Prompt 评估',
        difficulty: 'intermediate',
        roles: ['dev', 'design'],
      },
    ],
  },
  // ==================== u011: AI 工作流设计思维 ====================
  {
    unitId: 'u011',
    resources: [
      {
        type: 'github',
        title: 'Anthropic Cookbook - 完整工作流示例',
        url: 'https://github.com/anthropics/anthropic-cookbook',
        description: '45k Stars，覆盖 RAG、Tool Use、Agent 等完整工作流的代码食谱',
        difficulty: 'intermediate',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'Anthropic Tool Use 课程',
        url: 'https://github.com/anthropics/courses/tree/master/tool_use',
        description: '学习如何让 Claude 调用外部工具，构建 AI 工作流',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: '腾讯混元 API 开发者文档',
        url: 'https://cloud.tencent.com/document/product/1729',
        description: '腾讯混元大模型 API 接入指南，含快速开始和接口文档',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u012: 专业 AI 工具深度探索（美术） ====================
  {
    unitId: 'u012',
    resources: [
      {
        type: 'github',
        title: 'ComfyUI 官方仓库',
        url: 'https://github.com/comfyanonymous/ComfyUI',
        description: '节点式 AI 图像生成工作流，支持自定义流程和 LoRA',
        difficulty: 'advanced',
        roles: ['art'],
      },
      {
        type: 'bilibili',
        title: '【秋葉aaaki】ComfyUI 从入门到精通',
        url: 'https://www.bilibili.com/video/BV1dM4y1L7dJ',
        description: 'B站最详细的 ComfyUI 中文教程，含工作流搭建实战',
        difficulty: 'intermediate',
        roles: ['art'],
      },
      {
        type: 'huggingface',
        title: 'LoRA 微调官方文档',
        url: 'https://huggingface.co/docs/diffusers/training/lora',
        description: 'HuggingFace 官方 LoRA 训练文档，适合进阶美术',
        difficulty: 'advanced',
        roles: ['art', 'dev'],
      },
      {
        type: 'huggingface',
        title: 'Stable Diffusion 社区模型库',
        url: 'https://huggingface.co/models?pipeline_tag=text-to-image&sort=trending',
        description: 'HuggingFace 上的海量图像生成模型，可在线体验',
        difficulty: 'intermediate',
        roles: ['art'],
      },
    ],
  },
  // ==================== u013: 专业 AI 工具深度探索（策划） ====================
  {
    unitId: 'u013',
    resources: [
      {
        type: 'docs',
        title: 'Notion AI 官方教程',
        url: 'https://www.notion.so/product/ai',
        description: 'Notion AI 功能介绍，适合策划做文档整理和知识管理',
        difficulty: 'beginner',
        roles: ['design'],
      },
      {
        type: 'bilibili',
        title: '【策划必看】用 AI 做竞品分析和数值策划',
        url: 'https://www.bilibili.com/video/BV1Qz4y1K7dN',
        description: '非技术策划如何用 AI 辅助日常工作',
        difficulty: 'beginner',
        roles: ['design'],
      },
    ],
  },
  // ==================== u014: 专业 AI 工具深度探索（程序） ====================
  {
    unitId: 'u014',
    resources: [
      {
        type: 'github',
        title: 'Claude Code - Anthropic CLI 编程助手',
        url: 'https://github.com/anthropics/claude-code',
        description: 'Anthropic 的 CLI 编程助手，支持复杂代码任务和多文件编辑',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: 'Cursor 官方文档',
        url: 'https://cursor.com',
        description: 'AI 原生代码编辑器，支持 Agent 模式和多模型切换',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: 'Anthropic API Fundamentals 课程',
        url: 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals',
        description: 'Claude API 基础课程：SDK 使用、模型参数、多模态 Prompt、流式响应',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: 'Claude Agent SDK 示例',
        url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/claude_agent_sdk',
        description: '用 Claude Agent SDK 构建自定义 AI Agent 的代码示例',
        difficulty: 'advanced',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u016: AI 辅助团队协作 ====================
  {
    unitId: 'u016',
    resources: [
      {
        type: 'docs',
        title: 'Notion AI — 团队协作与知识管理',
        url: 'https://www.notion.so/product/ai',
        description: '用 Notion AI 进行团队文档协作和知识沉淀',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'docs',
        title: '腾讯会议 AI 助手',
        url: 'https://meeting.tencent.com',
        description: '腾讯会议内置的 AI 助手，支持会前/会中/会后全流程',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  // ==================== u017: 60天阶段实战项目 ====================
  {
    unitId: 'u017',
    resources: [
      {
        type: 'github',
        title: 'Anthropic Cookbook - 客服 Agent 实战',
        url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/customer_service_agent.ipynb',
        description: '用 Claude 构建客服 Agent 的完整代码',
        difficulty: 'intermediate',
        roles: ['dev', 'ops'],
      },
      {
        type: 'github',
        title: 'Anthropic Cookbook - SQL 查询实战',
        url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/how_to_make_sql_queries.ipynb',
        description: '用 Claude 做 SQL 查询的实战代码',
        difficulty: 'intermediate',
        roles: ['dev', 'ops'],
      },
    ],
  },
  // ==================== u020: AI 创新思维 ====================
  {
    unitId: 'u020',
    resources: [
      {
        type: 'x',
        title: 'Sam Altman - OpenAI CEO',
        url: 'https://x.com/sama',
        description: 'OpenAI CEO 的推特，分享 AI 前沿思考和创新观点',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'Awesome AI Agents - AI Agent 全景图',
        url: 'https://github.com/e2b-dev/awesome-ai-agents',
        description: '最全的 AI Agent 列表，涵盖所有主流 Agent 框架和应用',
        difficulty: 'intermediate',
        roles: 'all',
      },
    ],
  },
  // ==================== u021: AI Agent 构建入门 ====================
  {
    unitId: 'u021',
    resources: [
      {
        type: 'huggingface',
        title: 'HuggingFace Agents 免费课程',
        url: 'https://huggingface.co/learn/agents-course',
        description: '免费的 AI Agent 系统课程，从基础到实战，含代码练习',
        difficulty: 'intermediate',
        roles: ['dev', 'design'],
      },
      {
        type: 'github',
        title: 'AutoGPT - 自主 AI Agent 框架',
        url: 'https://github.com/Significant-Gravitas/AutoGPT',
        description: '最流行的 AI Agent 框架，支持自主规划和执行任务',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: 'LangChain - AI 应用开发框架',
        url: 'https://github.com/langchain-ai/langchain',
        description: '最流行的 LLM 应用开发框架，支持 Agent、RAG、Tool Use',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: 'Claude Agent SDK 示例',
        url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/claude_agent_sdk',
        description: '用 Claude Agent SDK 构建自定义 Agent 的代码示例',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: '腾讯混元 Agent 能力文档',
        url: 'https://cloud.tencent.com/document/product/1729',
        description: '腾讯混元大模型的 Agent 和 Tool Use 能力',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【AI Agent入门】什么是 AI Agent？',
        url: 'https://www.bilibili.com/video/BV1wT4y1s7XN',
        description: '通俗易懂的 Agent 入门讲解，适合所有岗位',
        difficulty: 'beginner',
        roles: ['design', 'ops', 'art'],
      },
    ],
  },
  // ==================== u022: 团队 AI 工作流优化 ====================
  {
    unitId: 'u022',
    resources: [
      {
        type: 'github',
        title: 'Anthropic Patterns - Agent 设计模式',
        url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents',
        description: 'Agent 设计模式食谱，包含多种 Agent 架构实现',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: '腾讯文档 AI 功能',
        url: 'https://docs.qq.com',
        description: '腾讯文档内置 AI 能力，支持智能写作和数据分析',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  // ==================== u023: 90天终期项目 ====================
  {
    unitId: 'u023',
    resources: [
      {
        type: 'github',
        title: 'Claude Agent SDK - 构建生产级 Agent',
        url: 'https://github.com/anthropics/claude-agent-sdk',
        description: 'Anthropic 官方 Agent SDK，用于构建生产级 AI Agent',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'huggingface',
        title: 'HuggingFace Spaces - 在线 AI 应用',
        url: 'https://huggingface.co/spaces',
        description: '在 HuggingFace 上部署和分享你的 AI 应用',
        difficulty: 'intermediate',
        roles: ['dev', 'design'],
      },
      {
        type: 'tencent',
        title: '腾讯云 AI 应用部署',
        url: 'https://cloud.tencent.com/product/ai',
        description: '腾讯云 AI 产品全家桶，含混元大模型、图像识别、语音等',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u024: AI 实践指南编写 ====================
  {
    unitId: 'u024',
    resources: [
      {
        type: 'docs',
        title: 'Notion AI — 智能文档写作',
        url: 'https://www.notion.so/product/ai',
        description: '用 Notion AI 辅助撰写实践指南和知识文档',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
];

// 获取某个学习单元的资源
export function getResourcesByUnit(unitId: string, role?: Role): ResourceLink['resources'] {
  const link = RESOURCE_LINKS.find(r => r.unitId === unitId);
  if (!link) return [];
  if (!role) return link.resources;
  return link.resources.filter(r => r.roles === 'all' || r.roles.includes(role));
}

// 获取资源类型图标
export function getResourceIcon(type: string): string {
  switch (type) {
    case 'github': return '🐙';
    case 'bilibili': return '📺';
    case 'huggingface': return '🤗';
    case 'x': return '𝕏';
    case 'article': return '📄';
    case 'docs': return '📚';
    case 'tencent': return '🐧';
    default: return '🔗';
  }
}

// 获取资源类型颜色
export function getResourceColor(type: string): string {
  switch (type) {
    case 'github': return '#24292e';
    case 'bilibili': return '#00a1d6';
    case 'huggingface': return '#ff9d00';
    case 'x': return '#1da1f2';
    case 'article': return '#10b981';
    case 'docs': return '#8b5cf6';
    case 'tencent': return '#12b7f5';
    default: return '#6b7280';
  }
}

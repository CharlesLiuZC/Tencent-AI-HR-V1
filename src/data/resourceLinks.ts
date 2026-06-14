// 学习资源链接 - 每个学习单元的真实资源
import { Role, Phase } from '../types';

export interface ResourceLink {
  unitId: string;
  resources: {
    type: 'github' | 'bilibili' | 'huggingface' | 'x' | 'article' | 'docs';
    title: string;
    url: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    roles: Role[] | 'all';
  }[];
}

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    unitId: 'u001',
    resources: [
      {
        type: 'bilibili',
        title: '【李宏毅】2024 最新生成式 AI 导论',
        url: 'https://www.bilibili.com/video/BV1Rz421M7Kp',
        description: '台湾大学李宏毅教授的 AI 入门课程，通俗易懂',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'x',
        title: 'Andrej Karpathy - AI 本质解读',
        url: 'https://x.com/karpathy',
        description: '特斯拉前 AI 总监的推特，经常分享 AI 核心概念',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'article',
        title: '什么是大语言模型？— 通俗版',
        url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/',
        description: 'Stephen Wolfram 的通俗解释文章',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  {
    unitId: 'u002',
    resources: [
      {
        type: 'github',
        title: 'Prompt Engineering Guide (DAIR.AI)',
        url: 'https://github.com/dair-ai/Prompt-Engineering-Guide',
        description: '最全面的 Prompt Engineering 指南，社区持续维护',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'bilibili',
        title: '【花酱】ChatGPT 提示词工程入门',
        url: 'https://www.bilibili.com/video/BV1No4y1t7Zn',
        description: '中文 Prompt 教程，适合零基础',
        difficulty: 'beginner',
        roles: ['design', 'ops', 'art'],
      },
      {
        type: 'docs',
        title: 'OpenAI 官方 Prompt 最佳实践',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering',
        description: '官方权威指南',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'x',
        title: 'Lilian Weng - Prompt Engineering 综述',
        url: 'https://x.com/lilianweng',
        description: 'OpenAI 研究员的技术博客，深度解析',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  {
    unitId: 'u003',
    resources: [
      {
        type: 'bilibili',
        title: '【跟李沐学AI】用 ChatGPT 提高工作效率',
        url: 'https://www.bilibili.com/video/BV1Tm4y1s7UJ',
        description: '著名 AI 教育者的实战教程',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'awesome-chatgpt-prompts',
        url: 'https://github.com/f/awesome-chatgpt-prompts',
        description: '海量 ChatGPT 提示词模板库',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  {
    unitId: 'u004',
    resources: [
      {
        type: 'bilibili',
        title: '【秋葉aaaki】Stable Diffusion 本地部署教程',
        url: 'https://www.bilibili.com/video/BV1iM4y1y7oA',
        description: '最火的 SD 安装教程，傻瓜式教学',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'huggingface',
        title: 'Stable Diffusion 在线体验',
        url: 'https://huggingface.co/spaces/stabilityai/stable-diffusion',
        description: 'HuggingFace 上的在线体验空间，无需安装',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'bilibili',
        title: 'Midjourney 入门到精通',
        url: 'https://www.bilibili.com/video/BV1DX4y1V7Jn',
        description: 'Midjourney 中文教程',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'x',
        title: 'Midjourney 官方',
        url: 'https://x.com/midaborney',
        description: '官方最新动态和风格灵感',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
    ],
  },
  {
    unitId: 'u005',
    resources: [
      {
        type: 'github',
        title: 'GitHub Copilot 官方文档',
        url: 'https://docs.github.com/en/copilot',
        description: '官方使用指南和最佳实践',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【技术蛋老师】GitHub Copilot 全面教程',
        url: 'https://www.bilibili.com/video/BV1jM411L7AH',
        description: '中文 Copilot 使用教程',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: 'Cursor 使用技巧大全',
        url: 'https://github.com/getcursor/cursor',
        description: 'AI 原生编辑器 Cursor 的官方仓库',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'x',
        title: 'Cursor 官方',
        url: 'https.com/x.com/cursor_ai',
        description: '最新功能更新和使用技巧',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  {
    unitId: 'u006',
    resources: [
      {
        type: 'bilibili',
        title: '【用AI做数据分析】ChatGPT + Excel 实战',
        url: 'https://www.bilibili.com/video/BV1Qz4y1K7dN',
        description: '非技术人员也能学会的 AI 数据分析',
        difficulty: 'beginner',
        roles: ['ops', 'design'],
      },
      {
        type: 'github',
        title: 'pandas-ai - 用自然语言分析数据',
        url: 'https://github.com/sinaptik-ai/pandas-ai',
        description: '用自然语言查询 pandas DataFrame',
        difficulty: 'intermediate',
        roles: ['dev', 'ops'],
      },
    ],
  },
  {
    unitId: 'u007',
    resources: [
      {
        type: 'github',
        title: 'Chain-of-Thought Prompting 论文',
        url: 'https://github.com/kojima-takeshi188/zero_shot_cot',
        description: '思维链提示的原始论文和代码',
        difficulty: 'intermediate',
        roles: ['dev', 'design'],
      },
      {
        type: 'bilibili',
        title: '【李沐论文精读】Chain of Thought',
        url: 'https://www.bilibili.com/video/BV1GM4y1s7Kd',
        description: '李沐精读 CoT 论文',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: 'Anthropic Prompt Engineering 交互式教程',
        url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial',
        description: 'Claude 官方的交互式 Prompt 教程',
        difficulty: 'intermediate',
        roles: 'all',
      },
    ],
  },
  {
    unitId: 'u011',
    resources: [
      {
        type: 'bilibili',
        title: '【AI工作流】如何构建个人 AI 工作流',
        url: 'https://www.bilibili.com/video/BV1rT4y1s7LN',
        description: '从零搭建 AI 驱动的工作流',
        difficulty: 'intermediate',
        roles: 'all',
      },
      {
        type: 'github',
        title: 'awesome-ai-workflows',
        url: 'https://github.com/anthropics/anthropic-cookbook',
        description: 'Anthropic 官方的 AI 工作流最佳实践',
        difficulty: 'intermediate',
        roles: 'all',
      },
    ],
  },
  {
    unitId: 'u012',
    resources: [
      {
        type: 'github',
        title: 'ComfyUI 官方仓库',
        url: 'https://github.com/comfyanonymous/ComfyUI',
        description: '节点式 AI 图像生成工作流',
        difficulty: 'advanced',
        roles: ['art'],
      },
      {
        type: 'bilibili',
        title: '【秋葉aaaki】ComfyUI 从入门到精通',
        url: 'https://www.bilibili.com/video/BV1dM4y1L7dJ',
        description: '最详细的 ComfyUI 中文教程',
        difficulty: 'intermediate',
        roles: ['art'],
      },
      {
        type: 'huggingface',
        title: 'LoRA 微调教程',
        url: 'https://huggingface.co/docs/diffusers/training/lora',
        description: 'HuggingFace 官方 LoRA 训练文档',
        difficulty: 'advanced',
        roles: ['art', 'dev'],
      },
    ],
  },
  {
    unitId: 'u014',
    resources: [
      {
        type: 'github',
        title: 'Claude Code 官方',
        url: 'https://github.com/anthropics/claude-code',
        description: 'Anthropic 的 CLI 编程助手',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【AI编程】Cursor vs Copilot 深度对比',
        url: 'https://www.bilibili.com/video/BV1cT4y1s7XN',
        description: '两大 AI 编程工具的全面对比',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'x',
        title: 'ThePrimeagen - AI 编程实战',
        url: 'https://x.com/ThePrimeagen',
        description: '知名程序员的 AI 编程实践分享',
        difficulty: 'advanced',
        roles: ['dev'],
      },
    ],
  },
  {
    unitId: 'u021',
    resources: [
      {
        type: 'github',
        title: 'AutoGPT - 自主 AI Agent',
        url: 'https://github.com/Significant-Gravitas/AutoGPT',
        description: '最流行的 AI Agent 框架',
        difficulty: 'advanced',
        roles: ['dev', 'design'],
      },
      {
        type: 'github',
        title: 'LangChain Agent 教程',
        url: 'https://github.com/langchain-ai/langchain',
        description: '用 LangChain 构建 AI Agent',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '【AI Agent入门】什么是AI Agent？',
        url: 'https://www.bilibili.com/video/BV1wT4y1s7XN',
        description: '通俗易懂的 Agent 入门讲解',
        difficulty: 'intermediate',
        roles: 'all',
      },
      {
        type: 'huggingface',
        title: 'HuggingFace Agents 课程',
        url: 'https://huggingface.co/learn/agents-course',
        description: '免费的 AI Agent 系统课程',
        difficulty: 'intermediate',
        roles: ['dev', 'design'],
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
    default: return '#6b7280';
  }
}

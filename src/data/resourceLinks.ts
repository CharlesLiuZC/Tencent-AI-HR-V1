// 学习资源链接 - 分角色差异化推荐
// 原则：1. 所有链接必须真实可访问  2. 非技术岗位以视频/产品体验为主  3. 技术岗位以文档/代码为主
import { Role } from '../types';

export interface ResourceLink {
  unitId: string;
  resources: {
    type: 'github' | 'bilibili' | 'huggingface' | 'x' | 'docs' | 'tencent' | 'product';
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
      // 非技术岗位：视频 + 产品体验
      {
        type: 'bilibili',
        title: '📺 吴恩达AI Agent教程 — 理解Agent思维（21.7万播放）',
        url: 'https://www.bilibili.com/video/BV1aaxyz8ELY',
        description: '吴恩达最新AI Agent课程，通俗易懂地介绍什么是AI Agent',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'tencent',
        title: '🐧 腾讯元宝 — 你的第一个 AI 助手',
        url: 'https://yuanbao.tencent.com',
        description: '腾讯出品的 AI 助手，支持对话、创作、搜索。先体验一下！',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'product',
        title: '💬 ChatGPT — 全球最流行的 AI 对话工具',
        url: 'https://chatgpt.com',
        description: 'OpenAI 的 AI 助手，注册即可免费使用',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      // 技术岗位：文档 + 论文
      {
        type: 'docs',
        title: '📚 What Is ChatGPT Doing — Stephen Wolfram 通俗解读',
        url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/',
        description: '用通俗语言解释大语言模型的工作原理，技术向深度好文',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'x',
        title: '𝕏 Andrej Karpathy — AI 核心概念推特',
        url: 'https://x.com/karpathy',
        description: '特斯拉前 AI 总监，经常用推特长文解释 AI 核心概念',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'tencent',
        title: '🐧 腾讯混元大模型 — 体验腾讯 AI 能力',
        url: 'https://cloud.tencent.com/product/hunyuan',
        description: '腾讯自研大模型，支持文本/图像/视频/3D生成',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u002: Prompt Engineering 入门 ====================
  {
    unitId: 'u002',
    resources: [
      // 非技术岗位：视频教程 + 实操模板
      {
        type: 'bilibili',
        title: '📺 B站热门：ChatGPT 提示词教程',
        url: 'https://search.bilibili.com/all?keyword=ChatGPT%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%95%99%E7%A8%8B&order=click',
        description: 'B站播放量最高的提示词教程，跟着视频一步步学',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'product',
        title: '📝 awesome-chatgpt-prompts — 提示词模板大全',
        url: 'https://github.com/f/awesome-chatgpt-prompts',
        description: '海量现成的提示词模板，直接复制粘贴就能用！',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'product',
        title: '🎨 AI 绘画提示词宝典',
        url: 'https://search.bilibili.com/all?keyword=Midjourney%E6%8F%90%E7%A4%BA%E8%AF%8D&order=click',
        description: '美术必看！学习如何用文字描述生成你想要的画面',
        difficulty: 'beginner',
        roles: ['art'],
      },
      {
        type: 'product',
        title: '📊 用 AI 写策划案 — 提示词实战',
        url: 'https://search.bilibili.com/all?keyword=AI%E5%86%99%E7%AD%96%E5%88%92%E6%A1%88&order=click',
        description: '策划必看！如何用 AI 辅助写策划案、竞品分析',
        difficulty: 'beginner',
        roles: ['design'],
      },
      {
        type: 'product',
        title: '📈 用 AI 做运营 — 提示词实战',
        url: 'https://search.bilibili.com/all?keyword=AI%E8%BF%90%E8%90%A5%E5%AE%9E%E6%88%98&order=click',
        description: '运营必看！如何用 AI 写文案、分析数据、做社群',
        difficulty: 'beginner',
        roles: ['ops'],
      },
      // 技术岗位：官方文档 + 代码仓库
      {
        type: 'github',
        title: '🐙 Prompt Engineering Guide — 最全面的 Prompt 指南',
        url: 'https://github.com/dair-ai/Prompt-Engineering-Guide',
        description: '300万学习者，覆盖 13 种语言，含所有进阶技巧',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 Anthropic Prompt Engineering 交互式教程',
        url: 'https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial',
        description: 'Claude 官方交互式教程，一步步实操学习 Prompt 技巧',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: '📚 OpenAI 官方 Prompt 最佳实践',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering',
        description: 'OpenAI 官方权威指南',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u003: ChatGPT/Claude 实战 ====================
  {
    unitId: 'u003',
    resources: [
      // 非技术岗位
      {
        type: 'bilibili',
        title: '📺 B站热门：ChatGPT 办公实战教程',
        url: 'https://search.bilibili.com/all?keyword=ChatGPT%E5%8A%9E%E5%85%AC%E5%AE%9E%E6%88%98&order=click',
        description: '用 ChatGPT 写邮件、做报告、翻译、整理会议纪要',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'product',
        title: '💬 Claude — Anthropic 的 AI 助手',
        url: 'https://claude.ai',
        description: '擅长长文本分析和深度思考的 AI 助手，免费注册使用',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      // 技术岗位
      {
        type: 'github',
        title: '🐙 Anthropic Courses — 官方 5 门课程',
        url: 'https://github.com/anthropics/courses',
        description: 'API 基础、Prompt 教程、实战 Prompt、评估、Tool Use',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 Anthropic Cookbook — 实战代码食谱 (45k Stars)',
        url: 'https://github.com/anthropics/anthropic-cookbook',
        description: 'RAG、Tool Use、分类、摘要等完整场景的代码示例',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u004: AI 图像生成 ====================
  {
    unitId: 'u004',
    resources: [
      // 美术：视频教程为主
      {
        type: 'bilibili',
        title: '📺 秋葉aaaki — Stable Diffusion 一键安装教程 (731万播放)',
        url: 'https://www.bilibili.com/video/BV1iM4y1y7oA',
        description: 'B站最火的 SD 安装教程！傻瓜式一键部署，解压即用',
        difficulty: 'beginner',
        roles: ['art'],
      },
      {
        type: 'bilibili',
        title: '📺 B站热门：Midjourney 入门教程',
        url: 'https://search.bilibili.com/all?keyword=Midjourney%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B&order=click',
        description: 'B站播放量最高的 Midjourney 教程，美术必看',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'bilibili',
        title: '📺 B站热门：AI 绘画风格教程',
        url: 'https://search.bilibili.com/all?keyword=AI%E7%BB%98%E7%94%BB%E9%A3%8E%E6%A0%BC%E6%95%99%E7%A8%8B&order=click',
        description: '学习各种 AI 绘画风格：二次元、写实、赛博朋克、国风...',
        difficulty: 'beginner',
        roles: ['art'],
      },
      {
        type: 'tencent',
        title: '🐧 腾讯混元生图 — 中文 AI 图像生成',
        url: 'https://cloud.tencent.com/product/hunyuan',
        description: '腾讯自研 AI 图像生成，中文理解能力强',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      {
        type: 'product',
        title: '🎨 Midjourney 官方 — AI 图像生成',
        url: 'https://midjourney.com',
        description: '全球最流行的 AI 图像生成工具，需 Discord 使用',
        difficulty: 'beginner',
        roles: ['art', 'design'],
      },
      // 技术岗位
      {
        type: 'huggingface',
        title: '🤗 Stable Diffusion XL — 在线体验',
        url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
        description: 'HuggingFace 上的 SDXL 模型，可直接在线体验',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u005: AI 辅助编程 ====================
  {
    unitId: 'u005',
    resources: [
      {
        type: 'docs',
        title: '📚 GitHub Copilot 官方文档',
        url: 'https://docs.github.com/en/copilot',
        description: '官方使用指南，含免费版（2000次/月补全）说明',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'product',
        title: '💻 Cursor — AI 原生代码编辑器',
        url: 'https://cursor.com',
        description: '集成多种 AI 模型的代码编辑器，支持 Agent 模式',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '📺 B站热门：GitHub Copilot 使用教程',
        url: 'https://search.bilibili.com/all?keyword=GitHub+Copilot%E6%95%99%E7%A8%8B&order=click',
        description: 'B站上的 Copilot 中文教程',
        difficulty: 'beginner',
        roles: ['dev'],
      },
      {
        type: 'bilibili',
        title: '📺 B站热门：Cursor AI 编辑器教程',
        url: 'https://search.bilibili.com/all?keyword=Cursor+AI%E7%BC%96%E8%BE%91%E5%99%A8&order=click',
        description: 'B站上的 Cursor 使用教程',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u006: AI 数据分析 ====================
  {
    unitId: 'u006',
    resources: [
      // 非技术岗位
      {
        type: 'bilibili',
        title: '📺 B站热门：ChatGPT 做数据分析',
        url: 'https://search.bilibili.com/all?keyword=ChatGPT%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90&order=click',
        description: '运营/策划必看！用 AI 分析 Excel 数据、生成图表',
        difficulty: 'beginner',
        roles: ['ops', 'design'],
      },
      {
        type: 'product',
        title: '📊 腾讯元宝 — 数据分析功能',
        url: 'https://yuanbao.tencent.com',
        description: '直接把 Excel/CSV 文件丢给元宝，让它帮你分析',
        difficulty: 'beginner',
        roles: ['ops', 'design'],
      },
      // 技术岗位
      {
        type: 'github',
        title: '🐙 pandas-ai — 用自然语言分析数据',
        url: 'https://github.com/sinaptik-ai/pandas-ai',
        description: '用自然语言查询 pandas DataFrame',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u007: Prompt 进阶 ====================
  {
    unitId: 'u007',
    resources: [
      // 非技术岗位
      {
        type: 'bilibili',
        title: '📺 B站热门：ChatGPT 高级提示词技巧',
        url: 'https://search.bilibili.com/all?keyword=ChatGPT%E9%AB%98%E7%BA%A7%E6%8F%90%E7%A4%BA%E8%AF%8D&order=click',
        description: '思维链、角色扮演、Few-shot 等进阶技巧的视频教程',
        difficulty: 'intermediate',
        roles: ['art', 'design', 'ops'],
      },
      // 技术岗位
      {
        type: 'github',
        title: '🐙 Prompt Engineering Guide — 进阶技巧全集',
        url: 'https://github.com/dair-ai/Prompt-Engineering-Guide/blob/main/pages/techniques.en.mdx',
        description: 'CoT、Few-shot、Zero-shot、Self-Consistency、ToT 等所有技巧',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 Anthropic Real World Prompting 课程',
        url: 'https://github.com/anthropics/courses/tree/master/real_world_prompting',
        description: '学习如何将 Prompt 技巧应用到复杂的现实场景中',
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
        type: 'bilibili',
        title: '📺 B站热门：AI 安全与伦理科普',
        url: 'https://search.bilibili.com/all?keyword=AI%E5%AE%89%E5%85%A8%E4%BC%A6%E7%90%86&order=click',
        description: '了解 AI 使用中的隐私、版权、偏见等问题',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'docs',
        title: '📚 Anthropic — 负责任的 AI 使用政策',
        url: 'https://docs.anthropic.com/en/docs/about-claude/use-case-policy',
        description: 'Claude 的使用政策和伦理指南',
        difficulty: 'beginner',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u011: AI 工作流设计思维 ====================
  {
    unitId: 'u011',
    resources: [
      {
        type: 'bilibili',
        title: '📺 B站热门：AI 工作流搭建教程',
        url: 'https://search.bilibili.com/all?keyword=AI%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%90%AD%E5%BB%BA&order=click',
        description: '学习如何把 AI 工具串成工作流，自动化你的日常工作',
        difficulty: 'intermediate',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'github',
        title: '🐙 Anthropic Cookbook — 完整工作流示例',
        url: 'https://github.com/anthropics/anthropic-cookbook',
        description: '45k Stars，覆盖 RAG、Tool Use、Agent 等完整工作流',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'docs',
        title: '📚 腾讯混元 API 开发者文档',
        url: 'https://cloud.tencent.com/document/product/1729',
        description: '腾讯混元大模型 API 接入指南',
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
        type: 'bilibili',
        title: '📺 秋葉aaaki — ComfyUI 入门教程',
        url: 'https://search.bilibili.com/all?keyword=ComfyUI%E5%85%A5%E9%97%A8%E7%A7%8B%E8%91%89&order=click',
        description: '秋葉出品的 ComfyUI 教程，美术进阶必看',
        difficulty: 'intermediate',
        roles: ['art'],
      },
      {
        type: 'bilibili',
        title: '📺 B站热门：LoRA 训练教程',
        url: 'https://search.bilibili.com/all?keyword=LoRA%E8%AE%AD%E7%BB%83%E6%95%99%E7%A8%8B&order=click',
        description: '学习训练自己的 LoRA 模型，定制专属画风',
        difficulty: 'advanced',
        roles: ['art'],
      },
      {
        type: 'github',
        title: '🐙 ComfyUI 官方仓库',
        url: 'https://github.com/comfyanonymous/ComfyUI',
        description: '节点式 AI 图像生成工作流工具',
        difficulty: 'advanced',
        roles: ['art', 'dev'],
      },
      {
        type: 'huggingface',
        title: '🤗 HuggingFace 图像生成模型库',
        url: 'https://huggingface.co/models?pipeline_tag=text-to-image&sort=trending',
        description: '海量图像生成模型，可在线体验',
        difficulty: 'intermediate',
        roles: ['art', 'dev'],
      },
    ],
  },
  // ==================== u014: 专业 AI 工具深度探索（程序） ====================
  {
    unitId: 'u014',
    resources: [
      {
        type: 'github',
        title: '🐙 Claude Code — Anthropic CLI 编程助手',
        url: 'https://github.com/anthropics/claude-code',
        description: '支持复杂代码任务和多文件编辑的 CLI 工具',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 Anthropic API Fundamentals 课程',
        url: 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals',
        description: 'Claude API 基础：SDK、模型参数、多模态、流式响应',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 Anthropic Tool Use 课程',
        url: 'https://github.com/anthropics/courses/tree/master/tool_use',
        description: '学习如何让 Claude 调用外部工具',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u016: AI 辅助团队协作 ====================
  {
    unitId: 'u016',
    resources: [
      {
        type: 'product',
        title: '📝 Notion AI — 团队协作与知识管理',
        url: 'https://www.notion.so/product/ai',
        description: '用 Notion AI 进行团队文档协作和知识沉淀',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'tencent',
        title: '🐧 腾讯会议 — AI 助手',
        url: 'https://meeting.tencent.com',
        description: '腾讯会议内置 AI 助手，支持会前/会中/会后全流程',
        difficulty: 'beginner',
        roles: 'all',
      },
      {
        type: 'tencent',
        title: '🐧 腾讯文档 — AI 写作',
        url: 'https://docs.qq.com',
        description: '腾讯文档内置 AI 能力，支持智能写作和数据分析',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  // ==================== u020: AI 创新思维 ====================
  {
    unitId: 'u020',
    resources: [
      {
        type: 'bilibili',
        title: '📺 B站热门：AI Agent 最新进展',
        url: 'https://search.bilibili.com/all?keyword=AI+Agent%E6%9C%80%E6%96%B0&order=click',
        description: '了解 AI Agent 的最新发展和创新应用',
        difficulty: 'intermediate',
        roles: 'all',
      },
      {
        type: 'x',
        title: '𝕏 Sam Altman — OpenAI CEO',
        url: 'https://x.com/sama',
        description: 'OpenAI CEO 的推特，分享 AI 前沿思考',
        difficulty: 'beginner',
        roles: 'all',
      },
    ],
  },
  // ==================== u021: AI Agent 构建入门 ====================
  {
    unitId: 'u021',
    resources: [
      // 非技术岗位
      {
        type: 'bilibili',
        title: '📺 B站热门：什么是 AI Agent？通俗讲解',
        url: 'https://search.bilibili.com/all?keyword=%E4%BB%80%E4%B9%88%E6%98%AFAI+Agent&order=click',
        description: '通俗易懂的 Agent 入门讲解，适合所有岗位',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'bilibili',
        title: '📺 B站热门：用 Coze/Dify 搭建 AI Agent',
        url: 'https://search.bilibili.com/all?keyword=Coze+Dify+AI+Agent&order=click',
        description: '零代码搭建 AI Agent，非技术人员也能上手！',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      // 技术岗位
      {
        type: 'huggingface',
        title: '🤗 HuggingFace Agents 免费课程',
        url: 'https://huggingface.co/learn/agents-course',
        description: '免费的 AI Agent 系统课程，含代码练习',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 LangChain — AI 应用开发框架',
        url: 'https://github.com/langchain-ai/langchain',
        description: '最流行的 LLM 应用开发框架',
        difficulty: 'advanced',
        roles: ['dev'],
      },
      {
        type: 'github',
        title: '🐙 Claude Agent SDK 示例',
        url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/claude_agent_sdk',
        description: '用 Claude Agent SDK 构建 Agent 的代码示例',
        difficulty: 'advanced',
        roles: ['dev'],
      },
    ],
  },
  // ==================== u023: 90天终期项目 ====================
  {
    unitId: 'u023',
    resources: [
      {
        type: 'bilibili',
        title: '📺 B站热门：用 Coze 搭建 AI 应用',
        url: 'https://search.bilibili.com/all?keyword=Coze%E6%90%AD%E5%BB%BAAI%E5%BA%94%E7%94%A8&order=click',
        description: '零代码搭建 AI 应用，适合所有岗位的终期项目',
        difficulty: 'beginner',
        roles: ['art', 'design', 'ops'],
      },
      {
        type: 'huggingface',
        title: '🤗 HuggingFace Spaces — 部署你的 AI 应用',
        url: 'https://huggingface.co/spaces',
        description: '在 HuggingFace 上部署和分享你的 AI 应用',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
      {
        type: 'tencent',
        title: '🐧 腾讯云 AI 产品全家桶',
        url: 'https://cloud.tencent.com/product/ai',
        description: '腾讯云 AI 产品，含混元大模型、图像识别、语音等',
        difficulty: 'intermediate',
        roles: ['dev'],
      },
    ],
  },
];

// 获取某个学习单元的资源（按角色过滤）
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
    case 'docs': return '📚';
    case 'tencent': return '🐧';
    case 'product': return '🌐';
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
    case 'docs': return '#8b5cf6';
    case 'tencent': return '#12b7f5';
    case 'product': return '#10b981';
    default: return '#6b7280';
  }
}

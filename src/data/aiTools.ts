import { AITool } from '../types';

export const AI_TOOLS: AITool[] = [
  // ==================== 腾讯系工具 ====================
  {
    id: 't101', name: '腾讯元宝', category: 'text',
    description: '腾讯混元大模型驱动的AI助手，支持对话、搜索、创作。2026春节DAU峰值5000万+',
    difficulty: 1,
    useCases: ['日常对话', '文档总结', '创意写作', '图片识别', '微信聊天记录总结'],
    roles: ['art', 'design', 'dev', 'ops'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://yuanbao.tencent.com',
  },
  {
    id: 't102', name: 'CodeBuddy', category: 'code',
    description: '腾讯内部AI编程助手，覆盖95%工程师，研发提效40%，腾讯大部分团队90%以上代码由AI生成',
    difficulty: 1,
    useCases: ['代码生成', '代码审查', '重构建议', '单元测试生成'],
    roles: ['dev'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://codebuddy.tencent.com',
  },
  {
    id: 't103', name: 'WorkBuddy', category: 'text',
    description: '腾讯AI原生工作台，从超级个体到超级团队。2026年6月发布企业版，DAU领先',
    difficulty: 1,
    useCases: ['办公提效', '知识管理', '团队协作', '数字员工'],
    roles: ['design', 'ops', 'dev'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://workbuddy.tencent.com',
  },
  {
    id: 't104', name: '腾讯混元大模型', category: 'text',
    description: '腾讯自研大模型。Hy3 Preview(2026.4)、HY 2.0(2025.12)。支持文本/图像/视频/3D生成，256K上下文',
    difficulty: 2,
    useCases: ['API开发', '文本生成', '图像生成', '视频生成', '3D模型生成', 'Agent开发'],
    roles: ['dev'],
    phases: ['day60', 'day90'],
    url: 'https://cloud.tencent.com/product/hunyuan',
  },
  {
    id: 't105', name: 'TokenHub', category: 'code',
    description: '腾讯多模型服务平台，集成混元+DeepSeek+GLM+Kimi等30+模型，算力利用率提升40%',
    difficulty: 2,
    useCases: ['模型调优', '多模型切换', '成本优化', 'API统一管理'],
    roles: ['dev'],
    phases: ['day60', 'day90'],
    url: 'https://cloud.tencent.com/product/tokenhub',
  },
  {
    id: 't106', name: '腾讯妙境 Miora', category: 'image',
    description: '腾讯全场景创意智能体工作室，AI辅助创意设计',
    difficulty: 2,
    useCases: ['创意设计', '视觉生成', '品牌设计', '营销素材'],
    roles: ['art', 'design'],
    phases: ['day60', 'day90'],
    url: 'https://miora.tencent.com',
  },
  {
    id: 't107', name: '腾讯文档 AI', category: 'text',
    description: '腾讯文档内置AI能力，智能写作、数据分析、自动生成PPT',
    difficulty: 1,
    useCases: ['智能写作', '数据分析', 'PPT生成', '协作文档'],
    roles: ['design', 'ops'],
    phases: ['day30', 'day60'],
    url: 'https://docs.qq.com',
  },
  {
    id: 't108', name: '腾讯会议 AI', category: 'text',
    description: '腾讯会议内置AI助手，会前/会中/会后全流程AI赋能',
    difficulty: 1,
    useCases: ['会议记录', '实时翻译', '重点提取', '待办生成'],
    roles: ['design', 'ops'],
    phases: ['day30', 'day60'],
    url: 'https://meeting.tencent.com',
  },

  // ==================== 通用AI工具 ====================
  {
    id: 't001', name: 'ChatGPT', category: 'text',
    description: 'OpenAI的对话助手，最广泛使用的AI工具',
    difficulty: 1,
    useCases: ['文案撰写', '邮件生成', '会议纪要', '代码解释', '头脑风暴'],
    roles: ['art', 'design', 'dev', 'ops'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://chat.openai.com',
  },
  {
    id: 't002', name: 'Claude', category: 'text',
    description: 'Anthropic的AI助手，擅长长文本处理和深度分析',
    difficulty: 1,
    useCases: ['长文档分析', '代码审查', '技术方案设计', '知识问答'],
    roles: ['art', 'design', 'dev', 'ops'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://claude.ai',
  },
  {
    id: 't003', name: 'Midjourney', category: 'image',
    description: 'AI图像生成工具，擅长艺术风格创作',
    difficulty: 2,
    useCases: ['概念设计', '场景原画', '角色设计', 'UI素材', '营销海报'],
    roles: ['art', 'design'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://midjourney.com',
  },
  {
    id: 't004', name: 'Stable Diffusion', category: 'image',
    description: '开源AI图像生成模型，支持本地部署和LoRA训练',
    difficulty: 3,
    useCases: ['批量图像生成', '风格迁移', 'LoRA训练', 'ControlNet控制'],
    roles: ['art'],
    phases: ['day60', 'day90'],
    url: 'https://stability.ai',
  },
  {
    id: 't005', name: 'GitHub Copilot', category: 'code',
    description: 'GitHub的AI编程助手，免费版2000次/月补全，Pro版$10/月无限使用',
    difficulty: 2,
    useCases: ['代码补全', '函数生成', '代码审查', 'Bug修复'],
    roles: ['dev'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://github.com/features/copilot',
  },
  {
    id: 't006', name: 'Cursor', category: 'code',
    description: 'AI原生代码编辑器，集成Claude/GPT/DeepSeek等多模型，支持Agent模式',
    difficulty: 2,
    useCases: ['代码重构', '项目脚手架', '智能补全', 'Agent模式'],
    roles: ['dev'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://cursor.com',
  },
  {
    id: 't007', name: 'Claude Code', category: 'code',
    description: 'Anthropic的CLI编程助手，复杂代码任务和多文件编辑',
    difficulty: 3,
    useCases: ['大型重构', '多文件编辑', '架构设计', '调试'],
    roles: ['dev'],
    phases: ['day60', 'day90'],
    url: 'https://claude.ai/code',
  },
  {
    id: 't008', name: 'ComfyUI', category: 'image',
    description: '节点式AI图像工作流，117k Stars，2026.6.16最新版v0.25.0',
    difficulty: 4,
    useCases: ['复杂图像工作流', '批量处理', '模型组合', 'LoRA应用'],
    roles: ['art'],
    phases: ['day60', 'day90'],
    url: 'https://github.com/comfyanonymous/ComfyUI',
  },
  {
    id: 't009', name: 'Notion AI', category: 'text',
    description: 'Notion内置AI助手，知识管理和文档协作',
    difficulty: 1,
    useCases: ['文档总结', '知识库整理', '项目管理', '会议纪要'],
    roles: ['design', 'ops'],
    phases: ['day30', 'day60', 'day90'],
    url: 'https://notion.so',
  },
];

export function getToolsByPhaseAndRole(phase: string, role: string): AITool[] {
  return AI_TOOLS.filter(tool =>
    tool.phases.includes(phase as any) && tool.roles.includes(role as any)
  );
}

export function getToolsByCategory(category: string): AITool[] {
  return AI_TOOLS.filter(tool => tool.category === category);
}

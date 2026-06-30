import { Capability, CapabilityInfo, DailyLesson, LearningUnit, Phase, PhaseInfo, UnitCategory } from '../types';

export const PHASES: Record<Phase, PhaseInfo> = {
  day30: {
    key: 'day30', title: 'Day 1-30', subtitle: '觉醒期',
    description: '建立方向认知，完成工具上手和第一次独立产出',
    motto: '昨天是历史，明天是谜团，只有今天是天赐的礼物。',
    duration: '30天', color: '#10B981', icon: '🌱',
    goals: ['掌握核心工具', '形成基础方法', '完成首个方向作品'],
  },
  day60: {
    key: 'day60', title: 'Day 31-60', subtitle: '精通期',
    description: '把能力嵌入真实业务管线，形成稳定的协作交付',
    motto: '真正的力量来自内心的平静。',
    duration: '30天', color: '#3B82F6', icon: '⚡',
    goals: ['进入专业管线', '完成业务协作', '沉淀可复用模板'],
  },
  day90: {
    key: 'day90', title: 'Day 61-90', subtitle: '超越期',
    description: '建设自动化能力，完成团队分享和方向 BOSS 战',
    motto: '不是神龙大侠选中了你，而是你选择了成为神龙大侠。',
    duration: '30天', color: '#8B5CF6', icon: '👑',
    goals: ['搭建自动化系统', '推动团队布道', '交付终极项目'],
  },
};

export const CAPABILITIES: Record<Capability, CapabilityInfo> = {
  'ai-image': {
    key: 'ai-image', title: 'AI 生图师', subtitle: '视觉设计与美术管线',
    description: '用 SD、ControlNet 与 ComfyUI 完成可控视觉资产生产',
    icon: '🎨', color: '#F97316',
    realProjectExample: '48 小时产出完整游戏美术资产包',
    tencentTools: ['腾讯混元生图', '腾讯元宝'],
    coreTools: ['Midjourney', 'Stable Diffusion WebUI', 'ControlNet', 'ComfyUI', 'Kohya LoRA', 'Photoshop AI'],
    entryLevel: 'beginner',
  },
  'ai-video': {
    key: 'ai-video', title: 'AI 视频导演', subtitle: '镜头设计与动态叙事',
    description: '从分镜、角色一致性到 AI 视频后期的完整导演管线',
    icon: '🎬', color: '#EF4444',
    realProjectExample: '72 小时制作 60 秒游戏宣传 PV',
    tencentTools: ['腾讯混元视频', '智影'],
    coreTools: ['Runway', 'Pika', 'Luma Dream Machine', 'Stable Video Diffusion', 'After Effects', 'Topaz Video AI'],
    entryLevel: 'beginner',
  },
  'ai-writing': {
    key: 'ai-writing', title: 'AI 叙事文案', subtitle: '世界观与内容生产',
    description: '构建世界观、任务文本、分支叙事和风格校验管线',
    icon: '✍️', color: '#8B5CF6',
    realProjectExample: '交付世界观、角色故事、任务与营销文案套装',
    tencentTools: ['腾讯元宝', '腾讯文档AI', 'WorkBuddy'],
    coreTools: ['ChatGPT', 'Claude', 'Sudowrite', 'NovelCrafter', 'World Anvil', 'Dify'],
    entryLevel: 'beginner',
  },
  'ai-code': {
    key: 'ai-code', title: 'AI 编程辅助', subtitle: 'AI 原生软件工程',
    description: '用 AI 完成代码理解、测试、重构、评审和工程交付',
    icon: '💻', color: '#06B6D4',
    realProjectExample: '24 小时从策划案交付可玩的功能型 Demo',
    tencentTools: ['CodeBuddy', 'TokenHub'],
    coreTools: ['GitHub Copilot', 'Cursor', 'Cody', 'CodiumAI', 'GitHub Actions', 'Continue.dev'],
    entryLevel: 'beginner',
  },
  'ai-agent': {
    key: 'ai-agent', title: 'AI Agent 构建师', subtitle: '智能体与业务自动化',
    description: '从知识库问答到多 Agent 协作和生产级评测运维',
    icon: '🤖', color: '#10B981',
    realProjectExample: '交付一个可监控、可回归的生产级业务 Agent',
    tencentTools: ['WorkBuddy', '腾讯混元API', 'ADP 4.0'],
    coreTools: ['Dify', 'Coze', 'LangChain', 'LlamaIndex', 'CrewAI', 'AutoGen'],
    entryLevel: 'intermediate',
  },
  'ai-research': {
    key: 'ai-research', title: 'AI 研究员', subtitle: '前沿追踪与快速验证',
    description: '追踪世界模型、A2A、多模态 Agent 与新模型并验证落地价值',
    icon: '🔬', color: '#EC4899',
    realProjectExample: '48 小时完成前沿命题的调研、原型与落地建议',
    tencentTools: ['腾讯混元大模型', 'TokenHub', 'HunyuanT1'],
    coreTools: ['Perplexity', 'Elicit', 'NotebookLM', 'Papers with Code', 'Hugging Face', 'Colab'],
    entryLevel: 'advanced',
  },
};

type UnitSpec = {
  title: string;
  description: string;
  tools: string[];
  objectives: string[];
  category?: UnitCategory;
  deliverable?: string;
  duration?: number;
};

const phaseForWeek = (week: number): Phase => week <= 4 ? 'day30' : week <= 8 ? 'day60' : 'day90';
const prefixForPhase = (phase: Phase) => phase === 'day30' ? '30' : phase === 'day60' ? '60' : '90';
const DAYS_PER_WEEK_BLOCK = [7, 7, 8, 8];

function buildDailyPlan(spec: UnitSpec, week: number): DailyLesson[] {
  const phaseWeek = (week - 1) % 4;
  const startDay = DAYS_PER_WEEK_BLOCK
    .slice(0, phaseWeek)
    .reduce((sum, count) => sum + count, 1);
  const count = DAYS_PER_WEEK_BLOCK[phaseWeek];
  const objectiveA = spec.objectives[0] || spec.title;
  const objectiveB = spec.objectives[1] || objectiveA;
  const objectiveC = spec.objectives[2] || objectiveB;
  const toolLabel = spec.tools.slice(0, 2).join(' + ') || '方向工具';
  const beats = [
    { title: `概念导入：${spec.title}`, task: `阅读方向资料，写下 ${objectiveA} 的关键概念。` },
    { title: `${toolLabel} 环境与界面`, task: `完成工具准备并记录关键设置，确保可以独立复现。` },
    { title: `${objectiveA} · 跟练`, task: `跟随示例完成一次操作，并保存过程截图与参数。` },
    { title: `${objectiveA} · 参数实验`, task: `改变至少 3 组参数，对比结果并写出结论。` },
    { title: `${objectiveB} · 独立练习`, task: `不看示例独立完成任务，记录遇到的问题与解决办法。` },
    { title: `${objectiveC} · 小型产出`, task: `提交一个可展示的阶段产出，并附上制作说明。` },
    { title: '复盘与作品归档', task: `整理本周文件、Prompt 或代码，完成自评并发布学习日志。` },
    { title: '补强测评与下一周准备', task: `完成 10 分钟自测，针对薄弱点补练并准备下一单元。` },
  ];

  return beats.slice(0, count).map((beat, index) => ({
    day: startDay + index,
    title: beat.title,
    description: spec.description,
    duration: Math.max(30, Math.round((spec.duration || 90) / count)),
    task: beat.task,
  }));
}

function buildPath(capability: Capability, prefix: string, specs: UnitSpec[]): LearningUnit[] {
  return specs.map((spec, index) => {
    const week = index + 1;
    const phase = phaseForWeek(week);
    const numberInPhase = ((week - 1) % 4) + 1;
    const id = `${prefix}${prefixForPhase(phase)}-${numberInPhase}`;
    const previousWeek = week - 1;
    const previousPhase = previousWeek > 0 ? phaseForWeek(previousWeek) : null;
    const previousId = previousWeek > 0 && previousPhase
      ? `${prefix}${prefixForPhase(previousPhase)}-${((previousWeek - 1) % 4) + 1}`
      : null;
    return {
      id,
      title: spec.title,
      description: spec.description,
      phase,
      capabilities: [capability],
      duration: spec.duration || (spec.category === 'challenge' ? 240 : 90),
      difficulty: phase === 'day30' ? 1 : phase === 'day60' ? 2 : 3,
      tools: spec.tools,
      objectives: spec.objectives,
      prerequisites: previousId ? [previousId] : [],
      category: spec.category || 'practice',
      week,
      isRealChallenge: spec.category === 'challenge',
      deliverable: spec.deliverable,
      dailyPlan: buildDailyPlan(spec, week),
    };
  });
}

const IMAGE_PATH = buildPath('ai-image', 'img', [
  { title: '视觉提示词与风格拆解', description: '掌握主体、风格、光照、构图和渲染器的视觉提示词结构，建立风格参考板。', tools: ['Midjourney', 'PureRef'], objectives: ['生成100张风格探索图', '精选20张并归纳参数规律', '建立个人视觉词典'] },
  { title: 'Stable Diffusion WebUI 搭建', description: '完成本地 SD 环境、Checkpoint 与 VAE 管理，理解采样器、CFG 和重绘幅度。', tools: ['Stable Diffusion WebUI', 'Civitai'], objectives: ['完成本地部署', '管理模型与 VAE', '对比三组采样参数'] },
  { title: 'ControlNet 精准控图', description: '用 Canny、OpenPose、Depth、Reference 完成线稿、姿态、空间和风格控制。', tools: ['ControlNet', 'Stable Diffusion'], objectives: ['完成草图上色', '复刻指定姿态', '保持场景空间结构'] },
  { title: '角色资产包首秀', description: '综合 Img2Img、Inpainting 和批量生成，产出一套风格统一的 NPC 头像。', tools: ['Stable Diffusion', 'Photoshop AI'], objectives: ['交付10张统一角色立绘', '记录提示词迭代', '完成局部修复'], category: 'challenge', deliverable: '10 张统一风格角色立绘 + Prompt 迭代日志' },
  { title: 'LoRA 数据集与训练', description: '准备 20-50 张高质量训练集，使用 Kohya 调整 dim、alpha 与学习率。', tools: ['Kohya_ss', 'Civitai'], objectives: ['完成数据清洗与标注', '训练首个风格 LoRA', '评估过拟合与风格强度'] },
  { title: '多 LoRA 融合与一致性', description: '测试角色、风格和服装 LoRA 的权重组合，解决角色漂移。', tools: ['Stable Diffusion', 'LoRA'], objectives: ['建立权重测试矩阵', '稳定角色五视图', '沉淀一致性模板'] },
  { title: '3D 与材质协作管线', description: '生成三视图、PBR 材质贴图和建模参考，学习与 3D 美术对接。', tools: ['ComfyUI', 'TextureLab', 'Photoshop AI'], objectives: ['输出角色三视图', '生成法线与粗糙度参考', '完成一次美术评审'] },
  { title: '在研项目视觉交付', description: '经历需求、出图、修改、定稿全过程，交付可进入项目的概念图或 UI 素材。', tools: ['ComfyUI', 'Photoshop AI'], objectives: ['完成3套业务资产', '处理两轮反馈', '编写生图最佳实践'], category: 'challenge', deliverable: '3 套被采纳的 AI 辅助资产 + 最佳实践文档' },
  { title: 'ComfyUI 节点工作流', description: '从零搭建文本输入、生成、ControlNet 精修、超分和自动保存流水线。', tools: ['ComfyUI', 'ControlNet', 'Upscayl'], objectives: ['理解节点数据流', '搭建完整出图链', '输出可复用工作流 JSON'] },
  { title: '团队级生图服务', description: '为工作流加入风格选择、随机元素、批量队列，并封装为共享 API。', tools: ['ComfyUI API', 'Python'], objectives: ['增加条件分支', '实现批量任务队列', '发布团队使用说明'] },
  { title: '视觉管线内部工作坊', description: '设计并主持从提示词到 ComfyUI 自动化的实操培训。', tools: ['ComfyUI', '腾讯会议'], objectives: ['录制教学视频', '完成现场演示', '沉淀常见问题库'], category: 'sharing', deliverable: '教学视频 + 工作流模板 + Q&A' },
  { title: 'BOSS 战：完整美术资产包', description: '48 小时内为新项目独立产出主视觉、角色、场景和图标，验证风格统一与管线复用。', tools: ['ComfyUI', 'Stable Diffusion', 'ControlNet', 'LoRA'], objectives: ['完成完整资产包', '保持视觉风格统一', '提交可复用生产管线'], category: 'challenge', deliverable: '主视觉 + 角色 + 场景 + 图标 + ComfyUI 工作流', duration: 480 },
]);

const VIDEO_PATH = buildPath('ai-video', 'vid', [
  { title: 'AI 镜头语言入门', description: '学习镜头运动、主体、环境、光影和氛围的提示词结构。', tools: ['Runway', 'Pika'], objectives: ['生成60个测试镜头', '记录出片率', '剪出15秒片段'] },
  { title: '关键帧与运动笔刷', description: '使用 Motion Brush 和首尾帧控制局部运动与镜头节奏。', tools: ['Runway', 'Pika'], objectives: ['控制三个局部运动', '完成首尾帧插值', '生成道具旋转视频'] },
  { title: '角色一致性与风格化', description: '通过固定种子、参考图和 EbSynth 保持跨镜头角色外观。', tools: ['EbSynth', 'Runway'], objectives: ['建立角色参考包', '完成15秒循环动画', '总结一致性方法'] },
  { title: '30 秒无对白微剧情', description: '把故事拆成分镜表，用 AI 镜头完成一段有起承转合的微剧情。', tools: ['Runway', 'Premiere'], objectives: ['完成分镜表', '生成至少8个镜头', '完成剪辑与配乐'], category: 'challenge', deliverable: '30 秒微剧情 + 分镜表' },
  { title: 'Stable Video Diffusion 部署', description: '部署本地视频生成模型并理解 motion bucket、fps 和 noise 参数。', tools: ['Stable Video Diffusion', 'ComfyUI'], objectives: ['完成本地部署', '对比参数效果', '形成性能记录'] },
  { title: '角色口型与表演驱动', description: '用 Hedra 或 SadTalker 制作角色独白，处理音画同步。', tools: ['Hedra', 'SadTalker', 'ElevenLabs'], objectives: ['生成20秒角色独白', '校正口型', '完成声音与表情匹配'] },
  { title: 'AI + AE 后期管线', description: '完成 AI 素材的合成、抠像、调色、转场和瑕疵修复。', tools: ['After Effects', 'Topaz Video AI'], objectives: ['完成镜头合成', '统一全片色调', '输出超分版本'] },
  { title: '真实宣传片段交付', description: '承接剧情动画、技能演示或 PV 需求，完成项目级视频交付。', tools: ['Runway', 'After Effects'], objectives: ['完成30秒业务片段', '经历两轮修改', '通过项目验收'], category: 'challenge', deliverable: '30 秒项目视频 + 修改记录' },
  { title: '脚本到镜头自动生产线', description: '把脚本拆镜、提示词生成、批量出镜头和自动命名串成流水线。', tools: ['Python', 'Runway API'], objectives: ['实现脚本拆镜', '批量生成镜头', '自动整理素材目录'] },
  { title: '声音与自动剪辑增强', description: '引入音效生成、配音和节拍检测，提升自动成片完整度。', tools: ['ElevenLabs', 'Descript', 'FFmpeg'], objectives: ['生成音效与配音', '实现节拍对齐', '输出自动粗剪'] },
  { title: 'AI 视频跨部门工作坊', description: '带市场与策划完成一支短视频，推广可复制的视频生产模板。', tools: ['Runway', 'Pika'], objectives: ['准备标准模板', '完成现场共创', '发布操作手册'], category: 'sharing', deliverable: '工作坊课件 + 视频模板' },
  { title: 'BOSS 战：60 秒游戏 PV', description: '72 小时完成包含剧情、角色展示、动效字幕和配乐的宣传 PV。', tools: ['Runway', 'Luma', 'After Effects', 'Topaz Video AI'], objectives: ['完成导演阐述', '保持角色与风格一致', '交付多平台成片'], category: 'challenge', deliverable: '60 秒宣传 PV + 分镜 + 工程文件', duration: 720 },
]);

const WRITING_PATH = buildPath('ai-writing', 'wri', [
  { title: '结构化提示与风格词库', description: '用角色设定、输出格式、约束和范例控制叙事语气。', tools: ['ChatGPT', 'Claude'], objectives: ['生成10种 NPC 语气', '建立风格提示词库', '设计质量检查表'] },
  { title: '世界观系统构建', description: '从历史、地理、种族到冲突逐层构建世界，并校验设定一致性。', tools: ['Claude', 'World Anvil'], objectives: ['完成3000字世界观', '绘制设定关系图', '修复逻辑冲突'] },
  { title: '任务文本与对话树', description: '用结构化模板批量生成支线任务、NPC 对话和玩家选项。', tools: ['NovelCrafter', 'ChatGPT'], objectives: ['生成20个支线任务', '设计分支对话树', '导出结构化 JSON'] },
  { title: '营销文案 A/B 实战', description: '针对同一游戏卖点生成不同调性的宣传语并模拟效果测试。', tools: ['Jasper', 'Notion AI'], objectives: ['输出5套宣传方案', '设计 A/B 指标', '完成文案迭代'], category: 'challenge', deliverable: '5 套营销文案 + A/B 测试报告' },
  { title: '多语言本地化提示链', description: '构建中文到英文、日文的翻译与文化适配流程。', tools: ['Claude', 'Grammarly'], objectives: ['建立术语表', '完成三语转换', '处理文化禁忌'] },
  { title: '长文本一致性校验', description: '用长上下文检查角色、时间线、术语和叙事事实冲突。', tools: ['Claude', 'NotebookLM'], objectives: ['建立事实库', '发现设定冲突', '输出修订建议'] },
  { title: '动态叙事 JSON 原型', description: '设计分支叙事状态、条件与回流，并与程序协作接入原型。', tools: ['ChatGPT', 'JSON Schema'], objectives: ['绘制叙事状态图', '生成有效 JSON', '接入 NPC 原型'] },
  { title: '在研项目文本交付', description: '为真实项目批量撰写或润色文本，并依据玩家反馈迭代。', tools: ['Claude', 'Notion AI'], objectives: ['完成批量文本交付', '收集玩家反馈', '完成两轮改稿'], category: 'challenge', deliverable: '项目文本包 + 玩家反馈迭代记录' },
  { title: 'IP 风格校验 Agent', description: '内置术语库、禁忌词表和风格指南，自动检查文本调性。', tools: ['Dify', 'Coze'], objectives: ['构建知识库', '设计校验规则', '输出修改建议'] },
  { title: '叙事内容生产流水线', description: '串联需求解析、初稿、校验、润色和多语言输出。', tools: ['Dify', 'Claude API'], objectives: ['搭建多步工作流', '加入人工审核节点', '测算效率提升'] },
  { title: 'AI 辅助写作训练营', description: '带非文案同事完成一个小型剧情设计并复盘方法。', tools: ['腾讯文档AI', 'Claude'], objectives: ['制作教学案例', '主持共创练习', '整理写作模板'], category: 'sharing', deliverable: '训练营课件 + 叙事模板库' },
  { title: 'BOSS 战：新项目叙事套装', description: '48 小时交付世界观、角色背景、任务文本与官网营销页。', tools: ['Claude', 'NovelCrafter', 'Dify'], objectives: ['保持全套设定一致', '完成多类型文本', '提交风格校验报告'], category: 'challenge', deliverable: '世界观 + 3 个角色故事 + 10 个任务 + 营销页', duration: 480 },
]);

const CODE_PATH = buildPath('ai-code', 'code', [
  { title: 'Copilot 与 Cursor 工程配置', description: '配置项目指令、上下文规则和隐私边界，建立 AI 结对编程习惯。', tools: ['GitHub Copilot', 'Cursor'], objectives: ['编写项目规则文件', '完成3个函数任务', '记录采纳率'] },
  { title: '陌生代码库理解', description: '让 AI 生成模块地图、调用链和风险点，快速接手现有工程。', tools: ['Cody', 'Cursor'], objectives: ['绘制模块依赖图', '解释关键调用链', '输出接手指南'] },
  { title: '测试驱动 AI 开发', description: '先生成测试和边界条件，再让 AI 实现代码并迭代。', tools: ['CodiumAI', 'Vitest'], objectives: ['补齐单元测试', '覆盖异常路径', '完成红绿重构循环'] },
  { title: '完整游戏模块交付', description: '用 AI 辅助完成背包或对话系统的核心逻辑与测试。', tools: ['Cursor', 'GitHub Copilot'], objectives: ['完成需求拆解', '交付可运行模块', '通过代码评审'], category: 'challenge', deliverable: '可运行模块 + 测试 + 技术说明' },
  { title: 'AI 辅助代码评审', description: '建立安全、性能、可读性审查标准并接入 PR 流程。', tools: ['GitHub Actions', 'Claude'], objectives: ['定义审查清单', '搭建自动评审', '降低无效建议'] },
  { title: 'API 文档自动化', description: '从类型和注释生成 API 文档，再转换成新人教程。', tools: ['Mintlify', 'Claude'], objectives: ['生成 API 文档', '补齐示例代码', '发布新人指南'] },
  { title: '一小时可玩原型', description: '与策划、美术协作，用 AI 快速搭建具有完整交互闭环的原型。', tools: ['Cursor', 'v0', 'Bolt'], objectives: ['完成跨职能拆解', '一小时形成原型', '记录 AI 协作流程'] },
  { title: '性能诊断与优化', description: '结合性能剖析数据，让 AI 提出并验证优化方案。', tools: ['Profiler', 'Claude'], objectives: ['定位性能瓶颈', '验证优化假设', '输出对比报告'], category: 'challenge', deliverable: '性能优化 PR + 基准测试报告' },
  { title: '代码库 RAG 问答', description: '索引代码、API 和 ADR，构建带引用的内部代码问答助手。', tools: ['LlamaIndex', 'Continue.dev'], objectives: ['建立代码索引', '实现引用回溯', '设计权限边界'] },
  { title: 'Issue 到 PR 自动化', description: '让工程 Agent 理解 Issue、修改代码、运行测试并生成 PR 草稿。', tools: ['Sweep AI', 'GitHub Actions'], objectives: ['实现任务拆解', '自动执行测试', '生成可审查 PR'] },
  { title: 'AI 编码规范推广', description: '制定团队 AI 编码与审查规范，主持工程实践分享。', tools: ['GitHub Copilot', 'Cursor'], objectives: ['编写团队规范', '演示真实案例', '收集并改进反馈'], category: 'sharing', deliverable: 'AI 编码规范 + 分享录像' },
  { title: 'BOSS 战：24 小时极限开发', description: '根据策划案从零实现含 UI、逻辑和联机能力的功能型 Demo。', tools: ['Cursor', 'GitHub Copilot', 'GitHub Actions'], objectives: ['交付可玩 Demo', '保证代码质量', '记录 AI 决策与人工校验'], category: 'challenge', deliverable: '可玩 Demo + 源码 + 测试 + AI 协作日志', duration: 720 },
]);

const AGENT_PATH = buildPath('ai-agent', 'agt', [
  { title: 'Dify/Coze FAQ Bot', description: '搭建首个企业 FAQ Bot，掌握知识库分段、召回和回答约束。', tools: ['Dify', 'Coze'], objectives: ['导入公司文档', '覆盖20种提问', '识别未命中问题'] },
  { title: '意图判断与工作流', description: '设计判断意图、查询知识库、生成回答和人工转接的多步流程。', tools: ['Dify Workflow'], objectives: ['搭建分支流程', '调用外部 API', '实现异常兜底'] },
  { title: 'Agent 系统提示与记忆', description: '控制 Agent 人格、边界、结构化输出和多轮上下文。', tools: ['Coze', 'Dify'], objectives: ['设计系统提示', '控制上下文窗口', '构建策划助理'] },
  { title: '发布、日志与命中率', description: '发布到飞书或企业微信，通过日志分析持续优化回答。', tools: ['飞书开放平台', 'Dify'], objectives: ['完成渠道发布', '设计日志指标', '优化低命中问题'], category: 'challenge', deliverable: '上线 FAQ Bot + 首周运营报告' },
  { title: 'LangChain RAG 全流程', description: '用代码完成加载、分割、嵌入、检索、生成与引用。', tools: ['LangChain', 'Python'], objectives: ['实现完整 RAG', '对比切分策略', '返回来源引用'] },
  { title: '检索质量与评测集', description: '建立黄金问题集，对比嵌入、召回、重排和上下文策略。', tools: ['LlamaIndex', 'Ragas'], objectives: ['构建评测集', '测量准确率', '优化检索链路'] },
  { title: '多 Agent 协作编排', description: '让需求、执行和测试 Agent 分工协作并处理冲突。', tools: ['CrewAI', 'AutoGen'], objectives: ['定义角色职责', '实现任务交接', '处理失败重试'] },
  { title: '业务 Agent 交付', description: '针对日报、排期或服务器监控需求开发可实际使用的 Agent。', tools: ['LangChain', '飞书开放平台'], objectives: ['完成用户访谈', '部署业务 Agent', '根据测试反馈迭代'], category: 'challenge', deliverable: '业务 Agent + 用户测试报告 + 部署文档' },
  { title: 'Agent 观测与成本面板', description: '监控准确率、响应时间、Token 成本和用户满意度。', tools: ['LangSmith', 'Grafana'], objectives: ['接入链路追踪', '定义服务指标', '建立告警规则'] },
  { title: '自动回归与安全护栏', description: '为提示词、工具调用和知识库变更建立自动化回归。', tools: ['Ragas', 'Promptfoo'], objectives: ['建立回归集', '测试越权与注入', '加入发布门禁'] },
  { title: 'Agent Builder 训练营', description: '提供标准模板，带团队完成可上线的部门助理。', tools: ['Dify', 'Coze'], objectives: ['准备3个模板', '组织实操工作坊', '沉淀上线检查表'], category: 'sharing', deliverable: '训练营课件 + 3 个 Agent 模板' },
  { title: 'BOSS 战：生产级 Agent', description: '72 小时完成需求分析、开发、评测、监控和上线。', tools: ['LangChain', 'LlamaIndex', 'LangSmith'], objectives: ['达到业务准确率目标', '具备监控与回归', '通过真实用户验收'], category: 'challenge', deliverable: '生产级 Agent + 评测报告 + 运维面板', duration: 720 },
]);

const RESEARCH_PATH = buildPath('ai-research', 'res', [
  { title: '前沿信息监控仪表盘', description: '订阅顶会、实验室和模型发布源，建立 AI+游戏关键词过滤。', tools: ['Feedly', 'Inoreader', 'NotebookLM'], objectives: ['配置30个高质量信息源', '建立主题过滤', '形成每日摘要'] },
  { title: '三遍论文研读法', description: '从摘要、图表到实验细节快速判断论文价值与证据强度。', tools: ['Elicit', 'Consensus'], objectives: ['精读3篇论文', '提取关键实验', '完成落地可能性评估'] },
  { title: '世界模型与多模态 Agent 雷达', description: '跟踪世界模型、具身智能、多模态 Agent 与 A2A 协议最新进展。', tools: ['Perplexity', 'Papers with Code'], objectives: ['梳理关键玩家', '比较技术路线', '判断成熟度与影响面'] },
  { title: '内部技术雷达 v1', description: '选出10项近期技术，标注采用、试验、观察或暂缓。', tools: ['NotebookLM', 'Notion'], objectives: ['建立评估维度', '完成10项技术评分', '向业务团队汇报'], category: 'challenge', deliverable: 'AI 技术雷达 + 趋势简报' },
  { title: '新模型快速评测', description: '建立标准任务集，对新发布模型进行能力、速度、成本和安全对比。', tools: ['Hugging Face', 'TokenHub'], objectives: ['设计评测任务', '跑通3个模型', '输出选型建议'] },
  { title: '论文复现与基线', description: '从 Papers with Code 选择游戏相关论文，在 Colab 复现核心结果。', tools: ['Papers with Code', 'Colab'], objectives: ['跑通官方代码', '对齐基线指标', '记录复现障碍'] },
  { title: 'A2A 与 Agent 协议验证', description: '验证 Agent2Agent、MCP 等互操作协议在团队工作流中的可行性。', tools: ['A2A SDK', 'MCP SDK'], objectives: ['梳理协议差异', '实现双 Agent 通信', '评估安全边界'] },
  { title: '业务痛点 PoC', description: '与业务团队定义问题，用最小原型验证 AI 方案价值。', tools: ['Colab', 'Hugging Face'], objectives: ['完成问题定义', '实现最小 PoC', '量化收益与风险'], category: 'challenge', deliverable: '可运行 PoC + 可行性报告' },
  { title: '研究知识库自动更新', description: '自动抓取、摘要、去重、分类并推送每日 AI 前沿。', tools: ['LlamaIndex', 'Feedly API'], objectives: ['建立自动采集', '实现主题分类', '接入团队 Wiki'] },
  { title: '未来 6 个月技术判断', description: '结合证据、产业信号和业务约束，提出五个重点下注方向。', tools: ['Perplexity', 'NotebookLM'], objectives: ['建立判断框架', '给出正反证据', '设计验证里程碑'] },
  { title: '论文精读会与白皮书', description: '主持内部研讨并发布面向业务的前沿技术白皮书。', tools: ['NotebookLM', '腾讯文档AI'], objectives: ['组织精读讨论', '转译技术价值', '发布内部白皮书'], category: 'sharing', deliverable: '研讨会材料 + 技术白皮书' },
  { title: 'BOSS 战：48 小时前沿命题', description: '针对管理层随机命题完成文献调研、原理分析、原型代码和落地建议。', tools: ['Perplexity', 'Papers with Code', 'Colab'], objectives: ['形成证据链', '交付可运行原型', '给出分阶段落地路线'], category: 'challenge', deliverable: '研究报告 + 原型代码 + 落地路线图', duration: 480 },
]);

export const LEARNING_UNITS: LearningUnit[] = [
  ...IMAGE_PATH,
  ...VIDEO_PATH,
  ...WRITING_PATH,
  ...CODE_PATH,
  ...AGENT_PATH,
  ...RESEARCH_PATH,
];

export function getLearningPath(capability: Capability, phase?: Phase): LearningUnit[] {
  return LEARNING_UNITS.filter(unit =>
    unit.capabilities.includes(capability) && (!phase || unit.phase === phase));
}

export function getPhaseInfo(phase: Phase): PhaseInfo { return PHASES[phase]; }
export function getAllPhases(): PhaseInfo[] { return Object.values(PHASES); }
export function getAllCapabilities(): CapabilityInfo[] { return Object.values(CAPABILITIES); }
export function getCapabilityInfo(capability: Capability): CapabilityInfo { return CAPABILITIES[capability]; }

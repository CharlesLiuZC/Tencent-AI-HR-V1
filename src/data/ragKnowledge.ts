// ==================== AI 知识 RAG 向量库 ====================
// 来源：吴恩达机器学习/人工智能课程、GitHub热门项目、HuggingFace、公开AI知识
// 用途：为入职诊断Agent提供知识检索能力，精准评估新人AI水平

export interface KnowledgeChunk {
  id: string;
  source: 'andrew-ml' | 'andrew-ai' | 'github' | 'huggingface' | 'tencent' | 'industry';
  category: string;
  title: string;
  content: string;
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  capability: string; // 关联的AI能力方向
}

export const RAG_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ==================== 吴恩达机器学习课程核心知识 ====================
  {
    id: 'ml-001', source: 'andrew-ml', category: '监督学习',
    title: '线性回归与梯度下降',
    content: '线性回归是机器学习最基础的算法，通过最小化预测值与实际值之间的均方误差来拟合数据。梯度下降是优化算法，沿损失函数的负梯度方向迭代更新参数。学习率α控制步长，过大导致震荡，过小导致收敛慢。',
    keywords: ['线性回归', '梯度下降', '损失函数', '学习率', '均方误差'],
    difficulty: 'beginner', capability: 'ai-code',
  },
  {
    id: 'ml-002', source: 'andrew-ml', category: '神经网络',
    title: '神经网络基础架构',
    content: '神经网络由输入层、隐藏层和输出层组成。每个神经元接收输入，通过权重加权求和后经过激活函数（ReLU/Sigmoid/Tanh）输出。反向传播算法通过链式法则计算梯度，实现端到端学习。深度学习=多层神经网络+大数据+强算力。',
    keywords: ['神经网络', '激活函数', '反向传播', '深度学习', '权重'],
    difficulty: 'beginner', capability: 'ai-code',
  },
  {
    id: 'ml-003', source: 'andrew-ml', category: '计算机视觉',
    title: '卷积神经网络(CNN)',
    content: 'CNN通过卷积层提取局部特征，池化层降低维度，全连接层进行分类。卷积核在图像上滑动，自动学习边缘、纹理、形状等层次化特征。经典架构：LeNet→AlexNet→VGG→ResNet→EfficientNet。',
    keywords: ['CNN', '卷积', '池化', 'ResNet', '图像分类'],
    difficulty: 'intermediate', capability: 'ai-image',
  },
  {
    id: 'ml-004', source: 'andrew-ml', category: '自然语言处理',
    title: '序列模型与注意力机制',
    content: 'RNN处理序列数据但存在梯度消失问题。LSTM通过门控机制解决长期依赖。注意力机制让模型聚焦输入的关键部分。Transformer用自注意力替代RNN，实现并行计算，成为现代NLP的基石。',
    keywords: ['RNN', 'LSTM', '注意力机制', 'Transformer', 'NLP'],
    difficulty: 'intermediate', capability: 'ai-code',
  },
  {
    id: 'ml-005', source: 'andrew-ml', category: '无监督学习',
    title: '聚类与降维',
    content: 'K-Means聚类将数据分为K个簇，通过迭代优化簇中心。PCA主成分分析将高维数据投影到低维空间，保留最大方差。t-SNE用于高维数据可视化。应用场景：用户分群、异常检测、特征工程。',
    keywords: ['K-Means', 'PCA', '聚类', '降维', '异常检测'],
    difficulty: 'beginner', capability: 'ai-code',
  },

  // ==================== 吴恩达人工智能课程核心知识 ====================
  {
    id: 'ai-001', source: 'andrew-ai', category: '搜索与优化',
    title: '搜索算法与启发式方法',
    content: '搜索是AI的核心能力。广度优先搜索(BFS)保证最短路径，深度优先搜索(DFS)节省内存。A*搜索用启发函数指导方向，大幅提高效率。游戏AI中的寻路、规划、决策都依赖搜索算法。',
    keywords: ['BFS', 'DFS', 'A*', '启发式', '搜索算法'],
    difficulty: 'beginner', capability: 'ai-code',
  },
  {
    id: 'ai-002', source: 'andrew-ai', category: '概率推理',
    title: '贝叶斯推理与概率图模型',
    content: '贝叶斯定理 P(A|B) = P(B|A)*P(A)/P(B) 是AI推理的数学基础。贝叶斯网络用有向图表示变量间的条件依赖关系。应用：垃圾邮件过滤、医疗诊断、推荐系统。',
    keywords: ['贝叶斯', '概率推理', '条件概率', '贝叶斯网络'],
    difficulty: 'intermediate', capability: 'ai-research',
  },
  {
    id: 'ai-003', source: 'andrew-ai', category: '机器学习工程',
    title: '模型评估与选择',
    content: '训练集/验证集/测试集三划分防止过拟合。交叉验证评估模型泛化能力。精确率(Precision)、召回率(Recall)、F1-Score衡量分类效果。AUC-ROC曲线评估模型在不同阈值下的表现。',
    keywords: ['过拟合', '交叉验证', '精确率', '召回率', 'AUC'],
    difficulty: 'beginner', capability: 'ai-code',
  },

  // ==================== GitHub 热门AI项目知识 ====================
  {
    id: 'gh-001', source: 'github', category: 'Prompt Engineering',
    title: 'Prompt Engineering 指南 (75k Stars)',
    content: 'DAIR.AI的Prompt Engineering Guide是学习提示词工程的权威资源。核心技术包括：Zero-shot（零样本）、Few-shot（少样本）、Chain-of-Thought（思维链）、Self-Consistency（自一致性）、Tree of Thoughts（思维树）。高级技巧：角色设定、格式控制、约束条件、多轮对话管理。',
    keywords: ['Prompt', 'Zero-shot', 'Few-shot', 'CoT', '思维链'],
    difficulty: 'beginner', capability: 'ai-writing',
  },
  {
    id: 'gh-002', source: 'github', category: 'AI Agent',
    title: 'AutoGPT与AI Agent架构 (185k Stars)',
    content: 'AutoGPT是最流行的AI Agent框架。Agent核心架构：感知→规划→执行→反思。ReAct模式：推理(Reasoning)+行动(Acting)交替进行。Tool Use让LLM调用外部工具（搜索、计算、API）。Memory系统让Agent记住历史交互。',
    keywords: ['Agent', 'AutoGPT', 'ReAct', 'Tool Use', 'Memory'],
    difficulty: 'advanced', capability: 'ai-agent',
  },
  {
    id: 'gh-003', source: 'github', category: '代码生成',
    title: 'LangChain框架 (140k Stars)',
    content: 'LangChain是最流行的LLM应用开发框架。核心概念：Chain（链式调用）、Agent（自主决策）、Memory（上下文记忆）、Tool（外部工具）。支持RAG（检索增强生成）：将文档切块→向量化→检索→生成。',
    keywords: ['LangChain', 'Chain', 'RAG', '向量检索', 'LLM应用'],
    difficulty: 'advanced', capability: 'ai-agent',
  },
  {
    id: 'gh-004', source: 'github', category: '图像生成',
    title: 'Stable Diffusion原理 (117k Stars)',
    content: 'Stable Diffusion是开源图像生成模型。核心原理：文本编码器(CLIP)将Prompt转为向量→U-Net在潜空间去噪→VAE解码器生成图像。关键参数：CFG Scale（提示词引导强度）、Steps（采样步数）、Sampler（采样器）。ControlNet实现精确控制，LoRA实现风格微调。',
    keywords: ['Stable Diffusion', 'CLIP', 'U-Net', 'VAE', 'ControlNet', 'LoRA'],
    difficulty: 'intermediate', capability: 'ai-image',
  },
  {
    id: 'gh-005', source: 'github', category: 'AI编程',
    title: 'GitHub Copilot与AI辅助编程',
    content: 'GitHub Copilot基于Codex模型，根据上下文生成代码建议。最佳实践：写清晰注释引导AI、用函数签名描述意图、分步骤生成复杂逻辑、始终审查AI生成的代码。90%代码由AI生成时，人的价值在于架构设计、代码审查和需求理解。',
    keywords: ['Copilot', 'AI编程', '代码生成', '代码审查', 'Cursor'],
    difficulty: 'beginner', capability: 'ai-code',
  },

  // ==================== HuggingFace 知识 ====================
  {
    id: 'hf-001', source: 'huggingface', category: '模型微调',
    title: 'SFT与LoRA微调技术',
    content: 'Supervised Fine-Tuning(SFT)用标注数据微调预训练模型。LoRA(Low-Rank Adaptation)只训练低秩矩阵，大幅减少参数量和计算成本。RLHF通过人类反馈强化学习对齐模型行为。应用：让通用模型擅长特定任务（如游戏NPC对话、美术风格生成）。',
    keywords: ['SFT', 'LoRA', 'RLHF', '微调', 'Fine-tuning'],
    difficulty: 'advanced', capability: 'ai-research',
  },
  {
    id: 'hf-002', source: 'huggingface', category: 'AI Agent',
    title: 'HuggingFace Agents课程',
    content: 'HuggingFace免费Agent课程涵盖：Agent核心架构、Tool Use机制、Multi-Agent协作、Agent评估方法。关键概念：ReAct循环、Function Calling、MCP协议、Agent Runtime。',
    keywords: ['Agent课程', 'Multi-Agent', 'Function Calling', 'MCP'],
    difficulty: 'intermediate', capability: 'ai-agent',
  },
  {
    id: 'hf-003', source: 'huggingface', category: '视频生成',
    title: '视频生成模型架构',
    content: '视频生成模型核心架构：时序注意力(Temporal Attention)处理帧间关系，空间注意力(Spatial Attention)处理帧内内容。Seedance 2.0采用混合Mamba-MoE架构，实现24FPS实时生成。关键挑战：时间一致性、运动合理性、长视频生成。',
    keywords: ['视频生成', 'Seedance', '时序注意力', 'Mamba', 'MoE'],
    difficulty: 'advanced', capability: 'ai-video',
  },

  // ==================== 腾讯AI知识 ====================
  {
    id: 'tc-001', source: 'tencent', category: '腾讯AI工具',
    title: '腾讯AI工具栈全景',
    content: '腾讯AI工具栈：元宝（通用AI助手）、CodeBuddy（AI编程，覆盖95%工程师）、WorkBuddy（AI工作台）、混元大模型（文本/图像/视频/3D）、TokenHub（多模型平台）、妙境Miora（创意设计）。CodeBuddy使90%代码由AI生成，研发提效40%。',
    keywords: ['腾讯元宝', 'CodeBuddy', 'WorkBuddy', '混元', 'TokenHub'],
    difficulty: 'beginner', capability: 'ai-code',
  },
  {
    id: 'tc-002', source: 'tencent', category: '腾讯AI战略',
    title: '腾讯AI Native组织转型',
    content: '腾讯AI战略：从AI Lab实验室模式转向AI Infra/Data部公司级工程。引入首席AI科学家姚顺雨（前OpenAI）。2026年6月发布WorkBuddy企业版+Agent Suite。核心理念：从超级个体到超级团队。一人公司模式——只要有想法，就能与AI协作做出完整产品。',
    keywords: ['AI Native', 'WorkBuddy', 'Agent Suite', '一人公司'],
    difficulty: 'intermediate', capability: 'ai-agent',
  },

  // ==================== 行业知识 ====================
  {
    id: 'ind-001', source: 'industry', category: 'AI应用',
    title: 'AI在游戏行业的应用',
    content: '游戏行业AI应用：1)美术：AI概念设计、角色生成、场景设计(SD/MJ) 2)策划：AI辅助数值平衡、关卡设计、剧情生成 3)程序：AI辅助编程(Copilot)、自动化测试 4)运营：AI数据分析、用户画像、内容生成 5)音频：AI配音、BGM生成。头部公司：腾讯90%代码AI生成、米哈游用LoRA定制画风。',
    keywords: ['游戏AI', '美术AI', 'AI配音', 'LoRA', 'Copilot'],
    difficulty: 'beginner', capability: 'ai-code',
  },
  {
    id: 'ind-002', source: 'industry', category: 'Prompt Engineering',
    title: 'Prompt Engineering 实战技巧',
    content: 'CRISPE框架：Context(背景)+Role(角色)+Instruction(指令)+Style(风格)+Purpose(目的)+Example(示例)。常见反模式：模糊指令、缺乏约束、忽略上下文、一次要求太多。进阶：思维链(CoT)让AI展示推理过程、Few-shot提供示例引导、Self-consistency多次采样取最优。',
    keywords: ['CRISPE', 'Prompt框架', '思维链', 'Few-shot', '反模式'],
    difficulty: 'beginner', capability: 'ai-writing',
  },

  // ==================== AI生图深度知识 ====================
  {
    id: 'img-001', source: 'industry', category: 'AI生图',
    title: 'Midjourney提示词公式',
    content: 'Midjourney提示词结构：[主体描述]+[风格]+[构图]+[光照]+[色调]+[细节]+[参数]。关键参数：--ar宽高比(--ar 16:9)、--v版本(--v 6)、--s风格化(--s 750)、--chaos混沌度(--chaos 30)。进阶技巧：权重分配(cat::2 dog::1)、负向提示词(--no text, watermark)、图片混合(--blend img1 img2)。',
    keywords: ['Midjourney', '提示词', '参数', '宽高比', '风格化'],
    difficulty: 'beginner', capability: 'ai-image',
  },
  {
    id: 'img-002', source: 'github', category: 'AI生图',
    title: 'Stable Diffusion核心参数详解',
    content: 'CFG Scale(提示词引导强度)：3-30，越高越贴近提示词但可能过度饱和。Steps(采样步数)：20-50，越高越精细但耗时更长。Sampler(采样器)：Euler a(快速)、DPM++ 2M Karras(平衡)、DDIM(确定性)。Seed(随机种子)：固定种子可复现结果。分辨率：512x512(SD1.5)、1024x1024(SDXL)。',
    keywords: ['Stable Diffusion', 'CFG', 'Steps', 'Sampler', 'Seed', '分辨率'],
    difficulty: 'intermediate', capability: 'ai-image',
  },
  {
    id: 'img-003', source: 'github', category: 'AI生图',
    title: 'ControlNet精确控制技术',
    content: 'ControlNet通过额外条件控制AI图像生成。主要预处理器：Canny(边缘检测)、OpenPose(人体姿势)、Depth(深度图)、Scribble(涂鸦)、Lineart(线稿)、MLSD(直线检测)。使用技巧：多ControlNet组合(姿势+深度)、控制强度调节(0.3-1.0)、与LoRA配合实现风格+控制。',
    keywords: ['ControlNet', 'Canny', 'OpenPose', '深度图', '姿势控制'],
    difficulty: 'intermediate', capability: 'ai-image',
  },
  {
    id: 'img-004', source: 'huggingface', category: 'AI生图',
    title: 'LoRA模型训练实战',
    content: 'LoRA(Low-Rank Adaptation)微调SD模型。数据准备：20-50张高质量图片，统一裁剪为512x512或1024x1024。训练参数：学习率1e-4、训练步数1000-3000、网络维度(rank)32-128。触发词：训练时定义触发词，推理时使用。应用场景：角色一致性、画风迁移、IP形象生成。',
    keywords: ['LoRA', '微调', '训练', '触发词', '角色一致性'],
    difficulty: 'advanced', capability: 'ai-image',
  },

  // ==================== AI视频深度知识 ====================
  {
    id: 'vid-001', source: 'industry', category: 'AI视频',
    title: 'AI视频生成技术演进',
    content: '2024-2026年AI视频生成技术爆发：Runway Gen-3(图生视频)、Sora(文生视频长镜头)、Seedance 2.0(腾讯24FPS实时生成)、Kling(快手图生视频)、Pika(简单易用)。核心技术：时序注意力(Temporal Attention)、扩散变换器(DiT)、Mamba-MoE混合架构。关键指标：时间一致性、运动合理性、分辨率、帧率。',
    keywords: ['AI视频', 'Runway', 'Sora', 'Seedance', '时序注意力'],
    difficulty: 'intermediate', capability: 'ai-video',
  },
  {
    id: 'vid-002', source: 'tencent', category: 'AI视频',
    title: '腾讯混元视频生成能力',
    content: '腾讯混元视频生成：文生视频、图生视频、视频编辑。混元世界模型1.5支持24FPS实时生成720P高清视频。HY-World 2.0(2026.4)可直接生成可编辑3D资产，兼容Unity/Unreal Engine。核心创新：WorldMirror 2.0架构，输入真实空间视频可生成数字孪生。',
    keywords: ['腾讯混元', '视频生成', '世界模型', '3D资产', '数字孪生'],
    difficulty: 'advanced', capability: 'ai-video',
  },

  // ==================== AI编程深度知识 ====================
  {
    id: 'code-001', source: 'github', category: 'AI编程',
    title: 'AI辅助编程最佳实践',
    content: 'GitHub Copilot使用技巧：1)写清晰注释引导AI 2)用函数签名描述意图 3)分步骤生成复杂逻辑 4)始终审查AI生成的代码 5)用AI生成单元测试。Cursor特有功能：Agent模式(自主执行多步任务)、Composer(多文件编辑)、Chat(代码问答)。90%代码AI生成时，人的价值：架构设计、代码审查、需求理解。',
    keywords: ['Copilot', 'Cursor', 'AI编程', '代码审查', 'Agent模式'],
    difficulty: 'beginner', capability: 'ai-code',
  },
  {
    id: 'code-002', source: 'tencent', category: 'AI编程',
    title: '腾讯CodeBuddy实战',
    content: '腾讯CodeBuddy覆盖95%工程师，研发提效40%。核心功能：代码补全、代码生成、代码审查、单元测试生成、代码解释。最佳实践：1)写清晰的函数注释让AI理解意图 2)用AI生成代码后人工审查 3)用AI解释复杂代码逻辑 4)用AI生成单元测试。90%代码由AI生成，人的价值在于架构设计和质量把控。',
    keywords: ['CodeBuddy', '腾讯', 'AI编程', '代码补全', '代码审查'],
    difficulty: 'beginner', capability: 'ai-code',
  },

  // ==================== AI文案深度知识 ====================
  {
    id: 'wri-001', source: 'industry', category: 'AI文案',
    title: 'AI辅助内容创作工作流',
    content: 'AI内容创作工作流：1)明确目标受众和内容目的 2)用AI生成大纲和初稿 3)人工审核和调整关键信息 4)AI润色和优化表达 5)人工最终审核发布。关键原则：AI是初稿生成器，不是最终发布者。质量把控：事实核查、逻辑一致性、品牌调性匹配、受众适配。',
    keywords: ['AI文案', '内容创作', '工作流', '质量把控'],
    difficulty: 'beginner', capability: 'ai-writing',
  },
  {
    id: 'wri-002', source: 'industry', category: 'AI文案',
    title: 'AI辅助数据分析实战',
    content: '用AI做数据分析：1)描述数据特征(均值、分布、异常值) 2)提出假设(AI帮助生成假设) 3)验证假设(统计检验) 4)提取洞察(什么最重要) 5)生成可视化(图表说话)。工具选择：ChatGPT/Claude(通用分析)、腾讯元宝(中文数据)、Python+pandas(复杂分析)。',
    keywords: ['数据分析', 'AI分析', '洞察提取', '可视化'],
    difficulty: 'beginner', capability: 'ai-writing',
  },

  // ==================== AI Agent深度知识 ====================
  {
    id: 'agt-001', source: 'github', category: 'AI Agent',
    title: 'Agent核心架构：感知-规划-执行-反思',
    content: 'AI Agent核心循环：1)感知(Perception)：接收环境输入 2)规划(Planning)：制定行动计划 3)执行(Execution)：调用工具执行任务 4)反思(Reflection)：评估结果并调整。关键组件：LLM大脑、工具箱(搜索/计算/API)、记忆系统(短期/长期)、规划器(ReAct/CoT)。',
    keywords: ['Agent架构', '感知', '规划', '执行', '反思', 'ReAct'],
    difficulty: 'intermediate', capability: 'ai-agent',
  },
  {
    id: 'agt-002', source: 'github', category: 'AI Agent',
    title: 'Tool Use与Function Calling',
    content: 'Tool Use让LLM调用外部工具。实现方式：1)定义工具Schema(名称、参数、描述) 2)LLM决定何时调用哪个工具 3)系统执行工具调用 4)LLM整合结果生成回复。Function Calling标准化：OpenAI/Claude/DeepSeek都支持。MCP(Model Context Protocol)：Anthropic提出的标准化工具协议。',
    keywords: ['Tool Use', 'Function Calling', 'MCP', '工具调用'],
    difficulty: 'intermediate', capability: 'ai-agent',
  },
  {
    id: 'agt-003', source: 'tencent', category: 'AI Agent',
    title: '腾讯Agent Suite与WorkBuddy',
    content: '腾讯2026年发布Agent Suite：打通腾讯文档、腾讯网盘、腾讯乐享三大产品。WorkBuddy企业版：7x24数字员工、Agent管理后台。核心理念：从超级个体到超级团队。MAGIC Agents五类智能体：挖掘、编排、内容、互动、分析。数据飞轮：人负责目标与决策，AI负责感知、分析、执行。',
    keywords: ['Agent Suite', 'WorkBuddy', 'MAGIC Agents', '腾讯', '数字员工'],
    difficulty: 'intermediate', capability: 'ai-agent',
  },

  // ==================== AI研究深度知识 ====================
  {
    id: 'res-001', source: 'huggingface', category: 'AI研究',
    title: 'SFT/LoRA/RLHF微调技术对比',
    content: 'SFT(Supervised Fine-Tuning)：用标注数据微调全量参数，效果好但成本高。LoRA(Low-Rank Adaptation)：只训练低秩矩阵，参数量减少90%+，效果接近SFT。RLHF(Reinforcement Learning from Human Feedback)：用人类偏好优化模型行为，对齐人类价值观。应用选择：小数据用LoRA、大数据用SFT、对齐用RLHF。',
    keywords: ['SFT', 'LoRA', 'RLHF', '微调', '参数高效'],
    difficulty: 'advanced', capability: 'ai-research',
  },
  {
    id: 'res-002', source: 'huggingface', category: 'AI研究',
    title: 'Transformer架构核心机制',
    content: 'Transformer核心：Self-Attention(自注意力)让每个token关注所有其他token。Multi-Head Attention(多头注意力)并行学习不同类型的注意力模式。Position Encoding(位置编码)注入序列位置信息。Feed-Forward Network(前馈网络)进行非线性变换。Layer Normalization稳定训练。残差连接防止梯度消失。',
    keywords: ['Transformer', 'Self-Attention', 'Multi-Head', '位置编码', 'LayerNorm'],
    difficulty: 'advanced', capability: 'ai-research',
  },
  {
    id: 'res-003', source: 'andrew-ml', category: 'AI研究',
    title: '模型评估与选择方法论',
    content: '模型评估三划分：训练集(70%)/验证集(15%)/测试集(15%)。交叉验证：K-Fold交叉验证评估泛化能力。评估指标：分类用Accuracy/Precision/Recall/F1，回归用MSE/RMSE/R²，生成用BLEU/ROUGE/人工评估。过拟合诊断：训练loss下降但验证loss上升。正则化：Dropout、L2正则、早停。',
    keywords: ['模型评估', '交叉验证', '过拟合', '正则化', '评估指标'],
    difficulty: 'intermediate', capability: 'ai-research',
  },
];

// RAG 检索函数：根据关键词和上下文匹配知识片段
export function retrieveKnowledge(query: string, topK: number = 3): KnowledgeChunk[] {
  const queryLower = query.toLowerCase();
  const scored = RAG_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    chunk.keywords.forEach(kw => {
      if (queryLower.includes(kw.toLowerCase())) score += 3;
    });
    if (queryLower.includes(chunk.title.toLowerCase())) score += 5;
    const contentWords = chunk.content.toLowerCase().split(/[，,。.\s]+/);
    contentWords.forEach(w => {
      if (w.length > 2 && queryLower.includes(w)) score += 1;
    });
    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk);
}

export function retrieveByCapability(capability: string): KnowledgeChunk[] {
  return RAG_KNOWLEDGE_BASE.filter(k => k.capability === capability);
}

export function retrieveByDifficulty(difficulty: string): KnowledgeChunk[] {
  return RAG_KNOWLEDGE_BASE.filter(k => k.difficulty === difficulty);
}

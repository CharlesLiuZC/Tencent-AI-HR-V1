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
];

// RAG 检索函数：根据关键词和上下文匹配知识片段
export function retrieveKnowledge(query: string, topK: number = 3): KnowledgeChunk[] {
  const queryLower = query.toLowerCase();
  const scored = RAG_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    // 关键词匹配
    chunk.keywords.forEach(kw => {
      if (queryLower.includes(kw.toLowerCase())) score += 3;
    });
    // 标题匹配
    if (queryLower.includes(chunk.title.toLowerCase())) score += 5;
    // 内容部分匹配
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

// 根据能力方向检索相关知识
export function retrieveByCapability(capability: string): KnowledgeChunk[] {
  return RAG_KNOWLEDGE_BASE.filter(k => k.capability === capability);
}

// 根据难度级别检索
export function retrieveByDifficulty(difficulty: string): KnowledgeChunk[] {
  return RAG_KNOWLEDGE_BASE.filter(k => k.difficulty === difficulty);
}

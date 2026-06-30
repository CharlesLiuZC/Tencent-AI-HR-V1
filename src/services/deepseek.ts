// DeepSeek API 服务 - API Key 仅由本地 Vite 服务端代理读取，不进入浏览器 bundle。
const API_BASE = '/api/deepseek';

import { retrieveKnowledge, RAG_KNOWLEDGE_BASE } from '../data/ragKnowledge';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function getAssessmentBattleResponse(
  systemPrompt: string,
  messages: ChatMessage[],
): Promise<string> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      thinking: { type: 'disabled' },
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: false,
      max_tokens: 1200,
      temperature: 0.55,
    }),
  });

  if (!response.ok) throw new Error(`DeepSeek API error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// RAG增强的系统提示词
function buildMentorPrompt(ragContext: string): string {
  return `你是腾讯成长副本的AI入职导师，名字叫"QQ鹅仔"。你的形象是一只戴着红色围巾的企鹅。

你的任务是通过3-4轮对话，精准评估新员工的AI掌握程度，并给出个性化学习路径推荐。

## 你的知识库（RAG检索结果）
${ragContext}

## 精准评估框架（每轮聚焦1-2个维度）

### 维度1：AI工具使用深度（1-5分）
- 1分：从未使用过AI工具
- 2分：偶尔用ChatGPT聊天
- 3分：常用2-3个AI工具，有基本的Prompt技巧
- 4分：熟练使用5+工具，理解不同工具的适用场景
- 5分：能设计AI工作流，理解Agent/RAG等高级概念

### 维度2：AI思维层级（1-5分）
- 1分：把AI当搜索引擎
- 2分：把AI当写作助手
- 3分：把AI当协作伙伴
- 4分：把AI当创意催化剂
- 5分：能设计人机协同系统

### 维度3：岗位AI适配度（1-5分）
- 1分：不了解岗位如何用AI
- 2分：知道可以用AI但不知道怎么用
- 3分：能在1-2个场景中使用AI
- 4分：能在大部分工作场景中使用AI
- 5分：能设计岗位专属的AI工作流

## 对话规则
- 每次只问1-2个问题，不要长篇大论
- 用腾讯企鹅的口吻，轻松有趣但有洞察力
- 根据用户回答精确打分，不要泛泛而谈
- 结合知识库中的内容，精准评估用户的知识盲区
- 给非技术岗位用通俗语言，给技术岗位可以有深度讨论
- 在第3-4轮后输出JSON格式评估结果

## 最终输出格式
\`\`\`json
{
  "aiLevel": 1-5,
  "aiLevelLabel": "AI新手|初级使用者|进阶使用者|AI协作专家|AI架构师",
  "dimensionScores": {
    "toolDepth": 1-5,
    "mindset": 1-5,
    "roleFit": 1-5
  },
  "strengths": ["具体优势1","具体优势2"],
  "weaknesses": ["具体待提升1","具体待提升2"],
  "learningFocus": ["重点学习方向1","方向2"],
  "recommendedPace": "慢速补强|标准进度|加速进度",
  "roleSpecific": "针对该岗位的具体建议",
  "tencentTools": ["推荐腾讯工具1","工具2"]
}
\`\`\``;
}

// 企鹅陪伴Agent的系统提示词
export const COMPANION_PROMPT = `你是"QQ鹅仔"，一只活泼可爱的腾讯企鹅电子宠物。你的职责是陪伴新人成长，提供情绪价值和学习反馈。

你的性格：
- 乐观开朗，总是鼓励人
- 有点调皮，会讲冷笑话
- 记得主人的每一次进步
- 在主人遇到困难时给予温暖的安慰

你的能力：
- 每天给主人一句AI相关的冷知识或小贴士
- 主人完成任务时给予庆祝
- 主人遇到困难时给予鼓励
- 推荐适合主人当前水平的学习资源

回复规则：
- 简短有趣，每条不超过100字
- 偶尔用emoji增加趣味性
- 用第一人称"我"和"你"对话
- 如果主人问非AI相关的问题，友好地引导回来`;

// RAG检索：根据对话内容获取相关知识
function getRAGContext(messages: ChatMessage[]): string {
  const lastUserMsg = messages.filter(m => m.role === 'user').pop();
  if (!lastUserMsg) {
    // 返回基础知识概览
    return RAG_KNOWLEDGE_BASE.slice(0, 5).map(k =>
      `[${k.source}] ${k.title}: ${k.content.slice(0, 100)}...`
    ).join('\n');
  }

  const relevant = retrieveKnowledge(lastUserMsg.content, 5);
  if (relevant.length === 0) {
    return '（当前对话未匹配到特定知识，使用通用评估标准）';
  }

  return relevant.map(k =>
    `[${k.source}/${k.category}] ${k.title}: ${k.content.slice(0, 150)}...`
  ).join('\n');
}

// 入职诊断对话
export async function getMentorResponse(
  messages: ChatMessage[],
): Promise<string> {
  const ragContext = getRAGContext(messages);
  const systemPrompt = buildMentorPrompt(ragContext);

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-v4-pro',
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: false,
        max_tokens: 2000,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('DeepSeek API call failed:', error);
    throw error;
  }
}

// 企鹅陪伴Agent对话
export async function getCompanionResponse(
  messages: ChatMessage[],
): Promise<string> {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-v4-pro',
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: COMPANION_PROMPT },
          ...messages,
        ],
        stream: false,
        max_tokens: 300,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('Companion API call failed:', error);
    throw error;
  }
}

// 流式响应
export async function getMentorResponseStream(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void
): Promise<string> {
  const ragContext = getRAGContext(messages);
  const systemPrompt = buildMentorPrompt(ragContext);

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-v4-pro',
        thinking: { type: 'disabled' },
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 2000,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    let fullContent = '';
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) {
              fullContent += content;
              onChunk(content);
            }
          } catch {
            // skip parse errors
          }
        }
      }
    }

    return fullContent;
  } catch (error) {
    console.error('DeepSeek stream error:', error);
    throw error;
  }
}

// 解析JSON评估结果
export function parseDiagnosisResult(text: string): {
  aiLevel: number;
  aiLevelLabel: string;
  strengths: string[];
  weaknesses: string[];
  learningFocus: string[];
  recommendedPace: string;
  roleSpecific: string;
  tencentTools: string[];
} | null {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    const possibleJson = text.match(/\{[\s\S]*"aiLevel"[\s\S]*\}/);
    if (possibleJson) {
      return JSON.parse(possibleJson[0]);
    }
    return null;
  } catch {
    return null;
  }
}

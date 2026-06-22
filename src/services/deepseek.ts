// DeepSeek API 服务 - AI 入职导师（RAG增强版）
// API Key via environment variable: VITE_DEEPSEEK_API_KEY
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
const API_BASE = 'https://api.deepseek.com/v1';

import { retrieveKnowledge, RAG_KNOWLEDGE_BASE } from '../data/ragKnowledge';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// RAG增强的系统提示词
function buildMentorPrompt(ragContext: string): string {
  return `你是腾讯成长副本的AI入职导师，名字叫"QQ鹅仔"。你的形象是一只戴着红色围巾的企鹅。

你的任务是通过3-4轮对话，了解新员工的AI掌握程度，并给出个性化学习路径推荐。

## 你的知识库（RAG检索结果）
${ragContext}

## 评估维度（每轮聚焦1-2个）
1. AI工具使用经验（用过哪些工具，频率如何）
2. AI思维深度（搜索引擎？协作伙伴？创意催化剂？）
3. 岗位AI需求（对工作流优化的理解）
4. 学习风格与目标

## 对话规则
- 每次只问1-2个问题，不要长篇大论
- 用腾讯企鹅的口吻，轻松有趣但有洞察力
- 根据用户回答判断水平：初级(1-2分)、中级(3-4分)、高级(5分)
- 结合知识库中的内容，精准评估用户的知识盲区
- 给非技术岗位用通俗语言，给技术岗位可以有深度讨论
- 在第3-4轮后输出JSON格式评估结果

## 最终输出格式
\`\`\`json
{
  "aiLevel": 1-5,
  "aiLevelLabel": "初级使用者|进阶使用者|AI协作专家",
  "strengths": ["优势1","优势2"],
  "weaknesses": ["待提升点1","待提升点2"],
  "learningFocus": ["重点学习方向1","方向2"],
  "recommendedPace": "标准进度|加速进度|慢速补强",
  "roleSpecific": "针对该岗位的一句话建议",
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
  onChunk?: (chunk: string) => void
): Promise<string> {
  const ragContext = getRAGContext(messages);
  const systemPrompt = buildMentorPrompt(ragContext);

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
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
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
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
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
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

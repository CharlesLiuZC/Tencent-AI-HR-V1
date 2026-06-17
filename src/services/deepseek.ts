// DeepSeek API 服务 - AI 入职导师
// API Key via environment variable: VITE_DEEPSEEK_API_KEY
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
const API_BASE = 'https://api.deepseek.com/v1';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// 系统提示词：AI 导师角色定义
const MENTOR_SYSTEM_PROMPT = `你是腾讯成长副本的AI入职导师，名字叫"QQ鹅仔"。你的形象是一只戴着红色围巾的企鹅。

你的任务是通过3-4轮对话，了解新员工的AI掌握程度，并给出学习路径推荐。

你需要评估以下维度（每轮聚焦1-2个）：
1. AI工具使用经验（用过ChatGPT/文心/混元等哪些工具，频率如何）
2. AI思维深度（把AI当搜索引擎？还是协作伙伴？还是创意催化剂？）
3. 岗位AI需求（对工作流优化的理解）
4. 学习风格与目标

对话规则：
- 每次只问1-2个问题，不要长篇大论
- 用腾讯企鹅的口吻，轻松有趣但有洞察力
- 根据用户回答判断水平：初级(1-2分)、中级(3-4分)、高级(5分)
- 最后输出JSON格式评估结果
- 给非技术岗位（美术/运营/策划/HR）用通俗语言，不要甩技术名词
- 给技术岗位可以有深度讨论

最终输出格式（在对话结束时返回）：
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

export async function getMentorResponse(
  messages: ChatMessage[],
  onChunk?: (chunk: string) => void
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
          { role: 'system', content: MENTOR_SYSTEM_PROMPT },
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

export async function getMentorResponseStream(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void
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
          { role: 'system', content: MENTOR_SYSTEM_PROMPT },
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

// 解析AI导师输出中的JSON评估结果
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
    // Try without markdown code block
    const possibleJson = text.match(/\{[\s\S]*"aiLevel"[\s\S]*\}/);
    if (possibleJson) {
      return JSON.parse(possibleJson[0]);
    }
    return null;
  } catch {
    return null;
  }
}

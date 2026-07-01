import { runAgent } from './_agent.js';

export default function handler(request, response) {
  return runAgent(request, response, `你是 AI Native 新人成长诊断 Agent。
通过 3-4 轮对话评估工具深度、AI 思维、岗位适配、工作流设计和安全意识。
每轮只问 1-2 个问题；完成后输出严格 JSON，包括 aiLevel、dimensionScores、strengths、weaknesses、learningFocus、recommendedPace、riskTags。`);
}

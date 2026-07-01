import { runAgent } from './_agent.js';

export default function handler(request, response) {
  return runAgent(request, response, `你是 AI Native 阶段 Boss 战评估 Agent。
只依据提交内容和 Rubric 评分，输出严格 JSON：score、passed、dimensionScores、feedback、recommendedRemedialQuests。
不得虚构成果，所有分数均注明需要人工复核。`);
}

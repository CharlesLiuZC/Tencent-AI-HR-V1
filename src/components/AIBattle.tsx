import { useEffect, useMemo, useRef, useState } from 'react';
import { Capability, Phase } from '../types';
import { CAPABILITIES, getLearningPath } from '../data/learningPaths';
import { useApp } from '../context/AppContext';
import { getAssessmentBattleResponse } from '../services/deepseek';

interface Props {
  phase: Phase;
  onClose: () => void;
}

type BattleMessage = { role: 'assistant' | 'user'; content: string };
type AbilityResult = {
  score: number;
  dimensions: { name: string; score: number }[];
  strengths: string[];
  gaps: string[];
  nextAction: string;
};

const CHALLENGES: Record<Capability, { title: string; brief: string; deliverables: string[]; criteria: string[] }> = {
  'ai-image': {
    title: 'ControlNet 角色姿势控制',
    brief: '在 30 分钟内，使用 ControlNet + 骨骼图完成对“功夫熊猫”角色的姿势调整，输出 5 张姿势明显不同且角色一致的图片。',
    deliverables: ['5 张最终图片', 'OpenPose 骨骼图或预处理图', '模型、采样器、CFG、Control Weight、Seed 参数记录'],
    criteria: ['姿势差异与骨骼图一致', '角色与风格稳定', '参数可复现', '画面没有明显肢体错误'],
  },
  'ai-video': {
    title: '一致性镜头救援',
    brief: '在 30 分钟内，为同一角色设计 6 个连续镜头，并给出保持角色、运镜和光照一致的生成方案。',
    deliverables: ['6 镜头分镜', '逐镜 Prompt', '一致性控制说明'],
    criteria: ['叙事连续', '角色一致', '运镜明确', '方案可执行'],
  },
  'ai-writing': {
    title: '分支叙事危机改写',
    brief: '在 30 分钟内，把一段线性任务改造成含 3 个关键选择、2 个回流点和 4 个结局的分支任务。',
    deliverables: ['剧情结构图', '关键对白', 'JSON 状态设计'],
    criteria: ['选择有后果', '角色动机一致', '状态闭环', '可交付程序实现'],
  },
  'ai-code': {
    title: '陌生模块限时修复',
    brief: '在 30 分钟内分析一个有状态同步缺陷的前端模块，提出修复、测试与回滚方案。',
    deliverables: ['根因说明', '核心代码或伪代码', '测试清单'],
    criteria: ['根因准确', '覆盖边界条件', '变更范围可控', '验证步骤完整'],
  },
  'ai-agent': {
    title: '生产 Agent 失控处置',
    brief: '在 30 分钟内设计一个带工具调用的业务 Agent，处理权限越界、检索空结果和工具超时。',
    deliverables: ['工作流图', '系统提示词', '异常与评测策略'],
    criteria: ['边界明确', '有人工兜底', '可观测', '可回归'],
  },
  'ai-research': {
    title: '前沿模型快速决策',
    brief: '在 30 分钟内完成一项新模型的证据审查，并给出采用、试验、观察或暂缓结论。',
    deliverables: ['证据表', '基线对比', '落地建议'],
    criteria: ['证据可信', '指标可比', '风险完整', '结论可行动'],
  },
};

function extractResult(text: string): AbilityResult | null {
  try {
    const block = text.match(/```json\s*([\s\S]*?)```/)?.[1] || text.match(/\{[\s\S]*\}/)?.[0];
    return block ? JSON.parse(block) as AbilityResult : null;
  } catch {
    return null;
  }
}

export default function AIBattle({ phase, onClose }: Props) {
  if (phase === 'day90') return <TimedChallenge onClose={onClose} />;
  return <RoleDialogue onClose={onClose} />;
}

function RoleDialogue({ onClose }: { onClose: () => void }) {
  const { role, progress, setAssessmentScore } = useApp();
  const capability = CAPABILITIES[role] || CAPABILITIES['ai-image'];
  const learned = getLearningPath(capability.key)
    .filter(unit => progress.completedUnits.includes(unit.id) || unit.phase !== 'day90')
    .slice(0, 8);
  const context = learned.map(unit => unit.title).join('、');
  const [messages, setMessages] = useState<BattleMessage[]>([{
    role: 'assistant',
    content: `我是 DeepSeek V4 Pro 评估官。接下来会围绕你的「${capability.title}」学习内容进行 4 轮岗位对话。\n\n第 1 题：请挑选最近学过的一项能力，说明你如何把它用于真实工作，而不是只演示工具功能？`,
  }]);
  const [answer, setAnswer] = useState('');
  const [round, setRound] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AbilityResult | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const systemPrompt = useMemo(() => `你是腾讯 AI 成长副本的 DeepSeek V4 Pro 岗位评估官。
学员方向：${capability.title}；已学习内容：${context || '暂无已完成记录'}；
进度：完成 ${progress.completedUnits.length} 个周单元、${Object.keys(progress.dailySubmissions).length} 个每日任务。
你要进行 4 轮中文岗位对话。每次先用一句话点评回答，再提出一个更深入、与该方向工具和业务交付有关的问题。
题目必须覆盖：工具选择、可复现参数、质量判断、业务协作。
第 4 次回答后不再提问，输出简短总结并追加 JSON：
\`\`\`json
{"score":0-100,"dimensions":[{"name":"工具掌握","score":0-100},{"name":"问题拆解","score":0-100},{"name":"交付质量","score":0-100},{"name":"复现与协作","score":0-100}],"strengths":["..."],"gaps":["..."],"nextAction":"..."}
\`\`\`
严格基于学员回答评分，不要虚构已完成成果。`, [capability.title, context, progress]);

  const submit = async () => {
    if (!answer.trim() || loading) return;
    const nextMessages = [...messages, { role: 'user' as const, content: answer.trim() }];
    setMessages(nextMessages);
    setAnswer('');
    setLoading(true);
    try {
      const response = await getAssessmentBattleResponse(systemPrompt, nextMessages);
      setMessages(previous => [...previous, { role: 'assistant', content: response }]);
      const parsed = extractResult(response);
      if (round >= 4 && parsed) {
        setResult(parsed);
        setAssessmentScore('day60', parsed.score);
      } else {
        setRound(value => value + 1);
      }
    } catch {
      const fallback = round >= 4
        ? '评估服务暂时不可用。你的回答已保留，请在本地 DeepSeek 服务恢复后重新提交最终评估。'
        : `已记录。下一题：针对「${capability.coreTools[Math.min(round, capability.coreTools.length - 1)]}」，你会如何证明产出质量达到业务可用，而不只是“看起来不错”？`;
      setMessages(previous => [...previous, { role: 'assistant', content: fallback }]);
      if (round < 4) setRound(value => value + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="battle-workspace">
      <header>
        <div><small>DEEPSEEK V4 PRO · 精通期</small><h1>{capability.icon} {capability.title} 岗位对话评估</h1></div>
        <button onClick={onClose}>退出评估</button>
      </header>
      <div className="battle-context-strip">
        <span>第 {Math.min(round, 4)} / 4 轮</span>
        <span>方向：{capability.title}</span>
        <span>已完成每日任务：{Object.keys(progress.dailySubmissions).length}</span>
      </div>
      <main className="battle-chat">
        {messages.map((message, index) => (
          <div key={index} className={`battle-message ${message.role}`}>{message.content}</div>
        ))}
        {loading && <div className="battle-message assistant">DeepSeek 正在分析你的回答...</div>}
        <div ref={endRef} />
      </main>
      {!result && (
        <footer className="battle-answer-box">
          <textarea value={answer} onChange={event => setAnswer(event.target.value)} placeholder="结合实际工作、参数或交付标准回答..." />
          <button disabled={!answer.trim() || loading} onClick={submit}>提交回答</button>
        </footer>
      )}
      {result && <AbilityReport result={result} onClose={onClose} />}
    </div>
  );
}

function TimedChallenge({ onClose }: { onClose: () => void }) {
  const { role, setAssessmentScore } = useApp();
  const capability = CAPABILITIES[role] || CAPABILITIES['ai-image'];
  const challenge = CHALLENGES[capability.key];
  const [remaining, setRemaining] = useState(30 * 60);
  const [started, setStarted] = useState(false);
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AbilityResult | null>(null);

  useEffect(() => {
    if (!started || result || remaining <= 0) return;
    const timer = window.setInterval(() => setRemaining(value => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [started, result, remaining]);

  const evaluate = async () => {
    if (note.trim().length < 20 || !fileName) return;
    setLoading(true);
    const prompt = `你是 DeepSeek V4 Pro 实战评委。方向：${capability.title}。
挑战：${challenge.brief}
验收标准：${challenge.criteria.join('；')}
学员提交说明：${note}
附件名：${fileName}
请审慎评分并只输出 JSON：
{"score":0-100,"dimensions":[{"name":"任务完成","score":0-100},{"name":"专业质量","score":0-100},{"name":"可复现性","score":0-100},{"name":"时间管理","score":0-100}],"strengths":["..."],"gaps":["..."],"nextAction":"..."}`;
    try {
      const response = await getAssessmentBattleResponse(prompt, [{ role: 'user', content: '请评估本次限时挑战提交。' }]);
      const parsed = extractResult(response);
      if (parsed) {
        setResult(parsed);
        setAssessmentScore('day90', parsed.score);
      }
    } catch {
      setResult({
        score: 0,
        dimensions: challenge.criteria.map(name => ({ name, score: 0 })),
        strengths: ['提交内容已在本地保存'],
        gaps: ['DeepSeek 服务暂不可用，尚未完成真实评分'],
        nextAction: '恢复本地 API 服务后重新提交评估。',
      });
    } finally {
      setLoading(false);
    }
  };

  const time = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;

  if (!started) {
    return (
      <div className="challenge-brief">
        <small>超越期 · 密闭挑战空间</small>
        <h1>{capability.icon} {challenge.title}</h1>
        <p>{challenge.brief}</p>
        <div><b>必须交付</b><ul>{challenge.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div><b>评分标准</b><ul>{challenge.criteria.map(item => <li key={item}>{item}</li>)}</ul></div>
        <p className="challenge-warning">进入后计时 30 分钟。页面不提供教程或外部资源，只保留任务、计时器和提交区。</p>
        <button onClick={() => setStarted(true)}>进入密闭空间并开始计时</button>
        <button className="secondary" onClick={onClose}>返回</button>
      </div>
    );
  }

  return (
    <div className="challenge-room">
      <header><div><small>FOCUS MODE</small><h1>{challenge.title}</h1></div><strong>{time}</strong></header>
      <section><p>{challenge.brief}</p><ul>{challenge.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
      <textarea value={note} onChange={event => setNote(event.target.value)} placeholder="说明完成过程、关键参数、结果判断和未解决问题..." />
      <label><span>{fileName || '上传成果附件或压缩包'}</span><input type="file" onChange={event => setFileName(event.target.files?.[0]?.name || '')} /></label>
      <button disabled={loading || note.trim().length < 20 || !fileName} onClick={evaluate}>{loading ? 'DeepSeek 评审中...' : '封存成果并提交评审'}</button>
      {result && <AbilityReport result={result} onClose={onClose} />}
    </div>
  );
}

function AbilityReport({ result, onClose }: { result: AbilityResult; onClose: () => void }) {
  return (
    <section className="ability-report">
      <div className="ability-score"><strong>{result.score}</strong><span>综合能力分</span></div>
      <div className="ability-dimensions">
        {result.dimensions.map(item => (
          <div key={item.name}><span>{item.name}</span><i><b style={{ width: `${item.score}%` }} /></i><strong>{item.score}</strong></div>
        ))}
      </div>
      <div className="ability-feedback"><div><b>能力优势</b>{result.strengths.map(item => <p key={item}>✓ {item}</p>)}</div><div><b>待补短板</b>{result.gaps.map(item => <p key={item}>! {item}</p>)}</div></div>
      <p className="ability-next"><b>下一步：</b>{result.nextAction}</p>
      <button onClick={onClose}>完成评估</button>
    </section>
  );
}

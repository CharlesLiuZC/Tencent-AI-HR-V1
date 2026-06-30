import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Phase } from '../types';
import Assessment from '../components/Assessment';
import AIBattle from '../components/AIBattle';
import { PHASES } from '../data/learningPaths';

export default function AssessPage() {
  const { phase } = useParams<{ phase: string }>();
  const validPhase: Phase = ['day30', 'day60', 'day90'].includes(String(phase)) ? phase as Phase : 'day30';
  const [startedPhase, setStartedPhase] = useState<Phase | null>(null);
  const started = startedPhase === validPhase;

  const meta = {
    day30: {
      eyebrow: '知识校验',
      title: '传统答题 · 觉醒期',
      description: '从当前方向题库随机抽取基础题，快速检查概念、工具与安全边界。',
      detail: '5 道选择题 · 自动评分 · 即时解析',
      action: '开始答题',
    },
    day60: {
      eyebrow: '真实 AI 对话',
      title: 'DeepSeek 岗位对话 · 精通期',
      description: 'DeepSeek V4 Pro 读取你的能力方向、已学内容和完成进度，进行 4 轮针对性追问。',
      detail: '岗位问题 · 连续追问 · 四维能力诊断',
      action: '进入岗位对话',
    },
    day90: {
      eyebrow: '限时实战',
      title: '密闭挑战空间 · 超越期',
      description: '在 AI 协助定义的领域难题中限时完成真实交付，并由 DeepSeek V4 Pro 按标准评审。',
      detail: '30 分钟 · 成果附件 · 可视化复盘',
      action: '查看挑战任务',
    },
  }[validPhase];

  return (
    <div className="assessment-page">
      <nav className="assessment-phase-tabs">
        {(['day30', 'day60', 'day90'] as Phase[]).map(item => (
          <Link key={item} to={`/assess/${item}`} className={validPhase === item ? 'active' : ''}>
            {PHASES[item].icon} {PHASES[item].subtitle}
          </Link>
        ))}
      </nav>

      {!started ? (
        <section className={`assessment-entry phase-${validPhase}`}>
          <small>{meta.eyebrow}</small>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
          <div>{meta.detail}</div>
          <button onClick={() => setStartedPhase(validPhase)}>{meta.action}</button>
        </section>
      ) : validPhase === 'day30' ? (
        <div>
          <button className="assessment-back" onClick={() => setStartedPhase(null)}>返回阶段说明</button>
          <Assessment phase="day30" />
        </div>
      ) : (
        <AIBattle phase={validPhase} onClose={() => setStartedPhase(null)} />
      )}
    </div>
  );
}

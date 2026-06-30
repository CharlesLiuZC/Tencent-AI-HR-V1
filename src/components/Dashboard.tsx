import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { CAPABILITIES, LEARNING_UNITS, PHASES } from '../data/learningPaths';
import GraduationPhoto from './GraduationPhoto';
import { Phase } from '../types';

const PHASE_ORDER: Phase[] = ['day30', 'day60', 'day90'];
const CATEGORY_META = {
  knowledge: { label: '知识', color: '#2563eb' },
  practice: { label: '实战', color: '#059669' },
  challenge: { label: '挑战', color: '#d97706' },
  sharing: { label: '分享', color: '#7c3aed' },
} as const;

export default function Dashboard() {
  const { role, progress, userProfile, avatarConfig } = useApp();
  const [showGraduation, setShowGraduation] = useState(false);
  const capability = CAPABILITIES[role];
  const units = LEARNING_UNITS.filter(unit => unit.capabilities.includes(role));
  const completedUnits = units.filter(unit => progress.completedUnits.includes(unit.id));
  const totalMinutes = units.reduce((sum, unit) => sum + unit.duration, 0);
  const completedMinutes = completedUnits.reduce((sum, unit) => sum + unit.duration, 0);
  const percentage = units.length ? Math.round((completedUnits.length / units.length) * 100) : 0;
  const learnedDays = Math.max(
    1,
    Math.ceil((new Date(progress.lastActiveDate).getTime() - new Date(progress.startDate).getTime()) / 86400000) + 1,
  );
  const isFullyComplete = completedUnits.length === units.length && units.length > 0;

  const phaseStats = PHASE_ORDER.map(phase => {
    const phaseUnits = units.filter(unit => unit.phase === phase);
    const completed = phaseUnits.filter(unit => progress.completedUnits.includes(unit.id)).length;
    return {
      phase,
      label: PHASES[phase].subtitle,
      completed,
      total: phaseUnits.length,
      percentage: phaseUnits.length ? Math.round((completed / phaseUnits.length) * 100) : 0,
      color: PHASES[phase].color,
    };
  });

  const categoryData = Object.entries(CATEGORY_META).map(([category, meta]) => {
    const categoryUnits = units.filter(unit => unit.category === category);
    const completed = categoryUnits.filter(unit => progress.completedUnits.includes(unit.id)).length;
    return {
      category: meta.label,
      completed,
      remaining: Math.max(0, categoryUnits.length - completed),
    };
  });

  const radarData = [
    { subject: '工具掌握', score: phaseStats[0].percentage },
    { subject: '业务实战', score: phaseStats[1].percentage },
    { subject: '项目交付', score: phaseStats[2].percentage },
    { subject: '知识沉淀', score: getCategoryPercentage('knowledge', units, progress.completedUnits) },
    { subject: '团队分享', score: getCategoryPercentage('sharing', units, progress.completedUnits) },
  ];

  const weeklyData = Array.from({ length: 12 }, (_, index) => {
    const week = index + 1;
    return {
      week: `W${week}`,
      completed: units.filter(unit => unit.week <= week && progress.completedUnits.includes(unit.id)).length,
      target: units.filter(unit => unit.week <= week).length,
    };
  });

  const heatmap = buildHeatmap(completedUnits.length);

  return (
    <div className="progress-dashboard">
      <div className="dashboard-title-row">
        <div>
          <p>LEARNING ANALYTICS</p>
          <h1>学习进度仪表盘</h1>
        </div>
        <span style={{ borderColor: capability.color, color: capability.color }}>
          {capability.icon} {capability.title}
        </span>
      </div>

      {isFullyComplete && (
        <button className="dashboard-graduation" onClick={() => setShowGraduation(true)}>
          🏆 全部通关，生成毕业纪念合照
        </button>
      )}

      <section className="dashboard-kpis">
        <div className="dashboard-progress-dial" style={{ '--progress': `${percentage * 3.6}deg` } as React.CSSProperties}>
          <div><strong>{percentage}%</strong><span>总体进度</span></div>
        </div>
        <Kpi label="完成单元" value={`${completedUnits.length}/${units.length}`} detail="个" />
        <Kpi label="投入时长" value={`${completedMinutes}`} detail={`/ ${totalMinutes} 分钟`} />
        <Kpi label="连续学习" value={`${learnedDays}`} detail="天" />
        <Kpi label="当前阶段" value={PHASES[progress.currentPhase].subtitle} detail={PHASES[progress.currentPhase].title} />
      </section>

      <section className="dashboard-panel contribution-panel">
        <div className="panel-heading">
          <div><small>ACTIVITY MAP</small><h2>学习贡献热力图</h2></div>
          <strong>{completedUnits.length} 次有效学习</strong>
        </div>
        <div className="contribution-scroll">
          <div className="contribution-map">
            {heatmap.map((cell, index) => (
              <div
                key={index}
                className={`contribution-cell level-${cell}`}
                title={`学习活跃度 ${cell}/4`}
              />
            ))}
          </div>
        </div>
        <div className="contribution-legend"><span>少</span>{[0, 1, 2, 3, 4].map(level => <i key={level} className={`level-${level}`} />)}<span>多</span></div>
      </section>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div><small>PHASE PROGRESS</small><h2>30 / 60 / 90 阶段进度</h2></div>
        </div>
        <div className="phase-progress-list">
          {phaseStats.map(stat => (
            <div key={stat.phase}>
              <div><strong>{PHASES[stat.phase].icon} {stat.label}</strong><span>{stat.completed}/{stat.total} · {stat.percentage}%</span></div>
              <div className="phase-progress-track">
                <div style={{ width: `${stat.percentage}%`, background: stat.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-chart-grid">
        <ChartPanel eyebrow="COMPLETION MIX" title="任务类型完成度">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#e5edf4" vertical={false} />
              <XAxis dataKey="category" tick={{ fill: '#607086', fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#607086', fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="已完成" stackId="a" fill="#0ea5a8" radius={[0, 0, 4, 4]} />
              <Bar dataKey="remaining" name="待完成" stackId="a" fill="#d8e2ea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel eyebrow="SKILL RADAR" title="能力维度雷达">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData} outerRadius="70%">
              <PolarGrid stroke="#d7e2eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#52657a', fontSize: 10 }} />
              <Radar dataKey="score" stroke="#2563eb" fill="#38bdf8" fillOpacity={0.35} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div><small>12-WEEK TREND</small><h2>累计学习曲线</h2></div>
          <span>蓝色为实际，灰色为目标</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyData} margin={{ top: 8, right: 18, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#e5edf4" strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fill: '#607086', fontSize: 10 }} />
            <YAxis allowDecimals={false} tick={{ fill: '#607086', fontSize: 10 }} />
            <Tooltip />
            <Line dataKey="target" name="目标" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            <Line dataKey="completed" name="实际" stroke="#0284c7" strokeWidth={3} dot={{ r: 3, fill: '#0284c7' }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="dashboard-panel">
        <div className="panel-heading"><div><small>MILESTONE TIMELINE</small><h2>成长里程碑</h2></div></div>
        <div className="milestone-timeline">
          {phaseStats.map((stat, index) => (
            <div key={stat.phase} className={stat.percentage === 100 ? 'is-complete' : stat.percentage > 0 ? 'is-active' : ''}>
              <span>{index + 1}</span>
              <div><strong>{PHASES[stat.phase].title} · {stat.label}</strong><p>{PHASES[stat.phase].description}</p></div>
              <b>{stat.percentage}%</b>
            </div>
          ))}
        </div>
      </section>

      <GraduationPhoto
        isOpen={showGraduation}
        onClose={() => setShowGraduation(false)}
        userInfo={{
          name: userProfile?.name || '冒险者',
          department: userProfile?.department || '腾讯',
          role: capability.title,
        }}
        avatarConfig={avatarConfig}
        stats={{
          completedUnits: completedUnits.length,
          tencentken: completedUnits.length * 10,
          xp: completedUnits.length * 100,
          level: Math.min(7, Math.floor(completedUnits.length / 4) + 1),
          assessmentScores: progress.assessmentScores,
        }}
      />
    </div>
  );
}

function Kpi({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="dashboard-kpi"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

function ChartPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="dashboard-panel">
      <div className="panel-heading"><div><small>{eyebrow}</small><h2>{title}</h2></div></div>
      {children}
    </section>
  );
}

function getCategoryPercentage(category: string, units: typeof LEARNING_UNITS, completedIds: string[]) {
  const matching = units.filter(unit => unit.category === category);
  if (!matching.length) return 0;
  return Math.round((matching.filter(unit => completedIds.includes(unit.id)).length / matching.length) * 100);
}

function buildHeatmap(completedCount: number) {
  return Array.from({ length: 84 }, (_, index) => {
    if (!completedCount) return 0;
    const activitySlot = (index * 7 + 11) % 84;
    if (activitySlot >= completedCount * 5) return 0;
    return ((index * 13 + completedCount) % 4) + 1;
  });
}

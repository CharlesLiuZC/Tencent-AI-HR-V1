import { useApp } from '../context/AppContext';
import { LEARNING_UNITS, PHASES } from '../data/learningPaths';
import ProgressRing from './ProgressRing';
import { Phase } from '../types';

export default function Dashboard() {
  const { role, progress } = useApp();

  const phases: Phase[] = ['day30', 'day60', 'day90'];

  const phaseStats = phases.map(phase => {
    const phaseUnits = LEARNING_UNITS.filter(u =>
      u.phase === phase && (u.roles.length === 0 || u.roles.includes(role))
    );
    const completed = phaseUnits.filter(u => progress.completedUnits.includes(u.id));
    return {
      phase,
      info: PHASES[phase],
      total: phaseUnits.length,
      completed: completed.length,
      percentage: phaseUnits.length > 0 ? (completed.length / phaseUnits.length) * 100 : 0,
      totalMinutes: phaseUnits.reduce((sum, u) => sum + u.duration, 0),
      completedMinutes: completed.reduce((sum, u) => sum + u.duration, 0),
    };
  });

  const totalUnits = phaseStats.reduce((sum, s) => sum + s.total, 0);
  const totalCompleted = phaseStats.reduce((sum, s) => sum + s.completed, 0);
  const overallPercentage = totalUnits > 0 ? (totalCompleted / totalUnits) * 100 : 0;

  const totalMinutes = phaseStats.reduce((sum, s) => sum + s.totalMinutes, 0);
  const completedMinutes = phaseStats.reduce((sum, s) => sum + s.completedMinutes, 0);

  // Category breakdown
  const categories = ['theory', 'practice', 'project', 'sharing'] as const;
  const catLabels = { theory: '理论', practice: '实战', project: '项目', sharing: '分享' };
  const catColors = { theory: '#3b82f6', practice: '#22c55e', project: '#f59e0b', sharing: '#8b5cf6' };

  const catStats = categories.map(cat => {
    const units = LEARNING_UNITS.filter(u =>
      u.category === cat && (u.roles.length === 0 || u.roles.includes(role))
    );
    const completed = units.filter(u => progress.completedUnits.includes(u.id));
    return {
      category: cat,
      label: catLabels[cat],
      color: catColors[cat],
      total: units.length,
      completed: completed.length,
      percentage: units.length > 0 ? (completed.length / units.length) * 100 : 0,
    };
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 0' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937', marginBottom: '24px' }}>
        📊 学习进度仪表盘
      </h1>

      {/* Overall Progress */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
        borderRadius: '20px',
        padding: '32px',
        color: 'white',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        flexWrap: 'wrap',
      }}>
        <div style={{ textAlign: 'center' }}>
          <ProgressRing
            percentage={overallPercentage}
            size={140}
            strokeWidth={12}
            color="#a78bfa"
            label="总体进度"
          />
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: 600 }}>
            总体学习概览
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <StatBox label="已完成" value={`${totalCompleted}/${totalUnits}`} sub="学习单元" />
            <StatBox label="学习时长" value={`${completedMinutes}`} sub={`/ ${totalMinutes} 分钟`} />
            <StatBox label="当前阶段" value={progress.currentPhase === 'day30' ? '新手村' : progress.currentPhase === 'day60' ? '副本挑战' : 'Boss战'} sub="" />
            <StatBox label="已学习天数" value={`${Math.max(1, Math.ceil((Date.now() - new Date(progress.startDate).getTime()) / 86400000))}`} sub="天" />
          </div>
        </div>
      </div>

      {/* Phase Progress Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {phaseStats.map(stat => (
          <div key={stat.phase} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            border: `2px solid ${stat.info.color}20`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>{stat.info.icon}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                  {stat.info.title} - {stat.info.subtitle}
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
                  {stat.completed}/{stat.total} 单元完成
                </p>
              </div>
            </div>
            <div style={{
              height: '8px',
              background: '#f3f4f6',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '8px',
            }}>
              <div style={{
                height: '100%',
                width: `${stat.percentage}%`,
                background: `linear-gradient(90deg, ${stat.info.color}, ${stat.info.color}aa)`,
                borderRadius: '4px',
                transition: 'width 0.5s ease',
              }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: stat.info.color }}>
              {Math.round(stat.percentage)}%
            </span>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        marginBottom: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
          📈 能力维度分析
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {catStats.map(cat => (
            <div key={cat.category} style={{ textAlign: 'center' }}>
              <ProgressRing
                percentage={cat.percentage}
                size={90}
                strokeWidth={8}
                color={cat.color}
                label={cat.label}
              />
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>
                {cat.completed}/{cat.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Scores */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
          🏆 阶段评估成绩
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {phases.map(phase => {
            const score = progress.assessmentScores[phase];
            return (
              <div key={phase} style={{
                textAlign: 'center',
                padding: '16px',
                borderRadius: '12px',
                background: score !== null ? `${PHASES[phase].color}08` : '#f9fafb',
                border: `1px solid ${score !== null ? PHASES[phase].color + '30' : '#e5e7eb'}`,
              }}>
                <span style={{ fontSize: '24px' }}>{PHASES[phase].icon}</span>
                <p style={{ margin: '8px 0 4px', fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>
                  {PHASES[phase].subtitle}
                </p>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: score !== null ? PHASES[phase].color : '#d1d5db' }}>
                  {score !== null ? `${score}分` : '未评估'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '10px',
      padding: '12px',
    }}>
      <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>{label}</p>
      <p style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 700 }}>
        {value}
        <span style={{ fontSize: '12px', fontWeight: 400, opacity: 0.7 }}> {sub}</span>
      </p>
    </div>
  );
}

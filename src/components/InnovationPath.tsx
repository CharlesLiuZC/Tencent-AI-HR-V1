import { useApp } from '../context/AppContext';
import { LEARNING_UNITS, PHASES } from '../data/learningPaths';
import { KNOWLEDGE_GENES } from '../data/knowledgeGenes';
import { Phase } from '../types';

export default function InnovationPath() {
  const { role, progress } = useApp();

  const phases: Phase[] = ['day30', 'day60', 'day90'];

  // 计算每个阶段的完成情况
  const phaseData = phases.map(phase => {
    const units = LEARNING_UNITS.filter(u =>
      u.phase === phase && (u.capabilities.length === 0 || u.capabilities.includes(role))
    );
    const completed = units.filter(u => progress.completedUnits.includes(u.id));
    const completionRate = units.length > 0 ? completed.length / units.length : 0;

    // 计算该阶段匹配的知识基因数量
    const matchedGenes = KNOWLEDGE_GENES.filter(g =>
      g.applicable.phases.includes(phase) &&
      (g.applicable.roles === 'all' || g.applicable.roles.includes(role))
    );

    return {
      phase,
      info: PHASES[phase],
      total: units.length,
      completed: completed.length,
      completionRate,
      geneCount: matchedGenes.length,
    };
  });

  const totalCompleted = phaseData.reduce((s, d) => s + d.completed, 0);
  const totalGenes = KNOWLEDGE_GENES.length;
  const avgCompletion = phaseData.reduce((s, d) => s + d.completionRate, 0) / phaseData.length;

  // 计算创新偏离度（模拟：使用非推荐路径的比例）
  const innovationScore = Math.min(100, Math.round(
    (totalCompleted > 0 ? (totalCompleted / 25) * 100 : 0) * 0.3 +
    (avgCompletion > 0.5 ? 30 : avgCompletion * 60) +
    (progress.completedUnits.length > 10 ? 20 : progress.completedUnits.length * 2)
  ));

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      borderRadius: '20px',
      padding: '32px',
      color: 'white',
      marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px' }}>🗺️</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
            个人专属路径图
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.7 }}>
            你的成长轨迹 · {new Date(progress.startDate).toLocaleDateString('zh-CN')} 至今
          </p>
        </div>
      </div>

      {/* Path visualization */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        position: 'relative',
      }}>
        {/* Connection line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          right: '40px',
          height: '3px',
          background: 'linear-gradient(90deg, #22c55e, #3b82f6, #8b5cf6)',
          borderRadius: '2px',
          zIndex: 0,
        }} />

        {phaseData.map((data, i) => {
          const isCompleted = data.completionRate >= 0.8;
          const isActive = data.completionRate > 0 && data.completionRate < 0.8;
          return (
            <div key={data.phase} style={{
              flex: 1,
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Node */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                margin: '0 auto 12px',
                background: isCompleted
                  ? `linear-gradient(135deg, ${data.info.color}, ${data.info.color}cc)`
                  : isActive
                    ? `linear-gradient(135deg, ${data.info.color}80, ${data.info.color}40)`
                    : 'rgba(255,255,255,0.1)',
                border: isCompleted
                  ? `3px solid ${data.info.color}`
                  : `3px solid ${data.info.color}40`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCompleted ? `0 4px 20px ${data.info.color}40` : 'none',
              }}>
                <span style={{ fontSize: '24px' }}>{data.info.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>
                  {Math.round(data.completionRate * 100)}%
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>
                {data.info.subtitle}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.6 }}>
                {data.completed}/{data.total} 单元
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <StatCard
          label="已完成学习单元"
          value={`${totalCompleted}/25`}
          icon="📚"
          color="#22c55e"
        />
        <StatCard
          label="可用前人智慧"
          value={`${totalGenes} 条`}
          icon="💡"
          color="#f59e0b"
        />
        <StatCard
          label="成长指数"
          value={`${innovationScore}`}
          icon="🚀"
          color="#8b5cf6"
        />
      </div>

      {/* Innovation badge */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{ fontSize: '32px' }}>
          {innovationScore >= 80 ? '🏆' : innovationScore >= 50 ? '⚔️' : '🌱'}
        </span>
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
            {innovationScore >= 80
              ? 'AI 先锋 — 你已走在大多数人前面'
              : innovationScore >= 50
                ? '副本挑战者 — 持续前进中'
                : '新手冒险者 — 每一步都是积累'}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', opacity: 0.7 }}>
            {innovationScore >= 80
              ? '你的经验正在成为后来者的路灯'
              : innovationScore >= 50
                ? '前人的智慧正在为你照亮道路'
                : '前人铺就的道路正在你脚下展开'}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: {
  label: string; value: string; icon: string; color: string;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding: '14px',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <p style={{ margin: '6px 0 2px', fontSize: '18px', fontWeight: 700, color }}>
        {value}
      </p>
      <p style={{ margin: 0, fontSize: '11px', opacity: 0.6 }}>{label}</p>
    </div>
  );
}

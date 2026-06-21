import { LearningUnit, Phase, Capability } from '../types';
import { getLearningPath, PHASES } from '../data/learningPaths';
import UnitCard from './UnitCard';

interface Props {
  role: Capability;
  activePhase?: Phase;
}

export default function PathTimeline({ role, activePhase }: Props) {
  const phases: Phase[] = ['day30', 'day60', 'day90'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {phases.map(phase => {
        const phaseInfo = PHASES[phase];
        const units = getLearningPath(role, phase);
        const isActive = !activePhase || activePhase === phase;

        if (!isActive && activePhase) return null;

        // Group by week
        const weekMap = new Map<number, LearningUnit[]>();
        units.forEach(u => {
          const arr = weekMap.get(u.week) || [];
          arr.push(u);
          weekMap.set(u.week, arr);
        });

        return (
          <div key={phase} style={{ marginBottom: '40px' }}>
            {/* Phase Header */}
            <div style={{
              background: `linear-gradient(135deg, ${phaseInfo.color}15, ${phaseInfo.color}08)`,
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
              border: `2px solid ${phaseInfo.color}30`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{phaseInfo.icon}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1f2937' }}>
                    {phaseInfo.title} - {phaseInfo.subtitle}
                  </h2>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>
                    {phaseInfo.description}
                  </p>
                </div>
              </div>

              {/* Goals */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {phaseInfo.goals.map((goal, i) => (
                  <span key={i} style={{
                    fontSize: '12px',
                    background: `${phaseInfo.color}18`,
                    color: phaseInfo.color,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: 500,
                    border: `1px solid ${phaseInfo.color}30`,
                  }}>
                    🎯 {goal}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: '32px' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '0',
                bottom: '0',
                width: '3px',
                background: `linear-gradient(to bottom, ${phaseInfo.color}, ${phaseInfo.color}40)`,
                borderRadius: '2px',
              }} />

              {Array.from(weekMap.entries()).map(([week, weekUnits]) => (
                <div key={week} style={{ marginBottom: '24px' }}>
                  {/* Week marker */}
                  <div style={{
                    position: 'relative',
                    left: '-32px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: phaseInfo.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: 'white',
                      fontWeight: 700,
                      boxShadow: `0 2px 8px ${phaseInfo.color}40`,
                    }}>
                      {week}
                    </div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: phaseInfo.color,
                    }}>
                      第 {week} 周
                    </span>
                  </div>

                  {/* Unit cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {weekUnits.map((unit, idx) => (
                      <UnitCard key={unit.id} unit={unit} index={idx} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

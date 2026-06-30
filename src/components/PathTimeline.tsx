import { LearningUnit, Phase, Capability } from '../types';
import { CAPABILITIES, getLearningPath, PHASES } from '../data/learningPaths';
import { getResourceColor, getResourceIcon, getResourcesByUnit } from '../data/resourceLinks';
import UnitCard from './UnitCard';

interface Props {
  role: Capability;
  activePhase?: Phase;
}

export default function PathTimeline({ role, activePhase }: Props) {
  const phases: Phase[] = ['day30', 'day60', 'day90'];
  const capability = CAPABILITIES[role] || CAPABILITIES['ai-image'];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(180px, .7fr) minmax(0, 1.8fr)',
        gap: '20px',
        padding: '22px',
        marginBottom: '24px',
        background: '#101e31',
        color: 'white',
        borderRadius: '8px',
        borderLeft: `5px solid ${capability.color}`,
      }}>
        <div>
          <p style={{ margin: 0, color: capability.color, fontSize: '11px', fontWeight: 800 }}>
            {capability.icon} 当前专精方向
          </p>
          <h2 style={{ margin: '6px 0', fontSize: '20px', letterSpacing: 0 }}>{capability.title}</h2>
          <p style={{ margin: 0, color: '#a9b7c7', fontSize: '12px', lineHeight: 1.6 }}>{capability.subtitle}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 9px', color: '#8294a8', fontSize: '10px', fontWeight: 800 }}>CORE TOOLCHAIN</p>
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
            {capability.coreTools.map(tool => (
              <span key={tool} style={{
                padding: '5px 9px',
                color: '#dff8ff',
                fontSize: '11px',
                background: '#1b3048',
                border: '1px solid #2b4864',
                borderRadius: '4px',
              }}>{tool}</span>
            ))}
          </div>
        </div>
      </section>
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

              {activePhase ? units.flatMap(unit =>
                unit.dailyPlan.map(lesson => (
                  <DailyLessonCard
                    key={`${unit.id}-${lesson.day}`}
                    unit={unit}
                    lesson={lesson}
                    role={role}
                    color={phaseInfo.color}
                  />
                ))
              ) : Array.from(weekMap.entries()).map(([week, weekUnits]) => (
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

function DailyLessonCard({
  unit,
  lesson,
  role,
  color,
}: {
  unit: LearningUnit;
  lesson: LearningUnit['dailyPlan'][number];
  role: Capability;
  color: string;
}) {
  const resources = getResourcesByUnit(unit.id, role).slice(0, 2);

  return (
    <article style={{ position: 'relative', marginBottom: '14px' }}>
      <div style={{
        position: 'absolute',
        left: '-32px',
        top: '18px',
        width: '25px',
        height: '25px',
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        fontSize: '10px',
        fontWeight: 800,
        background: color,
        borderRadius: '50%',
        boxShadow: `0 3px 9px ${color}50`,
      }}>{lesson.day}</div>

      <div style={{
        padding: '15px 17px',
        background: 'white',
        border: '1px solid #dfe7ef',
        borderRadius: '7px',
        boxShadow: '0 3px 10px rgba(23, 42, 66, .06)',
      }}>
        {resources.length > 0 && (
          <div style={{ display: 'flex', gap: '7px', marginBottom: '11px', flexWrap: 'wrap' }}>
            {resources.map(resource => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 8px',
                  color: getResourceColor(resource.type),
                  fontSize: '10px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  background: `${getResourceColor(resource.type)}0d`,
                  border: `1px solid ${getResourceColor(resource.type)}28`,
                  borderRadius: '4px',
                }}
              >
                {getResourceIcon(resource.type)} {resource.title}
              </a>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{
            minWidth: '58px',
            padding: '5px 7px',
            color,
            fontSize: '10px',
            fontWeight: 800,
            textAlign: 'center',
            background: `${color}12`,
            borderRadius: '4px',
          }}>DAY {lesson.day}</div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, color: '#18273a', fontSize: '14px' }}>{lesson.title}</h3>
            <p style={{ margin: '5px 0', color: '#69788a', fontSize: '11px', lineHeight: 1.55 }}>{lesson.description}</p>
            <p style={{ margin: 0, color: '#34465a', fontSize: '11px', fontWeight: 600 }}>
              今日行动：{lesson.task}
            </p>
          </div>
          <span style={{ marginLeft: 'auto', color: '#90a0b2', fontSize: '10px', whiteSpace: 'nowrap' }}>
            {lesson.duration} 分钟
          </span>
        </div>
      </div>
    </article>
  );
}

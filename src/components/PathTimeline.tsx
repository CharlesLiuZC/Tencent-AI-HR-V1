import { LearningUnit, Phase, Capability } from '../types';
import { CAPABILITIES, getLearningPath, PHASES } from '../data/learningPaths';
import { getResourceColor, getResourceIcon, getResourcesByUnit } from '../data/resourceLinks';
import UnitCard from './UnitCard';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generatePersonalizedPath } from '../agents/pathPlannerAgent';

interface Props {
  role: Capability;
  activePhase?: Phase;
}

export default function PathTimeline({ role, activePhase }: Props) {
  const phases: Phase[] = ['day30', 'day60', 'day90'];
  const capability = CAPABILITIES[role] || CAPABILITIES['ai-image'];
  const { userProfile } = useApp();
  const plan = generatePersonalizedPath(userProfile, capability.key, getLearningPath(capability.key));

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
        const units = plan.orderedUnits.filter(unit => unit.phase === phase);
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
                    recommendation={plan.unitReasons[unit.id]}
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
                      <div key={unit.id} className={plan.priorityUnitIds.includes(unit.id) ? 'personalized-unit-priority' : ''}>
                        {plan.unitReasons[unit.id] && <p>AI 优先推荐 · {plan.unitReasons[unit.id]}</p>}
                        <UnitCard unit={unit} index={idx} />
                      </div>
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
  recommendation,
}: {
  unit: LearningUnit;
  lesson: LearningUnit['dailyPlan'][number];
  role: Capability;
  color: string;
  recommendation?: string;
}) {
  const resources = getResourcesByUnit(unit.id, role).slice(0, 2);
  const { progress, submitDailyLesson, undoDailyLesson } = useApp();
  const lessonId = `${unit.id}:day-${lesson.day}`;
  const submission = progress.dailySubmissions[lessonId];
  const [note, setNote] = useState(submission?.note || '');
  const [fileName, setFileName] = useState(submission?.fileName || '');
  const [showSubmit, setShowSubmit] = useState(false);
  const canSubmit = note.trim().length >= 10 &&
    (lesson.submissionType === 'text' || Boolean(fileName));

  const completeLesson = () => {
    if (!canSubmit) return;
    submitDailyLesson({
      lessonId,
      note: note.trim(),
      fileName: fileName || undefined,
      completedAt: new Date().toISOString(),
    });
    setShowSubmit(false);
  };

  return (
    <article className={`daily-lesson ${submission ? 'is-complete' : ''}`}>
      <button
        className="daily-complete-toggle"
        style={{ background: submission ? '#16a34a' : color }}
        onClick={() => submission ? undoDailyLesson(lessonId) : setShowSubmit(true)}
        aria-label={submission ? `取消完成 Day ${lesson.day}` : `提交 Day ${lesson.day} 验收`}
      >
        {submission ? '✓' : lesson.day}
      </button>

      <div className="daily-lesson-shell">
        {recommendation && <p className="daily-ai-reason">AI 优先推荐 · {recommendation}</p>}
        {resources.length > 0 && (
          <div className="daily-resource-row">
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
        <div className="daily-lesson-heading">
          <span style={{ color, background: `${color}12` }}>DAY {lesson.day}</span>
          <div>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
          </div>
          <span className="daily-duration">
            {lesson.duration} 分钟
          </span>
        </div>

        <section className="daily-action-panel">
          <small>今日行动</small>
          <strong>{lesson.task}</strong>
        </section>

        <div className="daily-acceptance">
          <div>
            <b>验收标准</b>
            <ul>{lesson.acceptanceCriteria.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <button onClick={() => submission ? undoDailyLesson(lessonId) : setShowSubmit(value => !value)}>
            {submission ? '✓ 已完成' : '提交验收'}
          </button>
        </div>

        {showSubmit && !submission && (
          <div className="daily-submit-form">
            <p>{lesson.submissionHint}</p>
            <textarea
              value={note}
              onChange={event => setNote(event.target.value)}
              placeholder="写下成果说明、关键参数或可复现步骤（至少 10 字）"
            />
            {lesson.submissionType !== 'text' && (
              <label className="daily-file-input">
                <span>{fileName || '选择产出物附件'}</span>
                <input type="file" onChange={event => setFileName(event.target.files?.[0]?.name || '')} />
              </label>
            )}
            <div>
              <button onClick={() => setShowSubmit(false)}>取消</button>
              <button disabled={!canSubmit} onClick={completeLesson}>确认完成</button>
            </div>
          </div>
        )}

        {submission && (
          <div className="daily-submission-summary">
            <b>已提交</b>
            <span>{submission.note}</span>
            {submission.fileName && <em>附件：{submission.fileName}</em>}
          </div>
        )}
      </div>
    </article>
  );
}

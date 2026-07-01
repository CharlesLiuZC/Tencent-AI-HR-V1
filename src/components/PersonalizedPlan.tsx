import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CAPABILITIES, getLearningPath } from '../data/learningPaths';
import { generatePersonalizedPath } from '../agents/pathPlannerAgent';

export default function PersonalizedPlan() {
  const { role, userProfile, progress } = useApp();
  const capability = CAPABILITIES[role] || CAPABILITIES['ai-image'];
  const plan = useMemo(
    () => generatePersonalizedPath(userProfile, capability.key, getLearningPath(capability.key)),
    [userProfile, capability],
  );
  const priorityTitles = getLearningPath(capability.key)
    .filter(unit => plan.priorityUnitIds.includes(unit.id))
    .map(unit => unit.title);

  return (
    <section className="personalized-plan">
      <div className="personalized-plan-heading">
        <div><small>AI PATH PLANNER</small><h2>你的路径由诊断结果生成</h2></div>
        <span>{plan.generatedBy === 'ai-rules' ? 'AI 规则引擎' : plan.generatedBy}</span>
      </div>
      <div className="personalized-plan-grid">
        <div><b>当前画像</b><strong>Lv.{userProfile?.aiLevel || 2} {userProfile?.aiLevelLabel || '初级使用者'}</strong><p>{capability.title}</p></div>
        <div><b>推荐节奏</b><strong>{userProfile?.recommendedPace || '标准进度'}</strong><p>每周 {plan.weeklyMinutes} 分钟</p></div>
        <div><b>完成情况</b><strong>{Object.keys(progress.dailySubmissions).length} 个每日任务</strong><p>{progress.completedUnits.length} 个周单元</p></div>
      </div>
      <div className="personalized-plan-details">
        <div><b>为什么这样安排</b>{plan.reasons.map(reason => <p key={reason}>• {reason}</p>)}</div>
        <div><b>优先任务</b>{priorityTitles.map(title => <span key={title}>{title}</span>)}</div>
      </div>
      {plan.insertedUnits.length > 0 && (
        <p className="personalized-plan-inserted">
          <b>AI 已插入补强任务：</b>{plan.insertedUnits.join('；')}
        </p>
      )}
      {plan.riskSignals.length > 0 && <p className="personalized-plan-risk"><b>补强信号：</b>{plan.riskSignals.join('；')}</p>}
    </section>
  );
}

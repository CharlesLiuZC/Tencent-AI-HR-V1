import { useState } from 'react';
import { LearningUnit } from '../types';
import { useApp } from '../context/AppContext';
import KnowledgePanel from './KnowledgePanel';
import ResourceCard from './ResourceCard';
import FeedbackPopup from './FeedbackPopup';

interface Props {
  unit: LearningUnit;
  index: number;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  knowledge: { bg: '#dbeafe', text: '#1e40af', label: '知识' },
  practice: { bg: '#dcfce7', text: '#166534', label: '实战' },
  challenge: { bg: '#fef3c7', text: '#92400e', label: '挑战' },
  sharing: { bg: '#f3e8ff', text: '#6b21a8', label: '分享' },
};

const DIFFICULTY_STARS: Record<number, string> = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
};

export default function UnitCard({ unit }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { role, progress, toggleUnit } = useApp();
  const isCompleted = progress.completedUnits.includes(unit.id);
  const cat = CATEGORY_COLORS[unit.category] || CATEGORY_COLORS.knowledge;

  return (
    <div
      style={{
        background: isCompleted
          ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
          : 'white',
        borderRadius: '16px',
        padding: '0',
        boxShadow: isCompleted
          ? '0 4px 15px rgba(34,197,94,0.15)'
          : '0 2px 10px rgba(0,0,0,0.06)',
        border: isCompleted ? '2px solid #86efac' : '2px solid #e5e7eb',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Card Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '16px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
        }}
      >
        {/* Completion checkbox */}
        <button
          aria-label={isCompleted ? `取消完成：${unit.title}` : `标记完成：${unit.title}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isCompleted) setShowFeedback(true);
            toggleUnit(unit.id);
          }}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: isCompleted ? 'none' : '2px solid #d1d5db',
            background: isCompleted
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'white',
            flexShrink: 0,
            marginTop: '2px',
            transition: 'all 0.2s',
          }}
        >
          {isCompleted ? '✓' : ''}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '12px',
              background: cat.bg,
              color: cat.text,
            }}>
              {cat.label}
            </span>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>
              {DIFFICULTY_STARS[unit.difficulty]}
            </span>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>
              {unit.duration} 分钟
            </span>
            {unit.roles && unit.roles.length > 0 && unit.roles.map(r => (
              <span key={r} style={{ fontSize: '11px', background: '#f3f4f6', padding: '1px 6px', borderRadius: '8px' }}>
                {r === 'art' ? '🎨美术' : r === 'design' ? '📝策划' : r === 'dev' ? '💻程序' : '📊运营'}
              </span>
            ))}
          </div>
          <h3 style={{
            margin: '0 0 6px 0',
            fontSize: '16px',
            fontWeight: 600,
            color: isCompleted ? '#166534' : '#1f2937',
            textDecoration: isCompleted ? 'line-through' : 'none',
            opacity: isCompleted ? 0.8 : 1,
          }}>
            {unit.title}
          </h3>
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: '#6b7280',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: expanded ? 'visible' : 'hidden',
          }}>
            {unit.description}
          </p>
        </div>

        {/* Expand arrow */}
        <span style={{
          fontSize: '12px',
          color: '#9ca3af',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          flexShrink: 0,
        }}>
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{
          padding: '0 20px 20px 20px',
          borderTop: '1px solid #f3f4f6',
        }}>
          {/* Learning Objectives */}
          {unit.objectives.length > 0 && (
            <div style={{ marginTop: '14px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                🎯 学习目标
              </h4>
              <ul style={{ margin: 0, padding: '0 0 0 20px', listStyle: 'none' }}>
                {unit.objectives.map((obj, i) => (
                  <li key={i} style={{
                    fontSize: '13px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    position: 'relative',
                    paddingLeft: '16px',
                    marginBottom: '4px',
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#22c55e' }}>▸</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Tools */}
          {unit.tools.length > 0 && (
            <div style={{ marginTop: '14px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                🛠️ 推荐 AI 工具
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {unit.tools.map((tool, i) => (
                  <span key={i} style={{
                    fontSize: '12px',
                    background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                    color: '#4338ca',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontWeight: 500,
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {unit.prerequisites.length > 0 && (
            <div style={{ marginTop: '14px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                📋 前置要求
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {unit.prerequisites.map((pre, i) => (
                  <span key={i} style={{
                    fontSize: '12px',
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '4px 10px',
                    borderRadius: '12px',
                  }}>
                    {pre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Gene Panel - 前人智慧 */}
          {unit.deliverable && (
            <div style={{
              marginTop: '14px',
              padding: '12px',
              color: '#7c2d12',
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              borderRadius: '6px',
              fontSize: '12px',
            }}>
              <strong>📦 阶段交付物：</strong>{unit.deliverable}
            </div>
          )}

          {/* Knowledge Gene Panel - 前人智慧 */}
          <KnowledgePanel unit={unit} />

          {/* Resource Links */}
          <ResourceCard unitId={unit.id} role={role} />
        </div>
      )}

      {/* Feedback Popup */}
      <FeedbackPopup
        show={showFeedback}
        xpGained={30}
        tencentkenGained={10}
        message={`完成「${unit.title}」太棒了！`}
        onClose={() => setShowFeedback(false)}
      />
    </div>
  );
}

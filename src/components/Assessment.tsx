import { useState } from 'react';
import { Phase } from '../types';
import { getRandomAssessment } from '../data/assessments';
import { PHASES } from '../data/learningPaths';
import { useApp } from '../context/AppContext';

interface Props {
  phase: Phase;
}

export default function Assessment({ phase }: Props) {
  const { setAssessmentScore, progress } = useApp();
  const [questions, setQuestions] = useState(() => getRandomAssessment(phase, 5));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(5).fill(null));
  const [finished, setFinished] = useState(false);

  const phaseInfo = PHASES[phase];
  const currentQ = questions[currentIdx];
  const prevScore = progress.assessmentScores[phase];

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(answers[currentIdx + 1]);
      setShowExplanation(answers[currentIdx + 1] !== null);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedAnswer(answers[currentIdx - 1]);
      setShowExplanation(answers[currentIdx - 1] !== null);
    }
  };

  const handleFinish = () => {
    const correct = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const score = Math.round((correct / questions.length) * 100);
    setAssessmentScore(phase, score);
    setFinished(true);
  };

  const handleRestart = () => {
    setQuestions(getRandomAssessment(phase, 5));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers(new Array(5).fill(null));
    setFinished(false);
  };

  if (finished) {
    const correct = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 0' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <span style={{ fontSize: '64px' }}>{passed ? '🎉' : '💪'}</span>
          <h2 style={{ margin: '16px 0 8px', fontSize: '24px', fontWeight: 700, color: passed ? '#16a34a' : '#ea580c' }}>
            {passed ? '恭喜通过！' : '继续加油！'}
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: '16px', color: '#6b7280' }}>
            {phaseInfo.title} - {phaseInfo.subtitle} 评估结果
          </p>

          <div style={{
            display: 'inline-block',
            background: passed ? '#f0fdf4' : '#fff7ed',
            borderRadius: '16px',
            padding: '24px 48px',
            marginBottom: '24px',
          }}>
            <p style={{ margin: 0, fontSize: '48px', fontWeight: 700, color: passed ? '#16a34a' : '#ea580c' }}>
              {score}分
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
              答对 {correct}/{questions.length} 题
            </p>
          </div>

          {/* Review */}
          <div style={{ textAlign: 'left', marginTop: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>答题回顾</h3>
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctIndex;
              return (
                <div key={q.id} style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: isCorrect ? '#f0fdf4' : '#fef2f2',
                  marginBottom: '8px',
                  border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
                }}>
                  <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600 }}>
                    {isCorrect ? '✅' : '❌'} {q.question}
                  </p>
                  {!isCorrect && (
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                      正确答案：{q.options?.[q.correctIndex ?? -1] || '请查看题目解析'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            style={{
              marginTop: '24px',
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            重新测试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 0' }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '28px' }}>{phaseInfo.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
                {phaseInfo.title} 阶段评估
              </h2>
              {prevScore !== null && (
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6b7280' }}>
                  上次成绩：{prevScore}分
                </p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: 'flex', gap: '4px', marginTop: '16px' }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: i === currentIdx
                  ? phaseInfo.color
                  : answers[i] !== null
                    ? (answers[i] === questions[i].correctIndex ? '#22c55e' : '#ef4444')
                    : '#e5e7eb',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#9ca3af' }}>
            第 {currentIdx + 1} / {questions.length} 题
          </p>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{
            fontSize: '11px',
            background: '#f3f4f6',
            padding: '2px 8px',
            borderRadius: '8px',
            color: '#6b7280',
          }}>
            {currentQ.category}
          </span>
          <h3 style={{ margin: '12px 0 0', fontSize: '18px', fontWeight: 600, color: '#1f2937', lineHeight: '1.5' }}>
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {(currentQ.options || []).map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === currentQ.correctIndex;
            let borderColor = '#e5e7eb';
            let bgColor = 'white';
            if (showExplanation) {
              if (isCorrect) { borderColor = '#22c55e'; bgColor = '#f0fdf4'; }
              else if (isSelected && !isCorrect) { borderColor = '#ef4444'; bgColor = '#fef2f2'; }
            } else if (isSelected) {
              borderColor = phaseInfo.color;
              bgColor = `${phaseInfo.color}08`;
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  cursor: showExplanation ? 'default' : 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: '#1f2937',
                  lineHeight: '1.5',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: showExplanation && isCorrect ? '#22c55e' : showExplanation && isSelected && !isCorrect ? '#ef4444' : '#f3f4f6',
                  color: (showExplanation && (isCorrect || (isSelected && !isCorrect))) ? 'white' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            marginBottom: '24px',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8' }}>
              💡 解析
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: '#1e40af', lineHeight: '1.6' }}>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              color: currentIdx === 0 ? '#d1d5db' : '#374151',
              opacity: currentIdx === 0 ? 0.5 : 1,
            }}
          >
            上一题
          </button>
          {currentIdx === questions.length - 1 && answers.every(a => a !== null) ? (
            <button
              onClick={handleFinish}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              提交评估
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentIdx === questions.length - 1}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: currentIdx === questions.length - 1 ? '#e5e7eb' : phaseInfo.color,
                color: 'white',
                cursor: currentIdx === questions.length - 1 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                opacity: currentIdx === questions.length - 1 ? 0.5 : 1,
              }}
            >
              下一题
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { CAPABILITIES } from '../data/learningPaths';
import { Capability } from '../types';

// 模拟新人数据（Leader看板）
interface NewbieData {
  id: string;
  name: string;
  department: string;
  capability: Capability;
  dayInCompany: number;
  completionRate: number;
  aiLevel: number;
  lastActive: string;
  currentUnit: string;
  strengths: string[];
  weaknesses: string[];
  status: 'on-track' | 'at-risk' | 'ahead';
}

const MOCK_NEWBIES: NewbieData[] = [
  {
    id: 'n1', name: '张小萌', department: 'IEG', capability: 'ai-image',
    dayInCompany: 45, completionRate: 68, aiLevel: 3, lastActive: '2小时前',
    currentUnit: 'ControlNet精确控制', strengths: ['创意能力强', '学习速度快'],
    weaknesses: ['LoRA训练还需加强'], status: 'on-track',
  },
  {
    id: 'n2', name: '赵大锤', department: 'IEG', capability: 'ai-code',
    dayInCompany: 62, completionRate: 85, aiLevel: 4, lastActive: '1小时前',
    currentUnit: '唇齿音模型训练', strengths: ['技术基础扎实', '执行力强'],
    weaknesses: ['需要加强团队协作'], status: 'ahead',
  },
  {
    id: 'n3', name: '孙小艺', department: 'IEG', capability: 'ai-writing',
    dayInCompany: 30, completionRate: 45, aiLevel: 2, lastActive: '3天前',
    currentUnit: 'AI辅助策划案撰写', strengths: ['文案能力好'],
    weaknesses: ['数据敏感度不足', '学习频率偏低'], status: 'at-risk',
  },
  {
    id: 'n4', name: '周小智', department: 'IEG', capability: 'ai-agent',
    dayInCompany: 75, completionRate: 92, aiLevel: 5, lastActive: '30分钟前',
    currentUnit: '自动竞品分析Agent', strengths: ['技术能力强', '创新思维好'],
    weaknesses: [], status: 'ahead',
  },
  {
    id: 'n5', name: '刘小研', department: 'IEG', capability: 'ai-research',
    dayInCompany: 50, completionRate: 55, aiLevel: 3, lastActive: '1天前',
    currentUnit: 'Seedance 2.0论文复现', strengths: ['学术基础好'],
    weaknesses: ['工程落地能力待提升'], status: 'on-track',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderDashboard({ isOpen, onClose }: Props) {
  const [selectedNewbie, setSelectedNewbie] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'at-risk' | 'on-track' | 'ahead'>('all');
  const [activeView, setActiveView] = useState<'list' | 'analytics'>('list');

  if (!isOpen) return null;

  const filtered = filterStatus === 'all'
    ? MOCK_NEWBIES
    : MOCK_NEWBIES.filter(n => n.status === filterStatus);

  const riskCount = MOCK_NEWBIES.filter(n => n.status === 'at-risk').length;
  const avgCompletion = Math.round(MOCK_NEWBIES.reduce((s, n) => s + n.completionRate, 0) / MOCK_NEWBIES.length);
  const avgAiLevel = (MOCK_NEWBIES.reduce((s, n) => s + n.aiLevel, 0) / MOCK_NEWBIES.length).toFixed(1);

  // Capability distribution
  const capDistribution = Object.values(CAPABILITIES).map(cap => {
    const count = MOCK_NEWBIES.filter(n => n.capability === cap.key).length;
    return { ...cap, count, percentage: Math.round(count / MOCK_NEWBIES.length * 100) };
  }).filter(c => c.count > 0);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#f8fafc', borderRadius: '24px', width: '800px',
        maxHeight: '85vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
          padding: '18px 20px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>📊 智能导航看板 — Leader视图</h2>
            <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>
              实时追踪新人学习进度 · 识别风险学员 · 辅导建议
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', cursor: 'pointer', color: 'white', fontSize: '14px',
          }}>✕</button>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
          padding: '16px 20px', borderBottom: '1px solid #e5e7eb',
        }}>
          <SummaryCard label="总人数" value={`${MOCK_NEWBIES.length}`} icon="👥" color="#6366f1" />
          <SummaryCard label="平均完成率" value={`${avgCompletion}%`} icon="📈" color="#22c55e" />
          <SummaryCard label="风险预警" value={`${riskCount}`} icon="⚠️" color="#ef4444" />
          <SummaryCard label="平均AI水平" value={avgAiLevel} icon="🤖" color="#8b5cf6" />
        </div>

        {/* View Toggle */}
        <div style={{
          display: 'flex', gap: '8px', padding: '10px 20px',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <button onClick={() => setActiveView('list')} style={{
            padding: '6px 14px', borderRadius: '8px',
            border: activeView === 'list' ? '2px solid #6366f1' : '2px solid #e5e7eb',
            background: activeView === 'list' ? '#6366f112' : 'white',
            cursor: 'pointer', fontSize: '12px', fontWeight: activeView === 'list' ? 600 : 400,
            color: activeView === 'list' ? '#6366f1' : '#6b7280',
          }}>📋 人员列表</button>
          <button onClick={() => setActiveView('analytics')} style={{
            padding: '6px 14px', borderRadius: '8px',
            border: activeView === 'analytics' ? '2px solid #8b5cf6' : '2px solid #e5e7eb',
            background: activeView === 'analytics' ? '#8b5cf612' : 'white',
            cursor: 'pointer', fontSize: '12px', fontWeight: activeView === 'analytics' ? 600 : 400,
            color: activeView === 'analytics' ? '#8b5cf6' : '#6b7280',
          }}>📊 数据分析</button>
        </div>

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div style={{ padding: '16px 20px', maxHeight: '450px', overflowY: 'auto' }}>
            {/* Capability Distribution */}
            <div style={{
              background: 'white', borderRadius: '14px', padding: '16px',
              marginBottom: '12px', border: '1px solid #e5e7eb',
            }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600 }}>🎯 能力方向分布</h3>
              {capDistribution.map(cap => (
                <div key={cap.key} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{cap.icon} {cap.title}</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{cap.count}人 ({cap.percentage}%)</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: '#e5e7eb' }}>
                    <div style={{
                      height: '100%', width: `${cap.percentage}%`,
                      background: cap.color, borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Analysis */}
            <div style={{
              background: 'white', borderRadius: '14px', padding: '16px',
              marginBottom: '12px', border: '1px solid #e5e7eb',
            }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600 }}>⚠️ 风险分析</h3>
              {MOCK_NEWBIES.filter(n => n.status === 'at-risk').map(n => {
                const cap = CAPABILITIES[n.capability];
                return (
                  <div key={n.id} style={{
                    padding: '10px', borderRadius: '10px', background: '#fef2f2',
                    border: '1px solid #fecaca', marginBottom: '8px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>{cap.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>{n.name}</p>
                        <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#ef4444' }}>
                          完成率 {n.completionRate}% · 最近活跃 {n.lastActive}
                        </p>
                      </div>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#6b7280' }}>
                      建议：关注学习频率，安排1v1辅导，了解是否存在工作冲突
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Team Insights */}
            <div style={{
              background: 'white', borderRadius: '14px', padding: '16px',
              border: '1px solid #e5e7eb',
            }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600 }}>💡 团队洞察</h3>
              <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.8' }}>
                <p style={{ margin: '4px 0' }}>• 平均入职天数：{Math.round(MOCK_NEWBIES.reduce((s, n) => s + n.dayInCompany, 0) / MOCK_NEWBIES.length)} 天</p>
                <p style={{ margin: '4px 0' }}>• 最热门方向：{capDistribution.sort((a, b) => b.count - a.count)[0]?.title}</p>
                <p style={{ margin: '4px 0' }}>• 最高完成率：{Math.max(...MOCK_NEWBIES.map(n => n.completionRate))}% ({MOCK_NEWBIES.find(n => n.completionRate === Math.max(...MOCK_NEWBIES.map(n => n.completionRate)))?.name})</p>
                <p style={{ margin: '4px 0' }}>• 需要关注：{riskCount} 位新人处于风险状态</p>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {activeView === 'list' && (
          <>
            {/* Filter */}
            <div style={{
              display: 'flex', gap: '6px', padding: '10px 20px',
              borderBottom: '1px solid #e5e7eb',
            }}>
              {[
                { key: 'all', label: '全部', color: '#6366f1' },
                { key: 'at-risk', label: '⚠️ 风险预警', color: '#ef4444' },
                { key: 'on-track', label: '✅ 正常进度', color: '#22c55e' },
                { key: 'ahead', label: '🚀 超前进度', color: '#f59e0b' },
              ].map(f => (
                <button key={f.key} onClick={() => setFilterStatus(f.key as any)} style={{
                  padding: '5px 12px', borderRadius: '8px',
                  border: filterStatus === f.key ? `2px solid ${f.color}` : '2px solid #e5e7eb',
                  background: filterStatus === f.key ? `${f.color}12` : 'white',
                  cursor: 'pointer', fontSize: '12px', fontWeight: filterStatus === f.key ? 600 : 400,
                  color: filterStatus === f.key ? f.color : '#6b7280',
                }}>{f.label}</button>
              ))}
            </div>

            {/* Newbie List */}
            <div style={{ padding: '12px 20px', maxHeight: '400px', overflowY: 'auto' }}>
              {filtered.map(newbie => {
                const cap = CAPABILITIES[newbie.capability];
            const expanded = selectedNewbie === newbie.id;
            const statusColors = { 'on-track': '#22c55e', 'at-risk': '#ef4444', 'ahead': '#f59e0b' };
            const statusLabels = { 'on-track': '正常', 'at-risk': '风险', 'ahead': '超前' };

            return (
              <div key={newbie.id}
                onClick={() => setSelectedNewbie(expanded ? null : newbie.id)}
                style={{
                  background: 'white', borderRadius: '14px', padding: '16px',
                  marginBottom: '10px', cursor: 'pointer',
                  border: newbie.status === 'at-risk' ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{cap.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{newbie.name}</h4>
                      <span style={{
                        fontSize: '10px', padding: '2px 6px', borderRadius: '6px',
                        background: `${statusColors[newbie.status]}15`, color: statusColors[newbie.status],
                        fontWeight: 600,
                      }}>{statusLabels[newbie.status]}</span>
                      <span style={{
                        fontSize: '10px', padding: '2px 6px', borderRadius: '6px',
                        background: `${cap.color}15`, color: cap.color,
                      }}>{cap.title}</span>
                    </div>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#9ca3af' }}>
                      {newbie.department} · 入职第{newbie.dayInCompany}天 · 最近活跃：{newbie.lastActive}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: statusColors[newbie.status] }}>
                      {newbie.completionRate}%
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#9ca3af' }}>完成率</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: '6px', borderRadius: '3px', background: '#e5e7eb',
                  marginTop: '10px', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${newbie.completionRate}%`,
                    background: `linear-gradient(90deg, ${statusColors[newbie.status]}, ${statusColors[newbie.status]}aa)`,
                    borderRadius: '3px', transition: 'width 0.5s',
                  }} />
                </div>

                {/* Expanded details */}
                {expanded && (
                  <div style={{
                    marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f3f4f6',
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <h5 style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                          当前学习单元
                        </h5>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>{newbie.currentUnit}</p>
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                          AI水平评估
                        </h5>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                          {'⭐'.repeat(newbie.aiLevel)}{'☆'.repeat(5 - newbie.aiLevel)} ({newbie.aiLevel}/5)
                        </p>
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>
                          ✅ 优势
                        </h5>
                        {newbie.strengths.map((s, i) => (
                          <p key={i} style={{ margin: '2px 0', fontSize: '12px', color: '#4b5563' }}>• {s}</p>
                        ))}
                      </div>
                      <div>
                        <h5 style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 600, color: '#f59e0b' }}>
                          ⚡ 待提升
                        </h5>
                        {newbie.weaknesses.length > 0
                          ? newbie.weaknesses.map((w, i) => (
                              <p key={i} style={{ margin: '2px 0', fontSize: '12px', color: '#4b5563' }}>• {w}</p>
                            ))
                          : <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>暂无明显短板</p>
                        }
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                      <button style={{
                        padding: '6px 14px', borderRadius: '8px', border: 'none',
                        background: '#6366f1', color: 'white', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 600,
                      }}>💬 发送鼓励消息</button>
                      <button style={{
                        padding: '6px 14px', borderRadius: '8px',
                        border: '1px solid #e5e7eb', background: 'white',
                        cursor: 'pointer', fontSize: '12px', color: '#374151',
                      }}>📋 查看详细报告</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon, color }: {
  label: string; value: string; icon: string; color: string;
}) {
  return (
    <div style={{
      background: 'white', borderRadius: '12px', padding: '14px',
      border: `1px solid ${color}20`,
    }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <p style={{ margin: '6px 0 0', fontSize: '22px', fontWeight: 700, color }}>{value}</p>
      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#9ca3af' }}>{label}</p>
    </div>
  );
}

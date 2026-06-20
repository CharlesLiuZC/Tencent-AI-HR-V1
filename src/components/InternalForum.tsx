import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAPABILITIES, LEARNING_UNITS } from '../data/learningPaths';
import { Capability, ForumPost } from '../types';

// 模拟论坛数据
const MOCK_POSTS: ForumPost[] = [
  {
    id: 'p1', authorName: '张小萌', authorAvatar: '{}', authorCapability: 'ai-image',
    title: '用ControlNet生成的三角洲行动角色概念图',
    content: '使用ControlNet姿势控制 + LoRA风格化，生成了3个不同风格的角色概念图。关键技巧：先用MJ生成草图，再用SD+ControlNet精修。',
    deliverable: '3张角色概念图（写实/二次元/赛博朋克）',
    unitId: 'img30-3', likes: 42, comments: [
      { id: 'c1', authorName: '李大力', content: '太强了！能分享下Prompt吗？', createdAt: '2026-06-15' },
      { id: 'c2', authorName: '王小花', content: '赛博朋克那张绝了！', createdAt: '2026-06-15' },
    ], createdAt: '2026-06-14', isExcellent: true, xpReward: 100,
  },
  {
    id: 'p2', authorName: '赵大锤', authorAvatar: '{}', authorCapability: 'ai-code',
    title: '唇齿音模型训练进展分享',
    content: '基于Wav2Lip的改进方案，目前已经完成了数据集收集（5000条带标注的唇齿音样本）。初步训练结果：唇齿音准确率从62%提升到78%。',
    deliverable: '训练代码 + 初步评估报告',
    unitId: 'code90-1', likes: 38, comments: [
      { id: 'c3', authorName: '陈小美', content: '这个方向很有价值！数据集是怎么标注的？', createdAt: '2026-06-16' },
    ], createdAt: '2026-06-15', isExcellent: true, xpReward: 150,
  },
  {
    id: 'p3', authorName: '孙小艺', authorAvatar: '{}', authorCapability: 'ai-writing',
    title: '用AI完成的三角洲行动版本更新策划案',
    content: '用腾讯元宝+ChatGPT完成了一套完整的版本更新策划案。AI帮我完成了80%的初稿，我负责创意方向和质量审核。效率提升了约5倍。',
    deliverable: '完整版本更新策划案（15页）',
    unitId: 'wri90-1', likes: 25, comments: [], createdAt: '2026-06-16', isExcellent: false, xpReward: 80,
  },
  {
    id: 'p4', authorName: '周小智', authorAvatar: '{}', authorCapability: 'ai-agent',
    title: '自动竞品分析Agent上线了！',
    content: '用Claude Agent SDK构建的自动竞品分析Agent已经上线运行。每周一早上8点自动收集数据、生成分析报告、推送到腾讯文档。目前覆盖5款竞品。',
    deliverable: 'Agent源码 + 首份自动报告',
    unitId: 'agt90-1', likes: 56, comments: [
      { id: 'c4', authorName: '张小萌', content: '这个太实用了！能分享到团队吗？', createdAt: '2026-06-17' },
      { id: 'c5', authorName: '赵大锤', content: '用了哪些工具链？想学习一下', createdAt: '2026-06-17' },
    ], createdAt: '2026-06-17', isExcellent: true, xpReward: 200,
  },
  {
    id: 'p5', authorName: '刘小研', authorAvatar: '{}', authorCapability: 'ai-research',
    title: 'Seedance 2.0论文复现笔记',
    content: '花了2周时间精读并复现了Seedance 2.0的核心模块。论文中最关键的创新是多尺度注意力机制，我的复现结果与论文报告基本一致。',
    deliverable: '复现代码 + 对比实验报告',
    unitId: 'res30-2', likes: 31, comments: [], createdAt: '2026-06-14', isExcellent: true, xpReward: 120,
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InternalForum({ isOpen, onClose }: Props) {
  const { role, userProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'excellent' | Capability>('all');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredPosts = MOCK_POSTS.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'excellent') return post.isExcellent;
    return post.authorCapability === activeTab;
  });

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#f8fafc', borderRadius: '24px', width: '700px',
        maxHeight: '85vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
          padding: '16px 20px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>📋 内部论坛 — 成长副本社区</h2>
            <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>
              你的学习进度，直属Leader可见；你的优秀产出，所有人可见
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', cursor: 'pointer', color: 'white', fontSize: '14px',
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', padding: '8px 16px', gap: '4px', overflowX: 'auto',
          borderBottom: '1px solid #e5e7eb', background: 'white',
        }}>
          <TabButton label="全部" isActive={activeTab === 'all'} onClick={() => setActiveTab('all')} color="#6366f1" />
          <TabButton label="🏆 优秀作品" isActive={activeTab === 'excellent'} onClick={() => setActiveTab('excellent')} color="#f59e0b" />
          {Object.values(CAPABILITIES).map(cap => (
            <TabButton
              key={cap.key}
              label={`${cap.icon} ${cap.title}`}
              isActive={activeTab === cap.key}
              onClick={() => setActiveTab(cap.key)}
              color={cap.color}
            />
          ))}
        </div>

        {/* Posts */}
        <div style={{ padding: '12px 16px', maxHeight: '500px', overflowY: 'auto' }}>
          {filteredPosts.map(post => {
            const cap = CAPABILITIES[post.authorCapability];
            const isExpanded = expandedPost === post.id;
            return (
              <div key={post.id} style={{
                background: 'white', borderRadius: '14px', padding: '16px',
                marginBottom: '10px', border: post.isExcellent ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px', padding: '2px 8px', borderRadius: '8px',
                    background: `${cap.color}15`, color: cap.color, fontWeight: 600,
                  }}>
                    {cap.icon} {cap.title}
                  </span>
                  {post.isExcellent && (
                    <span style={{
                      fontSize: '10px', padding: '2px 8px', borderRadius: '8px',
                      background: '#fef3c7', color: '#92400e', fontWeight: 600,
                    }}>
                      🏆 优秀作品 +{post.xpReward}XP
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: 'auto' }}>
                    {post.authorName} · {post.createdAt}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600, color: '#1f2937' }}>
                  {post.title}
                </h3>

                {/* Content */}
                <p style={{
                  margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5',
                  display: isExpanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: isExpanded ? 'unset' : 2,
                  WebkitBoxOrient: 'vertical', overflow: isExpanded ? 'visible' : 'hidden',
                }}>
                  {post.content}
                </p>

                {/* Deliverable */}
                {post.deliverable && (
                  <div style={{
                    marginTop: '8px', padding: '8px 12px', borderRadius: '8px',
                    background: '#f0fdf4', border: '1px solid #bbf7d0',
                  }}>
                    <p style={{ margin: 0, fontSize: '12px', color: '#166534' }}>
                      📦 交付物：{post.deliverable}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>❤️ {post.likes}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>💬 {post.comments.length}</span>
                </div>

                {/* Expanded: Comments */}
                {isExpanded && post.comments.length > 0 && (
                  <div style={{
                    marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f3f4f6',
                  }}>
                    {post.comments.map(comment => (
                      <div key={comment.id} style={{
                        padding: '8px 12px', borderRadius: '8px', background: '#f8fafc',
                        marginBottom: '6px',
                      }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#374151' }}>
                          <strong>{comment.authorName}</strong>：{comment.content}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#9ca3af' }}>
                          {comment.createdAt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #e5e7eb', background: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
            优秀作品可获得额外XP奖励 · 你的进度直属Leader可见
          </p>
          <button style={{
            padding: '8px 16px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
            color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
          }}>
            ✍️ 发布作品
          </button>
        </div>
      </div>
    </div>
  );
}

function TabButton({ label, isActive, color, onClick }: {
  label: string; isActive: boolean; color: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 12px', borderRadius: '8px',
      border: isActive ? `2px solid ${color}` : '2px solid transparent',
      background: isActive ? `${color}12` : 'transparent',
      cursor: 'pointer', fontSize: '12px', fontWeight: isActive ? 600 : 400,
      color: isActive ? color : '#6b7280', whiteSpace: 'nowrap', transition: 'all 0.2s',
    }}>
      {label}
    </button>
  );
}

import { useState } from 'react';
import { CAPABILITIES } from '../data/learningPaths';
import { Capability } from '../types';

// 模拟论坛数据
interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  capability: Capability;
  title: string;
  content: string;
  deliverable: string;
  likes: number;
  comments: number;
  createdAt: string;
  isExcellent: boolean;
  xpReward: number;
}

const MOCK_POSTS: ForumPost[] = [
  {
    id: 'p1', author: '张小萌', avatar: '🎨', capability: 'ai-image',
    title: '用ControlNet生成的三角洲行动角色概念图',
    content: '使用ControlNet姿势控制+LoRA风格化，生成了3个不同风格的角色概念图。关键技巧：先用MJ生成草图，再用SD+ControlNet精修。',
    deliverable: '3张角色概念图（写实/二次元/赛博朋克）',
    likes: 42, comments: 8, createdAt: '2026-06-14', isExcellent: true, xpReward: 100,
  },
  {
    id: 'p2', author: '赵大锤', avatar: '💻', capability: 'ai-code',
    title: '唇齿音模型训练进展分享',
    content: '基于Wav2Lip的改进方案，已完成数据集收集（5000条标注样本）。初步训练结果：唇齿音准确率从62%提升到78%。',
    deliverable: '训练代码+初步评估报告',
    likes: 38, comments: 5, createdAt: '2026-06-15', isExcellent: true, xpReward: 150,
  },
  {
    id: 'p3', author: '孙小艺', avatar: '✍️', capability: 'ai-writing',
    title: '用AI完成的三角洲行动版本更新策划案',
    content: '用腾讯元宝+ChatGPT完成了一套完整的版本更新策划案。AI帮我完成了80%的初稿，我负责创意方向和质量审核。效率提升约5倍。',
    deliverable: '完整版本更新策划案（15页）',
    likes: 25, comments: 3, createdAt: '2026-06-16', isExcellent: false, xpReward: 80,
  },
  {
    id: 'p4', author: '周小智', avatar: '🤖', capability: 'ai-agent',
    title: '自动竞品分析Agent上线了！',
    content: '用Claude Agent SDK构建的自动竞品分析Agent已上线运行。每周一早上8点自动收集数据、生成分析报告、推送到腾讯文档。目前覆盖5款竞品。',
    deliverable: 'Agent源码+首份自动报告',
    likes: 56, comments: 12, createdAt: '2026-06-17', isExcellent: true, xpReward: 200,
  },
  {
    id: 'p5', author: '刘小研', avatar: '🔬', capability: 'ai-research',
    title: 'Seedance 2.0论文复现笔记',
    content: '花了2周时间精读并复现了Seedance 2.0的核心模块。论文中最关键的创新是多尺度注意力机制，我的复现结果与论文报告基本一致。',
    deliverable: '复现代码+对比实验报告',
    likes: 31, comments: 6, createdAt: '2026-06-14', isExcellent: true, xpReward: 120,
  },
  {
    id: 'p6', author: '林小画', avatar: '🎨', capability: 'ai-image',
    title: '用LoRA训练的专属游戏画风模型',
    content: '收集了500张公司游戏的原画作为训练集，训练了一个专属LoRA模型。现在可以用AI生成与公司画风完全一致的概念图！',
    deliverable: 'LoRA模型+生成示例+训练教程',
    likes: 67, comments: 15, createdAt: '2026-06-18', isExcellent: true, xpReward: 250,
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BigGooseForum({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'excellent' | Capability>('all');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = MOCK_POSTS.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'excellent') return p.isExcellent;
    return p.capability === activeTab;
  });

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#f8fafc', borderRadius: '24px', width: '720px',
        maxHeight: '85vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          padding: '18px 20px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>🪿</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>大鹅论坛 — 成长副本社区</h2>
              <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>
                优秀案例实时可见 · Leader可查看进度 · 优秀作品额外奖励
              </p>
            </div>
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
          <TabBtn label="全部" active={activeTab === 'all'} onClick={() => setActiveTab('all')} color="#6366f1" />
          <TabBtn label="🏆 优秀作品" active={activeTab === 'excellent'} onClick={() => setActiveTab('excellent')} color="#f59e0b" />
          {Object.values(CAPABILITIES).map(c => (
            <TabBtn key={c.key} label={`${c.icon} ${c.title}`} active={activeTab === c.key}
              onClick={() => setActiveTab(c.key)} color={c.color} />
          ))}
        </div>

        {/* Posts */}
        <div style={{ padding: '12px 16px', maxHeight: '500px', overflowY: 'auto' }}>
          {filtered.map(post => {
            const cap = CAPABILITIES[post.capability];
            const expanded = expandedPost === post.id;
            return (
              <div key={post.id} onClick={() => setExpandedPost(expanded ? null : post.id)}
                style={{
                  background: 'white', borderRadius: '14px', padding: '16px',
                  marginBottom: '10px', cursor: 'pointer',
                  border: post.isExcellent ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{post.avatar}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1f2937' }}>{post.author}</span>
                  <span style={{
                    fontSize: '10px', padding: '2px 8px', borderRadius: '8px',
                    background: `${cap.color}15`, color: cap.color, fontWeight: 600,
                  }}>{cap.icon} {cap.title}</span>
                  {post.isExcellent && (
                    <span style={{
                      fontSize: '10px', padding: '2px 8px', borderRadius: '8px',
                      background: '#fef3c7', color: '#92400e', fontWeight: 600,
                    }}>🏆 优秀 +{post.xpReward}XP</span>
                  )}
                  <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: 'auto' }}>{post.createdAt}</span>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600 }}>{post.title}</h3>
                <p style={{
                  margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5',
                  display: expanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: expanded ? 'unset' : 2,
                  WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden',
                }}>{post.content}</p>
                {post.deliverable && (
                  <div style={{
                    marginTop: '8px', padding: '8px 12px', borderRadius: '8px',
                    background: '#f0fdf4', border: '1px solid #bbf7d0',
                  }}>
                    <p style={{ margin: 0, fontSize: '12px', color: '#166534' }}>📦 {post.deliverable}</p>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>❤️ {post.likes}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>💬 {post.comments}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #e5e7eb', background: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
            优秀作品可获得额外XP奖励 · 你的进度直属Leader可见
          </p>
          <button style={{
            padding: '8px 16px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
          }}>✍️ 发布作品</button>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ label, active, color, onClick }: {
  label: string; active: boolean; color: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', borderRadius: '8px',
      border: active ? `2px solid ${color}` : '2px solid transparent',
      background: active ? `${color}12` : 'transparent',
      cursor: 'pointer', fontSize: '11px', fontWeight: active ? 600 : 400,
      color: active ? color : '#6b7280', whiteSpace: 'nowrap', transition: 'all 0.2s',
    }}>{label}</button>
  );
}

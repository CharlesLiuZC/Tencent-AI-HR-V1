import { useState } from 'react';
import { CAPABILITIES } from '../data/learningPaths';
import { Capability } from '../types';

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  capability: Capability;
  title: string;
  content: string;
  deliverable: string;
  likes: number;
  comments: { author: string; content: string; time: string }[];
  createdAt: string;
  isExcellent: boolean;
  xpReward: number;
  tags: string[];
  images?: string[];
  parameters?: Record<string, string>;
}

const asset = (filename: string) => `${import.meta.env.BASE_URL}forum/${filename}`;

const INITIAL_POSTS: ForumPost[] = [
  {
    id: 'p1', author: '张小萌', avatar: '🎨', capability: 'ai-image',
    title: '用 ControlNet 生成的战术角色概念图',
    content: '使用 OpenPose 姿势控制 + LoRA 风格化，生成写实、二次元和赛博朋克三套角色概念图。先用姿态骨架锁定动作，再用 SDXL 完成结构生成，最后分别叠加三套风格 LoRA。',
    deliverable: '3 张原创角色概念图 + 完整参数与工作流说明',
    likes: 42, createdAt: '2026-06-14', isExcellent: true, xpReward: 100,
    tags: ['ControlNet', 'OpenPose', 'LoRA', '角色设计'],
    images: [
      asset('controlnet-realistic.png'),
      asset('controlnet-anime.png'),
      asset('controlnet-cyberpunk.png'),
    ],
    parameters: {
      '基础模型': 'SDXL 1.0',
      '分辨率': '832 × 1216',
      'Sampler': 'DPM++ 2M Karras',
      'Steps / CFG': '32 / 6.5',
      'ControlNet': 'OpenPose XL · Weight 0.82',
      'Control Mode': 'Balanced · Start 0 · End 0.86',
      'LoRA': 'Tactical Gear 0.68 + Style LoRA 0.55',
      'Seed': '184729031',
      'Negative Prompt': 'low quality, bad anatomy, extra fingers, logo, watermark',
    },
    comments: [
      { author: '李大力', content: '参数公开得很完整，OpenPose 的结束步数很有参考价值。', time: '2026-06-14' },
      { author: '王小花', content: '赛博风那张的材质和轮廓控制很稳！', time: '2026-06-15' },
    ],
  },
  {
    id: 'p2', author: '赵大锤', avatar: '💻', capability: 'ai-code',
    title: '唇齿音模型训练进展分享',
    content: '基于 Wav2Lip 的改进方案，已完成 5000 条标注样本。初步训练结果：唇齿音准确率从 62% 提升到 78%。',
    deliverable: '训练代码 + 初步评估报告',
    likes: 38, createdAt: '2026-06-15', isExcellent: true, xpReward: 150,
    tags: ['模型训练', 'Wav2Lip', '语音'],
    comments: [{ author: '陈小美', content: '数据集是怎么标注的？', time: '2026-06-16' }],
  },
  {
    id: 'p3', author: '孙小艺', avatar: '✍️', capability: 'ai-writing',
    title: 'AI 辅助版本更新叙事套装',
    content: '用腾讯元宝和 Claude 完成版本世界观、活动任务与营销文案，人工负责创意方向和一致性校验。',
    deliverable: '版本更新叙事文档（15页）',
    likes: 25, createdAt: '2026-06-16', isExcellent: false, xpReward: 80,
    tags: ['叙事', '腾讯元宝', '效率提升'], comments: [],
  },
  {
    id: 'p4', author: '周小智', avatar: '🤖', capability: 'ai-agent',
    title: '自动竞品分析 Agent 上线',
    content: '每周一自动收集数据、生成报告并推送到腾讯文档，当前覆盖 5 款竞品。',
    deliverable: 'Agent 源码 + 首份自动报告',
    likes: 56, createdAt: '2026-06-17', isExcellent: true, xpReward: 200,
    tags: ['Agent', '自动化', '竞品分析'], comments: [],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BigGooseForum({ isOpen, onClose }: Props) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState<'all' | 'excellent' | Capability>('all');
  const [expandedPost, setExpandedPost] = useState<string | null>('p1');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentPost, setCommentPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [showComposer, setShowComposer] = useState(false);

  if (!isOpen) return null;

  const filtered = posts.filter(post => {
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'excellent' ? post.isExcellent : post.capability === activeTab);
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesTab && matchesSearch;
  });

  const toggleLike = (postId: string) => {
    setLikedPosts(previous => {
      const next = new Set(previous);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const sendComment = (postId: string) => {
    const content = commentText.trim();
    if (!content) return;
    setPosts(previous => previous.map(post => post.id === postId
      ? {
          ...post,
          comments: [...post.comments, {
            author: '我',
            content,
            time: new Date().toISOString().slice(0, 10),
          }],
        }
      : post));
    setCommentText('');
    setCommentPost(null);
    setExpandedPost(postId);
  };

  return (
    <div className="goose-forum-backdrop" role="dialog" aria-modal="true" aria-label="大鹅论坛">
      <div className="goose-forum">
        <header className="goose-forum-header">
          <div><span>🪿</span><div><h2>大鹅论坛 · 成长副本社区</h2><p>公开参数、作品和复盘，让经验可以复用</p></div></div>
          <button onClick={onClose} aria-label="关闭论坛">×</button>
        </header>

        <div className="goose-forum-controls">
          <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="搜索帖子、参数或标签..." />
          <nav>
            <FilterButton label="全部" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
            <FilterButton label="🏆 优秀" active={activeTab === 'excellent'} onClick={() => setActiveTab('excellent')} />
            {Object.values(CAPABILITIES).map(capability => (
              <FilterButton
                key={capability.key}
                label={`${capability.icon} ${capability.title}`}
                active={activeTab === capability.key}
                onClick={() => setActiveTab(capability.key)}
              />
            ))}
          </nav>
        </div>

        <main className="goose-post-list">
          {filtered.length === 0 ? (
            <div className="goose-empty"><span>🪿</span><p>暂无匹配的帖子</p></div>
          ) : filtered.map(post => {
            const capability = CAPABILITIES[post.capability];
            const expanded = expandedPost === post.id;
            const liked = likedPosts.has(post.id);
            return (
              <article key={post.id} className={`goose-post ${post.isExcellent ? 'is-excellent' : ''}`}>
                <button className="goose-post-summary" onClick={() => setExpandedPost(expanded ? null : post.id)}>
                  <div className="goose-post-meta">
                    <span>{post.avatar}</span><strong>{post.author}</strong>
                    <i style={{ color: capability.color }}>{capability.icon} {capability.title}</i>
                    {post.isExcellent && <em>🏆 优秀 +{post.xpReward} XP</em>}
                    <time>{post.createdAt}</time>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="goose-tags">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
                </button>

                {expanded && (
                  <div className="goose-post-detail">
                    {post.images && (
                      <div className="goose-gallery">
                        {post.images.map((image, index) => (
                          <figure key={image}>
                            <img src={image} alt={`${post.title}作品 ${index + 1}`} />
                            <figcaption>{['写实风格', '二次元风格', '赛博朋克风格'][index] || `作品 ${index + 1}`}</figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
                    {post.parameters && (
                      <section className="goose-parameters">
                        <h4>ControlNet / LoRA 参数公开</h4>
                        <div>{Object.entries(post.parameters).map(([key, value]) => (
                          <p key={key}><span>{key}</span><code>{value}</code></p>
                        ))}</div>
                      </section>
                    )}
                    <div className="goose-deliverable">📦 {post.deliverable}</div>
                    {post.comments.map((comment, index) => (
                      <div className="goose-comment" key={`${comment.author}-${index}`}>
                        <strong>{comment.author}</strong><span>{comment.content}</span><time>{comment.time}</time>
                      </div>
                    ))}
                  </div>
                )}

                <footer className="goose-post-actions">
                  <button onClick={() => toggleLike(post.id)}>{liked ? '❤️' : '🤍'} {post.likes + (liked ? 1 : 0)}</button>
                  <button onClick={() => setCommentPost(commentPost === post.id ? null : post.id)}>💬 {post.comments.length}</button>
                  <button onClick={() => navigator.clipboard?.writeText(post.title)}>🔗 分享</button>
                </footer>

                {commentPost === post.id && (
                  <div className="goose-comment-form">
                    <input value={commentText} onChange={event => setCommentText(event.target.value)} placeholder="写评论..." />
                    <button onClick={() => sendComment(post.id)} disabled={!commentText.trim()}>发送</button>
                  </div>
                )}
              </article>
            );
          })}
        </main>

        <footer className="goose-forum-footer">
          <p>{posts.length} 篇帖子 · {posts.filter(post => post.isExcellent).length} 篇优秀作品</p>
          <button onClick={() => setShowComposer(true)}>✍️ 发布作品</button>
        </footer>
      </div>

      {showComposer && (
        <PostComposer
          onClose={() => setShowComposer(false)}
          onPublish={post => {
            setPosts(previous => [post, ...previous]);
            setActiveTab('all');
            setExpandedPost(post.id);
            setShowComposer(false);
          }}
        />
      )}
    </div>
  );
}

function PostComposer({ onClose, onPublish }: { onClose: () => void; onPublish: (post: ForumPost) => void }) {
  const [capability, setCapability] = useState<Capability>('ai-image');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deliverable, setDeliverable] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const canPublish = title.trim() && content.trim() && deliverable.trim();

  const readImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 3).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setImages(previous => [...previous, String(reader.result)].slice(0, 3));
      reader.readAsDataURL(file);
    });
  };

  const publish = () => {
    if (!canPublish) return;
    onPublish({
      id: `user-${Date.now()}`,
      author: '我',
      avatar: CAPABILITIES[capability].icon,
      capability,
      title: title.trim(),
      content: content.trim(),
      deliverable: deliverable.trim(),
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString().slice(0, 10),
      isExcellent: false,
      xpReward: 0,
      tags: tags.split(/[,，]/).map(tag => tag.trim()).filter(Boolean),
      images,
    });
  };

  return (
    <div className="goose-composer-layer">
      <div className="goose-composer">
        <header><div><small>SHARE YOUR WORK</small><h3>发布学习作品</h3></div><button onClick={onClose}>×</button></header>
        <label>能力方向<select value={capability} onChange={event => setCapability(event.target.value as Capability)}>
          {Object.values(CAPABILITIES).map(item => <option key={item.key} value={item.key}>{item.title}</option>)}
        </select></label>
        <label>作品标题<input value={title} onChange={event => setTitle(event.target.value)} placeholder="用一句话说明你完成了什么" /></label>
        <label>过程与心得<textarea value={content} onChange={event => setContent(event.target.value)} placeholder="说明工具、方法、关键参数和踩坑经验" /></label>
        <label>交付物<input value={deliverable} onChange={event => setDeliverable(event.target.value)} placeholder="例如：3 张概念图 + 工作流 JSON" /></label>
        <label>标签<input value={tags} onChange={event => setTags(event.target.value)} placeholder="ControlNet, LoRA, 角色设计" /></label>
        <label>作品图片（最多 3 张）<input type="file" accept="image/*" multiple onChange={event => readImages(event.target.files)} /></label>
        {images.length > 0 && <div className="composer-preview">{images.map(image => <img key={image} src={image} alt="待发布作品预览" />)}</div>}
        <footer><button onClick={onClose}>取消</button><button onClick={publish} disabled={!canPublish}>发布作品</button></footer>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button className={active ? 'is-active' : ''} onClick={onClick}>{label}</button>;
}

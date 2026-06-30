import { Phase, Capability } from '../types';
import { getToolsByPhaseAndCapability } from '../data/aiTools';

interface Props {
  phase: Phase;
  role: Capability;
}

const CATEGORY_ICONS: Record<string, string> = {
  text: '💬',
  image: '🎨',
  code: '💻',
  audio: '🎵',
  video: '🎬',
  agent: '🤖',
};

const CATEGORY_LABELS: Record<string, string> = {
  text: '文本',
  image: '图像',
  code: '代码',
  audio: '音频',
  video: '视频',
  agent: 'Agent',
};

export default function ToolRecom({ phase, role }: Props) {
  const tools = getToolsByPhaseAndCapability(phase, role);

  if (tools.length === 0) {
    return (
      <div style={{
        padding: '24px',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '14px',
      }}>
        暂无推荐工具
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px',
    }}>
      {tools.map(tool => (
        <a
          key={tool.id}
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s',
            display: 'block',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            (e.currentTarget as HTMLElement).style.borderColor = '#a78bfa';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>{CATEGORY_ICONS[tool.category] || '🔧'}</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>
                {tool.name}
              </h4>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                {CATEGORY_LABELS[tool.category] || tool.category}
              </span>
            </div>
          </div>
          <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
            {tool.description}
          </p>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {tool.useCases.slice(0, 2).map((uc, i) => (
              <span key={i} style={{
                fontSize: '10px',
                background: '#f3f4f6',
                padding: '2px 6px',
                borderRadius: '6px',
                color: '#6b7280',
              }}>
                {uc}
              </span>
            ))}
          </div>
          {/* Difficulty stars */}
          <div style={{ marginTop: '8px', fontSize: '10px', color: '#f59e0b' }}>
            {'★'.repeat(tool.difficulty)}{'☆'.repeat(5 - tool.difficulty)}
            <span style={{ color: '#9ca3af', marginLeft: '4px' }}>难度</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '7px',
            paddingTop: '7px',
            borderTop: '1px solid #eef2f6',
            color: '#64748b',
            fontSize: '10px',
          }}>
            <span>智能适配</span>
            <strong style={{ color: '#0b8db8', fontSize: '12px' }}>
              {Math.min(99, 88 + tool.useCases.length + (5 - tool.difficulty) * 2)}/100
            </strong>
          </div>
        </a>
      ))}
    </div>
  );
}

import { Capability } from '../types';
import { getResourcesByUnit, getResourceIcon, getResourceColor } from '../data/resourceLinks';

interface Props {
  unitId: string;
  role: Capability;
}

export default function ResourceCard({ unitId, role }: Props) {
  const resources = getResourcesByUnit(unitId, role);

  if (resources.length === 0) return null;

  return (
    <div style={{ marginTop: '14px' }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
        🔗 学习资源
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {resources.map((res, i) => (
          <a
            key={i}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              border: `1px solid ${getResourceColor(res.type)}20`,
              background: `${getResourceColor(res.type)}05`,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${getResourceColor(res.type)}40`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px ${getResourceColor(res.type)}15`;
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${getResourceColor(res.type)}20`;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <span style={{
              fontSize: '18px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              background: `${getResourceColor(res.type)}12`,
              flexShrink: 0,
            }}>
              {getResourceIcon(res.type)}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: 600,
                color: '#1f2937',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {res.title}
              </p>
              <p style={{
                margin: '2px 0 0',
                fontSize: '11px',
                color: '#6b7280',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {res.description}
              </p>
            </div>
            <span style={{
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '6px',
              background: res.difficulty === 'beginner' ? '#dcfce7' : res.difficulty === 'intermediate' ? '#fef3c7' : '#fee2e2',
              color: res.difficulty === 'beginner' ? '#166534' : res.difficulty === 'intermediate' ? '#92400e' : '#991b1b',
              flexShrink: 0,
            }}>
              {res.difficulty === 'beginner' ? '入门' : res.difficulty === 'intermediate' ? '进阶' : '高级'}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

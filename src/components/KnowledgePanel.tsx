import { useState } from 'react';
import { LearningUnit, Capability } from '../types';
import { getMatchingGenes, groupGenesByType, GENE_TYPES, KnowledgeGene, GeneType } from '../data/knowledgeGenes';
import { useApp } from '../context/AppContext';

interface Props {
  unit: LearningUnit;
}

export default function KnowledgePanel({ unit }: Props) {
  const { role, progress } = useApp();
  const [expandedGene, setExpandedGene] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<GeneType | 'all'>('all');

  // 情境感知：根据当前学习单元匹配知识基因
  const matchedGenes = getMatchingGenes({
    unitId: unit.id,
    role,
    phase: unit.phase,
    category: unit.category,
  });

  if (matchedGenes.length === 0) return null;

  const grouped = groupGenesByType(matchedGenes);
  const filteredGenes = activeTab === 'all' ? matchedGenes : grouped[activeTab] || [];

  return (
    <div style={{
      marginTop: '12px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e0e7ff',
      background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>💡</span>
        <div>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>
            前人智慧 — {matchedGenes.length} 条已验证路径
          </h4>
          <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>
            站在前人肩膀上，走得更远
          </p>
        </div>
      </div>

      {/* Tab filters */}
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '8px 12px',
        borderBottom: '1px solid #e0e7ff',
        flexWrap: 'wrap',
      }}>
        <TabButton
          label="全部"
          count={matchedGenes.length}
          isActive={activeTab === 'all'}
          color="#6366f1"
          onClick={() => setActiveTab('all')}
        />
        {(['prompt', 'pitfall', 'collaboration', 'insight'] as GeneType[]).map(type => {
          const genes = grouped[type];
          if (genes.length === 0) return null;
          const info = GENE_TYPES[type];
          return (
            <TabButton
              key={type}
              label={`${info.icon} ${info.label}`}
              count={genes.length}
              isActive={activeTab === type}
              color={info.color}
              onClick={() => setActiveTab(type)}
            />
          );
        })}
      </div>

      {/* Gene list */}
      <div style={{ padding: '8px 12px' }}>
        {filteredGenes.map(gene => {
          const typeInfo = GENE_TYPES[gene.type];
          const isExpanded = expandedGene === gene.geneId;
          const isInnovation = gene.innovationDeviation && gene.innovationDeviation > 0.5;

          return (
            <div
              key={gene.geneId}
              style={{
                background: 'white',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '8px',
                border: isExpanded ? `2px solid ${typeInfo.color}40` : '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => setExpandedGene(isExpanded ? null : gene.geneId)}
            >
              {/* Gene header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  background: `${typeInfo.color}15`,
                  color: typeInfo.color,
                  fontWeight: 600,
                }}>
                  {typeInfo.icon} {typeInfo.label}
                </span>
                {isInnovation && (
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    background: '#fef3c7',
                    color: '#92400e',
                    fontWeight: 600,
                  }}>
                    🌟 探索路径
                  </span>
                )}
                <span style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  marginLeft: 'auto',
                }}>
                  ⭐ {gene.quality.rating}/5 · {gene.quality.validatedBy} 人验证
                </span>
              </div>

              {/* Gene title */}
              <h5 style={{
                margin: '8px 0 4px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#1f2937',
              }}>
                {gene.title}
              </h5>

              {/* Gene content preview */}
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#4b5563',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                display: isExpanded ? 'block' : '-webkit-box',
                WebkitLineClamp: isExpanded ? 'unset' : 2,
                WebkitBoxOrient: 'vertical',
                overflow: isExpanded ? 'visible' : 'hidden',
              }}>
                {gene.content}
              </p>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #f3f4f6',
                }}>
                  {/* Source */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '8px',
                    fontSize: '12px',
                    color: '#6b7280',
                  }}>
                    <span>👤</span>
                    <span>来自 <strong>{gene.source.contributor}</strong></span>
                    <span style={{ color: '#d1d5db' }}>·</span>
                    <span>{gene.source.originalContext}</span>
                  </div>

                  {/* Applicable info */}
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {gene.applicable.taskCategories.map((cat, i) => (
                      <span key={i} style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        background: '#f3f4f6',
                        color: '#6b7280',
                      }}>
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Evolution info */}
                  {gene.evolution.version > 1 && (
                    <div style={{
                      fontSize: '11px',
                      color: '#8b5cf6',
                      background: '#f5f3ff',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      marginTop: '4px',
                    }}>
                      🔄 进化至 V{gene.evolution.version}：{gene.evolution.changelog}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabButton({ label, count, isActive, color, onClick }: {
  label: string; count: number; isActive: boolean; color: string; onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        padding: '4px 10px',
        borderRadius: '8px',
        border: isActive ? `1.5px solid ${color}` : '1.5px solid transparent',
        background: isActive ? `${color}15` : 'transparent',
        color: isActive ? color : '#6b7280',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.2s',
      }}
    >
      {label} ({count})
    </button>
  );
}

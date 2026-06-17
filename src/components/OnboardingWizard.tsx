import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getMentorResponse, parseDiagnosisResult } from '../services/deepseek';
import AvatarDressUp, { AvatarConfig, DEFAULT_AVATAR } from './AvatarDressUp';
import { Role } from '../types';

interface Props {
  isOpen: boolean;
  onComplete: () => void;
}

const DEPARTMENTS = [
  'IEG 互动娱乐', 'WXG 微信事业群', 'CSIG 云与智慧产业', 'CDG 企业发展',
  'PCG 平台与内容', 'TEG 技术工程', 'HR 人力资源', '其他',
];

const ROLES_MAP: { key: Role; label: string; icon: string; desc: string }[] = [
  { key: 'art', label: '美术', icon: '🎨', desc: '原画/3D建模/动画/UI' },
  { key: 'design', label: '策划', icon: '📝', desc: '游戏策划/数值关卡' },
  { key: 'dev', label: '程序', icon: '💻', desc: '开发/架构/前端后端' },
  { key: 'ops', label: '运营', icon: '📊', desc: '运营/市场/社区/数据' },
];

export default function OnboardingWizard({ isOpen, onComplete }: Props) {
  const { setRole, setUserProfile, setAvatarConfig } = useApp();
  const [step, setStep] = useState<'info' | 'avatar' | 'aiChat' | 'complete'>('info');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('dev');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarConfigState, setAvatarConfigState] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [diagnosedProfile, setDiagnosedProfile] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  // Start AI chat on entering aiChat step
  useEffect(() => {
    if (step === 'aiChat' && chatMessages.length === 0) {
      startDiagnosis();
    }
  }, [step]);

  const startDiagnosis = async () => {
    setIsTyping(true);
    const firstMsg = `嗨 ${name}！我是你的 AI 导师 QQ鹅仔 🐧\n\n我看到你选择的是 ${selectedRole === 'art' ? '美术' : selectedRole === 'design' ? '策划' : selectedRole === 'dev' ? '程序' : '运营'} 岗位，${department} 部门。\n\n先跟我聊聊你的 AI 使用经验吧 — 你之前用过哪些 AI 工具？比如 ChatGPT、Midjourney、GitHub Copilot 或者腾讯元宝？平时用的频率怎么样？`;
    setChatMessages([{ role: 'assistant', content: firstMsg }]);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!userInput.trim() || isTyping) return;
    const msg = userInput.trim();
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    setIsTyping(true);

    try {
      const msgs = chatMessages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
      msgs.push({ role: 'user', content: msg });

      const response = await getMentorResponse(msgs);
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);

      // Check if diagnosis complete
      const diagnosis = parseDiagnosisResult(response);
      if (diagnosis) {
        setDiagnosedProfile(diagnosis);
        setTimeout(() => finishOnboarding(diagnosis), 2000);
      }
    } catch (error) {
      // Fallback: use predefined diagnosis
      const fallback = {
        aiLevel: 2,
        aiLevelLabel: '初级使用者',
        strengths: ['学习意愿强', '有岗位专业知识'],
        weaknesses: ['AI工具使用经验不足', '需建立AI思维'],
        learningFocus: selectedRole === 'art' ? ['AI+视觉设计', 'AI图像生成工具'] :
                     selectedRole === 'design' ? ['AI+内容策划', 'AI辅助创意'] :
                     selectedRole === 'ops' ? ['AI+数据运营', 'AI内容生成'] : ['AI编程', 'AI架构设计'],
        recommendedPace: '标准进度',
        roleSpecific: selectedRole === 'art' ? '重点掌握Midjourney/SD进行概念设计' :
                      selectedRole === 'design' ? '重点用AI辅助策划案和竞品分析' :
                      selectedRole === 'ops' ? '重点用AI做数据分析和内容运营' : '重点用CodeBuddy提升编程效率',
        tencentTools: ['腾讯元宝', '混元大模型', ...(selectedRole === 'dev' ? ['CodeBuddy', 'WorkBuddy'] : [])],
      };
      setDiagnosedProfile(fallback);
      setChatMessages(prev => [...prev, { role: 'assistant', content: '好的，我已经了解了你的情况！（使用离线评估模式）' }]);
      setTimeout(() => finishOnboarding(fallback), 1500);
    }
    setIsTyping(false);
  };

  const finishOnboarding = (diagnosis: any) => {
    setRole(selectedRole);
    setAvatarConfig(avatarConfigState);
    setUserProfile({
      name,
      department,
      role: selectedRole,
      aiLevel: diagnosis.aiLevel || 2,
      aiLevelLabel: diagnosis.aiLevelLabel || '初级使用者',
      strengths: diagnosis.strengths || [],
      weaknesses: diagnosis.weaknesses || [],
      learningFocus: diagnosis.learningFocus || [],
      recommendedPace: diagnosis.recommendedPace || '标准进度',
      roleSpecific: diagnosis.roleSpecific || '',
      tencentTools: diagnosis.tencentTools || [],
      isOnboarded: true,
    });
    setStep('complete');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, #12b7f5 0%, #0099e5 30%, #0077b6 70%, #0f172a 100%)',
      }} />

      {/* Animated particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} style={{
          position: 'fixed',
          width: `${4 + Math.random() * 8}px`,
          height: `${4 + Math.random() * 8}px`,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.3)',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      {/* Main content */}
      <div style={{
        background: 'white', borderRadius: '24px', width: '520px', maxHeight: '85vh',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden', position: 'relative', zIndex: 1,
      }}>
        {/* Progress bar */}
        <div style={{
          height: '4px', background: '#e5e7eb',
          position: 'relative',
        }}>
          <div style={{
            height: '100%',
            width: step === 'info' ? '25%' : step === 'avatar' ? '50%' : step === 'aiChat' ? '75%' : '100%',
            background: 'linear-gradient(90deg, #12b7f5, #0099e5)',
            transition: 'width 0.5s ease',
          }} />
        </div>

        {/* Step 1: Registration */}
        {step === 'info' && (
          <div style={{ padding: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '48px' }}>🐧</span>
              <h2 style={{ margin: '8px 0 0', fontSize: '22px', fontWeight: 700 }}>欢迎加入腾讯成长副本</h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>Step 1/4 — 填写你的信息</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>姓名</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="输入姓名"
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '15px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>所在部门</label>
                <select
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '15px', outline: 'none' }}
                >
                  <option value="">选择部门</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>所属岗位</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {ROLES_MAP.map(r => (
                    <button
                      key={r.key}
                      onClick={() => setSelectedRole(r.key)}
                      style={{
                        padding: '14px', borderRadius: '12px',
                        border: selectedRole === r.key ? '2.5px solid #12b7f5' : '2px solid #e5e7eb',
                        background: selectedRole === r.key ? '#f0f9ff' : 'white',
                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{r.icon}</span>
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{r.label}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6b7280' }}>{r.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAvatarEditor(true)}
              disabled={!name || !department}
              style={{
                width: '100%', marginTop: '20px', padding: '14px',
                borderRadius: '12px', border: 'none',
                background: name && department ? 'linear-gradient(135deg, #12b7f5, #0099e5)' : '#e5e7eb',
                color: 'white', cursor: name && department ? 'pointer' : 'not-allowed',
                fontSize: '16px', fontWeight: 600,
              }}
            >
              👾 捏造我的数字孪生体 →
            </button>
          </div>
        )}

        {/* Avatar Editor Modal */}
        <AvatarDressUp
          isOpen={showAvatarEditor}
          onClose={() => { setShowAvatarEditor(false); setStep('aiChat'); }}
          onSave={setAvatarConfigState}
          savedConfig={avatarConfigState}
        />

        {/* Step 2: AI Chat Diagnosis */}
        {step === 'aiChat' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
              padding: '16px 20px', color: 'white',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '28px' }}>🐧</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>AI 导师诊断中</h3>
                <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>Step 3/4 — 了解你的 AI 掌握程度</p>
              </div>
            </div>

            {/* Chat */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#f8fafc' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '10px',
                }}>
                  {msg.role === 'assistant' && (
                    <span style={{ fontSize: '20px', marginRight: '6px', alignSelf: 'flex-end' }}>🐧</span>
                  )}
                  <div style={{
                    maxWidth: '80%', padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? '#12b7f5' : 'white',
                    color: msg.role === 'user' ? 'white' : '#1f2937',
                    fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🐧</span>
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>思考中...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px' }}>
              <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="输入回答..."
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: '10px',
                  border: '2px solid #e5e7eb', fontSize: '14px', outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!userInput.trim() || isTyping}
                style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: userInput.trim() ? '#12b7f5' : '#e5e7eb',
                  color: 'white', cursor: userInput.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px', fontWeight: 600,
                }}
              >
                发送
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 'complete' && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <span style={{ fontSize: '64px' }}>🎉</span>
            <h2 style={{ margin: '16px 0 8px', fontSize: '24px', fontWeight: 700 }}>入职诊断完成！</h2>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#6b7280' }}>
              {name}，欢迎加入腾讯！你的专属学习路径已生成。
            </p>

            {diagnosedProfile && (
              <div style={{
                background: '#f0f9ff', borderRadius: '16px', padding: '20px',
                marginBottom: '20px', textAlign: 'left',
              }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>📋</span>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>AI 掌握水平</p>
                    <p style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 700, color: '#12b7f5' }}>
                      {diagnosedProfile.aiLevelLabel}（{diagnosedProfile.aiLevel}/5）
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#374151', lineHeight: '1.8' }}>
                  <p style={{ margin: '4px 0' }}>🟢 优势：{diagnosedProfile.strengths?.join('、')}</p>
                  <p style={{ margin: '4px 0' }}>🟡 提升点：{diagnosedProfile.weaknesses?.join('、')}</p>
                  <p style={{ margin: '4px 0' }}>🎯 学习重点：{diagnosedProfile.learningFocus?.join('、')}</p>
                  <p style={{ margin: '4px 0' }}>⚡ 推荐节奏：{diagnosedProfile.recommendedPace}</p>
                  <p style={{ margin: '4px 0' }}>🐧 腾讯工具：{diagnosedProfile.tencentTools?.join('、')}</p>
                </div>
              </div>
            )}

            <button
              onClick={onComplete}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 600,
              }}
            >
              🚀 开始冒险！
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

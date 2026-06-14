import { useState, useRef, useEffect } from 'react';
import { Role } from '../types';
import { useApp } from '../context/AppContext';

interface Message {
  role: 'mentor' | 'user';
  content: string;
  timestamp: Date;
}

// 预设的对话流程
const DIALOG_FLOW: Record<string, { question: string; options: { text: string; value: string; xp: number }[] }> = {
  start: {
    question: '嗨！我是企鹅导师 🐧 欢迎来到成长副本！\n\n先聊聊你之前的工作经验吧 — 你之前用过 AI 工具吗？',
    options: [
      { text: '完全没用过，我是 AI 小白 🐣', value: 'beginner', xp: 10 },
      { text: '偶尔用 ChatGPT 聊过天', value: 'casual', xp: 10 },
      { text: '经常用，有一些经验了', value: 'experienced', xp: 10 },
      { text: '我是 AI 老手，带我飞！', value: 'expert', xp: 10 },
    ],
  },
  style: {
    question: '了解！那你平时学习新东西的风格是？',
    options: [
      { text: '看视频跟着做 📺', value: 'visual', xp: 10 },
      { text: '读文档自己摸索 📖', value: 'reading', xp: 10 },
      { text: '直接上手干，边做边学 💪', value: 'hands_on', xp: 10 },
      { text: '找人问，讨论着学 🤝', value: 'social', xp: 10 },
    ],
  },
  goal: {
    question: '最后一个问题 — 你最想通过 AI 获得什么能力？',
    options: [
      { text: '提高日常工作效率', value: 'efficiency', xp: 10 },
      { text: '做出更有创意的东西', value: 'creativity', xp: 10 },
      { text: '用 AI 解决复杂问题', value: 'problem_solving', xp: 10 },
      { text: '建立 AI 驱动的工作流', value: 'workflow', xp: 10 },
    ],
  },
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PenguinMentor({ isOpen, onClose }: Props) {
  const { role, progress } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start conversation
      setTimeout(() => {
        addMentorMessage(DIALOG_FLOW.start.question);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMentorMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'mentor', content, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleOptionClick = (value: string, text: string, xp: number) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date() }]);
    setUserProfile(prev => ({ ...prev, [currentStep]: value }));

    // Move to next step
    if (currentStep === 'start') {
      setTimeout(() => addMentorMessage(DIALOG_FLOW.style.question), 1200);
      setCurrentStep('style');
    } else if (currentStep === 'style') {
      setTimeout(() => addMentorMessage(DIALOG_FLOW.goal.question), 1200);
      setCurrentStep('goal');
    } else if (currentStep === 'goal') {
      // Complete onboarding
      setTimeout(() => {
        const profile = { ...userProfile, goal: value };
        const recommendation = generateRecommendation(profile, role);
        addMentorMessage(recommendation);
        setIsComplete(true);
      }, 1200);
    }
  };

  const generateRecommendation = (profile: Record<string, string>, role: Role): string => {
    const roleLabel = role === 'art' ? '美术' : role === 'design' ? '策划' : role === 'dev' ? '程序' : '运营';
    const level = profile.start || 'beginner';
    const style = profile.style || 'hands_on';
    const goal = profile.goal || 'efficiency';

    let levelText = '';
    if (level === 'beginner') levelText = 'AI 零基础';
    else if (level === 'casual') levelText = '有一些 AI 使用经验';
    else if (level === 'experienced') levelText = '有较丰富的 AI 经验';
    else levelText = 'AI 高手';

    let styleText = '';
    if (style === 'visual') styleText = '视频学习型';
    else if (style === 'reading') styleText = '文档阅读型';
    else if (style === 'hands_on') styleText = '实战驱动型';
    else styleText = '社交讨论型';

    let goalText = '';
    if (goal === 'efficiency') goalText = '效率提升';
    else if (goal === 'creativity') goalText = '创意激发';
    else if (goal === 'problem_solving') goalText = '问题解决';
    else goalText = '工作流建设';

    return `太棒了！我已经为你生成了专属画像 🎯\n\n` +
      `📋 你的画像：\n` +
      `• 岗位：${roleLabel}\n` +
      `• AI 水平：${levelText}\n` +
      `• 学习风格：${styleText}\n` +
      `• 核心目标：${goalText}\n\n` +
      `我已经为你调整了学习路径的权重 — 会优先推荐适合你风格的内容！\n\n` +
      `🎯 你的第一个任务已经解锁，点击"学习路径"开始冒险吧！\n\n` +
      `记住：每一次和 AI 的对话都是一次成长。加油！🐧✨`;
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '380px',
      maxHeight: '600px',
      borderRadius: '20px',
      background: 'white',
      boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1000,
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #12b7f5 0%, #0099e5 100%)',
        padding: '16px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
        }}>
          🐧
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>企鹅导师</h3>
          <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>你的 AI 学习伙伴 · 在线</p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '16px',
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        maxHeight: '400px',
        background: '#f8fafc',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '12px',
          }}>
            {msg.role === 'mentor' && (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#12b7f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginRight: '8px',
                flexShrink: 0,
              }}>
                🐧
              </div>
            )}
            <div style={{
              maxWidth: '75%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? '#12b7f5' : 'white',
              color: msg.role === 'user' ? 'white' : '#1f2937',
              fontSize: '13px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#12b7f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
            }}>🐧</div>
            <div style={{
              padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
              background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              <span style={{ animation: 'pulse 1s infinite' }}>思考中...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Options */}
      {!isComplete && DIALOG_FLOW[currentStep] && !isTyping && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb',
          background: 'white',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {DIALOG_FLOW[currentStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt.value, opt.text, opt.xp)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #e0e7ff',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#374151',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#12b7f5';
                  (e.currentTarget as HTMLElement).style.background = '#f0f9ff';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#e0e7ff';
                  (e.currentTarget as HTMLElement).style.background = 'white';
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Complete state */}
      {isComplete && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb',
          background: 'white',
          textAlign: 'center',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              width: '100%',
            }}
          >
            🚀 开始冒险！
          </button>
        </div>
      )}
    </div>
  );
}

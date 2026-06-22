import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getCompanionResponse } from '../services/deepseek';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type PenguinMood = 'happy' | 'thinking' | 'excited' | 'sleeping' | 'encouraging';

const MOOD_EMOJIS: Record<PenguinMood, string> = {
  happy: '🐧',
  thinking: '🐧💭',
  excited: '🐧✨',
  sleeping: '🐧💤',
  encouraging: '🐧💪',
};

// 预设消息
const PROACTIVE: Record<string, string[]> = {
  login: [
    '主人你来啦！我等你好久了~ 🐧✨',
    '今天也要一起学习AI哦！我已经准备好了~',
    '欢迎回来！我刚看了一篇有趣的AI文章，等下分享给你！',
  ],
  stuck: [
    '主人，遇到困难了吗？没关系，我陪你一起想办法~ 💪',
    '每个大佬都是从踩坑开始的，你能行的！',
    '要不我们换个思路试试？有时候绕个弯反而更快~',
  ],
  complete: [
    '太棒了主人！又完成一个任务！🎉 我给你跳个舞庆祝一下~',
    '厉害厉害！你的AI技能又升级了！✨',
    '完美！主人你越来越厉害了，我都快跟不上了~',
  ],
  daily: [
    '今日AI小知识：你知道吗？GPT-4的训练数据量相当于1000个维基百科！📊',
    '今日Prompt小技巧：给AI一个角色设定，输出质量会提升50%以上！💡',
    '今日冷知识：第一个聊天机器人ELIZA诞生于1966年，比互联网还早！🤖',
    '今日效率秘籍：用AI做初稿+人工精修，比纯手写快3-5倍！⚡',
  ],
  idle: [
    '主人，好久没来看我了...我好想你呀~ 🥺',
    '我都快长蘑菇了...快来和我一起学习吧！🍄',
    '主人你在忙什么呀？别忘了还有我这个小企鹅在等你哦~',
  ],
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PenguinCompanion() {
  const { progress } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mood, setMood] = useState<PenguinMood>('happy');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 初始化欢迎消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: pickRandom(PROACTIVE.login) }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: pickRandom(PROACTIVE.daily) }]);
      }, 2000);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!userInput.trim() || isTyping) return;
    const msg = userInput.trim();
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setIsTyping(true);
    setMood('thinking');

    try {
      const chatHistory = messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
      chatHistory.push({ role: 'user', content: msg });
      const response = await getCompanionResponse(chatHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setMood('excited');
      setTimeout(() => setMood('happy'), 2000);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: pickRandom([
          '主人说得太好了！虽然我现在网络不太好，但我完全同意你的观点~ 🐧',
          '嗯嗯，我记下来了！等网络恢复了我们继续聊~',
          '主人的问题好有深度！让我想想...（网络有点慢，稍等哦）',
        ]),
      }]);
      setMood('encouraging');
    }
    setIsTyping(false);
  };

  const getMoodFromProgress = (): PenguinMood => {
    const c = progress.completedUnits.length;
    if (c >= 20) return 'excited';
    if (c >= 10) return 'happy';
    if (c >= 5) return 'encouraging';
    return 'happy';
  };

  return (
    <>
      {/* 浮动企鹅按钮 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(18,183,245,0.4)',
          zIndex: 999, transition: 'all 0.3s',
          animation: 'penguinBounce 2s ease-in-out infinite',
        }}
      >
        <span style={{ fontSize: '32px' }}>{MOOD_EMOJIS[getMoodFromProgress()]}</span>
        {!isOpen && (
          <div style={{
            position: 'absolute', top: '-2px', right: '-2px',
            width: '16px', height: '16px', borderRadius: '50%',
            background: '#ef4444', border: '2px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', color: 'white', fontWeight: 700,
          }}>!</div>
        )}
      </div>

      {/* 聊天窗口 */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '100px', right: '24px',
          width: '380px', maxHeight: '500px', borderRadius: '20px',
          background: 'white', boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000,
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #12b7f5, #0099e5)',
            padding: '14px 16px', color: 'white',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
            }}>{MOOD_EMOJIS[mood]}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>QQ鹅仔</h3>
              <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>你的AI学习伙伴 · 在线陪伴中</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
              width: '28px', height: '28px', cursor: 'pointer', color: 'white', fontSize: '12px',
            }}>✕</button>
          </div>

          {/* 快捷操作 */}
          <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap' }}>
            {[
              { label: '💡 今日知识', msg: '给我讲一个AI冷知识吧' },
              { label: '🎯 学习建议', msg: '根据我的进度，给我一些学习建议' },
              { label: '💪 加油鼓励', msg: '我今天有点累，给我加加油' },
              { label: '❓ 问问题', msg: '我有一个AI相关的问题' },
            ].map(btn => (
              <button key={btn.label} onClick={() => { setUserInput(btn.msg); setTimeout(() => handleSend(), 100); }}
                style={{ padding: '4px 10px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#f8fafc', cursor: 'pointer', fontSize: '11px', color: '#374151' }}>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '12px 14px', overflowY: 'auto', maxHeight: '280px', background: '#f8fafc' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
                {msg.role === 'assistant' && <span style={{ fontSize: '18px', marginRight: '6px', alignSelf: 'flex-end' }}>🐧</span>}
                <div style={{
                  maxWidth: '80%', padding: '8px 12px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.role === 'user' ? '#12b7f5' : 'white',
                  color: msg.role === 'user' ? 'white' : '#1f2937',
                  fontSize: '13px', lineHeight: '1.5', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span>🐧</span>
                <div style={{ padding: '8px 12px', borderRadius: '14px 14px 14px 4px', background: 'white', fontSize: '13px', color: '#9ca3af' }}>
                  思考中...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px' }}>
            <input value={userInput} onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="和鹅仔聊聊天..."
              style={{ flex: 1, padding: '8px 12px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '13px', outline: 'none' }} />
            <button onClick={handleSend} disabled={!userInput.trim() || isTyping}
              style={{ padding: '8px 16px', borderRadius: '12px', border: 'none', background: userInput.trim() ? '#12b7f5' : '#e5e7eb', color: 'white', cursor: userInput.trim() ? 'pointer' : 'not-allowed', fontSize: '13px', fontWeight: 600 }}>
              发送
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes penguinBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}

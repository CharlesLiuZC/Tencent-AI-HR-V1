import { useState, useRef, useEffect } from 'react';
import { Phase } from '../types';
import { PHASES } from '../data/learningPaths';
import { useApp } from '../context/AppContext';

interface Props {
  phase: Phase;
  onClose: () => void;
}

// AI 对战题目 - 模拟 LLM 对话式评估
const BATTLE_SCENARIOS: Record<Phase, { title: string; rounds: { aiSays: string; goodAnswer: string; tips: string }[] }> = {
  day30: {
    title: '新手村 Boss：AI 基础知识大考验',
    rounds: [
      {
        aiSays: '我是AI评审官！第一题：如果我让你帮我写一份竞品分析报告，你的第一步是什么？直接让我写，还是先告诉我什么信息？',
        goodAnswer: '应该先提供背景信息（竞品名称、分析维度、目标受众），然后用结构化的 Prompt 指导 AI 输出',
        tips: '好的 Prompt 需要 Context + Role + Instruction',
      },
      {
        aiSays: '不错！第二回合：我发现 AI 给我的数据分析结果里用的是英文，但老板要看中文。你会怎么处理？',
        goodAnswer: '在 Prompt 中明确要求"请全程使用中文回复"，或者在最后让 AI 翻译',
        tips: '语言控制是 Prompt 基础功',
      },
      {
        aiSays: '第三回合：AI 给了一个看起来很专业的分析，引用了3篇论文。你会怎么验证？',
        goodAnswer: '不能直接相信，需要验证数据来源。AI 可能产生幻觉，编造不存在的论文和数据',
        tips: 'AI 幻觉是最常见的陷阱',
      },
      {
        aiSays: '最后一击！请用一句话告诉我：AI 最适合帮你做什么，最不适合做什么？',
        goodAnswer: 'AI 最适合做初稿生成、信息整理、创意发散；最不适合做最终决策、事实验证、情感判断',
        tips: '理解 AI 的能力边界是 AI 素养的核心',
      },
    ],
  },
  day60: {
    title: '副本挑战 Boss：实战能力大考验',
    rounds: [
      {
        aiSays: '我是高级AI评审官！你已经不是新手了。第一题：设计一个AI驱动的竞品分析工作流，你会分几步？',
        goodAnswer: '喂资料→AI列维度→人校验→AI做对比矩阵→人补充→AI生成SWOT→人判断战略→AI生成行动建议→人筛选→整合输出',
        tips: '关键在于人机交替，不是一次让AI搞定',
      },
      {
        aiSays: '第二回合：你的团队成员都说"AI写的比我好"，开始直接复制AI的输出。你怎么引导？',
        goodAnswer: '应该让大家理解AI产出只是初稿，需要人工审核调整。可以通过分享AI犯错的案例来建立正确的AI使用意识',
        tips: '过度依赖AI直出是60天阶段最常见的问题',
      },
      {
        aiSays: '第三回合：你发现一个同事的提示词效果特别好，你会怎么做？',
        goodAnswer: '应该把好的提示词记录下来，分享给团队，形成团队的提示词库。这就是知识基因的沉淀',
        tips: '分享和沉淀是AI Native组织的核心能力',
      },
      {
        aiSays: '最终Boss战！用一句话总结：60天最大的成长应该是什么？',
        goodAnswer: '从"会用AI工具"成长为"能设计AI工作流"，从个人效率提升到团队协作优化',
        tips: '60天的关键是从个人到团队的跃迁',
      },
    ],
  },
  day90: {
    title: '终极Boss：AI 创新能力大考验',
    rounds: [
      {
        aiSays: '我是传奇级AI评审官！你即将成为AI先锋。第一题：如果你发现团队有个重复性工作可以用AI解决，你会怎么推动？',
        goodAnswer: '先用AI做出原型验证可行性，再用数据证明效率提升，最后推动团队采用。关键是用实际成果说话',
        tips: '创新需要用成果说话，不是用概念说服',
      },
      {
        aiSays: '第二回合：你怎么让一个对AI持怀疑态度的老员工接受AI？',
        goodAnswer: '不要强推，而是用AI帮他解决一个他最头疼的实际问题。让他感受到价值，自然会接受',
        tips: '改变心智模式的关键是体验，不是说教',
      },
      {
        aiSays: '第三回合：AI Agent 和传统 AI 工具的本质区别是什么？',
        goodAnswer: 'Agent 能自主规划和执行多步任务，而传统工具只能被动响应。Agent 有目标、能决策、会调整',
        tips: '理解 Agent 是AI创新的起点',
      },
      {
        aiSays: '终极一击！如果只能给后来者一句忠告，你会说什么？',
        goodAnswer: 'AI不是替代你的工具，是放大你的能力的伙伴。关键不是"会用AI"，而是"知道什么时候用什么AI"',
        tips: '这是从使用者到指挥官的蜕变',
      },
    ],
  },
};

export default function AIBattle({ phase, onClose }: Props) {
  const { setAssessmentScore } = useApp();
  const [currentRound, setCurrentRound] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scenario = BATTLE_SCENARIOS[phase];
  const phaseInfo = PHASES[phase];

  useEffect(() => {
    // Start battle
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ role: 'ai', content: `🎮 ${scenario.title}\n\n准备好了吗？${scenario.rounds[0].aiSays}` }]);
      setIsTyping(false);
    }, 1000);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const round = scenario.rounds[currentRound];
    const userMsg = userInput.trim();

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setUserInput('');

    // Evaluate (simplified: check for keywords)
    const keywords = round.goodAnswer.toLowerCase().split(/[，,、。\.]/);
    const matchCount = keywords.filter(kw =>
      kw.length > 2 && userMsg.toLowerCase().includes(kw.trim())
    ).length;
    const roundScore = Math.min(100, Math.round((matchCount / keywords.length) * 100 + 30));

    setIsTyping(true);
    setTimeout(() => {
      // AI response
      const feedback = roundScore >= 70
        ? `✅ 答得不错！${roundScore >= 90 ? '非常出色！' : ''}\n\n💡 补充一下：${round.tips}`
        : `🤔 还可以再想想。\n\n💡 关键点：${round.goodAnswer}\n\n${round.tips}`;

      setMessages(prev => [...prev, { role: 'ai', content: feedback }]);
      setScore(prev => prev + roundScore);
      setShowTips(true);
      setIsTyping(false);

      // Next round or finish
      if (currentRound < scenario.rounds.length - 1) {
        setTimeout(() => {
          setShowTips(false);
          const nextRound = currentRound + 1;
          setCurrentRound(nextRound);
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', content: scenario.rounds[nextRound].aiSays }]);
            setIsTyping(false);
          }, 800);
        }, 2000);
      } else {
        // Battle complete
        setTimeout(() => {
          const finalScore = Math.round((score + roundScore) / scenario.rounds.length);
          setAssessmentScore(phase, finalScore);
          setShowResult(true);
        }, 2000);
      }
    }, 1000);
  };

  if (showResult) {
    const finalScore = Math.round(score / scenario.rounds.length);
    const passed = finalScore >= 70;

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 1000,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
          borderRadius: '24px', padding: '48px', color: 'white',
          textAlign: 'center', maxWidth: '400px', width: '100%',
        }}>
          <span style={{ fontSize: '64px' }}>{passed ? '🏆' : '💪'}</span>
          <h2 style={{ margin: '16px 0 8px', fontSize: '24px', fontWeight: 700 }}>
            {passed ? 'Boss 战胜利！' : '继续修炼！'}
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: '16px', opacity: 0.8 }}>
            {phaseInfo.subtitle} 评估完成
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.1)', borderRadius: '16px',
            padding: '24px', marginBottom: '24px',
          }}>
            <p style={{ margin: 0, fontSize: '48px', fontWeight: 700, color: passed ? '#22c55e' : '#f59e0b' }}>
              {finalScore}分
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.7 }}>
              {passed ? '获得 AI 先锋认证' : '再接再厉'}
            </p>
          </div>
          {passed && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#12b7f5' }}>
                🪙 +{phase === 'day30' ? 50 : phase === 'day60' ? 80 : 120} Tencentken
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#a78bfa' }}>
                ⚡ +{phase === 'day30' ? 200 : phase === 'day60' ? 300 : 500} XP
              </p>
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '12px 32px', borderRadius: '12px', border: 'none',
              background: passed ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 600,
            }}
          >
            {passed ? '🎉 领取奖励' : '🔄 再次挑战'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#0f172a', borderRadius: '24px', width: '500px',
        maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        overflow: 'hidden', border: '2px solid #1e293b',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #dc2626, #991b1b)',
          padding: '16px 20px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>⚔️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>AI 对战</h3>
              <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.8 }}>
                回合 {currentRound + 1}/{scenario.rounds.length}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {scenario.rounds.map((_, i) => (
              <div key={i} style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: i < currentRound ? '#22c55e' : i === currentRound ? '#f59e0b' : '#374151',
              }} />
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, padding: '16px', overflowY: 'auto', maxHeight: '400px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '12px',
            }}>
              {msg.role === 'ai' && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: '#dc2626',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                  marginRight: '8px', flexShrink: 0,
                }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: '80%', padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user' ? '#12b7f5' : '#1e293b',
                color: 'white', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: '#dc2626',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
              }}>🤖</div>
              <div style={{
                padding: '12px 16px', borderRadius: '16px 16px 16px 4px',
                background: '#1e293b', color: '#9ca3af', fontSize: '13px',
              }}>
                AI 评审官正在输入...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #1e293b', background: '#0f172a',
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="输入你的回答..."
              style={{
                flex: 1, padding: '10px 14px', borderRadius: '12px',
                border: '1px solid #334155', background: '#1e293b',
                color: 'white', fontSize: '14px', outline: 'none',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim() || isTyping}
              style={{
                padding: '10px 20px', borderRadius: '12px', border: 'none',
                background: userInput.trim() ? 'linear-gradient(135deg, #dc2626, #991b1b)' : '#374151',
                color: 'white', cursor: userInput.trim() ? 'pointer' : 'not-allowed',
                fontSize: '14px', fontWeight: 600,
              }}
            >
              ⚔️ 发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

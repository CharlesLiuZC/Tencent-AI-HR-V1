import { useEffect, useRef } from 'react';
import { AvatarConfig } from './AvatarDressUp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userInfo: { name: string; department: string; role: string };
  avatarConfig: AvatarConfig;
  stats: { completedUnits: number; tencentken: number; xp: number; level: number; assessmentScores: Record<string, number | null> };
}

function drawGraduationPhoto(ctx: CanvasRenderingContext2D, w: number, h: number, info: Props['userInfo'], cfg: AvatarConfig, stats: Props['stats']) {
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#12b7f5'); grad.addColorStop(0.5, '#0099e5'); grad.addColorStop(1, '#0077b6');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);

  const colors = ['#f59e0b','#ef4444','#22c55e','#8b5cf6','#ec4899','#ffffff'];
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
    ctx.globalAlpha = 0.5 + Math.random()*0.5;
    ctx.fillRect(Math.random()*w, Math.random()*h*0.4, 4+Math.random()*8, 4+Math.random()*8);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(0, h*0.08, w, h*0.1);
  ctx.fillStyle = 'white'; ctx.font = `bold ${w*0.035}px sans-serif`; ctx.textAlign = 'center';
  ctx.fillText('CONGRATULATIONS! 成长副本毕业纪念', w/2, h*0.045);

  const ax = w/2, ay = h*0.42, as = w*0.35;
  const bodyColors: Record<string, string> = { black: '#1a1a2e', blue: '#12b7f5', purple: '#8b5cf6', pink: '#ec4899', green: '#22c55e', orange: '#f97316' };
  const bc = bodyColors[cfg.body] || '#1a1a2e';

  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(ax, ay+as*0.45, as*0.3, as*0.07, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = bc; ctx.beginPath(); ctx.ellipse(ax, ay, as*0.3, as*0.36, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.ellipse(ax, ay+as*0.05, as*0.18, as*0.24, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(ax-as*0.07, ay-as*0.1, as*0.05, 0, Math.PI*2); ctx.arc(ax+as*0.07, ay-as*0.1, as*0.05, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(ax-as*0.06, ay-as*0.08, as*0.025, 0, Math.PI*2); ctx.arc(ax+as*0.08, ay-as*0.08, as*0.025, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(ax-as*0.03, ay+as*0.02); ctx.lineTo(ax+as*0.03, ay+as*0.02); ctx.lineTo(ax, ay+as*0.07); ctx.closePath(); ctx.fill();

  ctx.fillStyle = '#1f2937'; ctx.fillRect(ax-as*0.14, ay-as*0.35, as*0.28, as*0.05);
  ctx.fillRect(ax-as*0.17, ay-as*0.3, as*0.34, as*0.03);
  ctx.fillStyle = '#f59e0b'; ctx.fillRect(ax+as*0.11, ay-as*0.3, as*0.015, as*0.1);
  ctx.beginPath(); ctx.arc(ax+as*0.117, ay-as*0.2, as*0.025, 0, Math.PI*2); ctx.fill();

  if (cfg.accessory && cfg.accessory !== 'none') {
    const accMap: Record<string,string> = { scarf:'🧣', tie:'👔', glasses:'🕶️', necklace:'💎', bowtie:'🎀' };
    ctx.font = `${as*0.2}px serif`; ctx.textAlign = 'center';
    ctx.fillText(accMap[cfg.accessory]||'', ax, ay-as*0.05);
  }
  if (cfg.weapon && cfg.weapon !== 'none') {
    const wepMap: Record<string,string> = { sword:'⚔️', shield:'🛡️', wand:'🪄', book:'📖', keyboard:'⌨️' };
    ctx.font = `${as*0.22}px serif`; ctx.textAlign = 'center';
    ctx.fillText(wepMap[cfg.weapon]||'', ax+as*0.23, ay+as*0.03);
  }

  ctx.fillStyle = 'white'; ctx.font = `bold ${w*0.04}px sans-serif`;
  ctx.fillText(info.name, w/2, h*0.7);
  ctx.font = `${w*0.022}px sans-serif`;
  ctx.fillText(`${info.department} · ${info.role}`, w/2, h*0.74);

  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(w*0.08, h*0.80, w*0.84, h*0.10);
  ctx.fillStyle = 'white'; ctx.font = `bold ${w*0.025}px sans-serif`;
  [['📚 '+stats.completedUnits+'/25 单元', 0.22],['🪙 '+stats.tencentken+' TK', 0.5],['⚡ Lv.'+stats.level, 0.78]].forEach(([t,x]) => ctx.fillText(t as string, w*Number(x), h*0.865));

  ctx.font = `${w*0.018}px sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Tencent · 成长副本 — AI Native Learning Path Designer', w/2, h*0.94);
  ctx.fillText('Graduation Date: '+new Date().toLocaleDateString('zh-CN'), w/2, h*0.96);
}

export default function GraduationPhoto({ isOpen, onClose, userInfo, avatarConfig, stats }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    c.width = 750; c.height = 1334;
    drawGraduationPhoto(ctx, 750, 1334, userInfo, avatarConfig, stats);
  }, [isOpen]);

  const handleDownload = () => {
    const c = canvasRef.current; if (!c) return;
    const a = document.createElement('a');
    a.download = '成长副本毕业合照_'+userInfo.name+'.png';
    a.href = c.toDataURL('image/png'); a.click();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position:'fixed', top:0,left:0,right:0,bottom:0, background:'rgba(0,0,0,0.9)', display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:1000,padding:20 }}>
      <div style={{ background:'#1f2937',borderRadius:36,padding:12,boxShadow:'0 20px 60px rgba(0,0,0,0.5)',maxWidth:380,width:'100%' }}>
        <div style={{ background:'#0f172a',borderRadius:24,overflow:'hidden' }}>
          <canvas ref={canvasRef} style={{ width:'100%',height:'auto',display:'block' }} />
        </div>
        <div style={{ width:120,height:4,borderRadius:2,background:'#374151',margin:'8px auto 0' }} />
      </div>
      <div style={{ display:'flex',gap:12,marginTop:24 }}>
        <button onClick={handleDownload} style={{ padding:'14px 32px',borderRadius:14,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',cursor:'pointer',fontSize:16,fontWeight:600 }}>Download Photo</button>
        <button onClick={onClose} style={{ padding:'14px 24px',borderRadius:14,border:'1px solid rgba(255,255,255,0.3)',background:'transparent',color:'white',cursor:'pointer',fontSize:16 }}>Close</button>
      </div>
    </div>
  );
}

# 成长副本：AI Native 新人成长 Agent

面向 AI Native 游戏组织的新人成长系统。它不是一张静态培训表，而是通过能力诊断、个性化路径、每日任务、QQ 鹅仔陪伴、阶段 Boss 战和 HR 组织看板形成完整闭环。

## 在线 Demo

前端由 GitHub Pages 托管：

https://charlesliuzc.github.io/Tencent-AI-HR-V1/

公网前端会明确显示当前 AI 模式：

- `真实 AI · Serverless`：配置了独立 API。
- `真实 AI · 本地代理`：本地 Vite 服务读取服务端密钥。
- `离线演示模式`：GitHub Pages 静态版，使用安全兜底逻辑。

## AI Native 闭环

```text
三轮能力诊断
  -> 诊断驱动路径规划
  -> 每日任务与成果验收
  -> Day 30/60/90 Boss 战
  -> 补强与优先级调整
  -> HR 组织能力洞察
```

六个能力方向：

- AI 生图师
- AI 视频导演
- AI 叙事文案
- AI 编程辅助
- AI Agent 构建师
- AI 研究员

## 本地运行

要求 Node.js 20+。

```bash
npm install
npm run dev
```

入口：

```text
http://localhost:5173/Tencent-AI-HR-V1/
```

构建与预览：

```bash
npm run build
npm run preview
```

## DeepSeek 配置

本地 `.env`：

```text
DEEPSEEK_API_KEY=your_key
```

Vite middleware 只在本地运行，密钥不会进入浏览器 bundle。

### Serverless

`api/` 包含以下 Vercel Functions：

- `/api/deepseek`
- `/api/diagnose`
- `/api/chat`
- `/api/assess`
- `/api/plan`

部署平台配置 `DEEPSEEK_API_KEY`。GitHub Pages 使用独立 API 时，在前端构建环境设置：

```text
VITE_API_BASE=https://your-serverless-domain.example.com/api
```

禁止把 API Key 写入 `VITE_*` 变量。

## 仓库结构

```text
api/          Serverless Agent API
knowledge/    带元数据的组织知识库
specs/        产品、Agent、数据、Prompt、评估和部署规格
src/agents/   个性化路径规划规则
src/          React 应用
```

## 数据与安全

- Demo 用户状态保存在 localStorage。
- 附件 Demo 只保存文件名，不上传真实文件。
- AI 诊断和评分只用于成长建议，不作为绩效结论。
- 高风险输出应由 HR 或 Leader 人工复核。

## 技术栈

React 19、TypeScript 6、Vite 8、React Router 7、Recharts、DeepSeek V4 Pro。

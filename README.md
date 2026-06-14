# 成长副本：AI Native 学习路径设计器

一个面向 AI Native 组织的新人成长路径管理 Demo。应用把 90 天学习旅程拆成 30-60-90 三个阶段，并提供角色路径、进度追踪、阶段测评和 AI 工具推荐等交互能力。

## 在线 Demo

推送到 GitHub 后，仓库会通过 GitHub Actions 构建并部署到 GitHub Pages：

https://charlesliuzc.github.io/Tencent-AI-HR-V1/

如果首次部署后页面未立即可用，请在仓库的 `Settings > Pages` 中确认 source 使用 `GitHub Actions`。

## 本地运行

环境要求：

- Node.js 18+
- npm 9+

```bash
npm install
npm run dev
```

Vite 当前配置了 GitHub Pages 子路径，本地开发入口通常是：

```text
http://localhost:5173/Tencent-AI-HR-V1/
```

生产构建和预览：

```bash
npm run build
npm run preview
```

## 核心功能

- 30-60-90 天学习路径可视化
- 美术、策划、程序、运营等角色分支
- 学习单元详情、阶段目标和推荐工具
- 本地持久化的学习进度仪表盘
- 阶段测评与结果反馈
- AI 工具和学习资源推荐

## 技术栈

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- Recharts

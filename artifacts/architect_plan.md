# 技术方案

## 1. 需求理解摘要
本项目为 AI Native 游戏组织构建"成长副本"学习路径设计器，Web Demo 形式展示 30-60-90 天新人学习计划。

## 2. 系统架构
- **架构风格**：纯前端 SPA，无需后端
- **技术栈**：React 19 + TypeScript 6 + Vite 8 + Tailwind CSS
- **数据持久化**：LocalStorage
- **部署**：Vercel

## 3. 文件结构
```
src/
├── App.tsx / main.tsx / index.css
├── types.ts
├── data/ (learningPaths.ts, aiTools.ts, assessments.ts)
├── context/ (AppContext.tsx)
├── components/ (Header, PathTimeline, UnitCard, RoleSelector, ProgressRing, Dashboard, Assessment, ToolRecom)
└── pages/ (Home, PathPage, DashboardPage, AssessPage)
```

## 4. 核心数据模型
- LearningUnit: id, title, description, phase, roles, duration, difficulty, tools, objectives, category
- UserProgress: completedUnits, currentPhase, assessmentScores, startDate
- AITool: id, name, category, description, difficulty, useCases, roles, phase

## 5. 核心函数
- generateLearningPath(role, phase) → LearningUnit[]
- calculateProgress(progress) → { overall, byPhase }
- evaluateAssessment(answers, phase) → { score, weakAreas }
- recommendTools(phase, role) → AITool[]

## 6. 验收映射
| 需求 | 实现 | 策略 |
|------|------|------|
| BR-001 路径可视化 | PathTimeline.tsx | CSS Grid 时间线 |
| BR-002 角色分支 | RoleSelector.tsx | Context 切换 |
| BR-003 单元详情 | UnitCard.tsx | 卡片展开/收起 |
| BR-004 仪表盘 | Dashboard.tsx | SVG 环形图 |
| BR-005 评估系统 | Assessment.tsx | 随机抽题+自动评分 |
| BR-006 工具推荐 | ToolRecom.tsx | 按阶段角色过滤 |

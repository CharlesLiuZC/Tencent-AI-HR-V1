# 部署规格

## 本地

Vite middleware 读取 `DEEPSEEK_API_KEY`，前端调用 `/api/deepseek`。

## Vercel

仓库中的 `api/deepseek.js` 作为 Serverless Function。平台环境变量：

```text
DEEPSEEK_API_KEY=...
```

同站部署时前端继续调用 `/api/deepseek`。

## GitHub Pages + 独立 API

Pages 只托管前端。将 `api/deepseek.js` 部署至 Vercel 或等价平台，构建时设置：

```text
VITE_API_BASE=https://api.example.com/api
```

禁止把 API Key 写入 `VITE_*`、浏览器存储或前端 bundle。

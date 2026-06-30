import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function createDeepSeekMiddleware(apiKey: string): Connect.NextHandleFunction {
  return async (req, res) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.end('Method not allowed')
      return
    }

    try {
      const chunks: Buffer[] = []
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      }

      const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ ...payload, model: 'deepseek-v4-pro' }),
      })

      res.statusCode = response.status
      res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json')
      res.end(Buffer.from(await response.arrayBuffer()))
    } catch (error) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        error: 'DeepSeek proxy request failed',
        detail: error instanceof Error ? error.message : 'Unknown error',
      }))
    }
  }
}

function deepSeekProxy(): Plugin {
  let apiKey = ''

  return {
    name: 'deepseek-local-proxy',
    configResolved(config) {
      apiKey = loadEnv(config.mode, config.root, '').DEEPSEEK_API_KEY || ''
    },
    configureServer(server) {
      server.middlewares.use('/api/deepseek', createDeepSeekMiddleware(apiKey))
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/deepseek', createDeepSeekMiddleware(apiKey))
    },
  }
}

export default defineConfig({
  plugins: [react(), deepSeekProxy()],
  base: '/Tencent-AI-HR-V1/',
})

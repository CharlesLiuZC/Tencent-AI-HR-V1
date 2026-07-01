export async function runAgent(request, response, systemPrompt) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    response.status(503).json({ error: 'DEEPSEEK_API_KEY is not configured' });
    return;
  }
  try {
    const messages = Array.isArray(request.body?.messages)
      ? request.body.messages
      : [{ role: 'user', content: JSON.stringify(request.body || {}) }];
    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'deepseek-v4-pro',
        thinking: { type: 'disabled' },
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: false,
        max_tokens: 1800,
        temperature: 0.45,
      }),
    });
    const payload = await upstream.text();
    response.status(upstream.status);
    response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    response.send(payload);
  } catch (error) {
    response.status(502).json({ error: 'Agent request failed', detail: error instanceof Error ? error.message : 'Unknown error' });
  }
}

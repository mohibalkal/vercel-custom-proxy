export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*',
        'Referer': 'https://megacloud.store/',
        'Origin': 'https://megacloud.store/',
        'Accept-Language': 'en-US,en;q=0.9',
        // إن احتجت يمكن إضافة 'Cookie': 'key=value'
      }
    });

    const data = await response.arrayBuffer();

    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}

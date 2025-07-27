export default async function handler(req, res) {
  const { url, referer, origin } = req.query;

  if (!url) return res.status(400).send("Missing 'url' parameter");

  try {
    const decodedUrl = decodeURIComponent(url);

    const response = await fetch(decodedUrl, {
      headers: {
        "referer": referer || "https://megacloud.store",
        "origin": origin || "https://megacloud.store",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "accept": "*/*",
      }
    });

    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType || "application/octet-stream");
    res.status(response.status).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}

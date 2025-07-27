export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const decodedUrl = decodeURIComponent(url);

    const response = await fetch(decodedUrl, {
      headers: {
        "referer": "phoenix.server",
        "origin": "phoenix.server"
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

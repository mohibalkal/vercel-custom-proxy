export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) return res.status(400).send("Missing URL");

  const headers = {
    "user-agent": req.headers["user-agent"] || "Mozilla/5.0",
    "referer": req.query.referer || "https://megacloud.store",
    "origin": req.query.origin || "https://megacloud.store",
    "accept": "*/*",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.arrayBuffer();
    res.status(response.status);
    res.setHeader("content-type", response.headers.get("content-type") || "application/octet-stream");
    res.send(Buffer.from(data));
  } catch (e) {
    res.status(500).send("Fetch error: " + e.message);
  }
}

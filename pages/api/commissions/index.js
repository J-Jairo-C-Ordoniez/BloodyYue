import { mCommissions } from "@/models/commissions";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await mCommissions.getAll();
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const body = req.body || {};
      const { title, type, details, url_example, price } = body;
      if (!title || !type) {
        return res.status(400).json({ error: "title and type are required" });
      }
      const created = await mCommissions.create({ title, type, details, url_example, price });
      return res.status(201).json(created);
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}

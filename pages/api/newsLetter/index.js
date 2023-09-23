export default function handler(req, res) {
  if (req.method === "POST") {
    const { email_sent } = req.body;
    res.status(200).json({ message: "email sauvegardé" });
  }
}

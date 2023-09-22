export default function handler(req, res) {
  if (req.method === "POST") {
    const { email_sent } = req.body;
    console.log("req.query.body = ", email_sent);
    res.status(200).json({ message: "email sauvegardé" });
  }
}

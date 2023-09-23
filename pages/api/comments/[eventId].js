let dummy_data = [
  { id: 1, comment: "First comment for e1", eventId: "e1", owner: "Francy" },
  { id: 2, comment: "Second comment for e1", eventId: "e1", owner: "Max" },
  { id: 3, comment: "First comment for e2", eventId: "e2", owner: "Orion" },
  { id: 4, comment: "Second comment for e2", eventId: "e2", owner: "Corrie" },
  { id: 3, comment: "First comment for e3", eventId: "e3", owner: "Nofie" },
  {
    id: 4,
    comment: "Second comment for e3",
    eventId: "e3",
    owner: "Saintrick",
  },
];
export default function handler(req, res) {
  if (req.method === "POST") {
    const eventId = req.query.eventId;
    const { email, name, text } = req.body.commentData;

    res.status(200).json({ message: "email sauvegardé" });
  }
  if (req.method === "GET") {
    const eventId = req.query.eventId;
    let eventComments = dummy_data.filter(
      (element) => element.eventId === eventId
    );
    res
      .status(200)
      .json({ message: "event comments fetched", data: eventComments });
  }
}

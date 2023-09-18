import axios from "axios";

export async function getAllEventsFromFirebase() {
  let transformData = [];

  try {
    let response = await axios.get(
      "https://next-prerendering-b9ecc-default-rtdb.firebaseio.com/events.json"
    );
    for (const eventId in response.data) {
      const event = response.data[eventId];
      transformData.push({
        id: eventId,
        ...event,
      });
    }
    return transformData;
  } catch (error) {
    return null;
  }
}

export function getFeaturedEvents(allEvents) {
  const featuredEvents = allEvents.filter((event) => event.isFeatured);
  return featuredEvents;
}
export async function getEventById(eventId) {
  console.log(eventId);
  const allEvents = await getAllEventsFromFirebase();
  return allEvents.find((event) => event.id === eventId);
}
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  let allEvents = await getAllEventsFromFirebase();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

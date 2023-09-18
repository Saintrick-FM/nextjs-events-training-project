// import { useRouter } from "next/router";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import { getAllEventsFromFirebase, getEventById } from "@/helpers/api-utils";

function SingleEventPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventId;

  const event = props.event;
  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default SingleEventPage;

export async function getStaticProps(context) {
  const event = await getEventById(context.params.eventId);
  console.log("eventById = ", event);
  return {
    props: {
      event,
    },
  };
}
export async function getStaticPaths() {
  const allEvents = await getAllEventsFromFirebase();
  let paths = [];
  // Here I am prerendering all the pages by targeting each eventId
  allEvents.forEach((event) => {
    paths.push({
      params: {
        eventId: event.id,
      },
    });
  });

  return {
    paths,
    fallback: false, // false or "blocking" setting to "false" means I pregenerated all the possibles event pages, but setting "true" means there are other dynamic pages that will be generated in the react component.
  };
}

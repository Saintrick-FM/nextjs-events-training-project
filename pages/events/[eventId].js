// import { useRouter } from "next/router";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import {
  getAllEventsFromFirebase,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/api-utils";
import Comments from "@/components/input/comments";

function SingleEventPage(props) {
  const event = props.event;
  if (!event) {
    return <div className="center">Loading...</div>;
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
      <Comments event={event.id} />
    </>
  );
}

export default SingleEventPage;

export async function getStaticProps(context) {
  const event = await getEventById(context.params.eventId);
  if (!event) {
    return {
      notFound: true, //or we we can redirect to a custom error page by defining an object ,
      //redirect:{destination: "/error"}
    };
  }
  return {
    props: {
      event,
    },
  };
}
export async function getStaticPaths() {
  const allEvents = await getAllEventsFromFirebase();
  const featuredEvents = await getFeaturedEvents(allEvents);
  let paths = [];
  // Here I am prerendering all the pages by targeting each eventId
  featuredEvents.forEach((event) => {
    paths.push({
      params: {
        eventId: event.id,
      },
    });
  });

  return {
    paths,
    fallback: true, // false or "blocking" setting to "false" means I pregenerated all the possibles event pages, but setting "true" means there are other dynamic pages that will be generated in the react component. Setting "blocking means that next will not generate anyting until we'll done generating this page",
    // notFound:,
    // redirect
  };
}

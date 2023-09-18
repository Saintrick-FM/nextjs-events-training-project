import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
// import { getFilteredEvents } from "@/dummy-data";
import { getFilteredEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import { Fragment } from "react";

function AnyOtherEvent(props) {
  // const router = useRouter();
  // const filterData = router.query.slug;
  if (props.loading) {
    return <p className="center">Loading...</p>;
  }

  if (props.invalidFilter) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (props.error) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filters</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const date = new Date(
    parseInt(props.selectedYear),
    parseInt(props.selectedMonth - 1)
  );
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={props.filredEvents} />
    </>
  );
}

export default AnyOtherEvent;

export async function getServerSideProps(context) {
  const { params } = context;
  let filterData = params.slug;
  if (!filterData) {
    return {
      props: {
        loading: true,
      },
    };
  }
  const selectedYear = +filterData[0]; // +string casts a number written in quotes like "2023" to numbers like 2023
  const selectedMonth = +filterData[1];

  if (
    isNaN(selectedMonth) ||
    isNaN(selectedYear) ||
    selectedYear < 2021 ||
    selectedYear > 2022 ||
    selectedMonth > 12 ||
    selectedMonth < 1
  ) {
    return {
      props: {
        invalidFilter: true,
      },
    };
  }

  const filredEvents = await getFilteredEvents({
    year: selectedYear,
    month: selectedMonth,
  });

  if (!filredEvents || filredEvents.length === 0) {
    return {
      props: {
        error: true,
      },
    };
  }

  return {
    props: {
      filredEvents,
      selectedYear,
      selectedMonth,
    },
  };
}

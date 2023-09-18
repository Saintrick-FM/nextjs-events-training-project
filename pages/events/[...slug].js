import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

function AnyOtherEvent() {
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
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

  const filredEvents = getFilteredEvents({
    year: selectedYear,
    month: selectedMonth,
  });
  if (!filredEvents || filredEvents.length === 0) {
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
  const date = new Date(selectedYear, selectedMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filredEvents} />
    </>
  );
}

export default AnyOtherEvent;

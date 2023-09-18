import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem(props) {
  const { id, location, image, date, title } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("fr-Fr", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAdress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon></DateIcon>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAdress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          {/* <Link href={exploreLink}></Link> */}
          <Button link={exploreLink} children={""}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;

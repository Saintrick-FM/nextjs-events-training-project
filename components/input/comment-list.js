import classes from "./comment-list.module.css";

function CommentList(props) {
  const eventComments = props.items;

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {eventComments &&
        eventComments.length > 0 &&
        eventComments.map((event) => (
          <li>
            <p>{event.comment}</p>
            <div>
              By <address>{event.owner}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;

import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import axios from "axios";

function Comments(props) {
  const eventId = props.event;

  const [showComments, setShowComments] = useState(false);
  const [eventComments, setEventComments] = useState([]);

  const getEventComments = async () => {
    const result = await axios.get(`/api/comments/${eventId}/`);
    let { data } = result.data;
    setEventComments(data);
  };
  useEffect(() => {
    if (showComments === true) {
      getEventComments();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    const result = await axios.post(`/api/comments/${eventId}/`, {
      commentData,
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && eventComments && <CommentList items={eventComments} />}
    </section>
  );
}

export default Comments;

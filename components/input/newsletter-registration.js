import handler from "@/pages/api/newsLetter";
import axios from "axios";
import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  let email_regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  async function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = emailInputRef.current.value.trim();

    // Vérifiez si l'adresse e-mail correspond à la regex
    if (email_regex.test(enteredEmail)) {
      const result = await axios.post("/api/newsLetter/", {
        email_sent: enteredEmail,
      });
      // const result = handler({ email_sent: enteredEmail });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={(e) => registrationHandler(e)}>
        <div className={classes.control}>
          <input
            type="email"
            ref={emailInputRef}
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

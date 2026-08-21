import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="newsletter__inner">
        <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <form onSubmit={handleSubmit} className="newsletter__form">
          <div className="newsletter__input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 6l8 7 8-7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn--light">
            Subscribe to Newsletter
          </button>
        </form>
        {submitted && <p className="newsletter__success">Thanks — you're on the list.</p>}
      </div>
    </section>
  );
}

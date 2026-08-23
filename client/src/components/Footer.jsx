import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="logo logo--light">
            SHOP.CO
          </Link>

          <p>
            We have clothes that suit your style and which you're proud to wear. From women to
            men.
          </p>

          <div className="site-footer__social">
            {/* Twitter / X */}
            <a href="#" className="social-icon social-icon--light" aria-label="Twitter">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.7h1.73L8.47 4.18H6.61L17.8 19.7Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="social-icon social-icon--dark" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14 8h3V4.5c-.52-.07-1.7-.15-3.24-.15-3.2 0-5.39 1.95-5.39 5.54V13H5.13v3.91h3.24V24h3.98v-7.09h3.3l.52-3.91h-3.82V10.3c0-1.13.31-2.3 1.65-2.3Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="social-icon social-icon--light" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>

            {/* GitHub */}
            <a href="#" className="social-icon social-icon--light" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 .7A11.3 11.3 0 0 0 8.43 22.92c.57.1.78-.25.78-.55v-2.1c-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.16-1.48 3.12-1.17 3.12-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.21 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#works">Works</a>
          <a href="#career">Career</a>
        </div>

        <div className="site-footer__col">
          <h4>Help</h4>
          <a href="#support">Customer Support</a>
          <a href="#delivery">Delivery Details</a>
          <a href="#terms">Terms &amp; Conditions</a>
          <a href="#privacy">Privacy Policy</a>
        </div>

        <div className="site-footer__col">
          <h4>FAQ</h4>
          <a href="#account">Account</a>
          <a href="#deliveries">Manage Deliveries</a>
          <a href="#orders">Orders</a>
          <a href="#payments">Payments</a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>SHOP.CO © 2026, All Rights Reserved</span>
      </div>
    </footer>
  );
}
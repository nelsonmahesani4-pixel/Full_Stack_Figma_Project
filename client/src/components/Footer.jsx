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
            {["Twitter", "Facebook", "Instagram", "GitHub"].map((s) => (
              <span key={s} className="social-dot" title={s} />
            ))}
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

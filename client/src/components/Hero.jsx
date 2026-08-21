import { Link } from "react-router-dom";
import BrandMarquee from "./BrandMarquee";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>

          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Link to="/category" className="btn btn--dark">
            Shop Now
          </Link>

          <div className="hero__stats">
            <div>
              <strong>200+</strong>
              <span>International Brands</span>
            </div>

            <div>
              <strong>2,000+</strong>
              <span>High-Quality Products</span>
            </div>

            <div>
              <strong>30,000+</strong>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>
      </div>

      <BrandMarquee />
    </section>
  );
}
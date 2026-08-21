import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import StarRating from "../components/StarRating";

const DRESS_STYLES = [
  { name: "Casual", size: "large" },
  { name: "Formal", size: "small" },
  { name: "Party", size: "small" },
  { name: "Gym", size: "large" },
];

const TESTIMONIALS = [
  { name: "Sarah M.", rating: 5, text: "The quality exceeded my expectations. Fits exactly as described and the fabric feels great." },
  { name: "Alex K.", rating: 5, text: "Fast shipping and the checkered shirt is even better in person. Definitely ordering again." },
  { name: "Priya R.", rating: 4.5, text: "Great range of sizes and the site made it easy to find exactly what I was looking for." },
];

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [arrivals, top] = await Promise.all([
          api.getProducts({ sort: "newest", limit: 4 }),
          api.getProducts({ sort: "rating", limit: 4 }),
        ]);
        if (!cancelled) {
          setNewArrivals(arrivals.items);
          setTopSelling(top.items);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p>
              Browse through our diverse range of meticulously crafted garments, designed to
              bring out your individuality and cater to your sense of style.
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
          <div className="hero__art" aria-hidden="true" />
        </div>
        <div className="hero__brands">
          {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">NEW ARRIVALS</h2>
        <div className="product-grid">
          {loading && <p className="muted">Loading products…</p>}
          {!loading && newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="section__cta">
          <Link to="/category?sort=newest" className="btn btn--outline">
            View All
          </Link>
        </div>
      </section>

      <hr className="divider" />

      <section className="section">
        <h2 className="section__title">TOP SELLING</h2>
        <div className="product-grid">
          {loading && <p className="muted">Loading products…</p>}
          {!loading && topSelling.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="section__cta">
          <Link to="/category?sort=rating" className="btn btn--outline">
            View All
          </Link>
        </div>
      </section>

      <section className="section dress-style">
        <div className="dress-style__panel">
          <h2 className="section__title">BROWSE BY DRESS STYLE</h2>
          <div className="dress-style__grid">
            {DRESS_STYLES.map((style) => (
              <Link
                key={style.name}
                to={`/category?dressStyle=${style.name}`}
                className={`dress-style__card dress-style__card--${style.size}`}
              >
                {style.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">OUR HAPPY CUSTOMERS</h2>
        <div className="testimonials">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <StarRating rating={t.rating} />
              <p className="testimonial-card__name">{t.name}</p>
              <p className="testimonial-card__text">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}

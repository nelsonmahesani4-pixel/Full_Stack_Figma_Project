import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import StarRating from "../components/StarRating";
import TESTIMONIALS from "../components/Testimonials";
import DRESS_STYLES from "../components/BrowsDressStyles";
import Hero from "../components/Hero";
import BrowseStyles from "../components/BrowsDressStyles";
import Customer from "../components/Customer";

<DRESS_STYLES/>
,
<TESTIMONIALS/>

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
    <Hero/>

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

< BrowseStyles/>

<Customer/>

      <Newsletter />
    </>
  );
}

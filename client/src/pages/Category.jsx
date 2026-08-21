import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";

const PRICE_MAX = 400;

export default function Category() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState({ categories: [], dressStyles: [] });
  const [result, setResult] = useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);

  const category = searchParams.get("category") || "";
  const dressStyle = searchParams.get("dressStyle") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    api.getFilters().then(setMeta).catch(console.error);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getProducts({ category, dressStyle, search, sort, page, maxPrice: priceMax, limit: 9 })
      .then((data) => !cancelled && setResult(data))
      .catch(console.error)
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [category, dressStyle, search, sort, page, priceMax]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const goToPage = (n) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", n);
    setSearchParams(next);
  };

  return (
    <div className="category-page">
      <div className="breadcrumb">Home / {category || dressStyle || "Casual"}</div>

      <div className="category-page__layout">
        <aside className="filters">
          <h3>Filters</h3>

          <div className="filters__group">
            <h4>Category</h4>
            <ul>
              {meta.categories.map((c) => (
                <li key={c}>
                  <button
                    className={category === c ? "is-active" : ""}
                    onClick={() => updateParam("category", category === c ? "" : c)}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filters__group">
            <h4>Price</h4>
            <input
              type="range"
              min="50"
              max={PRICE_MAX}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
            />
            <div className="filters__price-value">Up to ${priceMax}</div>
          </div>

          <div className="filters__group">
            <h4>Dress Style</h4>
            <ul>
              {meta.dressStyles.map((d) => (
                <li key={d}>
                  <button
                    className={dressStyle === d ? "is-active" : ""}
                    onClick={() => updateParam("dressStyle", dressStyle === d ? "" : d)}
                  >
                    {d}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="category-page__results">
          <div className="category-page__toolbar">
            <span>
              {loading ? "Loading…" : `Showing ${result.items.length} of ${result.total} products`}
            </span>
            <select value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
              <option value="">Sort by: Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="product-grid">
            {loading && <p className="muted">Loading products…</p>}
            {!loading && result.items.length === 0 && <p className="muted">No products match those filters.</p>}
            {!loading && result.items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {result.totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: result.totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "is-active" : ""}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>

      <Newsletter />
    </div>
  );
}

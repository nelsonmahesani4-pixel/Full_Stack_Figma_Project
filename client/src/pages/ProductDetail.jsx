import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";

function finalPrice(p) {
  return p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.getProduct(id), api.getRelated(id)])
      .then(([p, r]) => {
        if (cancelled) return;
        setProduct(p);
        setColor(p.colors?.[0] || null);
        setSize(p.sizes?.[0] || null);
        setRelated(r);
      })
      .catch(console.error)
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className="page-state">Loading product…</div>;
  if (!product) return <div className="page-state">Product not found.</div>;

  const price = finalPrice(product);

  const handleAddToCart = async () => {
    setStatus("adding");
    try {
      await addItem(product.id, { size, color, quantity });
      setStatus("added");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/category">Shop</Link> /{" "}
        <Link to={`/category?category=${product.category}`}>{product.category}</Link> / {product.name}
      </div>

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image" style={{ background: color || "#eee" }} />
          <div className="product-detail__thumbs">
            {(product.images.length ? product.images : [1, 2, 3]).map((_, i) => (
              <div key={i} className="product-detail__thumb" style={{ background: product.colors[i % product.colors.length] || "#ddd" }} />
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} reviews={product.reviews} />

          <div className="product-detail__price">
            <span>${price}</span>
            {product.discount > 0 && (
              <>
                <s>${product.price}</s>
                <span className="badge badge--discount">-{product.discount}%</span>
              </>
            )}
          </div>

          <p className="product-detail__description">{product.description}</p>
          <hr className="divider" />

          <div className="product-detail__option">
            <h4>Select Colors</h4>
            <div className="swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  aria-label={c}
                  className={`swatch ${color === c ? "is-selected" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="product-detail__option">
            <h4>Choose Size</h4>
            <div className="size-pills">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-pill ${size === s ? "is-selected" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail__actions">
            <div className="qty-stepper">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button className="btn btn--dark btn--grow" onClick={handleAddToCart} disabled={status === "adding"}>
              {status === "adding" ? "Adding…" : status === "added" ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>
          {status === "added" && (
            <button className="link-btn" onClick={() => navigate("/cart")}>
              View cart →
            </button>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <h2 className="section__title">YOU MIGHT ALSO LIKE</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

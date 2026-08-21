import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";

function finalPrice(product) {
  return product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;
}

const fallbackReviews = [
  {
    name: "James K.",
    rating: 5,
    text: "The quality is amazing and the fit is exactly what I expected. Really happy with this purchase.",
    date: "Posted on August 12, 2022",
  },
  {
    name: "Alex M.",
    rating: 5,
    text: "Absolutely love this product. The material feels premium and the design looks even better in person.",
    date: "Posted on August 10, 2022",
  },
  {
    name: "Sarah R.",
    rating: 4,
    text: "Great product with a really nice finish. Shipping was also quick and everything arrived perfectly.",
    date: "Posted on August 8, 2022",
  },
  {
    name: "Olivia R.",
    rating: 5,
    text: "This is one of my favorite purchases recently. Comfortable, stylish and very good quality.",
    date: "Posted on August 5, 2022",
  },
  {
    name: "Liam K.",
    rating: 5,
    text: "Perfect fit and very comfortable. The color looks exactly like the pictures shown on the website.",
    date: "Posted on August 3, 2022",
  },
  {
    name: "Mark W.",
    rating: 5,
    text: "Really impressed with the quality. Would definitely recommend it to anyone looking for something similar.",
    date: "Posted on August 1, 2022",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");
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
        setRelated(r || []);
        setActiveImage(0);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="product-page-state">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-state">
        Product not found.
      </div>
    );
  }

  const price = finalPrice(product);

  const reviews =
    product.reviewList?.length > 0
      ? product.reviewList
      : fallbackReviews;

  const handleAddToCart = async () => {
    setStatus("adding");

    try {
      await addItem(product.id, {
        size,
        color,
        quantity,
      });

      setStatus("added");

      setTimeout(() => {
        setStatus("idle");
      }, 1500);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="product-detail-page">

      {/* ================= BREADCRUMB ================= */}
      <div className="product-container">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>

          <Link to="/category">Shop</Link>
          <span>/</span>

          <Link
            to={`/category?category=${product.category}`}
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="breadcrumb-current">
            {product.name}
          </span>
        </div>
      </div>

      {/* ================= PRODUCT ================= */}
      <section className="product-container">

        <div className="product-main">

          {/* IMAGE GALLERY */}
          <div className="product-gallery">

            <div className="product-thumbnails">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-thumbnail ${
                    activeImage === index
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className="product-main-image">
              <img
                src={
                  product.images?.[activeImage] ||
                  product.images?.[0]
                }
                alt={product.name}
              />
            </div>

          </div>

          {/* PRODUCT INFO */}
          <div className="product-info">

            <h1 className="product-title">
              {product.name}
            </h1>

            <div className="product-rating-row">
              <StarRating
                rating={product.rating}
                reviews={product.reviews}
              />
            </div>

            {/* PRICE */}
            <div className="product-price-row">

              <span className="product-current-price">
                ${price}
              </span>

              {product.discount > 0 && (
                <>
                  <span className="product-old-price">
                    ${product.price}
                  </span>

                  <span className="product-discount">
                    -{product.discount}%
                  </span>
                </>
              )}

            </div>

            <p className="product-description">
              {product.description}
            </p>

            <div className="product-divider" />

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div className="product-option">

                <h3>Select Color</h3>

                <div className="color-swatches">
                  {product.colors.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-label={item}
                      title={item}
                      className={`color-swatch ${
                        color === item ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: item,
                      }}
                      onClick={() => setColor(item)}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* SIZE */}
            {product.sizes?.length > 0 && (
              <div className="product-option">

                <div className="size-heading">
                  <h3>Choose Size</h3>

                  <button type="button">
                    Size Guide
                  </button>
                </div>

                <div className="size-buttons">
                  {product.sizes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`size-button ${
                        size === item ? "selected" : ""
                      }`}
                      onClick={() => setSize(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

              </div>
            )}

            {/* ACTIONS */}
            <div className="product-actions">

              <div className="quantity-control">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>

              <button
                type="button"
                className="add-cart-button"
                onClick={handleAddToCart}
                disabled={status === "adding"}
              >
                {status === "adding"
                  ? "Adding..."
                  : status === "added"
                  ? "Added to Cart ✓"
                  : "Add to Cart"}
              </button>

            </div>

            {status === "added" && (
              <button
                type="button"
                className="view-cart-button"
                onClick={() => navigate("/cart")}
              >
                View cart →
              </button>
            )}

            {status === "error" && (
              <p className="cart-error">
                Something went wrong. Please try again.
              </p>
            )}

          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <section className="product-container">

        <div className="product-tabs">

          <button
            type="button"
            className={
              activeTab === "details"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>

          <button
            type="button"
            className={
              activeTab === "reviews"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </button>

          <button
            type="button"
            className={
              activeTab === "faq"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("faq")}
          >
            FAQs
          </button>

        </div>

        {/* DETAILS */}
        {activeTab === "details" && (
          <div className="tab-content product-details-content">

            <h2>Product Details</h2>

            <p>
              {product.description}
            </p>

            <div className="details-list">

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Available Sizes</span>
                <strong>
                  {product.sizes?.join(", ")}
                </strong>
              </div>

              <div>
                <span>Available Colors</span>
                <strong>
                  {product.colors?.join(", ")}
                </strong>
              </div>

            </div>

          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div className="reviews-section">

            <div className="reviews-header">

              <h2>
                All Reviews{" "}
                <span>
                  ({product.reviews || reviews.length})
                </span>
              </h2>

              <div className="reviews-actions">

                <button type="button" className="filter-button">
                  ⚙
                </button>

                <button type="button" className="latest-button">
                  Latest
                </button>

                <button type="button" className="write-review-button">
                  Write a Review
                </button>

              </div>

            </div>

            <div className="reviews-grid">

              {reviews.map((review, index) => (
                <article
                  className="review-card"
                  key={index}
                >

                  <div className="review-top">

                    <div className="review-stars">
                      {"★".repeat(review.rating || 5)}
                      {"☆".repeat(
                        5 - (review.rating || 5)
                      )}
                    </div>

                    <button
                      type="button"
                      className="review-menu"
                    >
                      ...
                    </button>

                  </div>

                  <div className="review-name">
                    {review.name || "Verified Customer"}
                    <span>✓</span>
                  </div>

                  <p>
                    {review.text || review.comment}
                  </p>

                  <small>
                    {review.date ||
                      "Posted recently"}
                  </small>

                </article>
              ))}

            </div>

            <button
              type="button"
              className="load-more-reviews"
            >
              Load More Reviews
            </button>

          </div>
        )}

        {/* FAQ */}
        {activeTab === "faq" && (
          <div className="tab-content faq-content">

            <div className="faq-item">
              <h3>
                Is this product available in all sizes?
              </h3>

              <p>
                Yes, the available sizes are displayed
                above and depend on current stock.
              </p>
            </div>

            <div className="faq-item">
              <h3>
                Can I return this product?
              </h3>

              <p>
                Please check the store return policy
                for complete information.
              </p>
            </div>

            <div className="faq-item">
              <h3>
                How long does delivery take?
              </h3>

              <p>
                Delivery time depends on your location
                and shipping method.
              </p>
            </div>

          </div>
        )}

      </section>

      {/* ================= RELATED ================= */}
      {related.length > 0 && (
        <section className="product-container related-section">

          <h2 className="related-title">
            YOU MIGHT ALSO LIKE
          </h2>

          <div className="related-grid">

            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}
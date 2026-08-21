import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function finalPrice(p) {
  return p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
}

export default function ProductCard({ product }) {
  const price = finalPrice(product);

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image">
        <span className="product-card__placeholder" style={{ background: product.colors?.[0] || "#e5e5e5" }} />
        {product.discount > 0 && <span className="badge badge--discount">-{product.discount}%</span>}
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <StarRating rating={product.rating} reviews={product.reviews} />
      <div className="product-card__price">
        <span>${price}</span>
        {product.discount > 0 && <s className="product-card__price-was">${product.price}</s>}
      </div>
    </Link>
  );
}

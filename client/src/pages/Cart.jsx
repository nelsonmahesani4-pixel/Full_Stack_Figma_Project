import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, loading, updateItem, removeItem } = useCart();
  const deliveryFee = cart.items.length ? 15 : 0;
  const total = cart.subtotal + deliveryFee;

  if (loading) return <div className="page-state">Loading cart…</div>;

  return (
    <div className="cart-page">
      <div className="breadcrumb">Home / Cart</div>
      <h1 className="page-title">YOUR CART</h1>

      {cart.items.length === 0 ? (
        <div className="page-state">
          Your cart is empty. <Link to="/category">Start shopping →</Link>
        </div>
      ) : (
        <div className="cart-page__layout">
          <div className="cart-list">
            {cart.items.map((line) => (
              <div key={`${line.productId}-${line.size}-${line.color}`} className="cart-line">
                <div className="cart-line__image" style={{ background: line.color || "#eee" }} />
                <div className="cart-line__info">
                  <div className="cart-line__top">
                    <div>
                      <h3>{line.product?.name || "Product"}</h3>
                      <p className="muted">
                        Size: {line.size} {line.color && <span className="cart-line__color" style={{ background: line.color }} />}
                      </p>
                    </div>
                    <button
                      className="icon-btn"
                      aria-label="Remove item"
                      onClick={() => removeItem(line.productId, { size: line.size, color: line.color })}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="cart-line__bottom">
                    <strong>${line.lineTotal}</strong>
                    <div className="qty-stepper qty-stepper--sm">
                      <button
                        onClick={() =>
                          updateItem(line.productId, {
                            size: line.size,
                            color: line.color,
                            quantity: Math.max(1, line.quantity - 1),
                          })
                        }
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        onClick={() =>
                          updateItem(line.productId, {
                            size: line.size,
                            color: line.color,
                            quantity: line.quantity + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-summary__row">
              <span>Subtotal</span>
              <span>${cart.subtotal}</span>
            </div>
            <div className="order-summary__row">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>
            <hr className="divider" />
            <div className="order-summary__row order-summary__row--total">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="btn btn--dark btn--full">Go to Checkout →</button>
          </div>
        </div>
      )}
    </div>
  );
}

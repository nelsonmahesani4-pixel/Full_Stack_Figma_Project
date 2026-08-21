import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();

  const deliveryFee = cart.items?.length ? 15 : 0;
  const total = cart.subtotal + deliveryFee;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-grid">

          {/* Customer Details */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              Delivery Information
            </h2>

            <div className="checkout-form">
              <input
                type="text"
                placeholder="Full Name"
                className="checkout-input"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="checkout-input"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="checkout-input"
              />

              <textarea
                placeholder="Delivery Address"
                rows="4"
                className="checkout-input checkout-textarea"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              Order Summary
            </h2>

            <div className="checkout-items">
              {cart.items?.map((item) => (
                <div
                  key={item.id}
                  className="checkout-item"
                >
                  <span className="checkout-item-name">
                    {item.name} × {item.quantity}
                  </span>

                  <span className="checkout-item-price">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-summary">

              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>${cart.subtotal}</span>
              </div>

              <div className="checkout-summary-row">
                <span>Delivery</span>
                <span>${deliveryFee}</span>
              </div>

              <div className="checkout-total">
                <span>Total</span>
                <span>${total}</span>
              </div>

            </div>

            <button className="place-order-btn">
              Place Order
            </button>

            <Link
              to="/cart"
              className="back-cart-link"
            >
              ← Back to Cart
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
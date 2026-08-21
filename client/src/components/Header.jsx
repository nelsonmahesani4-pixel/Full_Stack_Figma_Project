import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/category?search=${encodeURIComponent(search)}`);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="promo-bar">
        Sign up and get 20% off your first order.{" "}
        <Link to="/category">Sign Up Now</Link>
      </div>

      <div className="site-header__inner">
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="logo">
          SHOP.CO
        </Link>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          <Link to="/category?dressStyle=Casual" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/category?category=T-shirts" onClick={() => setMenuOpen(false)}>
            On Sale
          </Link>
          <Link to="/category" onClick={() => setMenuOpen(false)}>
            New Arrivals
          </Link>
          <Link to="/category" onClick={() => setMenuOpen(false)}>
            Brands
          </Link>

          <form className="main-nav__search" onSubmit={handleSearch}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M21 21l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </nav>

        <div className="site-header__icons">
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6h15l-1.5 9h-12z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M6 6L4 3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="20" r="1.3" fill="currentColor" />
              <circle cx="18" cy="20" r="1.3" fill="currentColor" />
            </svg>
            {cart.itemCount > 0 && <span className="cart-icon__badge">{cart.itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

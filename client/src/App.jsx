import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div className="page-state">Page not found.</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

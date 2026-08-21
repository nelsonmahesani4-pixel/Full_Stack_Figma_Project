import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = async (productId, { size, color, quantity = 1 }) => {
    const data = await api.addToCart({ productId, size, color, quantity });
    setCart(data);
  };

  const updateItem = async (productId, { size, color, quantity }) => {
    const data = await api.updateCartLine(productId, { size, color, quantity });
    setCart(data);
  };

  const removeItem = async (productId, { size, color }) => {
    const data = await api.removeCartLine(productId, { size, color });
    setCart(data);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}

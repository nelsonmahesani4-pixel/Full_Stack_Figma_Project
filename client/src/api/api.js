
const BASE_URL = import.meta.env.VITE_API_URL || "/api";
function getCartId() {
  let id = localStorage.getItem("shopco-cart-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("shopco-cart-id", id);
  }
  return id;
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-cart-id": getCartId(),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""))
    ).toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },
  getProduct: (id) => request(`/products/${id}`),
  getRelated: (id) => request(`/products/${id}/related`),
  getFilters: () => request(`/products/meta/categories`),

  getCart: () => request(`/cart`),
  addToCart: (line) => request(`/cart`, { method: "POST", body: JSON.stringify(line) }),
  updateCartLine: (productId, line) =>
    request(`/cart/${productId}`, { method: "PATCH", body: JSON.stringify(line) }),
  removeCartLine: (productId, line) =>
    request(`/cart/${productId}`, { method: "DELETE", body: JSON.stringify(line) }),
};

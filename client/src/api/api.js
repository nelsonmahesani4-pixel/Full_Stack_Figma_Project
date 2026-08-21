const BASE_URL = import.meta.env.VITE_API_URL || "/api";

function getCartId() {
  let id = localStorage.getItem("cart-id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("cart-id", id);
  }

  return id;
}

async function request(url, options = {}) {
  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-cart-id": getCartId(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}

export const api = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();

    return request(`/products${query ? `?${query}` : ""}`);
  },

  getProduct: (id) => request(`/products/${id}`),

  getRelated: (id) => request(`/products/${id}/related`),

  getFilters: () => request("/products/meta/categories"),

  getCart: () => request("/cart"),

  addToCart: (product) =>
    request("/cart", {
      method: "POST",
      body: JSON.stringify(product),
    }),

  updateCartLine: (id, data) =>
    request(`/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  removeCartLine: (id) =>
    request(`/cart/${id}`, {
      method: "DELETE",
    }),
};
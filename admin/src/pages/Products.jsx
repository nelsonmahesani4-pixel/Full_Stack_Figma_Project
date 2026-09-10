import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    dressStyle: "",
    price: "",
    discount: 0,
    rating: 0,
    reviews: 0,
    colors: "",
    sizes: "",
    description: "",
    images: "",
  });
// =========================
  // GET PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : data.items || []);
    } catch (error) {
      console.error("Products error:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadProducts = async () => {
    await fetchProducts();
  };

  loadProducts();
}, []);

  
  // =========================
  // GET TOKEN
  // =========================
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken") ||
      localStorage.getItem("authToken")
    );
  };

  // =========================
  // FORM INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD PRODUCT BUTTON
  // =========================
  const handleAdd = () => {
    setEditingProduct(null);

    setForm({
      name: "",
      category: "",
      dressStyle: "",
      price: "",
      discount: 0,
      rating: 0,
      reviews: 0,
      colors: "",
      sizes: "",
      description: "",
      images: "",
    });

    setShowForm(true);
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      category: product.category || "",
      dressStyle: product.dressStyle || "",
      price: product.price ?? "",
      discount: product.discount ?? 0,
      rating: product.rating ?? 0,
      reviews: product.reviews ?? 0,
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : "",
      description: product.description || "",
      images: Array.isArray(product.images) ? product.images.join(", ") : "",
    });

    setShowForm(true);
  };

  // =========================
  // SAVE PRODUCT
  // ADD + EDIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      alert("Admin login token not found. Please login again.");
      return;
    }

    if (!form.name || !form.category || !form.dressStyle || !form.price) {
      alert("Please fill all required fields.");
      return;
    }

    const productData = {
      name: form.name,
      category: form.category,
      dressStyle: form.dressStyle,
      price: Number(form.price),
      discount: Number(form.discount) || 0,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,

      colors: form.colors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      sizes: form.sizes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      description: form.description,

      images: form.images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      setSaving(true);

      const isEditing = Boolean(editingProduct);

      const url = isEditing ? `${API_URL}/${editingProduct.id}` : API_URL;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      alert(
        isEditing
          ? "Product updated successfully!"
          : "Product added successfully!",
      );

      setShowForm(false);
      setEditingProduct(null);

      await fetchProducts();
    } catch (error) {
      console.error("Save product error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      alert("Admin login token not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      alert("Product deleted successfully!");

      await fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);
      alert(error.message);
    }
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>

          <p className="text-gray-500 mt-1">Manage your store products.</p>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          + Add Product
        </button>
      </div>

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="bg-white border rounded-xl p-5 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <button
              onClick={closeForm}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. T-shirts"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Dress Style */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dress Style *
                </label>

                <input
                  type="text"
                  name="dressStyle"
                  value={form.dressStyle}
                  onChange={handleChange}
                  placeholder="e.g. Casual"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price *
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="100"
                  min="0"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount (%)
                </label>

                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>

                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Reviews */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Reviews
                </label>

                <input
                  type="number"
                  name="reviews"
                  value={form.reviews}
                  onChange={handleChange}
                  min="0"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium mb-1">Colors</label>

                <input
                  type="text"
                  name="colors"
                  value={form.colors}
                  onChange={handleChange}
                  placeholder="Black, White, Blue"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Separate colors with commas.
                </p>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium mb-1">Sizes</label>

                <input
                  type="text"
                  name="sizes"
                  value={form.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Separate sizes with commas.
                </p>
              </div>

              {/* Images */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Image URLs
                </label>

                <input
                  type="text"
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple image URLs with commas.
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description..."
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingProduct
                    ? "Update Product"
                    : "Create Product"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="px-6 py-3 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= PRODUCTS TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm">Product</th>

                  <th className="text-left p-4 text-sm">Category</th>

                  <th className="text-left p-4 text-sm">Price</th>

                  <th className="text-left p-4 text-sm">Discount</th>

                  <th className="text-left p-4 text-sm">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id || product.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-4">
                      <div className="font-medium">{product.name}</div>
                    </td>

                    <td className="p-4 text-gray-600">
                      {product.category || "—"}
                    </td>

                    <td className="p-4">${product.price || 0}</td>

                    <td className="p-4">{product.discount || 0}%</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:underline mr-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

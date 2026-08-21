const products = [
  {
    id: 1,
    name: "T-shirts with Tape Details",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 145,
    discount: 0,
    rating: 3.5,
    reviews: 45,
    colors: ["#2B2B2B", "#5B5B5B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Simple casual T-shirt with a clean design.",
   images: ["/Images/product2.png"],
  },

  {
    id: 2,
    name: "Skinny Fit Jeans",
    category: "Jeans",
    dressStyle: "Casual",
    price: 240,
    discount: 20,
    rating: 3.5,
    reviews: 78,
    colors: ["#2B3A55", "#000000"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Comfortable skinny fit jeans for everyday wear.",
    images: ["/Images/product2.png"],
  },

  {
    id: 3,
    name: "Checkered Shirt",
    category: "Shirts",
    dressStyle: "Casual",
    price: 180,
    discount: 0,
    rating: 4.5,
    reviews: 54,
    colors: ["#7A1F2B", "#1F2B4D"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Classic checkered shirt with a comfortable fit.",
    images: ["/Images/product3.png"],
  },

  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 130,
    discount: 0,
    rating: 4.5,
    reviews: 42,
    colors: ["#D97757", "#2B2B2B"],
    sizes: ["Small", "Medium", "Large"],
    description: "Casual T-shirt with stylish striped sleeves.",
    images: ["/Images/product4.png"],
  },

  {
    id: 5,
    name: "Vertical Striped Shirt",
    category: "Shirts",
    dressStyle: "Formal",
    price: 212,
    discount: 20,
    rating: 5,
    reviews: 66,
    colors: ["#1F1F1F", "#E7E2D6"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Formal striped shirt with a smart and clean look.",
    images: ["/Images/product1.png"],
  },

  {
    id: 6,
    name: "Courage Graphic T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 145,
    discount: 0,
    rating: 4,
    reviews: 38,
    colors: ["#E1CD00"],
    sizes: ["Small", "Medium", "Large"],
    description: "Comfortable graphic T-shirt for casual outfits.",
   images: ["/Images/product2.png"],
  },

  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    category: "Shorts",
    dressStyle: "Casual",
    price: 80,
    discount: 0,
    rating: 3,
    reviews: 21,
    colors: ["#8FA3B0"],
    sizes: ["Small", "Medium", "Large"],
    description: "Relaxed fit shorts with a comfortable design.",
   images: ["/Images/product3.png"],
  },

  {
    id: 8,
    name: "One Life Graphic T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 260,
    discount: 40,
    rating: 4.5,
    reviews: 88,
    colors: ["#4A4A2E", "#2B2B2B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Stylish graphic T-shirt with a relaxed fit.",
    images: ["/Images/product4.png"],
  },

  {
    id: 9,
    name: "Faded Skinny Jeans",
    category: "Jeans",
    dressStyle: "Casual",
    price: 210,
    discount: 0,
    rating: 4,
    reviews: 33,
    colors: ["#7A8CA3"],
    sizes: ["28", "30", "32", "34"],
    description: "Faded skinny jeans with a comfortable stretch fit.",
   images: ["/Images/product1.png"],
  },

  {
    id: 10,
    name: "Classic Blazer",
    category: "Jackets",
    dressStyle: "Formal",
    price: 340,
    discount: 10,
    rating: 4.5,
    reviews: 27,
    colors: ["#1F1F1F", "#3C3C3C"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Classic formal blazer for a smart outfit.",
    images: ["/Images/product2.png"],
  },

  {
    id: 11,
    name: "Performance Track Jacket",
    category: "Jackets",
    dressStyle: "Gym",
    price: 165,
    discount: 0,
    rating: 4,
    reviews: 19,
    colors: ["#2B2B2B", "#D97757"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Lightweight jacket suitable for gym and sports.",
   images: ["/Images/product3.png"],
  },

  {
    id: 12,
    name: "Satin Party Shirt",
    category: "Shirts",
    dressStyle: "Party",
    price: 195,
    discount: 0,
    rating: 4.5,
    reviews: 24,
    colors: ["#5B1F3A", "#000000"],
    sizes: ["Small", "Medium", "Large"],
    description: "Stylish satin shirt for parties and special occasions.",
  images: ["/Images/product12.png"],
  },

  {
    id: 13,
    name: "Tapered Training Joggers",
    category: "Pants",
    dressStyle: "Gym",
    price: 110,
    discount: 15,
    rating: 4,
    reviews: 41,
    colors: ["#2B2B2B", "#5B5B5B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Comfortable joggers for training and everyday use.",
    images: ["/Images/product13.png"],
  },

  {
    id: 14,
    name: "Polo with Tipping Details",
    category: "Polos",
    dressStyle: "Casual",
    price: 180,
    discount: 0,
    rating: 4.5,
    reviews: 30,
    colors: ["#E1CD00", "#2B2B2B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Classic polo shirt with a simple stylish design.",
    images: ["/Images/product14.png"],
  },

  {
    id: 15,
    name: "Black Striped T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 120,
    discount: 30,
    rating: 5,
    reviews: 120,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large"],
    description: "Classic black striped T-shirt for casual wear.",
  images: ["/Images/product15.png"],
  },
];

let nextId = products.length + 1;

function listProducts({
  category,
  dressStyle,
  search,
  minPrice,
  maxPrice,
  sort,
  page = 1,
  limit = 12,
} = {}) {
  let result = [...products];

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  if (dressStyle) {
    result = result.filter(
      (p) => p.dressStyle.toLowerCase() === String(dressStyle).toLowerCase()
    );
  }

  if (search) {
    const q = String(search).toLowerCase();

    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    result = result.filter(
      (p) => finalPrice(p) >= Number(minPrice)
    );
  }

  if (maxPrice) {
    result = result.filter(
      (p) => finalPrice(p) <= Number(maxPrice)
    );
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => finalPrice(a) - finalPrice(b));
      break;

    case "price-desc":
      result.sort((a, b) => finalPrice(b) - finalPrice(a));
      break;

    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;

    case "newest":
      result.sort((a, b) => b.id - a.id);
      break;
  }

  const total = result.length;
  const start = (Number(page) - 1) * Number(limit);

  const paged = result.slice(start, start + Number(limit));

  return {
    items: paged,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
}

function finalPrice(p) {
  return p.discount
    ? Math.round(p.price * (1 - p.discount / 100))
    : p.price;
}

function getProduct(id) {
  return products.find((p) => p.id === Number(id));
}

function getRelated(id, count = 4) {
  const product = getProduct(id);

  if (!product) return [];

  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.dressStyle === product.dressStyle)
    )
    .slice(0, count);
}

function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

function getDressStyles() {
  return [...new Set(products.map((p) => p.dressStyle))];
}

function createProduct(data) {
  const product = {
    id: nextId++,
    discount: 0,
    rating: 0,
    reviews: 0,
    images: [],
    ...data,
  };

  products.push(product);

  return product;
}

module.exports = {
  products,
  listProducts,
  getProduct,
  getRelated,
  getCategories,
  getDressStyles,
  createProduct,
  finalPrice,
};
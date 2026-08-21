// In a real app this would live in a database (Postgres/Mongo/etc).
// Keeping it in-memory here keeps the sample self-contained, but every
// product read in the app goes through the Express API below —
// nothing is hard-coded on the client.

const products = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 145,
    discount: 0,
    rating: 3.5,
    reviews: 45,
    colors: ["#2B2B2B", "#5B5B5B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "A relaxed-fit tee in soft combed cotton with a faded gradient graphic across the chest. Pre-shrunk and garment-washed for a lived-in feel from the first wear.",
    images: ["/images/products/p1-1.svg", "/images/products/p1-2.svg"],
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    category: "Polos",
    dressStyle: "Casual",
    price: 180,
    discount: 0,
    rating: 4.5,
    reviews: 30,
    colors: ["#E1CD00", "#2B2B2B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Piqué-knit polo with contrast tipping on the collar and sleeve cuffs. A three-button placket and side vents keep it sharp for warm weather.",
    images: ["/images/products/p2-1.svg"],
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 120,
    discount: 30,
    rating: 5,
    reviews: 120,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large"],
    description:
      "Classic crew-neck tee in a fine black-and-white stripe. Lightweight jersey knit that layers well under a jacket or overshirt.",
    images: ["/images/products/p3-1.svg"],
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    category: "Jeans",
    dressStyle: "Casual",
    price: 240,
    discount: 20,
    rating: 3.5,
    reviews: 78,
    colors: ["#2B3A55", "#000000"],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Stretch-denim skinny jeans with a mid-rise waist and tapered leg. Five-pocket styling with a slight fade at the thigh and knee.",
    images: ["/images/products/p4-1.svg"],
  },
  {
    id: 5,
    name: "Checkered Shirt",
    category: "Shirts",
    dressStyle: "Casual",
    price: 180,
    discount: 0,
    rating: 4.5,
    reviews: 54,
    colors: ["#7A1F2B", "#1F2B4D"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Brushed-cotton flannel shirt in a bold check. Boxy fit, button-down collar, and a single chest pocket for an easy layering piece.",
    images: ["/images/products/p5-1.svg"],
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 130,
    discount: 0,
    rating: 4.5,
    reviews: 42,
    colors: ["#D97757", "#2B2B2B"],
    sizes: ["Small", "Medium", "Large"],
    description:
      "Cotton tee with contrast striped sleeves and a ribbed crew neckline. Regular fit with a soft hand-feel.",
    images: ["/images/products/p6-1.svg"],
  },
  {
    id: 7,
    name: "Vertical Striped Shirt",
    category: "Shirts",
    dressStyle: "Formal",
    price: 212,
    discount: 20,
    rating: 5,
    reviews: 66,
    colors: ["#1F1F1F", "#E7E2D6"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Crisp poplin shirt in a fine vertical stripe. Slim fit through the body with a spread collar — built for the office and beyond.",
    images: ["/images/products/p7-1.svg"],
  },
  {
    id: 8,
    name: "Courage Graphic T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 145,
    discount: 0,
    rating: 4,
    reviews: 38,
    colors: ["#E1CD00"],
    sizes: ["Small", "Medium", "Large"],
    description:
      "Heavyweight cotton tee with a bold front graphic print. Boxy, dropped-shoulder fit for a streetwear silhouette.",
    images: ["/images/products/p8-1.svg"],
  },
  {
    id: 9,
    name: "Loose Fit Bermuda Shorts",
    category: "Shorts",
    dressStyle: "Casual",
    price: 80,
    discount: 0,
    rating: 3,
    reviews: 21,
    colors: ["#8FA3B0"],
    sizes: ["Small", "Medium", "Large"],
    description:
      "Cotton-twill bermuda shorts with a relaxed drop-crotch fit, elastic drawstring waist, and deep side pockets.",
    images: ["/images/products/p9-1.svg"],
  },
  {
    id: 10,
    name: "One Life Graphic T-shirt",
    category: "T-shirts",
    dressStyle: "Casual",
    price: 260,
    discount: 40,
    rating: 4.5,
    reviews: 88,
    colors: ["#4A4A2E", "#2B2B2B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Garment-dyed heavyweight tee with a minimal chest print. Cut for a relaxed, slightly boxy fit.",
    images: ["/images/products/p10-1.svg", "/images/products/p10-2.svg"],
  },
  {
    id: 11,
    name: "Faded Skinny Jeans",
    category: "Jeans",
    dressStyle: "Casual",
    price: 210,
    discount: 0,
    rating: 4,
    reviews: 33,
    colors: ["#7A8CA3"],
    sizes: ["28", "30", "32", "34"],
    description:
      "Sun-faded skinny jeans in stretch denim with whiskering at the hip and knee for a broken-in look straight off the shelf.",
    images: ["/images/products/p11-1.svg"],
  },
  {
    id: 12,
    name: "Classic Blazer",
    category: "Jackets",
    dressStyle: "Formal",
    price: 340,
    discount: 10,
    rating: 4.5,
    reviews: 27,
    colors: ["#1F1F1F", "#3C3C3C"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Tailored two-button blazer in a wool-blend twill. Structured shoulders, notch lapel, and a half-lined interior for year-round wear.",
    images: ["/images/products/p12-1.svg"],
  },
  {
    id: 13,
    name: "Performance Track Jacket",
    category: "Jackets",
    dressStyle: "Gym",
    price: 165,
    discount: 0,
    rating: 4,
    reviews: 19,
    colors: ["#2B2B2B", "#D97757"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Lightweight zip-through track jacket in moisture-wicking fabric with mesh underarm vents and a media pocket.",
    images: ["/images/products/p13-1.svg"],
  },
  {
    id: 14,
    name: "Satin Party Shirt",
    category: "Shirts",
    dressStyle: "Party",
    price: 195,
    discount: 0,
    rating: 4.5,
    reviews: 24,
    colors: ["#5B1F3A", "#000000"],
    sizes: ["Small", "Medium", "Large"],
    description:
      "Fluid satin shirt with a subtle sheen and camp collar. Cut for a relaxed fit that layers well under a blazer.",
    images: ["/images/products/p14-1.svg"],
  },
  {
    id: 15,
    name: "Tapered Training Joggers",
    category: "Pants",
    dressStyle: "Gym",
    price: 110,
    discount: 15,
    rating: 4,
    reviews: 41,
    colors: ["#2B2B2B", "#5B5B5B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description:
      "Tapered joggers in a brushed-back fleece with a tailored ankle cuff, zip pockets, and a flat drawcord waistband.",
    images: ["/images/products/p15-1.svg"],
  },
];

let nextId = products.length + 1;

function listProducts({ category, dressStyle, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = {}) {
  let result = [...products];

  if (category) result = result.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  if (dressStyle) result = result.filter((p) => p.dressStyle.toLowerCase() === String(dressStyle).toLowerCase());
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  if (minPrice) result = result.filter((p) => finalPrice(p) >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => finalPrice(p) <= Number(maxPrice));

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
    default:
      break;
  }

  const total = result.length;
  const start = (Number(page) - 1) * Number(limit);
  const paged = result.slice(start, start + Number(limit));

  return { items: paged, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) };
}

function finalPrice(p) {
  return p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
}

function getProduct(id) {
  return products.find((p) => p.id === Number(id));
}

function getRelated(id, count = 4) {
  const product = getProduct(id);
  if (!product) return [];
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.dressStyle === product.dressStyle))
    .slice(0, count);
}

function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

function getDressStyles() {
  return [...new Set(products.map((p) => p.dressStyle))];
}

function createProduct(data) {
  const product = { id: nextId++, discount: 0, rating: 0, reviews: 0, images: [], ...data };
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


const express = require("express");
const router = express.Router();

const Product = require("../models/Product.js");
const protect = require("../middleware/auth.js");

// Calculate final price
function finalPrice(product) {
  return product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;
}


// 
// GET /api/products
// Public: sab users products dekh sakte hain
// 
router.get("/", async (req, res) => {
  try {
    const {
      category,
      dressStyle,
      search,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    if (dressStyle) {
      filter.dressStyle = new RegExp(`^${dressStyle}$`, "i");
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
      ];
    }

    let products = await Product.find(filter).lean();

    if (minPrice) {
      products = products.filter(
        (p) => finalPrice(p) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      products = products.filter(
        (p) => finalPrice(p) <= Number(maxPrice)
      );
    }

    switch (sort) {
      case "price-asc":
        products.sort(
          (a, b) => finalPrice(a) - finalPrice(b)
        );
        break;

      case "price-desc":
        products.sort(
          (a, b) => finalPrice(b) - finalPrice(a)
        );
        break;

      case "rating":
        products.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "newest":
        products.sort(
          (a, b) => b.id - a.id
        );
        break;

      default:
        break;
    }

    const total = products.length;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const start = (pageNumber - 1) * limitNumber;

    const paged = products.slice(
      start,
      start + limitNumber
    );

    res.json({
      items: paged,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});


// GET /api/products/meta/categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const dressStyles = await Product.distinct("dressStyle");

    res.json({
      categories,
      dressStyles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch categories",
    });
  }
});


// GET /api/products/:id/related
router.get("/:id/related", async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id),
    }).lean();

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const related = await Product.find({
      id: {
        $ne: product.id,
      },
      $or: [
        {
          category: product.category,
        },
        {
          dressStyle: product.dressStyle,
        },
      ],
    })
      .limit(4)
      .lean();

    res.json(related);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch related products",
    });
  }
});


// GET /api/products/:id/   single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id),
    }).lean();

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch product",
    });
  }
});


//  
// POST /api/products
// Protected: sirf logged-in admin
//  
router.post("/", protect, async (req, res) => {
  try {
    const lastProduct = await Product.findOne()
      .sort({ id: -1 })
      .lean();
    const nextId = lastProduct
      ? Number(lastProduct.id) + 1
      : 1;
    const product = await Product.create({
      ...req.body,
      id: nextId,
    });
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create product",
    });
  }
});


// ======================================================
// PUT /api/products/:id
// Protected: sirf logged-in admin
// ======================================================
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        id: Number(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update product",
    });
  }
});


// DELETE /api/products/:id//
//  Protected: sirf logged-in admin//
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete product",
    });
  }
});


module.exports = router;


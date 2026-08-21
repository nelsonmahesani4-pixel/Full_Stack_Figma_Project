# SHOP.CO — Full-Stack E-commerce Demo

A responsive clothing storefront built to match the provided design (Homepage,
Product Detail, Category/Filters, Cart) with all product and cart data served
from a real backend — nothing is hard-coded in the frontend.

## Stack

- **Frontend:** React 18 + React Router, plain CSS (no framework), built with Vite
- **Backend:** Node.js + Express REST API
- **Data:** in-memory product/cart store on the server (swap for a real DB —
  see "Going to production" below)

## Project structure

```
shop-co/
├── server/                 Express API
│   ├── data/products.js    Product catalog + query logic (filter/sort/paginate)
│   ├── routes/products.js  GET /api/products, /api/products/:id, /related, /meta/categories
│   ├── routes/cart.js      GET/POST/PATCH/DELETE /api/cart
│   └── server.js           App entry point
└── client/                 React app (Vite)
    └── src/
        ├── api/api.js           fetch wrapper for the backend
        ├── context/CartContext  cart state, backed by the API
        ├── components/          Header, Footer, ProductCard, Newsletter, StarRating
        └── pages/                Home, Category, ProductDetail, Cart
```

## Running it locally

Requires Node.js 18+.

```bash
# from the shop-co/ root
npm run install:all   # installs server + client dependencies
npm run dev            # starts Express (port 4000) and Vite (port 5173) together
```

Then open **http://localhost:5173**. The Vite dev server proxies `/api/*`
requests to Express automatically (see `client/vite.config.js`), so the React
app never needs to know the backend's host in development.

To run each side separately:

```bash
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:5173
```

## API reference

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | List products. Query params: `category`, `dressStyle`, `search`, `minPrice`, `maxPrice`, `sort` (`newest`\|`price-asc`\|`price-desc`\|`rating`), `page`, `limit` |
| GET | `/api/products/:id` | Single product |
| GET | `/api/products/:id/related` | "You might also like" products |
| GET | `/api/products/meta/categories` | Distinct categories & dress styles, for filter menus |
| POST | `/api/products` | Add a product to the catalog |
| GET | `/api/cart` | Current cart (requires `x-cart-id` header) |
| POST | `/api/cart` | Add a line `{ productId, size, color, quantity }` |
| PATCH | `/api/cart/:productId` | Update quantity for a line |
| DELETE | `/api/cart/:productId` | Remove a line |

The cart is identified by a random `x-cart-id` the client generates once and
stores in `localStorage` — no login required for this demo. Swap it for a
real session/user id once you add authentication.

## Responsiveness

Layout is mobile-first with breakpoints at 1000px / 860px / 720px / 480px:
product grids collapse from 4 → 3 → 2 columns, the nav becomes a slide-in
drawer on mobile, and the category page's filter sidebar stacks above the
results.

## Going to production

- Replace `server/data/products.js` with a real database (Postgres, Mongo,
  etc.) — the route handlers already isolate all data access behind that
  module's functions, so only that file needs to change.
- Replace the in-memory `Map` in `server/routes/cart.js` with a persisted
  cart table keyed by user/session id.
- Set `VITE_API_URL` (see `client/.env.example`) when the API is deployed on
  a different host than the frontend, then run `npm run build:client`.
- Serve `client/dist` from a static host or from Express itself
  (`express.static`).

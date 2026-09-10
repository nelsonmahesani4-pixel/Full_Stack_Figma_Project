import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  MoreHorizontal,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "248",
    change: "+12.5%",
    text: "from last month",
    icon: Package,
    color: "purple",
  },
  {
    title: "Total Users",
    value: "1,248",
    change: "+8.2%",
    text: "from last month",
    icon: Users,
    color: "blue",
  },
  {
    title: "Total Orders",
    value: "356",
    change: "+15.3%",
    text: "from last month",
    icon: ShoppingCart,
    color: "orange",
  },
  {
    title: "Total Revenue",
    value: "$12,580",
    change: "+10.8%",
    text: "from last month",
    icon: DollarSign,
    color: "green",
  },
];

const orders = [
  {
    id: "#ORD-001",
    customer: "Ali Khan",
    product: "Classic T-Shirt",
    amount: "$120.00",
    status: "Delivered",
  },
  {
    id: "#ORD-002",
    customer: "Ahmed Raza",
    product: "Slim Fit Jeans",
    amount: "$85.00",
    status: "Pending",
  },
  {
    id: "#ORD-003",
    customer: "Sara Malik",
    product: "Denim Jacket",
    amount: "$150.00",
    status: "Shipped",
  },
  {
    id: "#ORD-004",
    customer: "Usman Ali",
    product: "Casual Sneakers",
    amount: "$95.00",
    status: "Delivered",
  },
];

const products = [
  { name: "Classic T-Shirt", category: "T-Shirts", price: "$120", stock: 45 },
  { name: "Slim Fit Jeans", category: "Jeans", price: "$85", stock: 28 },
  { name: "Denim Jacket", category: "Jackets", price: "$150", stock: 12 },
  { name: "Casual Sneakers", category: "Shoes", price: "$95", stock: 36 },
];

function StatCard({ title, value, change, text, icon: Icon, color }) {
  const colors = {
    purple: "bg-purple-600 shadow-purple-200",
    blue: "bg-blue-600 shadow-blue-200",
    orange: "bg-orange-500 shadow-orange-200",
    green: "bg-emerald-500 shadow-emerald-200",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg ${colors[color]}`}
    >
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -right-4 h-28 w-28 rounded-full bg-white/5" />

      <div className="relative flex items-center justify-between">
        <div className="rounded-xl bg-white/15 p-3">
          <Icon size={24} />
        </div>

        <MoreHorizontal size={22} className="opacity-70" />
      </div>

      <div className="relative mt-5">
        <p className="text-sm text-white/75">{title}</p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight">
          {value}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">
            <ArrowUpRight size={13} />
            {change}
          </span>

          <span className="text-white/65">{text}</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-emerald-50 text-emerald-600",
    Pending: "bg-orange-50 text-orange-600",
    Shipped: "bg-blue-50 text-blue-600",
  };

  const icons = {
    Delivered: CheckCircle,
    Pending: Clock,
    Shipped: Truck,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] p-5 md:p-7">

      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-purple-600">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Welcome back, Admin 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your store today.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* SALES OVERVIEW */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Sales Overview
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                $12,580
              </h2>

              <p className="mt-1 text-xs text-emerald-500">
                +10.8% from last month
              </p>
            </div>

            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600">
              This Year ▾
            </button>
          </div>

          {/* CHART */}
          <div className="mt-8">
            <div className="relative flex h-64 items-end justify-between gap-2 border-b border-slate-200 px-2">

              {/* GRID LINES */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[12000, 9000, 6000, 3000, 0].map((num) => (
                  <div
                    key={num}
                    className="flex items-center gap-3"
                  >
                    <span className="w-10 text-[10px] text-slate-400">
                      {num === 0 ? "0" : `${num / 1000}k`}
                    </span>

                    <div className="h-px flex-1 bg-slate-100" />
                  </div>
                ))}
              </div>

              {/* BARS */}
              {[35, 55, 42, 70, 48, 85, 62, 78, 52, 92, 68, 80].map(
                (height, index) => (
                  <div
                    key={index}
                    className="relative z-10 flex h-full flex-1 items-end justify-center"
                  >
                    <div
                      className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-purple-600 to-purple-400 transition hover:from-purple-700"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-4 flex justify-between px-8 text-xs text-slate-400">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                (month) => (
                  <span key={month}>{month}</span>
                )
              )}
            </div>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Store Activity
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Recent Orders
              </h2>
            </div>

            <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <ShoppingCart size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {order.customer}
                    </p>

                    <p className="text-xs text-slate-400">
                      {order.id}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">
                    {order.amount}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {order.product}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-medium text-purple-600 transition hover:bg-purple-50">
            View All Orders
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* RECENT PRODUCTS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Inventory
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Recent Products
              </h2>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-purple-600">
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.name}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <Package size={18} />
                        </div>

                        <span className="text-sm font-semibold text-slate-800">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-sm text-slate-500">
                      {product.category}
                    </td>

                    <td className="py-4 text-sm font-semibold text-slate-800">
                      {product.price}
                    </td>

                    <td className="py-4">
                      <span
                        className={`text-sm font-medium ${
                          product.stock < 20
                            ? "text-orange-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Overview
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Order Status
              </h2>
            </div>

            <ShoppingCart className="text-purple-600" size={22} />
          </div>

          <div className="mt-6 space-y-5">

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Delivered</span>
                <span className="font-semibold text-slate-800">68%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[68%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Shipped</span>
                <span className="font-semibold text-slate-800">22%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[22%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Pending</span>
                <span className="font-semibold text-slate-800">10%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[10%] rounded-full bg-orange-500" />
              </div>
            </div>

          </div>

          <div className="mt-7 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 text-center">
            <div>
              <p className="text-xl font-bold text-slate-900">242</p>
              <p className="mt-1 text-xs text-slate-400">Delivered</p>
            </div>

            <div>
              <p className="text-xl font-bold text-slate-900">78</p>
              <p className="mt-1 text-xs text-slate-400">Shipped</p>
            </div>

            <div>
              <p className="text-xl font-bold text-slate-900">36</p>
              <p className="mt-1 text-xs text-slate-400">Pending</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
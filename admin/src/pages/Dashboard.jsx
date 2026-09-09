import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:8000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard");
      }

      const data = await response.json();

      setStats({
        products: data.products || 0,
        orders: data.orders || 0,
        users: data.users || 0,
        revenue: data.revenue || 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: "📦",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: "🛒",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: "👥",
    },
    {
      title: "Revenue",
      value: `$${stats.revenue}`,
      icon: "💰",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to your Shoopo admin dashboard.
        </p>
      </div>

      {loading ? (
        <div className="text-gray-500">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl border p-5 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div className="text-3xl">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white rounded-xl border p-6">
        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <p className="text-gray-500 mt-2">
          Your recent store activity will appear here.
        </p>
      </div>
    </div>
  );
}
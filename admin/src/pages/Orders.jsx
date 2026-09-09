import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:8000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      setOrders(
        Array.isArray(data)
          ? data
          : data.orders || []
      );
    } catch (error) {
      console.error("Orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer orders.
        </p>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left text-sm">
                    Order ID
                  </th>

                  <th className="p-4 text-left text-sm">
                    Customer
                  </th>

                  <th className="p-4 text-left text-sm">
                    Total
                  </th>

                  <th className="p-4 text-left text-sm">
                    Status
                  </th>

                  <th className="p-4 text-left text-sm">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id || order.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-4 font-medium">
                      #{String(order._id || order.id).slice(-8)}
                    </td>

                    <td className="p-4">
                      {order.customer?.name ||
                        order.user?.name ||
                        order.name ||
                        "Customer"}
                    </td>

                    <td className="p-4">
                      ${order.total || order.amount || 0}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                        {order.status || "Pending"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500">
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "—"}
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
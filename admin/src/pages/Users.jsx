import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:8000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(
        Array.isArray(data)
          ? data
          : data.users || []
      );
    } catch (error) {
      console.error("Users error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Users
        </h1>

        <p className="text-gray-500 mt-1">
          Manage registered customers.
        </p>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left text-sm">
                    Name
                  </th>

                  <th className="p-4 text-left text-sm">
                    Email
                  </th>

                  <th className="p-4 text-left text-sm">
                    Role
                  </th>

                  <th className="p-4 text-left text-sm">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id || user.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-4 font-medium">
                      {user.name || "—"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email || "—"}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                        {user.role || "User"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500">
                      {user.createdAt
                        ? new Date(
                            user.createdAt
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
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users`,
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

      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.error("Users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      alert("User deleted successfully!");

      // Delete ke baad users dobara load honge
      await loadUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Users
          </h1>

          <p className="text-gray-400 mt-1">
            Manage registered customers.
          </p>
        </div>

        <button
          className="px-5 py-3 bg-white text-black rounded-lg hover:bg-gray-200"
          onClick={() => alert("Add User form coming soon")}
        >
          + Add User
        </button>
      </div>

      <div className="bg-[#151b2b] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-400">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="bg-[#111827] border-b border-white/10">
                <tr>
                  <th className="p-4 text-left text-sm">Name</th>
                  <th className="p-4 text-left text-sm">Email</th>
                  <th className="p-4 text-left text-sm">Role</th>
                  <th className="p-4 text-left text-sm">Joined</th>
                  <th className="p-4 text-left text-sm">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id || user.id}
                    className="border-b border-white/10 last:border-0"
                  >
                    <td className="p-4 font-medium">
                      {user.name || "—"}
                    </td>

                    <td className="p-4 text-gray-300">
                      {user.email || "—"}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                        {user.role || "User"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleDelete(user._id || user.id)
                        }
                        className="text-red-400 hover:text-red-300 hover:underline"
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
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          ☰
        </button>

        <h2 className="text-xl font-bold text-gray-800">
          Admin Panel
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-800">
            Admin
          </p>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
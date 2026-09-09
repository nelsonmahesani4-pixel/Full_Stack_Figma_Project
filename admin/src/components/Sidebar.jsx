import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: "📊",
    },
    {
      name: "Products",
      path: "/products",
      icon: "📦",
    },
    {
      name: "Orders",
      path: "/orders",
      icon: "🛒",
    },
    {
      name: "Users",
      path: "/users",
      icon: "👥",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 h-screen bg-gray-950 text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">
            SHOOPO
          </h1>

          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
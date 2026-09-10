import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/products",
    icon: ShoppingBag,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    path: "/users",
    icon: Users,
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/login");
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col bg-white shadow-sm transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* LOGO */}
        <div className="flex h-[86px] items-center justify-between border-b border-gray-100 px-7">

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            SHOP<span className="text-purple-600">.</span>CO
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-7">

          <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}

          </div>

          <p className="mb-4 mt-10 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Other
          </p>

          <div className="space-y-2">

            <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 hover:bg-gray-100">
              <Settings size={20} />
              Settings
            </button>

            <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 hover:bg-gray-100">
              <HelpCircle size={20} />
              Help Center
            </button>

          </div>

        </nav>

        {/* LOGOUT */}
        <div className="border-t border-gray-100 p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}
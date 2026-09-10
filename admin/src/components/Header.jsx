import {
  Search,
  SlidersHorizontal,
  Radio,
  Languages,
  Bell,
  Maximize,
  Settings,
  Menu,
} from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="flex h-[86px] items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8">

      {/* MOBILE MENU + SEARCH */}
      <div className="flex items-center gap-3">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="flex h-11 w-[280px] items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">
          <Search size={20} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          <SlidersHorizontal
            size={20}
            className="text-purple-600"
          />
        </div>

      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-3">

        <button className="hidden rounded-lg bg-purple-100 p-3 text-purple-600 sm:block">
          <Radio size={19} />
        </button>

        <button className="hidden rounded-lg bg-blue-100 p-3 text-blue-600 sm:block">
          <Languages size={19} />
        </button>

        <button className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
          <Bell size={19} />
        </button>

        <button className="hidden rounded-lg bg-blue-100 p-3 text-blue-600 sm:block">
          <Maximize size={19} />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 rounded-full bg-blue-50 px-2 py-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
            A
          </div>

          <button className="hidden text-blue-600 sm:block">
            <Settings size={20} />
          </button>

        </div>

      </div>

    </header>
  );
}
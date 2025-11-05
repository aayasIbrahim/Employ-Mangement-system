"use client";
import { Bell, Menu, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-700">Engineer Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2">
          <UserCircle size={24} className="text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">Ayas</span>
        </div>
      </div>
    </header>
  );
}

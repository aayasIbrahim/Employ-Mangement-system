"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ClipboardList, Clock, LogOut, User } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: <Home size={18} />, href: "/" },
  { name: "Attendance", icon: <Clock size={18} />, href: "/attendance" },
  { name: "Tasks", icon: <ClipboardList size={18} />, href: "/tasks" },
  { name: "Leave", icon: <User size={18} />, href: "/leave" },
  {
    name: "Profile",
    icon: <User size={18} />,
    href: "/dashboard/employee/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="p-5 font-bold text-lg text-indigo-600 border-b">
          Engineer Panel
        </div>

        <nav className="p-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-2 my-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-indigo-100 text-indigo-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <button className="m-4 flex items-center gap-2 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

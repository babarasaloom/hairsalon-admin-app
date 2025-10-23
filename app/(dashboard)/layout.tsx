"use client";

import { Home, Calendar, Users, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Menu", href: "/menu", icon: MenuIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarHovered, setSidebarHovered] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-text relative overflow-x-hidden">
      {/* Sidebar (Desktop only) */}
      <aside
        className={clsx(
          "hidden md:flex flex-col fixed top-0 left-0 h-full bg-sidebar border-r border-border shadow-sidebar z-40 transition-all duration-300 ease-in-out",
          sidebarHovered ? "w-56" : "w-16"
        )}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-border">
          <span className="font-bold text-lg text-text">S</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 mt-4 space-y-1 relative">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                pathname === item.href
                  ? "bg-active font-medium"
                  : "hover:bg-hover"
              )}
            >
              <item.icon size={20} className="text-text shrink-0" />
              <span
                className={clsx(
                  "transition-opacity duration-200 text-sm whitespace-nowrap",
                  sidebarHovered ? "opacity-100" : "opacity-0"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay behind sidebar when expanded */}
      {sidebarHovered && (
        <div
          className="hidden md:block fixed inset-0 bg-black/10 z-30 transition-opacity duration-300"
          onMouseEnter={() => setSidebarHovered(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-20">
        {/* Header for mobile */}
        {/* <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
          <div className="flex items-center gap-2">
            <Menu size={22} />
            <h1 className="font-semibold text-base">Salon Dashboard</h1>
          </div>
          <div className="w-6" />
        </header> */}

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 mb-16 md:mt-0 md:mb-0 overflow-y-auto relative z-10">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-sm flex justify-around py-2 z-30">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex flex-col items-center text-xs transition-colors",
                  isActive
                    ? "text-gray-800 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <item.icon size={22} strokeWidth={1.8} />
                <span className="mt-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

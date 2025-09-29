"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Kids", href: "/kids" },
    { name: "Collections", href: "/collections" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-light-100 border-b border-light-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={60}
                height={22}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark-900 hover:text-dark-700 text-body font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-dark-900 hover:text-dark-700 text-body font-medium transition-colors">
              Search
            </button>
            <button className="text-dark-900 hover:text-dark-700 text-body font-medium transition-colors">
              My Cart (2)
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dark-900 hover:text-dark-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-light-100 border-t border-light-300">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-dark-900 hover:bg-light-200 rounded-md text-body font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="block w-full text-left px-3 py-2 text-dark-900 hover:bg-light-200 rounded-md text-body font-medium transition-colors">
              Search
            </button>
            <button className="block w-full text-left px-3 py-2 text-dark-900 hover:bg-light-200 rounded-md text-body font-medium transition-colors">
              My Cart (2)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

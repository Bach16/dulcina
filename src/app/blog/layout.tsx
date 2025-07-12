// src/app/blog/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#EC174F]">Dulcina</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#EC174F] transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/#products"
                className="text-gray-600 hover:text-[#EC174F] transition-colors"
              >
                Productos
              </Link>
              <Link href="/blog" className="text-[#EC174F] font-medium">
                Blog
              </Link>
              <a
                href="https://wa.link/c553sx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#EC174F] text-white px-4 py-2 rounded-lg hover:bg-[#d41447] transition-colors"
              >
                Contacto
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#EC174F] text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Dulcina</h3>
              <p className="text-pink-100 mb-4">
                El detalle perfecto para alegrar cualquier ocasión especial en
                Quito.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://wa.link/c553sx"
                  className="text-pink-100 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  href="#"
                  className="text-pink-100 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-pink-100 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-pink-100 hover:text-white transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#products"
                    className="text-pink-100 hover:text-white transition-colors"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-pink-100 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-pink-100">
                <li>📍 Quito, Ecuador</li>
                <li>
                  📱
                  <a
                    href="https://wa.link/c553sx"
                    className="hover:text-white transition-colors ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>✉️ info@dulcina.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-pink-400 mt-8 pt-8 text-center text-pink-100">
            <p>&copy; 2025 Dulcina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

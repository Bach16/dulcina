// src/app/blog/[slug]/not-found.tsx
import Link from "next/link";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE8EA] to-white">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="text-8xl mb-4">📝</div>
          <h1 className={`${lobster.className} text-4xl text-[#EC174F] mb-4`}>
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Lo sentimos, el artículo que buscas no existe o ha sido movido.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/blog"
            className="block w-full px-6 py-3 bg-[#EC174F] text-white rounded-lg hover:bg-[#d41447] transition-colors font-medium"
          >
            Ver todos los artículos
          </Link>

          <Link
            href="/"
            className="block w-full px-6 py-3 border border-[#EC174F] text-[#EC174F] rounded-lg hover:bg-[#EC174F] hover:text-white transition-colors font-medium"
          >
            Ir al inicio
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>¿Llegaste aquí desde un enlace externo?</p>
          <p>Puede que el artículo haya sido actualizado o eliminado.</p>
        </div>
      </div>
    </div>
  );
}

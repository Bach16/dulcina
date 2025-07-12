// src/app/blog/page.tsx
import { Lobster } from "next/font/google";
import { getPosts, getCategories } from "../lib/helpers/blog";
import BlogCard from "../../components/BlogCard";
import Link from "next/link";
import { Metadata } from "next";

const lobster = Lobster({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Blog - Dulcina | Consejos y tendencias para regalos especiales",
  description:
    "Descubre las últimas tendencias en regalos, consejos para ocasiones especiales y todo sobre el mundo de los detalles perfectos en Quito.",
  keywords:
    "blog regalos, consejos regalos, tendencias regalos Quito, ocasiones especiales, detalles perfectos",
  openGraph: {
    title: "Blog - Dulcina",
    description:
      "Descubre las últimas tendencias en regalos y consejos para ocasiones especiales",
    type: "website",
    siteName: "Dulcina",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Dulcina",
    description:
      "Descubre las últimas tendencias en regalos y consejos para ocasiones especiales",
  },
};

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { posts, pagination } = await getPosts(searchParams);
  const categories = await getCategories();

  const currentCategory = searchParams.category as string;
  const currentSearch = searchParams.search as string;

  return (
    <>
      {/* Hero Section */}
      <header className="main-bg bg-fixed flex flex-col items-center text-center text-[#EC174F]">
        <div className="w-[100%] bg-[#FCE8EA]/[0.7] backdrop-brightness-75">
          <div className="container mx-auto px-4 py-16">
            <p className={`${lobster.className} text-[2.5rem] mb-4`}>
              Blog Dulcina
            </p>
            <h1 className="text-2xl md:text-3xl helvetica-rounded mb-6">
              Consejos, tendencias y todo sobre regalos especiales
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Descubre las mejores ideas para ocasiones especiales y mantente al
              día con las últimas tendencias en el mundo de los regalos
              perfectos.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Form */}
            <form method="GET" className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                name="search"
                placeholder="Buscar artículos..."
                defaultValue={currentSearch}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#EC174F] flex-1 md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#EC174F] text-white rounded-lg hover:bg-[#d41447] transition-colors"
              >
                Buscar
              </button>
            </form>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full border transition-colors ${
                  !currentCategory
                    ? "bg-[#EC174F] text-white border-[#EC174F]"
                    : "border-gray-300 text-gray-600 hover:border-[#EC174F] hover:text-[#EC174F]"
                }`}
              >
                Todos
              </Link>
              {categories.map((category: { id: string; slug: string; name: string; count: number }) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    currentCategory === category.slug
                      ? "bg-[#EC174F] text-white border-[#EC174F]"
                      : "border-gray-300 text-gray-600 hover:border-[#EC174F] hover:text-[#EC174F]"
                  }`}
                >
                  {category.name} ({category.count})
                </Link>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(currentCategory || currentSearch) && (
            <div className="mt-4 flex gap-2 items-center">
              <span className="text-gray-600">Filtros activos:</span>
              {currentSearch && (
                <span className="bg-[#FCE8EA] text-[#EC174F] px-3 py-1 rounded-full text-sm">
                  Búsqueda: "{currentSearch}"
                </span>
              )}
              {currentCategory && (
                <span className="bg-[#FCE8EA] text-[#EC174F] px-3 py-1 rounded-full text-sm">
                  Categoría:{" "}
                  {categories.find((c: { id: string; slug: string; name: string; count: number }) => c.slug === currentCategory)?.name}
                </span>
              )}
              <Link
                href="/blog"
                className="text-[#EC174F] hover:underline text-sm"
              >
                Limpiar filtros
              </Link>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {(pagination.hasNext || pagination.hasPrevious) && (
              <div className="flex justify-center gap-4">
                {pagination.hasPrevious && (
                  <Link
                    href={`/blog?page=${pagination.currentPage - 1}${
                      currentCategory ? `&category=${currentCategory}` : ""
                    }${currentSearch ? `&search=${currentSearch}` : ""}`}
                    className="px-6 py-2 border border-[#EC174F] text-[#EC174F] rounded-lg hover:bg-[#EC174F] hover:text-white transition-colors"
                  >
                    Anterior
                  </Link>
                )}

                <span className="px-6 py-2 bg-[#EC174F] text-white rounded-lg">
                  Página {pagination.currentPage}
                </span>

                {pagination.hasNext && (
                  <Link
                    href={`/blog?page=${pagination.currentPage + 1}${
                      currentCategory ? `&category=${currentCategory}` : ""
                    }${currentSearch ? `&search=${currentSearch}` : ""}`}
                    className="px-6 py-2 border border-[#EC174F] text-[#EC174F] rounded-lg hover:bg-[#EC174F] hover:text-white transition-colors"
                  >
                    Siguiente
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-[#EC174F] mb-4">
              No se encontraron artículos
            </h2>
            <p className="text-gray-600 mb-6">
              {currentSearch || currentCategory
                ? "Intenta con otros términos de búsqueda o categorías."
                : "Aún no hay artículos publicados."}
            </p>
            {(currentSearch || currentCategory) && (
              <Link
                href="/blog"
                className="inline-block px-6 py-2 bg-[#EC174F] text-white rounded-lg hover:bg-[#d41447] transition-colors"
              >
                Ver todos los artículos
              </Link>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-[#FCE8EA] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#EC174F] mb-4">
            ¿Necesitas el regalo perfecto?
          </h2>
          <p className="text-gray-600 mb-6">
            Mientras lees nuestros consejos, explora nuestra colección de
            regalos únicos
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#EC174F] text-white rounded-lg hover:bg-[#d41447] transition-colors font-medium"
          >
            Ver productos
          </Link>
        </div>
      </main>
    </>
  );
}

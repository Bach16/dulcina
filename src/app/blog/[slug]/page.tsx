// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPost, generateSEOMetadata } from "../../lib/helpers/blog";
import BlogCard from "../../../components/BlogCard";
import SocialShareButtons from "@/components/SocialShareButtons";

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const data = await getPost(params.slug);

  if (!data?.post) {
    return {
      title: "Artículo no encontrado - Dulcina",
    };
  }

  return generateSEOMetadata(data.post, "https://api.dulcinachocolates.com");
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  // You can fetch a list of popular posts or recent posts here
  // For now, return empty array to generate pages on-demand
  return [];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const data = await getPost(params.slug);

  if (!data?.post) {
    notFound();
  }

  const { post, relatedPosts } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Dulcina",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png",
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-500">
          <ol className="flex space-x-2">
            <li>
              <Link href="/" className="hover:text-[#EC174F]">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-[#EC174F]">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-700">{post.title}</li>
          </ol>
        </nav>

        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="mb-4">
            {post.categories.map(
              (category: { id: string; slug: string; name: string }) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="inline-block bg-[#EC174F] text-white px-3 py-1 rounded-full text-sm font-medium mr-2 hover:bg-[#d41447] transition-colors"
                >
                  {category.name}
                </Link>
              )
            )}
          </div>
        )}

        {/* Title */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#EC174F] mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-gray-800">
                  Por {post.author.name}
                </p>
                <time dateTime={post.date} className="text-sm">
                  {formatDate(post.date)}
                </time>
              </div>
            </div>

            {/* Social Share Buttons */}
            <SocialShareButtons title={post.title} />
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-lg text-gray-600 leading-relaxed mb-8 p-4 bg-[#FCE8EA] rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              width={800}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Etiquetas:
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(
                (tag: { id: string; slug: string; name: string }) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-600 hover:border-[#EC174F] hover:text-[#EC174F] transition-colors"
                  >
                    #{tag.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {/* Author Box */}
        <div className="bg-[#FCE8EA] rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-[#EC174F] mb-2">
                {post.author.name}
              </h3>
              {post.author.description && (
                <p className="text-gray-600">{post.author.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold text-[#EC174F] mb-8 text-center">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-[#FCE8EA] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#EC174F] mb-4">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-gray-600 mb-6">
            Descubre nuestros productos perfectos para cualquier ocasión
            especial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-[#EC174F] text-white rounded-lg hover:bg-[#d41447] transition-colors font-medium"
            >
              Ver productos
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-[#EC174F] text-[#EC174F] rounded-lg hover:bg-[#EC174F] hover:text-white transition-colors font-medium"
            >
              Más artículos
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

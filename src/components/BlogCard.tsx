// src/app/components/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  author: {
    name: string;
    avatar?: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#EC174F] to-[#FCE8EA] flex items-center justify-center">
              <div className="text-white text-4xl font-bold opacity-50">
                Dulcina
              </div>
            </div>
          )}

          {/* Categories overlay */}
          {post.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="bg-[#EC174F] text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.categories[0].name}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        {/* Date and Author */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span>Por {post.author.name}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-[#EC174F] mb-3 line-clamp-2 group-hover:underline">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3 mb-4">
          {stripHtml(post.excerpt)}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-[#EC174F] font-medium hover:underline"
        >
          Leer más
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

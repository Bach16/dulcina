// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getPosts } from "./lib/helpers/blog";
import { getProductos } from "./lib/helpers/graphql";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.dulcinachocolates.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    // Get blog posts
    const { posts } = await getPosts({ per_page: "100" });
    const blogPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Get products
    const { productos } = await getProductos({ per_page: "100" });
    const productPages: MetadataRoute.Sitemap = productos.map(
      (product: any) => ({
        url: `${baseUrl}/producto/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...blogPages, ...productPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}

// src/app/lib/helpers/blog.js
import graphqlService from "../services/graphql";
import {
  GET_POSTS,
  GET_POST,
  GET_RELATED_POSTS,
  SEARCH_POSTS,
  GET_CATEGORIES,
} from "../queries/blog";

// Función para normalizar posts
function normalizePost(postNode) {
  console.log("Normalizing post:", postNode);

  return {
    id: postNode.databaseId,
    title: postNode.title,
    slug: postNode.slug,
    excerpt: postNode.excerpt,
    content: postNode.content,
    date: postNode.date,
    modified: postNode.modified,
    featuredImage: postNode.featuredImage?.node?.sourceUrl,
    featuredImageAlt: postNode.featuredImage?.node?.altText,
    author: {
      name: postNode.author?.node?.name,
      avatar: postNode.author?.node?.avatar?.url,
      description: postNode.author?.node?.description,
    },
    categories: postNode.categories?.nodes || [],
    tags: postNode.tags?.nodes || [],
    seo: postNode.seo || {},
  };
}

export async function getPosts(searchParams = {}) {
  try {
    console.log("getPosts called with:", searchParams);

    if (!graphqlService || typeof graphqlService.query !== "function") {
      throw new Error("GraphQL service is not properly initialized");
    }

    const { page = "1", per_page = "12", category, search, tag } = searchParams;

    const first = parseInt(per_page);

    // Construir filtros
    const where = {
      status: "PUBLISH",
      ...(category && { categoryName: category }),
      ...(tag && { tag }),
    };

    let query = GET_POSTS;
    let variables = { first, where };

    // Si hay búsqueda, usar query diferente
    if (search) {
      query = SEARCH_POSTS;
      variables = { search, first };
    }

    console.log("Executing GraphQL query with variables:", variables);

    const data = await graphqlService.query(query, variables);

    if (!data || !data.posts || !data.posts.edges) {
      console.log("No posts data received:", data);
      return {
        posts: [],
        pageInfo: {},
        pagination: { currentPage: 1, perPage: 12 },
      };
    }

    const posts = data.posts.edges.map((edge) => normalizePost(edge.node));

    console.log("Processed posts:", posts);

    return {
      posts,
      pageInfo: data.posts.pageInfo,
      pagination: {
        currentPage: parseInt(page),
        perPage: first,
        hasNext: data.posts.pageInfo.hasNextPage,
        hasPrevious: data.posts.pageInfo.hasPreviousPage,
      },
    };
  } catch (error) {
    console.error("Error getting posts:", error);
    return {
      posts: [],
      pageInfo: {},
      pagination: { currentPage: 1, perPage: 12 },
    };
  }
}

export async function getPost(slug) {
  try {
    if (!graphqlService || typeof graphqlService.query !== "function") {
      throw new Error("GraphQL service is not properly initialized");
    }

    const data = await graphqlService.query(GET_POST, {
      id: slug,
      idType: "SLUG",
    });

    if (!data.post) {
      return null;
    }

    const post = normalizePost(data.post);

    // Obtener posts relacionados por categoría
    let relatedPosts = [];
    if (post.categories.length > 0) {
      const categoryIds = post.categories.map((cat) => cat.id);

      try {
        const relatedData = await graphqlService.query(GET_RELATED_POSTS, {
          categoryIn: categoryIds,
          notIn: [post.id],
          first: 3,
        });

        if (relatedData && relatedData.posts && relatedData.posts.edges) {
          relatedPosts = relatedData.posts.edges.map((edge) =>
            normalizePost(edge.node)
          );
        }
      } catch (relatedError) {
        console.warn("Error getting related posts:", relatedError);
      }
    }

    return {
      post,
      relatedPosts,
    };
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    if (!graphqlService || typeof graphqlService.query !== "function") {
      throw new Error("GraphQL service is not properly initialized");
    }

    const data = await graphqlService.query(GET_CATEGORIES);

    if (!data || !data.categories || !data.categories.nodes) {
      return [];
    }

    return data.categories.nodes;
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
}

// Función para generar metadata SEO
export function generateSEOMetadata(post, baseUrl = "https://yourdomain.com") {
  const seo = post.seo || {};
  const title = seo.title || post.title;
  const description = seo.metaDesc || post.excerpt || "";
  const image = seo.opengraphImage?.sourceUrl || post.featuredImage;
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: seo.metaKeywords || seo.focuskw,
    robots: {
      index: !seo.metaRobotsNoindex,
      follow: !seo.metaRobotsNofollow,
    },
    openGraph: {
      title: seo.opengraphTitle || title,
      description: seo.opengraphDescription || description,
      url,
      siteName: "Dulcina",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: post.featuredImageAlt || post.title,
            },
          ]
        : [],
      locale: "es_ES",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
      images: seo.twitterImage?.sourceUrl || image,
    },
    alternates: {
      canonical: url,
    },
  };
}

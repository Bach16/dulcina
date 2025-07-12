// src/app/lib/queries/blog.js

export const GET_POSTS = `
  query GetPosts($first: Int, $after: String, $where: RootQueryToPostConnectionWhereArgs) {
    posts(first: $first, after: $after, where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          slug
          excerpt
          content
          date
          modified
          featuredImage {
            node {
              sourceUrl
              altText
              caption
            }
          }
          author {
            node {
              name
              }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
          tags {
            nodes {
              id
              name
              slug
            }
          }
          seo {
            title
            description
            focusKeywords
            robots
            openGraph {
              articleMeta {
                section
              }
              description
              locale
              siteName
              title
              type
              url
              slackEnhancedData {
                data
                label
              }
              twitterMeta {
                card
                description
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POST = `
  query GetPost($id: ID!, $idType: PostIdType = SLUG) {
    post(id: $id, idType: $idType) {
      id
      databaseId
      title
      slug
      excerpt
      content
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      author {
        node {
          name
          description
          }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        title
        description
        focusKeywords
        robots
        openGraph {
          articleMeta {
            section
          }
          description
          locale
          siteName
          title
          type
          url
          slackEnhancedData {
            data
            label
          }
          twitterMeta {
            card
            description
            title
          }
        }
      }
    }
  }
`;

export const GET_RELATED_POSTS = `
  query GetRelatedPosts($categoryIn: [ID], $notIn: [ID], $first: Int = 3) {
    posts(where: { categoryIn: $categoryIn, notIn: $notIn, status: PUBLISH }, first: $first) {
      edges {
        node {
          id
          databaseId
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int, $after: String) {
    posts(first: $first, after: $after, where: { search: $search, status: PUBLISH }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

// lib/queries/productos.js
export const GET_PRODUCTOS = `
  query GetProductos($first: Int, $after: String, $where: RootQueryToProductUnionConnectionWhereArgs) {
    products(first: $first, after: $after, where: $where) {
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
          name
          slug
          description
          shortDescription
          onSale
          featured
          image {
            sourceUrl
            altText
          }
                    
          # Inline fragments para diferentes tipos de productos
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          
          ... on VariableProduct {
            price
            regularPrice
            salePrice
          }
          
          ... on ExternalProduct {
            price
            regularPrice
            salePrice
            externalUrl
          }
          
          ... on GroupProduct {
            price
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTO = `
  query GetProducto($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      onSale
      featured
      image {
        sourceUrl
        altText
      }
      
      
      
      # Inline fragments para precios según tipo
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
        manageStock
        stockQuantity
      }
      
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        stockStatus
        variations {
          nodes {
            id
            databaseId
            name
            price
            regularPrice
            salePrice
            stockStatus
          }
        }
      }
      
      ... on ExternalProduct {
        price
        regularPrice
        salePrice
        externalUrl
        buttonText
      }
      
      ... on GroupProduct {
        price
        products {
          nodes {
            id
            name
            ... on SimpleProduct {
              price
            }
          }
        }
      }
      
      # Productos relacionados
      related {
        nodes {
          id
          databaseId
          name
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTOS = `
  query SearchProductos($search: String!, $first: Int, $after: String) {
    products(first: $first, after: $after, where: { search: $search, status: "publish" }) {
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
          name
          slug
          image {
            sourceUrl
            altText
          }
          
                    
          # Precios según tipo
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          
          ... on VariableProduct {
            price
            regularPrice
            salePrice
          }
          
          ... on ExternalProduct {
            price
          }
          
          ... on GroupProduct {
            price
          }
        }
      }
    }
  }
`;



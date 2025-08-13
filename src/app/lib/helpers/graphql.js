// src/app/lib/helpers/graphql.js
import graphqlService from "../services/graphql";
import {
  GET_PRODUCTOS,
  GET_PRODUCTO,
  SEARCH_PRODUCTOS,
} from "../queries/productos";

// Función para normalizar productos según su tipo
function normalizeProduct(productNode) {
  console.log("Normalizing product:", productNode);

  const baseProduct = {
    id: productNode.databaseId,
    name: productNode.name,
    slug: productNode.slug,
    description: productNode.description,
    shortDescription: productNode.shortDescription,
    onSale: productNode.onSale,
    featured: productNode.featured,
    image: productNode.image?.sourceUrl,
    images: productNode.galleryImages?.nodes || [],
    categories: productNode.productCategories?.nodes || [],
  };

  // Agregar campos específicos según el tipo
  if (productNode.price !== undefined) {
    baseProduct.price = productNode.price;
    baseProduct.regularPrice = productNode.regularPrice;
    baseProduct.salePrice = productNode.salePrice;
  }

  // Campos específicos para productos variables
  if (productNode.variations) {
    baseProduct.variations = productNode.variations.nodes;
    baseProduct.type = "variable";
  }

  // Campos específicos para productos externos
  if (productNode.externalUrl) {
    baseProduct.externalUrl = productNode.externalUrl;
    baseProduct.buttonText = productNode.buttonText;
    baseProduct.type = "external";
  }

  // Campos específicos para productos agrupados
  if (productNode.products) {
    baseProduct.groupedProducts = productNode.products.nodes;
    baseProduct.type = "grouped";
  }

  // Stock para productos simples
  if (productNode.stockStatus !== undefined) {
    baseProduct.stockStatus = productNode.stockStatus;
    baseProduct.manageStock = productNode.manageStock;
    baseProduct.stockQuantity = productNode.stockQuantity;
  }

  return baseProduct;
}

export async function getProductos(searchParams = {}) {
  try {
    console.log("getProductos called with:", searchParams);
    console.log("graphqlService:", graphqlService);

    // Verificar que el servicio esté disponible
    if (!graphqlService || typeof graphqlService.query !== "function") {
      throw new Error("GraphQL service is not properly initialized");
    }

    const {
      page = "1",
      per_page = "20",
      category,
      search,
      featured,
      on_sale,
    } = searchParams;

    const first = parseInt(per_page);
    const currentPage = parseInt(page);

    // Calcular el offset para la paginación
    const offset = (currentPage - 1) * first;

    // Construir filtros
    const where = {
      status: "PUBLISH",
      ...(category && { categoryIn: [category] }),
      ...(featured === "true" && { featured: true }),
      ...(on_sale === "true" && { onSale: true }),
    };

    let query = GET_PRODUCTOS;
    let variables = { 
      first, 
      where,
      ...(offset > 0 && { offset })
    };

    // Si hay búsqueda, usar query diferente
    if (search) {
      query = SEARCH_PRODUCTOS;
      variables = { 
        search, 
        first,
        ...(offset > 0 && { offset })
      };
    }

    console.log("Executing GraphQL query with variables:", variables);

    const data = await graphqlService.query(query, variables);

    if (!data || !data.products || !data.products.edges) {
      console.log("No products data received:", data);
      return {
        productos: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
        },
        pagination: { 
          currentPage: currentPage, 
          perPage: first,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    const productos = data.products.edges.map((edge) =>
      normalizeProduct(edge.node)
    );

    console.log("Processed productos:", productos);

    // Determinar si hay más páginas
    const totalProducts = data.products.pageInfo?.total || productos.length;
    const hasNextPage = (currentPage * first) < totalProducts || data.products.pageInfo?.hasNextPage || false;
    const hasPreviousPage = currentPage > 1 || data.products.pageInfo?.hasPreviousPage || false;

    return {
      productos,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        total: totalProducts,
        ...data.products.pageInfo
      },
      pagination: {
        currentPage: currentPage,
        perPage: first,
        hasNext: hasNextPage,
        hasPrevious: hasPreviousPage,
        total: totalProducts,
      },
    };
  } catch (error) {
    console.error("Error getting productos:", error);
    return {
      productos: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      pagination: { 
        currentPage: 1, 
        perPage: 10,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}

export async function getProducto(id) {
  try {
    if (!graphqlService || typeof graphqlService.query !== "function") {
      throw new Error("GraphQL service is not properly initialized");
    }

    const data = await graphqlService.query(GET_PRODUCTO, { id });

    if (!data.product) {
      return null;
    }

    const producto = normalizeProduct(data.product);

    const productosRelacionados =
      data.product.related?.nodes.map((node) => normalizeProduct(node)) || [];

    return {
      producto,
      productosRelacionados,
    };
  } catch (error) {
    console.error("Error getting producto:", error);
    return null;
  }
}
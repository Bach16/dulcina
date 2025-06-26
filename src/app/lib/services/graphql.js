// src/app/lib/services/graphql.js
class GraphQLService {
  constructor() {
    this.endpoint = "https://api.dulcinachocolates.com/graphql";
  }

  async query(query, variables = {}) {
    try {
      console.log("GraphQL Query:", query);
      console.log("Variables:", variables);

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      console.log("GraphQL Response:", data);

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data;
    } catch (error) {
      console.error("GraphQL Error:", error);
      throw error;
    }
  }
}

// Crear instancia y exportar
const graphqlService = new GraphQLService();
export default graphqlService;

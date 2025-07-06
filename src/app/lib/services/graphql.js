// src/app/lib/services/graphql.js
import axios from "axios";

class GraphQLService {
  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 
                   process.env.GRAPHQL_ENDPOINT 

    // Configure axios instance
    this.client = axios.create({
      baseURL: this.endpoint,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    });
  }

  async query(query, variables = {}) {
    try {
      console.log("GraphQL Query:", query);
      console.log("Variables:", variables);

      const response = await this.client.post("", {
        query,
        variables,
      });

      console.log("GraphQL Response:", response.data);

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data;
    } catch (error) {
      console.error("GraphQL Error:", error);

      // Handle axios-specific errors
      if (error.response) {
        // Server responded with error status
        throw new Error(
          `HTTP Error: ${error.response.status} ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("Network Error: No response received");
      } else {
        // Something else happened
        throw error;
      }
    }
  }
}

// Crear instancia y exportar
const graphqlService = new GraphQLService();
export default graphqlService;

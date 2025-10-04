import apiClient from "./apiClient";

export const productService = {
  /**
   * Get products with query parameters.
   * @param {Object} [params] - Query params like { category, page, limit, sort }
   */
  async getProducts(params = {}) {
    const res = await apiClient.get("/products", { params });
    return res.data;
  },
};

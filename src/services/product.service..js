import apiClient from "./apiClient";

export const productService = {
  /**
   * Get products with query parameters.
   * @param {Object} [params] - Query params like { category, page, limit, sort }
   * @param {string} [cookie] - Optional cookie string for server-side requests
   */
  async getProducts(params = {}, cookie) {
    const res = await apiClient.get("/products", {
      params,
      headers: cookie ? { Cookie: cookie } : {},
    });
    return res.data;
  },
};

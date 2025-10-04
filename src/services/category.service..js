import apiClient from "./apiClient";

export const categoryService = {
  /**
   * Get categories with query parameters.
   * @param {Object} [params] - Query params like { page, limit, sort }
   */
  async getCategories(params = {}) {
    const res = await apiClient.get("/categories", { params });
    return res.data;
  },
};

import apiClient from "./apiClient";

export const brandService = {
  /**
   * Get brands with query parameters.
   * @param {Object} [params] - Query params like { page, limit, sort }
   */
  async getBrands(params = {}) {
    const res = await apiClient.get("/brands", { params });
    return res.data;
  },
};

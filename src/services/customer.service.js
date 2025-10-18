import apiClientServer from "./apiClientServer";

export const customerService = {
  /**
   * Get customer with query parameters.
   * @param {Object} [params] - Query params like { fields }
   */
  async getCustomer(params) {
    const res = await apiClientServer.get("/customer", {
      params,
    });
    return res.data;
  },
};

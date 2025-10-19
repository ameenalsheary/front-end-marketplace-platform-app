import apiClient from "./apiClient";

const authService = {
  async signIn(email) {
    try {
      const res = await apiClient.post("/auth/signin", { email });
      return res.data;
    } catch (error) {
      return (
        error.response?.data || {
          status: "fail",
          message: "Something went wrong. Please try again.",
        }
      );
    }
  },

  async verifySignIn(email, verificationCode) {
    try {
      const res = await apiClient.post("/auth/verifysignin", {
        email,
        verificationCode,
      });
      return res.data;
    } catch (error) {
      return (
        error.response?.data || {
          status: "fail",
          message: "Something went wrong. Please try again.",
        }
      );
    }
  },

  async checkAuth() {
    try {
      const res = await apiClient.get("/auth/checkauth");
      return res.data;
    } catch {}
  },

  async logOut() {
    try {
      const res = await apiClient.post("/auth/logout");
      return res.data;
    } catch {}
  },
};

export default authService;

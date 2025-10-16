import apiClient from "./apiClient";

const authService = {
  signIn: async (email) => {
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

  verifySignIn: async (email, verificationCode) => {
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

  logOut: async () => {
    try {
      const res = await apiClient.post("/auth/logout");
      return res.data;
    } catch {}
  },

  checkAuth: async () => {
    try {
      const res = await apiClient.get("/customer", {
        params: {
          fields: "firstName lastName profileImage",
        },
      });
      return res.data;
    } catch {}
  },
};

export default authService;

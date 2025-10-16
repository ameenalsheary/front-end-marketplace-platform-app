import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "@/services/auth.service";

export const verifyAuth = createAsyncThunk("auth/verifyAuth", async () => {
  try {
    const res = await authService.checkAuth();
    return {
      isAuthenticated: true,
      user: { ...res.data },
    };
  } catch {
    return {
      isAuthenticated: false,
      user: {},
    };
  }
});

const initialState = {
  isOpen: false,
  status: "idle",
  isAuthenticated: false,
  user: {},
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isOpen = true;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = {};
        state.status = "failed";
      });
  },
});

export const { openAuthModal, closeAuthModal, setAuthenticated } = authModalSlice.actions;
export default authModalSlice.reducer;

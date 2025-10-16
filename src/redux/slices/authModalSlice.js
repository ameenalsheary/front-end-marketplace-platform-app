import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import authService from "@/services/auth.service";

export const verifyAuth = createAsyncThunk("auth/verifyAuth", async () => {
  return await authService.checkAuth();
});

const initialState = {
  isOpen: false,
  isAuthenticated: false,
  status: "idle",
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
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.status = "succeeded";
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "failed";
      });
  },
});

export const { openAuthModal, closeAuthModal, setAuthenticated } = authModalSlice.actions;
export default authModalSlice.reducer;

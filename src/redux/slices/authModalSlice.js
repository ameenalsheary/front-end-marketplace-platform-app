import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isAuthenticated: false,
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
});

export const { openAuthModal, closeAuthModal, setAuthenticated } = authModalSlice.actions;
export default authModalSlice.reducer;

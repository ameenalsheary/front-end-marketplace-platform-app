import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  cartItems: [],
};

const cartItemsModalSlice = createSlice({
  name: "cartItemsModal",
  initialState,
  reducers: {
    openCartItemsModal: (state) => {
      state.isOpen = true;
    },
    closeCartItemsModal: (state) => {
      state.isOpen = false;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.isOpen = true;
    },
  },
});

export const { openCartItemsModal, closeCartItemsModal, setCartItems } = cartItemsModalSlice.actions;

export default cartItemsModalSlice.reducer;

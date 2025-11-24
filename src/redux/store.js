import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./slices/authModalSlice";
import cartItemsModalReducer from "./slices/cartItemsModalSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    cartItemsModal: cartItemsModalReducer,
  },
});

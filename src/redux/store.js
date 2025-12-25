import { configureStore } from "@reduxjs/toolkit";

import authModalReducer from "./slices/authModalSlice";
import phoneNumberModalReducer from "./slices/phoneNumberModalSlice"
import cartItemsModalReducer from "./slices/cartItemsModalSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    phoneNumberModal: phoneNumberModalReducer,
    cartItemsModal: cartItemsModalReducer,
  },
});

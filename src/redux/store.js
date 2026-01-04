import { configureStore } from "@reduxjs/toolkit";

import authModalReducer from "./slices/authModalSlice";
import addressModalReducer from "./slices/addressModalSlice";
import phoneNumberModalReducer from "./slices/phoneNumberModalSlice";
import cartItemsModalReducer from "./slices/cartItemsModalSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    addressModal: addressModalReducer,
    phoneNumberModal: phoneNumberModalReducer,
    cartItemsModal: cartItemsModalReducer,
  },
});

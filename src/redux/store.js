import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./slices/authModalSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const phoneNumberModalSlice = createSlice({
  name: "phoneNumberModal",
  initialState,
  reducers: {
    openPhoneNumberModal: (state) => {
      state.isOpen = true;
    },
    closePhoneNumberModal: (state) => {
      state.isOpen = false;
    }
  },
});

export const { openPhoneNumberModal, closePhoneNumberModal } = phoneNumberModalSlice.actions;
export default phoneNumberModalSlice.reducer;

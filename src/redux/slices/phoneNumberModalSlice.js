import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/services/apiClient";

export const fetchPhoneNumbers = createAsyncThunk(
  "phoneNumberModal/fetchPhoneNumbers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get("/customer/phone-numbers");
      return data.data; // array of phone numbers
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to fetch phone numbers"
      );
    }
  }
);

const initialState = {
  isOpen: false,
  status: "idle", // idle | loading | succeeded | failed
  phoneNumbers: [],
  error: null,
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
    },
    setPhoneNumbers: (state, action) => {
      state.phoneNumbers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhoneNumbers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPhoneNumbers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.phoneNumbers = action.payload;
      })
      .addCase(fetchPhoneNumbers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  openPhoneNumberModal,
  closePhoneNumberModal,
  setPhoneNumbers,
} = phoneNumberModalSlice.actions;

export default phoneNumberModalSlice.reducer;

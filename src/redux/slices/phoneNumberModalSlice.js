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

export const deletePhoneNumber = createAsyncThunk(
  "phoneNumberModal/deletePhoneNumber",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { _id: phoneNumberId } = state.phoneNumberModal.currentPhoneNumberDetails;

      const { data } = await apiClient.delete(`/customer/phone-numbers/${phoneNumberId}`);
      return data.data; // array of phone numbers
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to delete phone number"
      );
    }
  }
);

const initialState = {
  isOpen: false,
  deletePhoneNumberModalIsOpen: false,
  currentPhoneNumberDetails: {},
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

    openDeletePhoneNumberModal: (state) => {
      state.deletePhoneNumberModalIsOpen = true;
    },
    closeDeletePhoneNumberModal: (state) => {
      state.deletePhoneNumberModalIsOpen = false;
    },

    setCurrentPhoneNumberDetails: (state, action) => {
      state.currentPhoneNumberDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch phone numbers
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
      })

      // Delete phone number
      .addCase(deletePhoneNumber.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePhoneNumber.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.phoneNumbers = action.payload;
      })
      .addCase(deletePhoneNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  openPhoneNumberModal,
  closePhoneNumberModal,

  setPhoneNumbers,

  openDeletePhoneNumberModal,
  closeDeletePhoneNumberModal,

  setCurrentPhoneNumberDetails
} = phoneNumberModalSlice.actions;

export default phoneNumberModalSlice.reducer;

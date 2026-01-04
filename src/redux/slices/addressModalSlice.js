import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/services/apiClient";

// Fetch addresses
export const fetchAddresses = createAsyncThunk(
  "addressModal/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get("/customer/addresses");
      return data.data; // array of addresses
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to fetch addresses"
      );
    }
  }
);

// Delete address
export const deleteAddress = createAsyncThunk(
  "addressModal/deleteAddress",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { _id: addressId } = state.addressModal.currentAddressDetails;

      const { data } = await apiClient.delete(`/customer/addresses/${addressId}`);
      return data.data; // updated array of addresses
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to delete address"
      );
    }
  }
);

const initialState = {
  isOpen: false,
  deleteAddressModalIsOpen: false,
  currentAddressDetails: {},
  status: "idle", // idle | loading | succeeded | failed
  addresses: [],
  error: null,
};

const addressModalSlice = createSlice({
  name: "addressModal",
  initialState,
  reducers: {
    openAddressModal: (state) => {
      state.isOpen = true;
    },
    closeAddressModal: (state) => {
      state.isOpen = false;
    },

    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },

    openDeleteAddressModal: (state) => {
      state.deleteAddressModalIsOpen = true;
    },
    closeDeleteAddressModal: (state) => {
      state.deleteAddressModalIsOpen = false;
    },

    setCurrentAddressDetails: (state, action) => {
      state.currentAddressDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  openAddressModal,
  closeAddressModal,

  setAddresses,

  openDeleteAddressModal,
  closeDeleteAddressModal,

  setCurrentAddressDetails,
} = addressModalSlice.actions;

export default addressModalSlice.reducer;

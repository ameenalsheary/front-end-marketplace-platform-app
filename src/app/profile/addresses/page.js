"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clsx } from "clsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  openAddAddressModal,
  closeAddAddressModal,

  openDeleteAddressModal,
  closeDeleteAddressModal,
  setCurrentAddressDetails,

  fetchAddresses,
  addAddress,
  deleteAddress,
} from "@/redux/slices/addressModalSlice";
import OverlayContainer from "@/components/ui/OverlayContainer";
import LoadingOverlay from "@/components/ui/LoadingIcon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

function Skeleton() {
  return (
    <div className="grid gap-3">
      {Array(3).fill(0).map((_, i) => {
        const arr = Array(5).fill(0);

        return (
          <div
            key={i}
            className="bg-background"
          >
            <table className="w-full">
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 border-r border-border">
                    <span className="skeleton">loading... loading... loading...</span>
                  </td>
                </tr>

                {arr.map((_, i) => {
                  return (
                    <tr
                      key={i}
                      className={clsx("grid grid-cols-2",
                        i <= arr.length - 2
                          ? "border-b border-border"
                          : ""
                      )}>
                      <td className="p-3 border-r border-border">
                        <span className="skeleton">loading...</span>
                      </td>

                      <td className="p-3">
                        <span className="skeleton">loading...</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

const addAddressValidationSchema = Yup.object().shape({
  country: Yup.string()
    .required("Country is required")
    .min(2, "Country name must be at least 2 characters")
    .max(50, "Country name cannot exceed 50 characters"),
  state: Yup.string()
    .required("State is required")
    .min(2, "State name must be at least 2 characters")
    .max(50, "State name cannot exceed 50 characters"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name cannot exceed 50 characters"),
  street: Yup.string()
    .required("Street address is required")
    .min(5, "Street address must be at least 5 characters")
    .max(100, "Street address cannot exceed 100 characters"),
  postalCode: Yup.string()
    .required("Postal code is required")
    .matches(/^\d{4,10}$/, "Postal code must be between 4 and 10 digits"),
});

function AddAddressModal() {
  const dispatch = useDispatch();

  const { addAddressModalIsOpen } = useSelector((state) => state.addressModal);

  const close = useCallback(
    () => dispatch(closeAddAddressModal()),
    [dispatch]
  );

  return (
    <OverlayContainer
      isOpen={addAddressModalIsOpen}
      title="Add address"
      onClose={close}
      transition="fade"
      width="md"
    >
      <Formik
        key={addAddressModalIsOpen} // This forces a reset when the boolean changes
        initialValues={{
          country: "",
          city: "",
          state: "",
          street: "",
          postalCode: "",
        }}
        validationSchema={addAddressValidationSchema}
        onSubmit={(data) => {
          dispatch(addAddress(data));
          dispatch(closeAddAddressModal());
        }}
      >
        {({ isSubmitting, values, handleChange, errors, touched }) => (
          <Form
            className="grid gap-3"
            aria-busy={(isSubmitting)}
          >
            <LoadingOverlay show={isSubmitting} />

            <Input
              name="country"
              placeholder="Country"
              size="small"
              value={values.country}
              onChange={handleChange}
              error={touched.country && !!errors.country}
              errorText={touched.country && errors.country}
              autoComplete="country-name"
            />

            <Input
              name="city"
              placeholder="City"
              size="small"
              value={values.city}
              onChange={handleChange}
              error={touched.city && !!errors.city}
              errorText={touched.city && errors.city}
              autoComplete="address-level2"
            />

            <Input
              name="state"
              placeholder="State"
              size="small"
              value={values.state}
              onChange={handleChange}
              error={touched.state && !!errors.state}
              errorText={touched.state && errors.state}
              autoComplete="address-level1"
            />

            <Input
              name="street"
              placeholder="Street"
              size="small"
              value={values.street}
              onChange={handleChange}
              error={touched.street && !!errors.street}
              errorText={touched.street && errors.street}
              autoComplete="street-address"
            />

            <Input
              name="postalCode"
              placeholder="Postal Code"
              size="small"
              value={values.postalCode}
              onChange={handleChange}
              error={touched.postalCode && !!errors.postalCode}
              errorText={touched.postalCode && errors.postalCode}
              autoComplete="postal-code"
            />

            <Button
              className="w-full"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {(isSubmitting) ? "Adding..." : "Add"}
            </Button>
          </Form>
        )}
      </Formik>
    </OverlayContainer>
  )
}

function NoAddresses() {
  const dispatch = useDispatch();

  return (
    <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
      <ErrorDisplay
        srcImage="/images/maps-and-flags.png"
        error="Oops! You haven’t added any address yet."
        description="It looks like you haven’t added an address yet. Please add an address to your account to place an order more easily."
        buttonText="Add address"
        ButtonVariant="primary"
        onClick={() => dispatch(openAddAddressModal())}
      />
    </div>
  )
}

function DeleteAddressModal() {
  const dispatch = useDispatch();

  const {
    currentAddressDetails,
    deleteAddressModalIsOpen
  } = useSelector((state) => state.addressModal);

  const { country, city, street } = currentAddressDetails;

  const close = useCallback(
    () => dispatch(closeDeleteAddressModal()),
    [dispatch]
  );

  const deleteAdrs = () => {
    dispatch(closeDeleteAddressModal());
    dispatch(deleteAddress());
  }

  return (
    <OverlayContainer
      isOpen={deleteAddressModalIsOpen}
      title="Delete address"
      onClose={close}
      transition="fade"
      width="md"
    >
      <div className="flex flex-col items-center">
        <p className="text-warning text-center">
          Are you sure you want to delete this address?
        </p>
        <p className="font-semibold text-center line-clamp-1">
          {country}, {city}, {street}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <Button
          variant="secondary"
          onClick={close}>
          Cancel
        </Button>

        <Button
          variant="error"
          onClick={deleteAdrs}
        >
          Delete
        </Button>
      </div>
    </OverlayContainer>
  )
}

function AddressesList() {
  const dispatch = useDispatch();

  const { addresses } = useSelector((state) => state.addressModal);

  const open = (currentAddressDetails) => {
    dispatch(setCurrentAddressDetails(currentAddressDetails));
    dispatch(openDeleteAddressModal());
  }

  return (
    <div className="grid gap-3">
      {addresses.map((address) => {
        const { country, state, city, street, postalCode } = address;

        return (
          <div
            key={address._id}
            className="bg-background border border-border rounded-sm shadow-sm overflow-hidden"
          >
            <table className="w-full">
              <tbody>
                <tr className="grid grid-cols-[1fr_auto] border-b border-border">
                  <td className="p-3 font-medium border-r border-border">
                    {country}, {city}, {street}, {postalCode}.
                  </td>

                  <td className="p-3">
                    <DeleteIcon
                      className="text-error cursor-pointer"
                      onClick={() => open(address)}
                    />
                  </td>
                </tr>

                <tr className={"grid grid-cols-2 border-b border-border"}>
                  <td className="p-3 font-medium border-r border-border">
                    Country:
                  </td>

                  <td className="p-3">
                    {country}
                  </td>
                </tr>

                <tr className={"grid grid-cols-2 border-b border-border"}>
                  <td className="p-3 font-medium border-r border-border">
                    State:
                  </td>

                  <td className="p-3">
                    {state}
                  </td>
                </tr>

                <tr className={"grid grid-cols-2 border-b border-border"}>
                  <td className="p-3 font-medium border-r border-border">
                    City:
                  </td>

                  <td className="p-3">
                    {city}
                  </td>
                </tr>

                <tr className={"grid grid-cols-2 border-b border-border"}>
                  <td className="p-3 font-medium border-r border-border">
                    Street:
                  </td>

                  <td className="p-3">
                    {street}
                  </td>
                </tr>

                <tr className={"grid grid-cols-2"}>
                  <td className="p-3 font-medium border-r border-border">
                    Postal Code:
                  </td>

                  <td className="p-3">
                    {postalCode}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default function AddressesPage() {
  const dispatch = useDispatch();

  const { status, addresses, error } = useSelector(
    (state) => state.addressModal
  );

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <Skeleton />;

  if (status === "succeeded" && addresses.length === 0) {
    return (
      <>
        <AddAddressModal />
        <NoAddresses />
      </>
    )
  };

  if (status === "succeeded" && addresses.length > 0) {
    return (
      <>
        <AddAddressModal />

        <DeleteAddressModal />

        <div className="grid gap-3">
          <Button
            variant="primary"
            onClick={() => dispatch(openAddAddressModal())}
          >
            Add new address
          </Button>

          <AddressesList />
        </div>
      </>
    )
  }

  if (status === "failed") throw error;
}

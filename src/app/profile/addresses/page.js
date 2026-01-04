"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clsx } from "clsx";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  openDeleteAddressModal,
  closeDeleteAddressModal,
  setCurrentAddressDetails,
  fetchAddresses,
  deleteAddress
} from "@/redux/slices/addressModalSlice";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import CloseButton from "@/components/ui/CloseButton";
import Button from "@/components/ui/Button";

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

function NoAddresses() {
  // const dispatch = useDispatch();

  return (
    <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
      <ErrorDisplay
        srcImage="/images/maps-and-flags.png"
        error="Oops! You haven’t added any address yet."
        description="It looks like you haven’t added an address yet. Please add an address to your account to place an order more easily."
        buttonText="Add address"
        ButtonVariant="primary"
      // onClick={() => dispatch(openAddressModal())}
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
    <div
      className={clsx(
        "bg-overlay fixed inset-0 z-10 flex items-center justify-center px-3 transition-all",
        deleteAddressModalIsOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      onClick={close}
    >
      <div
        className="relative bg-background w-full md:w-112.5 rounded-md p-3 flex flex-col gap-3 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Delete address
          </h1>
          <CloseButton onClick={close} />
        </div>

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
      </div>
    </div>
  )
}

function AddressesList() {
  const dispatch = useDispatch();

  const { addresses } = useSelector((state) => state.addressModal);

  const open = (currentAddressDetails) => {
    dispatch(setCurrentAddressDetails(currentAddressDetails));
    dispatch(openDeleteAddressModal());
  }

  function camelCaseToWords(text) {
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase();
  }

  return (
    <div className="grid gap-3">
      {addresses.map((address) => {
        const { country, city, street, postalCode } = address;
        const addressEntries = Object.entries(address);

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

                {addressEntries.map((item, i) => {
                  const key = item[0];
                  const value = item[1];

                  if (key === "_id") return null;

                  return (
                    <tr
                      key={i}
                      className={clsx("grid grid-cols-2",
                        i <= addressEntries.length - 3
                          ? "border-b border-border"
                          : ""
                      )}>
                      <td className="p-3 font-medium capitalize border-r border-border">
                        {camelCaseToWords(key)}:
                      </td>

                      <td className="p-3">
                        {value}
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

export default function AddressesPage() {
  const dispatch = useDispatch();

  const { status, addresses, error } = useSelector(
    (state) => state.addressModal
  );

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <Skeleton />;

  if (status === "succeeded" && addresses.length === 0) return <NoAddresses />;

  if (status === "succeeded" && addresses.length > 0) {
    return (
      <>
        <DeleteAddressModal />
        <AddressesList />
      </>
    )
  }

  if (status === "failed") throw error;
}

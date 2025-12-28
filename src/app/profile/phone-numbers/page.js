"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import clsx from "clsx";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  openPhoneNumberModal,
  openDeletePhoneNumberModal,
  closeDeletePhoneNumberModal,
  setCurrentPhoneNumberDetails,
  fetchPhoneNumbers,
  deletePhoneNumber
} from "@/redux/slices/phoneNumberModalSlice";
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import CloseButton from "@/components/ui/CloseButton";
import Button from '@/components/ui/Button';

function securePhoneNumber(phone) {
  if (!phone) return "";

  // Extract country code if exists (e.g. +212)
  const countryMatch = phone.match(/^(\+\d{1,3})/);
  const countryCode = countryMatch ? countryMatch[1] : "";
  const rest = phone.replace(countryCode, "");

  if (rest.length <= 3) return phone;

  const visibleEnd = rest.slice(-3);
  const masked = rest.slice(0, -3).replace(/\d/g, "*");

  return `${countryCode}${masked}${visibleEnd}`;
}

function Skeleton() {
  return (
    <ul className="grid gap-1.5">
      {Array(3).fill(0).map((_, i) => {
        return (
          <li key={i} className="bg-background p-3">
            <span className="skeleton">
              Loading... Loading...
            </span>
          </li>
        );
      })}
    </ul>
  )
}

function NoPhoneNumbers() {
  const dispatch = useDispatch()

  return (
    <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
      <ErrorDisplay
        srcImage="/images/telephone.png"
        error="Oops! You haven`t added any phone number yet."
        description="It looks like you haven’t added a phone number yet. Please add a phone number to your account to be able to place an order."
        buttonText="Add phone number"
        ButtonVariant="primary"
        onClick={() => dispatch(openPhoneNumberModal())}
      />
    </div>
  )
}

function DeletePhoneNumberModal() {
  const dispatch = useDispatch();

  const {
    currentPhoneNumberDetails,
    deletePhoneNumberModalIsOpen
  } = useSelector((state) => state.phoneNumberModal);

  const phoneNumber = currentPhoneNumberDetails?.phoneNumber;

  const close = useCallback(
    () => dispatch(closeDeletePhoneNumberModal()),
    [dispatch]
  );

  const deletePhone = () => {
    dispatch(closeDeletePhoneNumberModal());
    dispatch(deletePhoneNumber());
  }

  return (
    <div
      className={clsx(
        "bg-overlay fixed inset-0 z-10 flex items-center justify-center px-3 transition-all",
        deletePhoneNumberModalIsOpen
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
            Delete phone number
          </h1>
          <CloseButton onClick={close} />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-center text-warning">
            Are you sure you want to delete this phone number?
          </p>
          <p className="font-semibold">
            {phoneNumber && securePhoneNumber(phoneNumber)}
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
            onClick={deletePhone}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

function PhoneNumbersList() {
  const dispatch = useDispatch();

  const { phoneNumbers } = useSelector(
    (state) => state.phoneNumberModal
  );

  const open = (currentPhoneNumberDetails) => {
    dispatch(setCurrentPhoneNumberDetails(currentPhoneNumberDetails));
    dispatch(openDeletePhoneNumberModal());
  }

  return (
    <ul className="grid gap-1.5">
      {phoneNumbers.map((item) => {
        const isVerified = item.isVerified;

        return (
          <li
            key={item._id}
            className="grid grid-cols-[1fr_auto_auto] border border-border rounded-sm shadow-sm overflow-hidden"
          >
            <div className="bg-background p-3 border-r border-border">
              {securePhoneNumber(item.phoneNumber)}
            </div>

            <div className="bg-background p-3 border-r border-border">
              {isVerified ? (
                <CheckCircleIcon className="text-success" />
              ) : (
                <DoNotDisturbIcon className="text-error" />
              )}
            </div>

            <div className="bg-background p-3">
              <DeleteIcon
                className="text-error cursor-pointer"
                onClick={() => open(item)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  )
}

export default function PhoneNumbersPage() {
  const dispatch = useDispatch();

  const { status, phoneNumbers, error } = useSelector(
    (state) => state.phoneNumberModal
  );

  useEffect(() => {
    dispatch(fetchPhoneNumbers());
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <Skeleton />;

  if (status === "succeeded" && phoneNumbers.length === 0) return <NoPhoneNumbers />

  if (status === "succeeded" && phoneNumbers.length > 0) {
    return (
      <>
        <DeletePhoneNumberModal />

        <div className="grid gap-1.5">
          <PhoneNumbersList />

          <Button
            variant="primary"
            onClick={() => dispatch(openPhoneNumberModal())}
          >
            Add new phone
          </Button>
        </div>
      </>
    );
  }

  if (status === "failed") throw error;
}

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchPhoneNumbers, openPhoneNumberModal } from "@/redux/slices/phoneNumberModalSlice";
import ErrorDisplay from '@/components/ui/ErrorDisplay';
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

export default function phoneNumbersPage() {
  const dispatch = useDispatch();

  const { status, phoneNumbers, error } = useSelector(
    (state) => state.phoneNumberModal
  );

  useEffect(() => {
    dispatch(fetchPhoneNumbers());
  }, [dispatch]);

  if (status === "idle" || status === "loading") {
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

  if (status === "succeeded" && phoneNumbers.length === 0) {
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
    );
  }

  if (status === "succeeded" && phoneNumbers.length > 0) {
    return (
      <div className="grid gap-1.5">
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
                  <DeleteIcon className="text-error cursor-pointer" />
                </div>
              </li>
            );
          })}
        </ul>

        <Button
          variant="primary"
          onClick={() => dispatch(openPhoneNumberModal())}
        >
          Add new phone
        </Button>
      </div>
    );
  }

  if (status === "failed") {
    throw error
  }
}

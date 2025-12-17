"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import Button from "./Button";
import LoadingIcon from "./loadingIcon/LoadingIcon";
import CloseButton from "./CloseButton";
import apiClient from "@/services/apiClient";

const checkoutValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Select phone number"),
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

const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-background/50 cursor-wait flex justify-center items-center">
    <LoadingIcon />
  </div>
);

const Message = ({ type, text }) => {
  if (!text) return null;
  const color = type === "fail" ? "text-red-500" : "text-green-500";
  return <p className={`${color} text-center`}>{text}</p>;
};

const InputField = ({ name, placeholder, autoComplete }) => (
  <div>
    <Field
      name={name}
      type="text"
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="input-small"
    />

    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm pt-0.5"
    />
  </div>
);

export default function CheckOutSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState({
    status: "idle",
    data: [],
  });
  const [phoneNumbers, setPhoneNumbers] = useState({
    status: "idle",
    data: [],
  });
  const [error, setError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      setPhoneNumbers(prev => ({
        ...prev,
        status: "loading",
      }));

      try {
        const res = await apiClient.get("/customer/phone-numbers");
        setPhoneNumbers({
          status: "succeeded",
          data: res.data.data,
        });
      } catch {
        setPhoneNumbers(prev => ({
          ...prev,
          status: "failed",
        }));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setAddresses(prev => ({
        ...prev,
        status: "loading",
      }));

      try {
        const res = await apiClient.get("/customer/addresses");
        setAddresses({
          status: "succeeded",
          data: res.data.data,
        });
      } catch {
        setAddresses(prev => ({
          ...prev,
          status: "failed",
        }));
      }
    })();
  }, []);

  const handleCheckoutSubmit = async ({
    paymentMethod,
    phoneNumber: phone,
    country,
    city,
    state,
    street,
    postalCode,
  }) => {
    setError(null);

    const data = { phone, country, city, state, street, postalCode };

    const endpointMap = {
      stripeCheckoutSession: "/customer/orders/stripe-checkout-session",
      cashOnDelivery: "/customer/orders/cash-on-delivery",
    };

    const endpoint = endpointMap[paymentMethod];
    if (!endpoint) return;

    try {
      const res = await apiClient.post(endpoint, data);

      if (res?.data?.status !== "Success") return;

      setIsRedirecting(true);

      if (res.data.sessionURL) {
        router.push(res.data.sessionURL);
      } else {
        router.push("/profile/orders");
      }
    } catch {
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <>
      {/* Checkout Button */}
      <div>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          Checkout
        </Button>
      </div>

      {/* Overlay */}
      <div
        className={clsx(
          "fixed top-0 left-0 z-20 w-full h-full bg-overlay transition-all",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={clsx(
          "fixed top-0 left-0 z-20 w-full overflow-auto md:w-[70%] lg:w-[50%] h-full p-3 flex flex-col gap-3 bg-background shadow-md transform transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Checkout</h2>
          <CloseButton onClick={() => setIsOpen(false)} />
        </div>

        <Formik
          initialValues={{
            paymentMethod: "stripeCheckoutSession",
            selectedAddressId: "",
            phoneNumber: "",
            country: "",
            city: "",
            state: "",
            street: "",
            postalCode: "",
          }}
          validationSchema={checkoutValidationSchema}
          onSubmit={handleCheckoutSubmit}
        >
          {({ isSubmitting, values, setValues }) => (
            <Form
              className="relative p-3 grid gap-3 border border-border rounded-sm shadow-sm"
              aria-busy={isSubmitting}
            >
              {(isSubmitting || isRedirecting) && <LoadingOverlay />}

              {error && (
                <Message type="fail" text={error} />
              )}

              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  type="button"
                  className="w-full flex gap-0.5"
                  variant={
                    values.paymentMethod === "stripeCheckoutSession"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    setValues((prev) => ({
                      ...prev,
                      paymentMethod: "stripeCheckoutSession",
                    }))
                  }
                >
                  <CreditCardIcon />
                  <span className="line-clamp-1">Credit Card</span>
                </Button>

                <Button
                  type="button"
                  className="w-full flex gap-0.5"
                  variant={
                    values.paymentMethod === "cashOnDelivery"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    setValues((prev) => ({
                      ...prev,
                      paymentMethod: "cashOnDelivery",
                    }))
                  }
                >
                  <DeliveryDiningIcon />
                  <span className="line-clamp-1">Cash on Delivery</span>
                </Button>
              </div>

              <div>
                <Field
                  as="select"
                  name="phoneNumber"
                  className="input-small"
                  disabled={phoneNumbers.data.length === 0}
                >
                  <option value="">-- Select phone number --</option>
                  {phoneNumbers.data.map((p) => (
                    <option key={p._id} value={p.phoneNumber}>
                      {p.phoneNumber}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm pt-0.5"
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="selectedAddressId"
                  className="input-small"
                  disabled={addresses.data.length === 0}
                  onChange={(e) => {
                    const addressId = e.target.value;

                    if (!addressId) {
                      setValues((prev) => ({
                        ...prev,
                        selectedAddressId: "",
                        country: "",
                        city: "",
                        state: "",
                        street: "",
                        postalCode: "",
                      }));
                      return;
                    }

                    const address = addresses.data.find((a) => a._id === addressId);
                    if (!address) return;

                    setValues((prev) => ({
                      ...prev,
                      selectedAddressId: addressId,
                      country: address.country,
                      city: address.city,
                      state: address.state,
                      street: address.street,
                      postalCode: address.postalCode,
                    }));
                  }}
                >
                  <option value="">-- Select address --</option>

                  {addresses.data.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.city} – {address.street}
                    </option>
                  ))}
                </Field>
              </div>

              <InputField
                name="country"
                placeholder="Country"
                autoComplete="country-name"
              />

              <InputField
                name="city"
                placeholder="City"
                autoComplete="address-level2"
              />

              <InputField
                name="state"
                placeholder="State"
                autoComplete="address-level1"
              />

              <InputField
                name="street"
                placeholder="Street"
                autoComplete="street-address"
              />

              <InputField
                name="postalCode"
                placeholder="Postal Code"
                autoComplete="postal-code"
              />

              <Button
                className="w-full"
                variant="primary"
                type="submit"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? "Processing..." : "Checkout"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

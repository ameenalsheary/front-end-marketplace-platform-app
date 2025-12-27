"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import Input from "../ui/Input";
import Button from "../ui/Button";
import LoadingOverlay from "../ui/LoadingIcon";
import FormErrorMessage from "../ui/FormErrorMessage";
import CloseButton from "../ui/CloseButton";
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

const Message = ({ type, text }) => {
  if (!text) return null;
  const color = type === "fail" ? "text-error" : "text-success";
  return <p className={`${color} text-sm text-center`}>{text}</p>;
};

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
  const [errorMessage, setErrorMessage] = useState(null);
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
    setErrorMessage(null);

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
      setErrorMessage("Something went wrong. Please try again");
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
          {({ isSubmitting, values, handleChange, setValues, errors, touched }) => (
            <Form
              className="relative p-3 grid gap-3 border border-border rounded-sm shadow-sm"
              aria-busy={(isSubmitting || isRedirecting)}
            >
              <LoadingOverlay show={isSubmitting || isRedirecting} />

              <FormErrorMessage type={"fail"} text={errorMessage} />

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

              {/* Phone number */}
              <div>
                <select
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  disabled={phoneNumbers.data.length === 0}
                  className={`input-base input-sm ${touched.phoneNumber && errors.phoneNumber ? "input-error" : "input-default"}`}
                >
                  <option value="">-- Select phone number --</option>
                  {phoneNumbers.data.map((p) => (
                    <option key={p._id} value={p.phoneNumber}>
                      {p.phoneNumber}
                    </option>
                  ))}
                </select>

                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="text-error text-sm pt-0.5">
                    {errors.phoneNumber}
                  </div>
                )}
              </div>

              {/* Address selector */}
              {addresses.data.length > 0 && (
                <select
                  name="selectedAddressId"
                  value={values.selectedAddressId}
                  className="input-base input-default input-sm"
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
                </select>
              )}

              {/* Address fields */}
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
                disabled={isSubmitting || isRedirecting}
              >
                {(isSubmitting || isRedirecting) ? "Processing..." : "Checkout"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

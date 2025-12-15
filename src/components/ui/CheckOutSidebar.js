"use client";

import { useState } from "react";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import Button from "./Button";
import LoadingIcon from "./loadingIcon/LoadingIcon";
import CloseButton from "./CloseButton";

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

const addresses = [
  {
    "country": "Morocco",
    "state": "Tangier-Tetouan-Al Hoceima",
    "city": "Tangier",
    "street": "Rue Moulay Ismail, Apt 5",
    "postalCode": "90000",
    "_id": "a1f3c9e239f3a90774895001"
  },
  {
    "country": "Morocco",
    "state": "Rabat-Salé-Kénitra",
    "city": "Rabat",
    "street": "Avenue Mohammed V, Nr 22",
    "postalCode": "10000",
    "_id": "b2e7d8a239f3a90774895002"
  },
  {
    "country": "Morocco",
    "state": "Casablanca-Settat",
    "city": "Casablanca",
    "street": "Boulevard Zerktouni, Residence Al Amal",
    "postalCode": "20000",
    "_id": "c3a9f4b239f3a90774895003"
  },
  {
    "country": "Morocco",
    "state": "Marrakesh-Safi",
    "city": "Marrakesh",
    "street": "Derb Dabachi, Nr 14",
    "postalCode": "40000",
    "_id": "d4b2e7c239f3a90774895004"
  },
  {
    "country": "Morocco",
    "state": "Fes-Meknes",
    "city": "Fes",
    "street": "Rue Talaa Kebira, House 8",
    "postalCode": "30000",
    "_id": "e5c8a1d239f3a90774895005"
  }
];

export default function CheckOutSidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
          "fixed top-0 left-0 w-full h-full bg-overlay z-20 transition-all",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={clsx(
          "fixed top-0 left-0 w-full overflow-auto md:w-[70%] lg:w-[50%] h-full bg-background p-3 flex flex-col gap-6 shadow-md z-20 transform transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <CloseButton onClick={() => setIsOpen(false)} />
        </div>

        <Formik
          initialValues={{
            paymentMethod: "stripeCheckoutSession",
            selectedAddressId: "",
            country: "",
            city: "",
            state: "",
            street: "",
            postalCode: "",
          }}
          onSubmit={async (data) => {
            console.log(data);
          }}
        >
          {({ isSubmitting, values, setValues }) => (
            <Form
              className="relative p-3 grid gap-3 border border-border rounded-sm shadow-sm"
              aria-busy={isSubmitting}
            >
              {isSubmitting && <LoadingOverlay />}

              <Message type="fail" text={null} />

              <div className="flex gap-3">
                <Button
                  type="button"
                  className="w-full flex gap-0.5"
                  variant={
                    values.paymentMethod === "stripeCheckoutSession"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    setValues(prev => ({
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
                    setValues(prev => ({
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
                  name="selectedAddressId"
                  className="input-small"
                  onChange={(e) => {
                    const addressId = e.target.value;

                    if (!addressId) {
                      setValues(prev => ({
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

                    const address = addresses.find(a => a._id === addressId);
                    if (!address) return;

                    setValues(prev => ({
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

                  {addresses.map(address => (
                    <option key={address._id} value={address._id}>
                      {address.city} – {address.street}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm pt-0.5"
                />
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
                disabled={isSubmitting}
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

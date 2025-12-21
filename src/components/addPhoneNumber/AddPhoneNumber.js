"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import LoadingIcon from "../ui/loadingIcon/LoadingIcon";
import Button from "../ui/Button";
import { app } from "@/lib/firebase";
import apiClient from "@/services/apiClient";
import { getFirebaseErrorMessage } from "@/lib/utilities/getFirebaseErrorMessage";

const phoneValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .test(
      "is-valid-phone",
      "Invalid phone number",
      (value) => value && isValidPhoneNumber(value)
    ),
});

const verificationValidationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Verification Code is required")
    .length(6, "Verification code must be 4–6 digits"),
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

export default function AddPhoneNumber() {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [idToken, setIdToken] = useState(null);

  const auth = getAuth(app);

  // Initialize reCAPTCHA verifier on component mount
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  }, [auth]);

  const handleError = (err) => {
    console.log(err);

    const isFirebaseError = err?.code?.startsWith("auth/");

    setErrorMessage(
      isFirebaseError
        ? getFirebaseErrorMessage(err)
        : "Something went wrong, Please try again"
    );
  };

  const handlePhoneSubmit = async ({ phoneNumber }) => {
    setErrorMessage(null);

    try {
      // Step 1: Fetch existing phone numbers
      const { data } = await apiClient.get(`/customer/phone-numbers`);

      const existingNumbers = data?.data || [];

      // Step 2: Check if phone number already exists
      const alreadyExists = existingNumbers.some(
        (item) => item.phoneNumber === phoneNumber
      );

      if (alreadyExists) {
        setErrorMessage("This phone number already exists in your account.");
        return;
      }

      // Step 3: Send verification code via Firebase
      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
    } catch (err) {
      handleError(err);
    }
  };

  const handleVerificationSubmit = async ({ verificationCode }) => {
    setErrorMessage(null);

    try {
      // Step 1: Confirm code if not already confirmed
      let finalToken = idToken;

      if (!isCodeConfirmed) {
        const result = await confirmationResult.confirm(verificationCode);
        finalToken = await result.user.getIdToken();
        setIsCodeConfirmed(true);
        setIdToken(finalToken);
      }

      // Step 2: Submit the verified phone number to your backend
      await apiClient.post(`/customer/phone-numbers`, {
        idToken: finalToken,
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      {/* reCAPTCHA container (invisible) */}
      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={phoneValidationSchema}
          onSubmit={handlePhoneSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="relative p-3 grid gap-3 bg-background rounded-sm shadow-sm">
              {isSubmitting && <LoadingOverlay />}

              {errorMessage && (
                <Message type="fail" text={errorMessage} />
              )}

              <div>
                <PhoneInput
                  international
                  defaultCountry="MA" // Morocco as default
                  value={values.phoneNumber}
                  onChange={(value) =>
                    setFieldValue("phoneNumber", value)
                  }
                  className="phone-input"
                />

                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm pt-1"
                />
              </div>

              <Button
                className="w-full"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ verificationCode: "" }}
          validationSchema={verificationValidationSchema}
          onSubmit={handleVerificationSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="relative p-3 grid gap-3 bg-background rounded-sm shadow-sm">
              {isSubmitting && <LoadingOverlay />}

              {errorMessage && <Message type="fail" text={errorMessage} />}

              <div>
                <Field
                  name="verificationCode"
                  type="text"
                  placeholder="Verification code"
                  className="input-small"
                />

                <ErrorMessage
                  name="verificationCode"
                  component="div"
                  className="text-red-500 text-sm pt-0.5"
                />
              </div>

              <Button
                className="w-full"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import OverlayContainer from "../ui/OverlayContainer";
import LoadingOverlay from "../ui/LoadingIcon";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { app } from "@/lib/firebase";
import apiClient from "@/services/apiClient";
import { getFirebaseErrorMessage } from "@/lib/utilities/getFirebaseErrorMessage";
import FormErrorMessage from "../ui/FormErrorMessage";
import { setPhoneNumbers, closePhoneNumberModal } from "@/redux/slices/phoneNumberModalSlice";
import clsx from "clsx";

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
    .matches(/^[0-9]{4,6}$/, "Verification code must be 4–6 digits"),
});

export default function PhoneNumber() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.phoneNumberModal);

  const [confirmationResult, setConfirmationResult] = useState(null);
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [idToken, setIdToken] = useState(null);

  const auth = getAuth(app);

  // Init & cleanup reCAPTCHA (once per open)
  useEffect(() => {
    if (!isOpen) return;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }

    return () => {
      window.recaptchaVerifier?.clear();
      window.recaptchaVerifier = null;
    };
  }, [auth, isOpen]);

  // Reset all
  const resetAll = () => {
    setConfirmationResult(null);
    setPendingPhoneNumber();
    setErrorMessage(null);
    setIsCodeConfirmed(false);
    setIdToken(null);
  }

  // Reset local state when modal closes
  useEffect(() => {
    if (!isOpen) resetAll();
  }, [isOpen]);

  // Error handler
  const handleError = (err) => {
    console.log(err);

    const isFirebaseError = err?.code?.startsWith("auth/");
    setErrorMessage(
      isFirebaseError
        ? getFirebaseErrorMessage(err)
        : "Something went wrong. Please try again."
    );
  };

  const handlePhoneSubmit = async ({ phoneNumber }) => {
    // Clear previous error
    setErrorMessage(null);

    try {
      // Fetch user's existing phone numbers
      const { data } = await apiClient.get("/customer/phone-numbers");
      const existingNumbers = data?.data || [];

      // Check if phone number already exists
      const alreadyExists = existingNumbers.some(
        (item) => item.phoneNumber === phoneNumber
      );

      if (alreadyExists) {
        setErrorMessage("This phone number already exists in your account.");
        return;
      }

      // Send verification code using Firebase
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      // Save pending phone number for next step
      setPendingPhoneNumber(phoneNumber);

      // Save confirmation result for next step
      setConfirmationResult(confirmation);
    } catch (err) {
      handleError(err);
    }
  };

  const handleVerificationSubmit = async ({ verificationCode }) => {
    // Clear previous error
    setErrorMessage(null);

    try {
      // Ensure verification session exists
      if (!confirmationResult) {
        setErrorMessage("Session expired. Please try again.");
        return;
      }

      let finalToken = idToken;

      // Confirm code only once
      if (!isCodeConfirmed) {
        const result = await confirmationResult.confirm(verificationCode);
        finalToken = await result.user.getIdToken();
        setIsCodeConfirmed(true);
        setIdToken(finalToken);
      }

      // Save verified phone number in backend
      const { data } = await apiClient.post("/customer/phone-numbers", {
        idToken: finalToken,
      });

      // Update store and close modal
      if (data?.data) {
        dispatch(setPhoneNumbers(data.data));
        dispatch(closePhoneNumberModal());
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <OverlayContainer
      isOpen={isOpen}
      title={!confirmationResult ? "Add phone number" : "Verify phone number"}
      onClose={() => dispatch(closePhoneNumberModal())}
      transition="fade"
      width="md"
    >
      {/* First step: Phone number input form */}
      {!confirmationResult ? (
        <div>
          {/* reCAPTCHA container for phone verification */}
          <div id="recaptcha-container" />

          {/* Formik form for phone number input */}
          <Formik
            initialValues={{ phoneNumber: "" }}
            validationSchema={phoneValidationSchema}
            onSubmit={handlePhoneSubmit}
          >
            {({ isSubmitting, values, setFieldValue, errors, touched }) => (
              <Form className="grid gap-3">
                {/* Loading overlay during submission */}
                <LoadingOverlay show={isSubmitting} />

                {/* Error message display */}
                <FormErrorMessage type="fail" text={errorMessage} />

                {/* Phone input field */}
                <div>
                  <PhoneInput
                    international
                    defaultCountry="MA" // Default country Morocco
                    value={values.phoneNumber}
                    onChange={(value) =>
                      setFieldValue("phoneNumber", value)
                    }
                    className={clsx(
                      "phone-input-base input-md",
                      touched.phoneNumber && errors.phoneNumber
                        ? "phone-input-error"
                        : "phone-input-default"
                    )}
                  />
                  {/* Phone number validation error */}
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className="text-error text-sm pt-0.5">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>

                {/* Submit button for phone number */}
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
        </div>
      ) : (
        /* Second step: Verification code input form */
        <Formik
          initialValues={{ verificationCode: "" }}
          validationSchema={verificationValidationSchema}
          onSubmit={handleVerificationSubmit}
        >
          {({ isSubmitting, values, handleChange, errors, touched }) => (
            <Form className="grid gap-3">
              {/* Loading overlay during verification */}
              <LoadingOverlay show={isSubmitting} />

              {/* Verification info message - shows where code was sent */}
              <div>
                <p className="text-center">
                  We sent a verification code to
                </p>
                {/* Display phone number that received the code */}
                <p className="font-semibold text-center">
                  {pendingPhoneNumber}
                </p>
              </div>

              {/* Error message display */}
              <FormErrorMessage type="fail" text={errorMessage} />

              {/* Verification code input field */}
              <Input
                name="verificationCode"
                placeholder="Verification code"
                inputMode="numeric" // Shows numeric keyboard on mobile
                autoFocus // Automatically focuses on this input
                value={values.verificationCode}
                onChange={handleChange}
                error={
                  touched.verificationCode &&
                  !!errors.verificationCode
                }
                errorText={
                  touched.verificationCode &&
                  errors.verificationCode
                }
              />

              {/* Verify button */}
              <Button
                className="w-full"
                variant="primary"
                type="submit"
                disabled={isSubmitting || isCodeConfirmed}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </OverlayContainer>
  );
}

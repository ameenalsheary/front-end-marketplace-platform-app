"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import LoadingOverlay from "../ui/LoadingIcon";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { app } from "@/lib/firebase";
import apiClient from "@/services/apiClient";
import { getFirebaseErrorMessage } from "@/lib/utilities/getFirebaseErrorMessage";
import FormErrorMessage from "../ui/FormErrorMessage";
import CloseButton from "../ui/CloseButton";
import { closePhoneNumberModal } from "@/redux/slices/phoneNumberModalSlice";

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

function AddPhoneNumber() {
  const [confirmationResult, setConfirmationResult] = useState(false);
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

      // Step 3: Reload page
      window.location.reload();
    } catch (err) {
      handleError(err);
    }
  };

  if (!confirmationResult) {
    return (
      <div>
        {/* reCAPTCHA container (invisible) */}
        <div id="recaptcha-container"></div>

        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={phoneValidationSchema}
          onSubmit={handlePhoneSubmit}
        >
          {({ isSubmitting, values, setFieldValue, errors, touched }) => (
            <Form className="grid gap-3">
              <LoadingOverlay show={isSubmitting} />

              <FormErrorMessage type={"fail"} text={errorMessage} />

              <div>
                <PhoneInput
                  international
                  defaultCountry="MA" // Morocco as default
                  value={values.phoneNumber}
                  onChange={(value) =>
                    setFieldValue("phoneNumber", value)
                  }
                  className={`phone-input-base input-md ${touched.phoneNumber && errors.phoneNumber ? "phone-input-error" : "phone-input-default"}`}
                />

                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="text-red-500 text-sm pt-0.5">
                    {errors.phoneNumber}
                  </div>
                )}
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
      </div>
    )
  }

  return (
    <Formik
      initialValues={{ verificationCode: "" }}
      validationSchema={verificationValidationSchema}
      onSubmit={handleVerificationSubmit}
    >
      {({ isSubmitting, values, handleChange, errors, touched }) => (
        <Form className="grid gap-3">
          <LoadingOverlay show={isSubmitting} />

          <FormErrorMessage type={"fail"} text={errorMessage} />

          <Input
            name="verificationCode"
            placeholder="Verification code"
            size="medium"
            value={values.verificationCode}
            onChange={handleChange}
            error={touched.verificationCode && !!errors.verificationCode}
            errorText={touched.verificationCode && errors.verificationCode}
          />

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
  )
}

export default function PhoneNumber() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.phoneNumberModal);

  if (!isOpen) return null;

  return (
    <div
      className="bg-overlay fixed inset-0 z-10 flex justify-center items-center px-3"
      onClick={() => dispatch(closePhoneNumberModal())}
    >
      <div
        className="bg-background w-full md:w-112.5 rounded-md p-3 flex flex-col gap-3 shadow-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Add your phone number</h1>
          <CloseButton onClick={() => dispatch(closePhoneNumberModal())} />
        </div>

        <AddPhoneNumber />
      </div>
    </div>
  );
}

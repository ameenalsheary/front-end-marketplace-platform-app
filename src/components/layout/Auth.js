"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CloseButton from "../ui/CloseButton";
import Input from "../ui/Input";
import Button from "../ui/Button";
import LoadingOverlay from "../ui/LoadingIcon";
import FormErrorMessage from "../ui/FormErrorMessage";
import { closeAuthModal } from "@/redux/slices/authModalSlice";
import authService from "@/services/auth.service";
import CustomImage from "../ui/CustomImage";

// Validation
const emailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const verifySchema = Yup.object({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .matches(/^[0-9]{4,6}$/, "Verification code must be 4–6 digits"),
});

export default function Auth() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.authModal);

  const [step, setStep] = useState("email");
  const [signInRes, setSignInRes] = useState({});
  const [verifySignInRes, setVerifySignInRes] = useState({});

  const resetAll = () => {
    setSignInRes({});
    setVerifySignInRes({});
    setStep("email");
  };

  useEffect(() => {
    if (!isOpen) resetAll();
  }, [isOpen]);

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }

  return (
    // Main modal container - covers entire screen
    <div
      className={clsx(
        "bg-overlay fixed inset-0 z-10 flex items-center justify-center px-3 transition-all",
        // Show/hide logic based on modal state
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      // Close modal when clicking backdrop
      onClick={() => dispatch(closeAuthModal())}
    >
      {/* Modal content card */}
      <div
        className="bg-background w-full md:w-112.5 rounded-md p-3 flex flex-col gap-3 shadow-md relative overflow-hidden"
        // Prevent clicks inside modal from closing it
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header with title and close button */}
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <CloseButton onClick={() => dispatch(closeAuthModal())} />
        </div>

        {/* STEP 1: Email input for authentication */}
        {step === "email" && (
          <>
            {/* Google OAuth button */}
            <Button
              variant="secondary"
              className="gap-1.5"
              onClick={handleGoogleAuth}
            >
              <CustomImage
                src="/images/google-icon.png"
                width={32}
                height={32}
                alt="Google Icon"
                className="size-5"
              />
              <span className="mr-2">Continue with Google</span>
            </Button>

            {/* Separator between Google and email options */}
            <div className="flex items-center gap-1.5">
              <hr className="grow border-t border-border" />
              <span>or continue with email</span>
              <hr className="grow border-t border-border" />
            </div>

            {/* Email form using Formik for validation and submission */}
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailSchema}
              onSubmit={async ({ email }) => {
                // Send email for authentication
                const res = await authService.signIn(email);
                setSignInRes(res);
                // If email sent successfully, move to verification step
                if (res.status === "Success") setStep("verify");
              }}
            >
              {({ isSubmitting, values, handleChange, errors, touched }) => (
                <Form className="w-full flex flex-col gap-3">
                  {/* Loading overlay during submission */}
                  <LoadingOverlay show={isSubmitting} />

                  {/* Show error messages if not loading */}
                  {!isSubmitting && <FormErrorMessage type={signInRes.status} text={signInRes.message} />}

                  {/* Email input field */}
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    size="small"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && !!errors.email}
                    errorText={touched.email && errors.email}
                  />

                  {/* Submit button */}
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In / Sign Up"}
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}

        {/* STEP 2: Verification code input */}
        {step === "verify" && (
          <Formik
            initialValues={{ verificationCode: "" }}
            validationSchema={verifySchema}
            onSubmit={async ({ verificationCode }) => {
              // Verify the code sent to email
              const res = await authService.verifySignIn(
                signInRes.email,
                verificationCode
              );
              setVerifySignInRes(res);
              // If verification successful, close modal and refresh page
              if (res.status === "Success") {
                dispatch(closeAuthModal());
                resetAll();
                window.location.reload();
              }
            }}
          >
            {({ isSubmitting, values, handleChange, errors, touched }) => (
              <Form className="w-full flex flex-col gap-3">
                {/* Loading overlay during verification */}
                <LoadingOverlay show={isSubmitting} />

                {/* Show the email being verified with option to change */}
                {signInRes?.status === "Success" && (
                  <div className="flex flex-col">
                    <p className="text-center">{signInRes.message}</p>
                    <div className="flex justify-center gap-0.5">
                      <p className="font-semibold">{signInRes.email}</p>
                      <span
                        className="text-primary font-semibold cursor-pointer"
                        onClick={resetAll}
                      >
                        change
                      </span>
                    </div>
                  </div>
                )}

                {/* Show verification errors if not loading */}
                {!isSubmitting && <FormErrorMessage type={verifySignInRes.status} text={verifySignInRes.message} />}

                {/* Verification code input field */}
                <Input
                  name="verificationCode"
                  placeholder="Enter your verification code"
                  size="small"
                  inputMode="numeric" // Shows numeric keyboard on mobile
                  autoFocus // Automatically focuses on this input
                  value={values.verificationCode}
                  onChange={handleChange}
                  error={touched.verificationCode && !!errors.verificationCode}
                  errorText={touched.verificationCode && errors.verificationCode}
                />

                {/* Verify button */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify & Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

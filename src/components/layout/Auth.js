"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CloseButton from "../ui/CloseButton";
import LoadingIcon from "../ui/loadingIcon/LoadingIcon";
import Button from "../ui/Button";
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
    .matches(/^[0-9]{4,6}$/, "Verification code must be 4–6 digits")
    .required("Verification code is required"),
});

// Small reusable overlay
const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-background opacity-50 cursor-wait flex justify-center items-center">
    <LoadingIcon />
  </div>
);

// Small reusable message
const Message = ({ type, text }) => {
  if (!text) return null;
  const color = type === "fail" ? "text-red-500" : "text-green-500";
  return <p className={`${color} text-sm text-center`}>{text}</p>;
};

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

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }

  if (!isOpen) return null;

  return (
    <div
      className="bg-overlay fixed inset-0 z-10 flex justify-center items-center px-3"
      onClick={() => dispatch(closeAuthModal())}
    >
      <div
        className="bg-background w-full md:w-[450px] rounded-md p-3 flex flex-col gap-3 shadow-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <CloseButton onClick={() => dispatch(closeAuthModal())} />
        </div>

        {/* Email Step */}
        {step === "email" && (
          <>
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

            <div className="flex items-center gap-1.5">
              <hr className="flex-grow border-t border-border" />
              <span>or continue with email</span>
              <hr className="flex-grow border-t border-border" />
            </div>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailSchema}
              onSubmit={async ({ email }) => {
                const res = await authService.signIn(email);
                setSignInRes(res);
                if (res.status === "Success") setStep("verify");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full flex flex-col gap-3">
                  {isSubmitting && <LoadingOverlay />}

                  <Message type={signInRes.status} text={signInRes.message} />

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="input-small"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm pt-0.5"
                    />
                  </div>

                  <Button variant="primary" type="submit">
                    {isSubmitting ? "Signing in..." : "Sign In / Sign Up"}
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <Formik
            initialValues={{ verificationCode: "" }}
            validationSchema={verifySchema}
            onSubmit={async ({ verificationCode }) => {
              const res = await authService.verifySignIn(
                signInRes.email,
                verificationCode
              );
              setVerifySignInRes(res);
              if (res.status === "Success") {
                dispatch(closeAuthModal());
                resetAll();
                window.location.reload();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-3">
                {isSubmitting && <LoadingOverlay />}

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

                <Message
                  type={verifySignInRes.status}
                  text={verifySignInRes.message}
                />

                <div>
                  <Field
                    name="verificationCode"
                    type="text"
                    placeholder="Enter your verification code"
                    className="input-small"
                  />
                  <ErrorMessage
                    name="verificationCode"
                    component="div"
                    className="text-red-500 text-sm pt-0.5"
                  />
                </div>

                <Button variant="primary" type="submit">
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

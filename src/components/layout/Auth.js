"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";

import LoadingIcon from "../ui/loadingIcon/LoadingIcon";

import {closeAuthModal, setAuthenticated } from "@/redux/slices/authModalSlice";
import apiClient from "@/services/apiClient";

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

  const [mode, setMode] = useState("signin");
  const [step, setStep] = useState("email");
  const [signInRes, setSignInRes] = useState({});
  const [verifySignInRes, setVerifySignInRes] = useState({});

  const resetAll = () => {
    setSignInRes({});
    setVerifySignInRes({});
    setStep("email");
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-[#0000009f] fixed inset-0 z-10 flex justify-center items-center px-3"
      onClick={() => dispatch(closeAuthModal())}
    >
      <div
        className="bg-background w-full md:w-[450px] rounded-md p-3 flex flex-col gap-3 shadow-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => dispatch(closeAuthModal())}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Mode switch */}
        {step !== "verify" && (
          <div className="flex p-0.5 bg-primary rounded-lg">
            {["signin", "signup"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  resetAll();
                }}
                className={`w-full p-1.5 rounded-md ${
                  mode === m
                    ? "bg-background text-primary"
                    : "bg-primary text-[#e5e5e5]"
                }`}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
        )}

        {/* Email Step */}
        {step === "email" && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailSchema}
            onSubmit={async ({ email }) => {
              try {
                const res = await apiClient.post("/auth/signin", { email });
                if (res.data.status === "Success") {
                  setSignInRes(res.data);
                  setStep("verify");
                }
              } catch (error) {
                setSignInRes(
                  error.response?.data || {
                    status: "fail",
                    message: "Something went wrong. Please try again.",
                  }
                );
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-4">
                {isSubmitting && <LoadingOverlay />}

                <Message type={signInRes.status} text={signInRes.message} />

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input w-full p-1.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm pt-0.5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button w-full bg-primary text-[#e5e5e5] p-1.5 rounded-md cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <Formik
            initialValues={{ verificationCode: "" }}
            validationSchema={verifySchema}
            onSubmit={async ({ verificationCode }) => {
              try {
                const res = await apiClient.post("/auth/verifysignin", {
                  email: signInRes.email,
                  verificationCode,
                });

                if (res.data.status === "Success") {
                  dispatch(setAuthenticated(true));
                  dispatch(closeAuthModal());
                }
              } catch (error) {
                setVerifySignInRes(
                  error.response?.data || {
                    status: "fail",
                    message: "Something went wrong. Please try again.",
                  }
                );
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-4">
                {isSubmitting && <LoadingOverlay />}

                {signInRes?.status === "Success" && (
                  <div className="flex flex-col gap-0">
                    <p className="text-center">{signInRes.message}</p>
                    <div className="flex justify-center gap-2">
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

                <Message type={verifySignInRes.status} text={verifySignInRes.message} />

                <div>
                  <Field
                    name="verificationCode"
                    type="text"
                    placeholder="Enter your verification code"
                    className="input w-full p-1.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ErrorMessage
                    name="verificationCode"
                    component="div"
                    className="text-red-500 text-sm pt-0.5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button w-full bg-primary text-[#e5e5e5] p-1.5 rounded-md cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Verify
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

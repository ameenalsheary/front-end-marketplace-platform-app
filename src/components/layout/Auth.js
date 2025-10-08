"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import LoadingIcon from "../ui/loadingIcon/LoadingIcon";
import CloseIcon from "@mui/icons-material/Close";

import { closeAuthModal } from "@/redux/slices/authModalSlice";

// Validation schemas
const emailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const verifySchema = Yup.object({
  code: Yup.string()
    .matches(/^[0-9]{4,6}$/, "Code must be 4–6 digits")
    .required("Verification code is required"),
});

export default function Auth() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.authModal);

  const [mode, setMode] = useState("signin");
  const [step, setStep] = useState("email"); // 'email' or 'verify'

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
          <div
            className="text-red-500 cursor-pointer"
            onClick={() => dispatch(closeAuthModal())}
          >
            <CloseIcon />
          </div>
        </div>

        {/* Switch buttons */}
        {step !== "verify" && (
          <div className="flex p-0.5 bg-primary rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setStep("email");
              }}
              className={`w-full p-1.5 rounded-md cursor-pointer ${
                mode === "signin"
                  ? "bg-background text-primary"
                  : "bg-primary text-[#e5e5e5]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setStep("email");
              }}
              className={`w-full p-1.5 rounded-md cursor-pointer ${
                mode === "signup"
                  ? "bg-background text-primary"
                  : "bg-primary text-[#e5e5e5]"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Email Step */}
        {step === "email" && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailSchema}
            onSubmit={(values) => {
              console.log(`${mode} email submitted:`, values.email);
              setStep("verify");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-4 relative">
                {isSubmitting && (
                  <div className="absolute top-0 left-0 w-full h-full bg-background opacity-50 cursor-wait flex justify-center items-center">
                    <LoadingIcon />
                  </div>
                )}

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
                  {"Continue"}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <Formik
            initialValues={{ code: "" }}
            validationSchema={verifySchema}
            onSubmit={(values) => {
              console.log("Verification code submitted:", values.code);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-4">
                {isSubmitting && (
                  <div className="absolute top-0 left-0 w-full h-full bg-background opacity-50 cursor-wait flex justify-center items-center">
                    <LoadingIcon />
                  </div>
                )}

                <div>
                  <Field
                    name="code"
                    type="number"
                    placeholder="Enter your verification code"
                    className="input w-full p-1.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ErrorMessage
                    name="code"
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

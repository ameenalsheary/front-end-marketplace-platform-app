"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyAuth } from "@/redux/slices/authModalSlice";

export default function AuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  return null; // no UI
}

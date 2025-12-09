"use client";

import { useEffect, useState } from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import apiClient from "@/services/apiClient";
import CustomImage from "@/components/ui/CustomImage";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

function ProfilePageSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center gap-1.5 bg-background py-3">
        <div className="size-21 rounded-full skeleton" />
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-lg skeleton">Loading... Loading...</div>
          <div className="skeleton">role: loading...</div>
          <div className="text-sm skeleton">loading...****loading...</div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [customer, setCustomer] = useState({
    status: "idle",
    data: null,
  });

  useEffect(() => {
    async function fetchCustomer() {
      setCustomer({ status: "loading", data: null });

      try {
        const res = await apiClient.get("/customer");
        setCustomer({
          status: "succeeded",
          data: res.data.data,
        });
      } catch {
        setCustomer({ status: "failed", data: null });
      }
    }

    fetchCustomer();
  }, []);

  if (customer.status === "idle" || customer.status === "loading") {
    return <ProfilePageSkeleton />;
  }

  if (customer.status === "failed") {
    throw new Error("Failed to load customer data");
  }

  const email = customer.data?.email || "";
  const maskedEmail = email.replace(/(.{5}).+(@.+)/, "$1****$2");
  const admin = customer.data?.role === "admin";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center gap-1.5 bg-background py-3 rounded-md shadow-sm">
        <div className="w-21 bg-background-secondary shadow-sm rounded-full">
          <CustomImage
            src={customer.data?.profileImage || ""}
            fallback="/images/profile-image-placeholder.png"
            width={400}
            height={400}
            alt="Profile image"
            priority
            className="w-full rounded-full"
          />
        </div>

        <div className="flex flex-col items-center text-center select-none">
          <p className="text-lg font-semibold text-foreground">
            {customer.data?.firstName} {customer.data?.lastName}{" "}
            {admin && (
              <VerifiedUserIcon className="text-blue-500" fontSize="small" />
            )}
          </p>

          {admin && (
            <div>
              role: <span className="font-semibold">{customer.data?.role}</span>
            </div>
          )}

          <p className="text-sm text-muted-foreground">{maskedEmail}</p>
        </div>
      </div>

      <ThemeSwitcher />
    </div>
  );
}

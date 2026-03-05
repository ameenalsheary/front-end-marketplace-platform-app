"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

import apiClient from "@/services/apiClient";
import LoadingIcon from "@/components/ui/loadingIcon/LoadingIcon";
import PaginationSection from "@/components/ui/Pagination";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

function Skeleton() {
  return (
    <div className="bg-background-secondary w-full h-full rounded-lg flex justify-center items-center">
      <LoadingIcon />
    </div>
  )
}

const OrderCard = ({ order }) => {
  const {
    orderID,
    orderItems,
    pricing,
    coupon,
    paymentMethod,
    paymentStatus,
    orderStatus,
    paidAt,
  } = order;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(orderID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-3 bg-background rounded-sm shadow-sm">
      <div className="flex items-center justify-between gap-1.5">
        <h1 className="text-lg font-medium line-clamp-1">
          Order ID: #{orderID.slice(0, 12)}...
        </h1>

        {copied ? (
          <DoneIcon fontSize="small" className="text-success" />
        ) : (
          <ContentCopyIcon fontSize="small" className="cursor-pointer" onClick={handleCopy} />
        )}
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [orders, setOrders] = useState({
    status: "idle",
    data: [],
  });

  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    let active = true;

    async function fetchOrders() {
      setOrders((prev) => ({ ...prev, status: "loading" }));

      try {
        const res = await apiClient.get("customer/orders", {
          params: {
            page,
            limit: 8,
          },
        });

        if (!active) return;

        const orders = res.data?.data || [];
        const { numberOfPages = 1 } = res.data?.paginationResults || {};

        setOrders({
          status: "succeeded",
          data: orders,
        });

        setNumberOfPages(numberOfPages);
      } catch {
        if (active) setOrders((prev) => ({ ...prev, status: "failed" }));
      }
    }

    fetchOrders();

    return () => {
      active = false;
    }
  }, [page]);

  const { status, data } = orders;

  if (status === "idle" || status === "loading") return <Skeleton />;

  if (status === "failed") throw new Error("Failed to load orders.");

  if (!data || data.length === 0) {
    return (
      <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
        <ErrorDisplay
          srcImage="/images/shopping-list.png"
          error="Oops! You haven`t placed any orders yet."
          description="It sems you haven`t placed any orders yet. Browse our collection and find something you like!"
          buttonText="Back to home page"
          ButtonVariant="primary"
          eventHandler="GO_TO"
          href="/"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl pb-3 font-medium capitalize">My Orders</h1>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

        {numberOfPages > 1 && <PaginationSection count={numberOfPages} />}
      </div>
    </div>
  )
}

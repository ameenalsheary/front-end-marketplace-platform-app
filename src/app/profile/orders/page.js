"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

import apiClient from "@/services/apiClient";
import LoadingIcon from "@/components/ui/loadingIcon/LoadingIcon";
import PaginationSection from "@/components/ui/Pagination";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import CustomImage from "@/components/ui/CustomImage";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utilities/formatPrice";
import { currency } from "@/lib/constants";

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

  const statusConfig = {
    processing: {
      label: "Processing",
      color: "bg-[var(--color-warning)]",
    },
    shipped: {
      label: "Shipped",
      color: "bg-[var(--color-primary)]",
    },
    delivered: {
      label: "Delivered",
      color: "bg-[var(--color-success)]",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-[var(--color-error)]",
    },
    returned: {
      label: "Returned",
      color: "bg-[var(--color-text-muted)]",
    },
  };

  const currentStatus = statusConfig[orderStatus] || statusConfig.processing;

  return (
    <div className="p-3 bg-background rounded-sm shadow-sm grid gap-3">
      <div className="border-b border-border pb-1.5 grid gap-0.5">
        {/* Order ID */}
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

        {/* Order status */}
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-full ${currentStatus.color}`} />

          <span className="text-sm text-muted">
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-background-secondary p-1.5 rounded-sm flex flex-wrap gap-1.5">
        {orderItems.length > 0 && orderItems.map((item, index) => {
          const { _id, imageCover } = item.product;

          return (
            <Link key={`order-item-${index}`} href={`/product/${_id}`}>
              <CustomImage
                src={imageCover}
                fallback="/images/product-placeholder.png"
                width={500}
                height={690}
                alt={"Product image"}
                className="bg-background-tertiary w-12 rounded-sm border border-border cursor-pointer hover-scale"
              />
            </Link>
          )
        })}
      </div>

      {/* Pricing Information */}
      <div className="bg-background-secondary p-1.5 rounded-sm flex justify-between items-center">
        <span className="text-sm text-muted">
          Total Price:
        </span>
        <span className="text-lg font-medium text-primary">
          ${formatPrice(
            pricing.totalPriceAfterDiscount ??
            pricing.totalPrice
          )} {currency}
        </span>
      </div>

      {/* View Details Button */}
      <Button
        variant="primary"
        size="small"
        className="w-full"
      >
        View details
      </Button>
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
            limit: 4,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {data.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

        {numberOfPages > 1 && <PaginationSection count={numberOfPages} />}
      </div>
    </div>
  )
}

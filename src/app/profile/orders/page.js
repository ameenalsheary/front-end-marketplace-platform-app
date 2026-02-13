import dayjs from "dayjs";

import apiClientServer from "@/services/apiClientServer";
import PaginationSection from "@/components/ui/Pagination";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import Button from "@/components/ui/Button";

function OrdersTable({ orders }) {
  return (
    <section
      className="grid grid-cols-2 gap-3"
      aria-label="Orders list"
    >
      {orders.map((order) => {
        const {
          _id,
          // pricing,
          // coupon,
          paymentMethod,
          paymentStatus,
          orderStatus,
          paidAt,
        } = order;

        // const hasDiscount = Boolean(pricing?.totalPriceAfterDiscount);

        return (
          <article
            key={_id}
            className="bg-background border border-border rounded-sm shadow-sm overflow-hidden"
            aria-labelledby={`order-${_id}`}
          >
            <header className="p-3 flex justify-between items-center border border-b border-border">
              <div className="flex flex-col gap-0.5">
                <div
                  id={`order-${_id}`}
                  className="font-semibold"
                >
                  Order ID: <span>{_id.slice(0, 7)}...</span>
                </div>

                <div
                  className={`text-sm flex items-center gap-0.5 ${paymentStatus === "completed"
                    ? "text-success"
                    : "text-warning"
                    }`}
                  aria-live="polite"
                >
                  Payment {paymentStatus}
                </div>
              </div>

              <div>
                <span
                  className={`px-1.5 py-0.5 text-sm capitalize rounded-sm ${orderStatus === "delivered"
                    ? "text-success bg-success-bg"
                    : orderStatus === "processing" || orderStatus === "shipped"
                      ? "text-warning bg-warning-bg"
                      : "text-error bg-error-bg"
                    }`}
                  aria-label={`Order status: ${orderStatus}`}
                >
                  {orderStatus}
                </span>
              </div>
            </header>

            <section className="bg-background p-3 flex justify-between items-center gap-1.5 border-b border-border">
              <div className="font-semibold">
                {paymentMethod}
              </div>

              {paidAt ? (
                <time
                  className="text-sm text-muted-foreground line-clamp-1"
                  dateTime={paidAt}
                >
                  Paid on {dayjs(paidAt).format("MMM DD, YYYY, hh:mm A")}
                </time>
              ) : (
                <div className="text-sm">Awaiting payment</div>
              )}
            </section>

            <footer className="p-3">
              <Button
                variant="primary"
                className="w-full"
              >
                View details
              </Button>
            </footer>
          </article>
        );
      })}
    </section>
  );
}

export default async function OrdersPage(props) {
  const { page } = await props.searchParams;

  const res = await apiClientServer.get("customer/orders", {
    params: {
      page: Number(page) || 1,
      limit: 6,
    },
  });

  const ordersResponse = res.data;
  const orders = ordersResponse?.data || [];
  const { numberOfPages } = ordersResponse?.paginationResults || {
    numberOfPages: 1,
  };

  if (orders.length === 0) {
    return (
      <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
        <ErrorDisplay
          srcImage="/images/shopping-list.png"
          error="You don`t have any orders yet."
          description="Once you place an order, it will appear here so you can easily track its status and details."
          buttonText="Start shopping"
          ButtonVariant="primary"
          eventHandler="GO_TO"
          href="/"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl pb-1 font-medium capitalize">My Orders</h1>

      <OrdersTable orders={orders} />

      {numberOfPages > 1 && <PaginationSection count={numberOfPages} />}
    </div>
  );
}

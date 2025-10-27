"use client";

import dynamic from "next/dynamic";

const Pagination = dynamic(() => import("@mui/material/Pagination"), {
  ssr: false,
});

export default function ClientPagination({ count, page, onChange }) {
  return (
    <Pagination
      count={count}
      page={page}
      siblingCount={0}
      size="medium"
      onChange={onChange}
      className="bg-background rounded-md shadow-sm py-3"
    />
  );
}

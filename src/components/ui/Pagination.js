"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ClientPagination from "./ClientPagination";

export default function PaginationSection({ count }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleChange = (_, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <ClientPagination
      count={count}
      page={currentPage}
      onChange={handleChange}
    />
  );
}

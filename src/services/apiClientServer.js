/**
 * Server-only Axios client.
 *
 * Purpose:
 *   Centralizes API requests made from Next.js Server Components or server actions.
 *   It automatically attaches the user's access token from cookies to each request.
 *
 * Why this file exists:
 *   `next/headers` only works in the server environment. It throws a build error
 *   if used in a module that runs on the client. To avoid that, the Axios client
 *   is split into two versions:
 *     - apiClientServer.js → for server components (uses `next/headers`)
 *     - apiClient.js       → for client components (uses browser cookies)
 *
 * Behavior:
 *   - Reads the `accessToken` cookie directly on the server using `next/headers`.
 *   - Adds it as a `Cookie` header so backend APIs can authenticate requests.
 *   - Keeps all token handling isolated from components for cleaner code.
 *
 * Usage:
 *   Import this file only in server code (e.g. server components, route handlers).
 *
 * Example:
 *   import apiClientServer from "@/services/apiClientServer";
 *   const res = await apiClientServer.get("/customer");
 */

import axios from "axios";
import { cookies } from "next/headers";

const apiClientServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClientServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken) {
    config.headers.Cookie = `accessToken=${accessToken}`;
  }
  return config;
});

export default apiClientServer;

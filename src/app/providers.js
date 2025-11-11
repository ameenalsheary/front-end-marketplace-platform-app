"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}

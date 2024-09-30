"use client";

import { PropsWithChildren, createContext } from "react";
import AccountsProvider from "./providers/AccountProvider";
import AuthProvider, { useAuth } from "./providers/AuthProvider";

export default function Providers({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  return (
    <AuthProvider>
      <AccountsProvider>{isAuthenticated} {children}</AccountsProvider>
    </AuthProvider>
  );
}

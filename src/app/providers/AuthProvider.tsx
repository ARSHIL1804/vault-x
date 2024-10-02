"use client";
import {
  getDataFromBrowserStorage,
  getDataFromBrowserStorageNonProtected,
  setDataToBrowserStorage,
  setDataToBrowserStoragemNonProtected,
} from "@/lib/browser";
import { APP_CONTANTS } from "@/lib/constants";
import { isNullOrUndefined } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { boolean } from "zod";
import AccountsProvider from "./AccountProvider";
import SettingsProvider from "./SettingsProvider";

const AuthContext = createContext<{
  verifyPassword: (data: string) => boolean;
  storePassword: (data: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
  password: string;
  lockWallet:()=>void;
}>({
  verifyPassword: (data: string) => {
    return false;
  },
  storePassword: (data: string) => {},
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  isAuthenticated: false,
  password: "",
  lockWallet:()=>{}
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function authenticate() {
    const og_password = getDataFromBrowserStorageNonProtected(
      APP_CONTANTS.WALLET_PASSWORD_KEY
    );
    if (isNullOrUndefined(og_password)) {
      router.push("/auth/create-password");
      return;
    }
    setPassword(og_password);
    const lastAuthenticationTime = getDataFromBrowserStorage(
      APP_CONTANTS.LAST_AUTH_TIME_KEY
    );
    if (
      Date.now() - lastAuthenticationTime <
      APP_CONTANTS.RE_AUTHENTICATION_TIME
    ) {
      setIsAuthenticated(true);
    } else {
      router.push("/auth/verify");
    }
  }

  useEffect(() => {
    const og_password = getDataFromBrowserStorageNonProtected(
      APP_CONTANTS.WALLET_PASSWORD_KEY
    );
    if (isNullOrUndefined(og_password)) {
      router.push("/auth/create-password");
      return;
    }
    const lastAuthenticationTime =
      getDataFromBrowserStorageNonProtected(APP_CONTANTS.LAST_AUTH_TIME_KEY) ||
      0;
    console.log(Date.now() - lastAuthenticationTime);
    if (
      Date.now() - lastAuthenticationTime <
      APP_CONTANTS.RE_AUTHENTICATION_TIME
    ) {
      setPassword(og_password);
    } else {
      router.push("/auth/verify");
    }
  }, []);

  useEffect(() => {
    if (password && verifyPassword(password)) {
      setIsAuthenticated(true);
    }
    else{
      setIsAuthenticated(false);
    }
  }, [password]);

  const verifyPassword = (password: string) => {
    const og_password = getDataFromBrowserStorageNonProtected(
      APP_CONTANTS.WALLET_PASSWORD_KEY
    );
    if (!isNullOrUndefined(og_password) && password === og_password) {
      return true;
    }
    return false;
  };

  const storePassword = async (password: string) => {
    if (isNullOrUndefined(password)) return;
    setPassword(password);
    setDataToBrowserStoragemNonProtected(
      APP_CONTANTS.WALLET_PASSWORD_KEY,
      password
    );
    setDataToBrowserStoragemNonProtected(
      APP_CONTANTS.LAST_AUTH_TIME_KEY,
      Date.now().toString()
    );
  };

  const lockWallet = () => {
    setPassword('');
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider
      value={{
        verifyPassword,
        storePassword,
        isAuthenticated,
        setIsAuthenticated,
        password,
        lockWallet
      }}
    >
      {isAuthenticated ? (
        <SettingsProvider>
          <AccountsProvider>{children}</AccountsProvider>
        </SettingsProvider>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

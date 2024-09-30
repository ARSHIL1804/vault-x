"use client";
import React, { useEffect, useState } from "react";
import { useAccounts } from "@/app/providers/AccountProvider";
import {
  convertTokenBalace,
  getTokenTotalBalance,
} from "@/lib/utils";
import { API_CONSTANTS, APP_CONTANTS } from "@/lib/constants";
import { SigningStargateClient } from "@/packages/@cosmjs/stargate";
import { Coin } from "@/lib/interfaces";
import { useSettings } from "@/app/providers/SettingsProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeAccount } = useAccounts();
  const [xfi, setXfi] = useState<Coin>({
    name: APP_CONTANTS.NATIVE_TOKEN.XFI.name,
    denom: APP_CONTANTS.NATIVE_TOKEN.XFI.denom,
    balance: 0,
    price: 0,
  });
  const [mpx, setMpx] = useState<Coin>({
    name: APP_CONTANTS.NATIVE_TOKEN.MPX.name,
    denom: APP_CONTANTS.NATIVE_TOKEN.MPX.denom,
    balance: 0,
    price: APP_CONTANTS.NATIVE_TOKEN.MPX.price,
  });

  const {settings} = useSettings()
  const getNativeBalance = async () => {
    if (activeAccount) {
      const client = await SigningStargateClient.connect(APP_CONTANTS.RPC[settings.rpc].rpcURL);
      const coins = await client.getAllBalances(
        activeAccount.accountData.address
      );
      for (let coin of coins) {
        if (coin?.denom === "xfi") {
          setXfi({
            ...xfi,
            balance: convertTokenBalace(Number(coin?.amount)),
            price: await getPriceOfToken("XFI"),
          });
        } else if (coin?.denom === "mpx") {
          setMpx({
            ...mpx,
            balance: convertTokenBalace(Number(coin?.amount)),
            price: settings.currency == 'USD' ? 0.02 : 1.67  
          });
        }
      }
    }
  };

  const getPriceOfToken = async (token: string) => {
    const res = await fetch(
      API_CONSTANTS.CRYPTO_PRICE + `?fsym=${token}&tsyms=${settings.currency}`,
      {
        method: "GET",
      }
    );
    const price = await res.json();
    return price[settings.currency];
  };

  useEffect(() => {
    if (activeAccount && settings) {
      getNativeBalance();
    }
  }, [activeAccount]);
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2 w-full h-[150px] p-4">
        <div className="flex flex-col justify-between bg-card p-2 gap-2 rounded-md h-full flex-1">
          <div className="w-full flex flex-row justify-between">
            <span className="text-lg font-bold">XFI</span>
            <img src="/xfi-token.png" alt="logo" width="32px" height="32px" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {xfi.balance.toFixed(2)} {APP_CONTANTS.NATIVE_TOKEN.XFI.denom}
            </span>
            <span className="text-sm text-subtext">
            {APP_CONTANTS.CURRENCIES[settings.currency].symbol}{getTokenTotalBalance(xfi.balance, xfi.price).toFixed(2)} {APP_CONTANTS.CURRENCIES[settings.currency].short}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-card p-2 gap-2 rounded-md h-full flex-1">
          <div className="w-full flex flex-row justify-between">
            <span className="text-lg font-bold">MPX</span>
            <img src="/mpx-token.png" alt="logo" width="32px" height="32px" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {mpx.balance.toFixed(2)} {APP_CONTANTS.NATIVE_TOKEN.MPX.denom}
            </span>
            <span className="text-sm text-subtext">
            {APP_CONTANTS.CURRENCIES[settings.currency].symbol}{getTokenTotalBalance(mpx.balance, mpx.price).toFixed(2)}   {APP_CONTANTS.CURRENCIES[settings.currency].short}
            </span>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

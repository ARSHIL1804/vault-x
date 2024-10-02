"use client";
import React, { useEffect, useState } from "react";
import { useAccounts } from "../../providers/AccountProvider";
import { getDataFromBrowserStorage } from "@/lib/browser";
import { API_CONSTANTS, APP_CONTANTS } from "@/lib/constants";
import { Token } from "@/lib/interfaces";
import { convertTokenBalace } from "@/lib/utils";
import { Secp256k1 } from "@/packages/@cosmjs/crypto";
import { LucideSearchX } from "lucide-react";
export default function Home() {
  const { activeAccount } = useAccounts();
  const [tokens, setTokens] = useState<Token[]>([]);

  const getTokens = async () => {
    const res = await fetch(
      API_CONSTANTS.XFI_SCAN_URL +
        API_CONSTANTS.XFI_SCAN_APIs.TOKEN_HOLDERS +
        `?address=${activeAccount.accountData.evmAddress}`
    );
    const data = await res.json();
    setTokens(
      data.docs.map((token: any) => {
        return {
          name: token.tokenName,
          contractAddress: token.contractAddress,
          balance: token.balance,
          decimals: token.decimals,
          symbol: token.tokenSymbol,
          type: token.tokenType,
        };
      })
    );
  };
  useEffect(() => {
    if (activeAccount) {
      getTokens();
    }
  }, [activeAccount]);
  return (
    <div className="flex flex-1 flex-col w-full mt-2">
      <div className="w-full px-4 py-2 text-md font-bold">
        Tokens <span className="text-subtext">{tokens.length}</span>
      </div>
      <div className="w-full px-4 bg-card flex-1">
        {tokens.length == 0 ? (
          <div className="h-full flex justify-center items-center flex-col gap-2">
            <LucideSearchX size={36} />
            <span className="text-xl">No Tokens Found</span>
          </div>
        ) : (
          tokens.map((token: any, index: number) => {
            return (
              <div key={index} className="flex flex-row py-2">
                <div
                  className="w-[36px] h-[36px] rounded-full flex justify-center items-center font-semibold text-xl"
                  style={{
                    backgroundColor: APP_CONTANTS.TOKEN_BACKGROUND_COLOR[index],
                  }}
                >
                  {token.name?.charAt(0)}
                </div>
                <div className="flex flex-col ml-2 w-[80%]">
                  <span className="font-semibold">{token.name}</span>
                  <span className="font-bold text-subtext text-sm">
                    {convertTokenBalace(token.balance).toFixed(2)}{" "}
                    {token.symbol}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useAccounts } from "../providers/AccountProvider";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import AccountProfile from "@/components/AccountProfile";
import { convertTokenBalace, getTokenTotalBalance, shortenAddress } from "@/lib/utils";
import { LucideClock, LucideCopy, LucideCopyCheck, LucideHome, LucideSend, LucideSettings } from "lucide-react";
import { API_CONSTANTS, APP_CONTANTS } from "@/lib/constants";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Coin } from "@/lib/interfaces";
import Link from "next/link";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const [isCopied, setIsCopied] = useState(false);
  const { wallets, activeAccount } = useAccounts();


  const copyAddress = () => {
    if (!activeAccount || isCopied) return;
    const address = activeAccount.accountData.address;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      {!wallets.length || !activeAccount ? (
        <div className="flex w-full h-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center h-full">
          <div className="flex flex-row items-center h-[56px] w-full px-2 bg-card">
            <AccountProfile name={activeAccount.name} />
            <div className="ml-2 flex flex-col ">
              <span className="text-sm font-semibold">
                {activeAccount?.name}
              </span>
              <div className="flex flex-row text-sm items-center text-subtext">
                <span className="mr-2">
                  {shortenAddress(activeAccount.accountData.address)}
                </span>
                {isCopied ? (
                  <LucideCopyCheck
                    size={16}
                    className="font-semibold cursor-pointer"
                  />
                ) : (
                  <LucideCopy
                    size={16}
                    className="font-semibold cursor-pointer"
                    onClick={copyAddress}
                  />
                )}
              </div>
            </div>
          </div>
          {children}
          <div className="w-full bg-background rounded-md px-4 py-3 bottom-4 flex flex-row [&>*]:flex-grow [&>*]:basis-0">
             <Link href={'/account'}  className="flex justify-center items-center">
                <LucideHome size={20} color={pathname == '/account' ? '#3B72F2' : 'white'}/>
             </Link>
             <Link href={'/account/activity'}  className="flex justify-center items-center">
                <LucideClock size={20} color={pathname == '/account/activity' ? '#3B72F2' : 'white'}/>
             </Link>
             <Link href={'/account/transfer'} className="flex justify-center items-center">
                <LucideSend size={20} color={pathname == '/account/transfer' ? '#3B72F2' : 'white'}/>
             </Link>
             <Link href={'/settings'}className="flex justify-center items-center">
                <LucideSettings size={20} color={pathname == '/settings' ? '#3B72F2' : 'white'}/>
             </Link>
          </div>
        </div>
      )}
    </>
  );
}

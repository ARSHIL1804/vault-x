"use client"

import { useEffect } from "react";
import { useAccounts } from "./providers/AccountProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const {accounts, activeAccount} = useAccounts();
  const router = useRouter();

  useEffect(()=>{
    if(accounts){
      router.push("/account/home")
    }
  },[accounts])
  return (
    <div>
        My Account {activeAccount?.name}
    </div>
  );
}

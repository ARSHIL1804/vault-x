"use client";
import React, { useEffect, useState } from "react";
import {
  LucideArrowRight,
  LucideChevronRight,
  LucideMoveRight,
  LucideNetwork,
  LucideSettings,
  LucideShield,
  LucideShieldCheck,
  LucideUser,
} from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../providers/AuthProvider";
export default function Home() {
  const router = useRouter();

  const {lockWallet} = useAuth();
  const goToSetting = (setting: string) => {
    router.push("/settings/" + setting);
  };
  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <Header title="Settings" />
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="bg-card rounded-md">
          <div
            className="flex flex-row justify-between p-4 cursor-pointer hover:bg-button-hover"
            onClick={() => goToSetting("general")}
          >
            <div className="flex flex-row">
              <LucideSettings />
              <span className="ml-4">General</span>
            </div>
            <LucideChevronRight />
          </div>
          <div
            className="flex flex-row justify-between p-4 cursor-pointer hover:bg-button-hover"
            onClick={() => goToSetting("network")}
          >
            <div className="flex flex-row">
              <LucideNetwork />
              <span className="ml-4">Network</span>
            </div>
            <LucideChevronRight />
          </div>
          <div
            className="flex flex-row justify-between p-4 cursor-pointer hover:bg-button-hover"
            onClick={() => goToSetting("accounts")}
          >
            <div className="flex flex-row">
              <LucideUser />
              <span className="ml-4">Manage Accounts</span>
            </div>
            <LucideChevronRight />
          </div>
        </div>

        <Button className="py-6" onClick={lockWallet}>
          Lock Wallet
        </Button>
      </div>
    </div>
  );
}

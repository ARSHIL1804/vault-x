"use client";
import React from "react";
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_CONTANTS } from "@/lib/constants";
import { useSettings } from "@/app/providers/SettingsProvider";
import { useAccounts } from "@/app/providers/AccountProvider";
import { LucideUser } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ManageAccounts() {
  const { wallets, activeWallet, changeWallet } = useAccounts();
  const router = useRouter()

  function navigate(url:string){
    router.push(url);
  }

  return (
    <div className="p-4 h-full">
      <div className="rounded-md flex flex-col justify-between h-full">
        <div>
          {wallets.map((value, index) => {
            return (
              <div
                key={index}
                className={`p-4 flex bg-button hover:bg-button cursor-pointer${
                  value.name === activeWallet.name
                    ? " text-primary"
                    : ""
                }`}
                onClick={()=>changeWallet(value.name)}
              >
                <LucideUser />{" "}
                <span className="ml-2 capitalize">{value.name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col mt-2 gap-4">
          <Button className="py-6" onClick={() => navigate("/auth/create")}>
            Create a new account
          </Button>
          <Button
            className="py-6"
            variant={"secondary"}
            onClick={() => navigate("/auth/import/recovery-phrase")}
          >
            Import Secret Recovery Phrase
          </Button>
        </div>
      </div>
    </div>
  );
}

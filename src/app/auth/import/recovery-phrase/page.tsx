"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import {
  LucideArrowLeft,
  LucideArrowLeftCircle,
  LucideEye,
  LucideEyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { useAccounts } from "@/app/providers/AccountProvider";
export default function page() {
  const [showKey, setShowKey] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>('')
  const router = useRouter();
  const {addWallet} = useAccounts();
  const getAnAccount = () =>{ 
    if(recoveryPhrase.split(" ").length == 15){
      addWallet(recoveryPhrase);
    }
  }
  return (
    <div className="w-full h-full flex flex-col flex-1 py-4">
      <Header title="Import Recovery Phrace"/>
      <div className="flex flex-col mt-4 gap-2 bg-card p-4  rounded-md">
        <div>
          <Label className="text-sm">Recovery Phrase</Label>
          <div className="flex items-center relative mt-1">
            <Textarea
              placeholder="Enter Recovery Phrase"
              className="text-md border-2 pr-10 focus:border-primary resize-none"
              value={recoveryPhrase}
              rows={5}
              onChange={(e)=>setRecoveryPhrase(e.target.value)}
            />
          </div>
        </div>
        <Button className="h py-6 mt-4" onClick={getAnAccount}> Next </Button>
      </div>
    </div>
  );
}

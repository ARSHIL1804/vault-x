"use client";
import React, { useEffect, useState } from "react";
import {
  LucideArrowRight,
  LucideChevronRight,
  LucideMoveRight,
  LucideNetwork,
  LucideSettings,
  LucideShield,
} from "lucide-react";
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APP_CONTANTS } from "@/lib/constants";
import { useSettings } from "@/app/providers/SettingsProvider";
import GeneralSettings from "./components/GeneralSettings";
import NetworkSetting from "./components/NetworkSetting";
import ManageAccounts from "./components/ManageAccounts";
export default function Home() {
  const params = useParams();
  const setting = params.setting;

  const getSettingComponent = ()=>{
    switch (setting) {
      case 'general':
        return <GeneralSettings/>
        break;
      case 'network':
        return <NetworkSetting/>
        break;
      case 'accounts':
        return <ManageAccounts/>
        break;
      default:
        return <></>
    }
  }
  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <Header title={setting as string} />
      {
        getSettingComponent()
      }
    </div>
  );
}

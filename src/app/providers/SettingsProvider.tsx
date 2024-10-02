"use client";
import {
  getDataFromBrowserStorage,
  setDataToBrowserStorage,
} from "@/lib/browser";
import { APP_CONTANTS } from "@/lib/constants";
import { isNullOrUndefined } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { boolean } from "zod";
import AccountsProvider from "./AccountProvider";
import { Settings } from "@/lib/interfaces";
import { CURRENCIES, LANGAUGES } from "@/lib/enums";
import { useAuth } from "./AuthProvider";


const defaultSettings:Settings = { 
    language:APP_CONTANTS.LANGAUGES.ENG.symbol,
    currency:APP_CONTANTS.CURRENCIES.USD.short,
    rpc: APP_CONTANTS.RPC.ITRocket.name
}
const SettingContext = createContext<{
  settings: Settings  ;
  saveSettings: (key:string,value: string) => void;
}>({
    settings:defaultSettings,
    saveSettings: (key:string,value: string) => {}
});

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {password} = useAuth();
  const [settings,setSettings] = useState<Settings>(defaultSettings);

  const saveSettings = (key,value) => {
    const newSettings = {
      ...settings,
      [key]:value
    }
    setSettings(newSettings);
    setDataToBrowserStorage(APP_CONTANTS.WALLET_SETTINGS,newSettings,password)
  }

  useEffect(()=>{
    const settingsFromStorage = getDataFromBrowserStorage( APP_CONTANTS.WALLET_SETTINGS,password) || defaultSettings;
    setSettings(settingsFromStorage)
  },[])
  return (
    <SettingContext.Provider
      value={{
        settings,
        saveSettings
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export const useSettings = () => {
  return useContext(SettingContext);
};

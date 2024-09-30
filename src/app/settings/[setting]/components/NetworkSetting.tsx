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
export default function NetworkSetting() {
  const params = useParams();

  const { settings, saveSettings } = useSettings();

  return (
    <div className="p-4">
      <div className="bg-card rounded-md">
        <div className="flex flex-col justify-between p-4 cursor-pointer hover:bg-button-hover gap-4">
          <div className="flex flex-row gap-2">
            <span>Chain : </span>
            <span className="font-bold">{APP_CONTANTS.NETWORK.Chain}</span>
          </div>
          <div className="flex flex-row gap-2">
            <span>Chain Id : </span>
            <span className="font-bold">{APP_CONTANTS.NETWORK.ChainID}</span>
          </div>
          <div>
            <Label>RPC</Label>
            <Select
              value={settings.rpc}
              onValueChange={(value) => saveSettings("rpc", value)}
              name="rpc"
            >
              <SelectTrigger className="bg-input text-md h-[48px] pr-2 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(APP_CONTANTS.RPC).map(([key, value]) => {
                  return (
                    <SelectItem key={key} value={value.name}>
                      {value.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

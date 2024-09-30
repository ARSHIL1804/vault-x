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
export default function GeneralSettings() {
  const router = useRouter();
  const params = useParams();
  const setting = params.setting;

  const { settings, saveSettings } = useSettings();


  return (
    <div className="p-4">
      <div className="bg-card rounded-md">
        <div
          className="flex flex-col justify-between p-4 cursor-pointer hover:bg-button-hover"
        >
          <Label>Langauge</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => saveSettings("language", value)}
            name="language"
          >
            <SelectTrigger className="bg-input text-md h-[48px] pr-2 mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(APP_CONTANTS.LANGAUGES).map(([key, value]) => {
                return (
                  <SelectItem key={key} value={value.symbol}>
                    {value.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div
          className="flex flex-col justify-between p-4 cursor-pointer hover:bg-button-hover"
        >
          <Label>Currency</Label>
          <Select
            value={settings.currency}
            onValueChange={(value) => saveSettings("currency", value)}
            name="currency"
          >
            <SelectTrigger className="bg-input text-md h-[48px] pr-2 mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(APP_CONTANTS.CURRENCIES).map(([key, value]) => {
                return (
                  <SelectItem key={key} value={value.short}>
                    {value.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

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
export default function CreatePassword() {
  const [showKey, setShowKey] = useState(false);
  const router = useRouter()
  return (
    <div className="w-full h-full flex flex-col flex-1 py-4">
      <Header title="Create Password"/>
      <div className="flex flex-col mt-4 gap-2 bg-card p-4  rounded-md">
        <div>
          <Label className="text-sm">Password</Label>
          <div className="flex items-center relative">
            {showKey ? (
              <LucideEye
                className=" absolute right-3 top-8 transform -translate-y-1/2 cursor-pointer"
                size={22}
                onClick={() => setShowKey(false)}
              />
            ) : (
              <LucideEyeOff
                className="absolute right-3 top-8 transform -translate-y-1/2 cursor-pointer"
                size={22}
                onClick={() => setShowKey(true)}
              />
            )}
            <Input
              placeholder="Enter Strong Password"
              type={showKey ? "text" : "password"}
              className="text-md border-2 h-[48px] pr-10 focus:border-primary"
            />
          </div>
        </div>
        <div className="pt-2">
          <Label className="text-sm">Confirm Password</Label>
          <div className="flex items-center relative">
            {showKey ? (
              <LucideEye
                className=" absolute right-3 top-8 transform -translate-y-1/2 cursor-pointer"
                size={22}
                onClick={() => setShowKey(false)}
              />
            ) : (
              <LucideEyeOff
                className="absolute right-3 top-8 transform -translate-y-1/2 cursor-pointer"
                size={22}
                onClick={() => setShowKey(true)}
              />
            )}
            <Input
              placeholder="Enter Private keys"
              type={showKey ? "text" : "password"}
              className="text-md border-2 h-[48px] pr-10 focus:border-primary"
            />
          </div>
        </div>
        <Button className="h py-6 mt-4"> Next </Button>
      </div>
    </div>
  );
}

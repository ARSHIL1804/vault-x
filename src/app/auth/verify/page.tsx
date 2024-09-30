"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "@/app/providers/AuthProvider";
import { getDataFromBrowserStorage, setDataToBrowserStorage, setDataToBrowserStoragemNonProtected } from "@/lib/browser";
import { APP_CONTANTS } from "@/lib/constants";
import { isNullOrUndefined } from "@/lib/utils";
export default function page() {
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const { verifyPassword, storePassword, setIsAuthenticated } = useAuth();
  const [showKey, setShowKey] = useState(false);

  const authenticatePassword = () => {
    if (verifyPassword(password)) {
      setWrongPassword(false);
      storePassword(password);
      setIsAuthenticated(true);
    } else {
      setWrongPassword(true);
    }
  };
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col flex-1 py-4">
      <Header title="Enter your password" />
      <div className="flex flex-col mt-4 gap-2 bg-card p-4  rounded-md">
        <div>
          <Label className="text-sm">Password</Label>
          <div className="flex items-center relative mt-2">
            {showKey ? (
              <LucideEye
                className=" absolute right-3 top-6 transform -translate-y-1/2 cursor-pointer"
                size={22}
                onClick={() => setShowKey(false)}
              />
            ) : (
              <LucideEyeOff
                className="absolute right-3 top-6 transform -translate-y-1/2 cursor-pointer"
                size={22}
                onClick={() => setShowKey(true)}
              />
            )}
            <Input
              placeholder="Enter Strong Password"
              type={showKey ? "text" : "password"}
              className="text-md border-2 h-[48px] pr-10 focus:border-primary"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {wrongPassword && (
            <Label className="mt-2 text-destructive">
              Please enter a valid password
            </Label>
          )}
        </div>
        <Button className="h py-6 mt-4" onClick={authenticatePassword}>
          {" "}
          Enter{" "}
        </Button>
      </div>
    </div>
  );
}

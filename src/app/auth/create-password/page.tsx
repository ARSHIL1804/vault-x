"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import {
  LucideEye,
  LucideEyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { isNullOrUndefined } from "@/lib/utils";
import { APP_CONTANTS } from "@/lib/constants";
import { useAuth } from "@/app/providers/AuthProvider";
export default function page() {
  const [showKey, setShowKey] = useState(false);
  const [passwords , setPasswords] = useState({
    password:"",
    confirmPassword:""
  })
  const [passwordsError , setPasswordsError] = useState({
    passwordError:"",
    confirmPasswordError:""
  })
  const {storePassword} = useAuth();
  const router = useRouter();

  const handleChange = (e)=>{
    setPasswords({
      ...passwords,
      [e.target.name]:e.target.value
    })
  }
  const validatePassword = ()=> {
    if(passwords.password.length < APP_CONTANTS.MIN_PASSWORD_LENGTH){
      setPasswordsError({
        passwordError:'Password is too short',
        confirmPasswordError:""
      })
      return false;
    }
    else if(passwords.password.length > APP_CONTANTS.MAX_PASSWORD_LENGTH){
      setPasswordsError({
        passwordError:'Password is too long',
        confirmPasswordError:""

      })
      return false;
    }
    else if(passwords.password != passwords.confirmPassword){
      setPasswordsError({
        passwordError:'',
        confirmPasswordError:'Passwords does not match'
      }) 
      return false;
    }
    setPasswordsError({
      passwordError:'',
      confirmPasswordError:''
    }) 
    return true;
  }
  const createPassword =  () =>{
    if(validatePassword()){
      storePassword(passwords.password)
    }
  }
  return (
    <div className="w-full h-full flex flex-col flex-1 py-4">
      <Header title="Create Password"/>
      <div className="flex flex-col mt-8 gap-2 bg-card p-4  rounded-md">
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
              name="password"
              onChange={handleChange}
            />
          </div>
          <span className="mt-2 text-sm text-destructive">{passwordsError.passwordError}</span>

        </div>
        <div className="mt-2">
          <Label className="text-sm">Confirm Password</Label>
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
              placeholder="Enter your password again"
              type={showKey ? "text" : "password"}
              className="text-md border-2 h-[48px] pr-10 focus:border-primary"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <span className="mt-2 text-sm text-destructive">{passwordsError.confirmPasswordError}</span>

        </div>
        <Button className="py-6 mt-4" onClick={createPassword}> Create Password </Button>
      </div>
    </div>
  );
}

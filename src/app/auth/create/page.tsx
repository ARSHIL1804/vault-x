"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { Loader2, LucideCopy, LucideCopyCheck, LucideDownload, LucideLoader, LucideLoader2 } from "lucide-react";
import Header from "@/components/Header";
import { AlertBox } from "@/components/AlertBox";
import {DirectSecp256k1HdWallet } from "@/packages/@cosmjs/proto-signing"
import { Spinner } from "@/components/ui/spinner";
import { useAccounts } from "@/app/providers/AccountProvider";
import { stringToPath } from "@/packages/@cosmjs/crypto";
export default function Create() {
  const router = useRouter();
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {addWallet} = useAccounts();
  
  const copySeedPhrase = () => {
    if (
      navigator.clipboard &&
      window.isSecureContext &&
      seedPhrase.length == 15
    ) {
      navigator.clipboard
        .writeText(seedPhrase.join(" "))
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const downloadSeedPhraseFile = () => {
    const element = document.createElement("a");
    const file = new Blob([seedPhrase.join(" ")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "xfi_chain_seed_phrase.txt";
    document.body.appendChild(element);
    element.click();
  };

  const createAccount = async () => {
    setIsLoading(true);
    addWallet(seedPhrase.join(" "));
    setIsLoading(false);
  };

  const genrateSeedPhrase = () => {
    const mnemonic = generateMnemonic(160);

    setSeedPhrase(mnemonic.split(" "));
    console.log("Generated Seed Phrase:", mnemonic);
  };

  useEffect(() => {
    genrateSeedPhrase();
  }, []);
  return (
    <div className="w-full h-full flex flex-col flex-1 py-4">
      <Header title="Seed Phrase"/>
      <AlertBox variant='destructive' alertText='This 15-word phrase allows you to recover your wallet and access to the coins inside. Please store it somewhere safe.'/>
      <div className="flex flex-col bg-card p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4 rounded-lg">
          {seedPhrase.map((value, index) => {
            return (
              <div key={index} className="bg-input p-2  rounded-md">
                {value}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-4">
          <div
            className="flex flex-row text-sm items-center p-1 cursor-pointer mr-3"
            onClick={downloadSeedPhraseFile}
          >
            <LucideDownload size={16} className="mr-1" /> Download File
          </div>
          {isCopied ? (
            <div className="flex flex-row text-sm items-center p-1 cursor-pointer">
              <LucideCopyCheck size={16} className="mr-1" /> Copied
            </div>
          ) : (
            <div
              className="flex flex-row text-sm items-center p-1 cursor-pointer"
              onClick={copySeedPhrase}
            >
              <LucideCopy size={16} className="mr-2" /> Copy
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
          <Button className='py-6' onClick={createAccount} disabled={isLoading}>
              {
                isLoading ? <Spinner size="small" className="w-full overflow-hidden"/> : "Next" 
              }
          </Button>
      </div>
    </div>
  );
}

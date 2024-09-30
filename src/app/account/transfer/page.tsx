"use client";
import React, { useEffect, useState } from "react";
import { useAccounts } from "@/app/providers/AccountProvider";
import { getDataFromBrowserStorage } from "@/lib/browser";
import { API_CONSTANTS, APP_CONTANTS } from "@/lib/constants";
import { Coin, Token } from "@/lib/interfaces";
import {
  convertTokenBalace,
  isCosmosAddress,
  isEVMAddress,
  isValidNumber,
  shortenAddress,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  GasPrice,
  SigningStargateClient,
  StdFee,
  calculateFee,
} from "@cosmjs/stargate";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/app/providers/SettingsProvider";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { useAuth } from "@/app/providers/AuthProvider";
export default function Home() {
  const { activeAccount, activeWallet } = useAccounts();
  const [fetching, setFetching] = useState(false);
  const [address, setAddress] = useState(activeAccount.accountData.address);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientAddressError, setRecipientAddressError] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(
    APP_CONTANTS.NATIVE_TOKEN.XFI.denom
  );
  const {password} = useAuth();
  const [fee, setFee] = useState<StdFee>();
  const [xfi, setXfi] = useState<Coin>({
    name: APP_CONTANTS.NATIVE_TOKEN.XFI.name,
    denom: APP_CONTANTS.NATIVE_TOKEN.XFI.denom,
    balance: 0,
    price: 0,
  });
  const [mpx, setMpx] = useState<Coin>({
    name: APP_CONTANTS.NATIVE_TOKEN.MPX.name,
    denom: APP_CONTANTS.NATIVE_TOKEN.MPX.denom,
    balance: 0,
    price: APP_CONTANTS.NATIVE_TOKEN.MPX.price,
  });
  const {settings} = useSettings();
  const hadnleAmountChange = (e) => {
    setInvalidAmount(false);
    const value = e.target.value;
    if (isValidNumber(value) || value == "") {
      setTransferAmount(value);
    }
  };

  const checkAddressOnChain = async () => {
    if (recipientAddress != "" && recipientAddressError === "") {
      setFetching(true);
      const res = await fetch(
        API_CONSTANTS.XFI_SCAN_URL +
          API_CONSTANTS.XFI_SCAN_APIs.ADDRESSES +
          `?address=${recipientAddress}`
      );
      setFetching(false);
      if (res.status === 404) {
        setRecipientAddressError("Address not found");
      }
    }
  };

  const fetchNativeBalance = async () => {
    if (activeAccount) {
      const client = await SigningStargateClient.connect(APP_CONTANTS.RPC[settings.rpc].rpcURL);
      const coins = await client.getAllBalances(
        activeAccount.accountData.address
      );
      for (var coin of coins) {
        if (coin?.denom === "xfi") {
          setXfi({
            ...xfi,
            balance: convertTokenBalace(Number(coin?.amount)),
          });
        } else if (coin?.denom === "mpx") {
          setMpx({
            ...mpx,
            balance: convertTokenBalace(Number(coin?.amount)),
          });
        }
      }
    }
  };

  const getCoinBalance = () => {
    if (selectedCoin === APP_CONTANTS.NATIVE_TOKEN.XFI.denom)
      return xfi.balance;
    else if (selectedCoin === APP_CONTANTS.NATIVE_TOKEN.MPX.denom)
      return mpx.balance;
  };

  const checkAmountSufficient = async () => {
    setInvalidAmount(false);

    const estimatedGas = await stimulateTransaction();
    if (transferAmount > getCoinBalance() + estimatedGas.amount[0].amount) {
      setInvalidAmount(true);
    }
  };

  const validateRecipientAddress = () => {
    setRecipientAddressError("");
    if (recipientAddress == "") return;
    let isValid;
    if (address === activeAccount.accountData.address) {
      isValid = isCosmosAddress(recipientAddress);
    } else if (address === activeAccount.accountData.evmAddress) {
      isValid = isEVMAddress(recipientAddress);
    }
    if (!isValid) {
      setRecipientAddressError("Incorrect Address");
    } else {
      checkAddressOnChain();
    }
  };

  const stimulateTransaction = async () => {
    setFetching(true);
    const wallet = await DirectSecp256k1HdWallet.deserialize(activeWallet.serializedWallet,password);
    const client = await SigningStargateClient.connectWithSigner(
      APP_CONTANTS.RPC[settings.rpc].rpcURL,
      wallet,
      APP_CONTANTS.SIGNING_CLIENT_OPTION
    );
    console.log((Number(transferAmount) * 10 ** 18).toString());

    const simulate = await client.simulate(
      activeAccount.accountData.address,
      [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: activeAccount.accountData.address,
            toAddress: activeAccount.accountData.address,
            amount: [
              {
                denom: "xfi",
                amount: (Number(transferAmount)*(10 ** 18)).toString(),
              },
            ],
          },
        },
      ],
      ""
    );
    setFetching(false);
    const fee = calculateFee(
      simulate,
      APP_CONTANTS.SIGNING_CLIENT_OPTION.gasPrice
    );
    setFee(fee);
    return fee;
  };

  const initiateTransaction = async () => {
    if (canTransfer()) {
      setFetching(true);
      const wallet = await DirectSecp256k1HdWallet.deserialize(activeWallet.serializedWallet,password);
      const client = await SigningStargateClient.connectWithSigner(
        APP_CONTANTS.RPC[settings.rpc].rpcURL,
        wallet,
        APP_CONTANTS.SIGNING_CLIENT_OPTION
      );
      const result = await client.signAndBroadcast(
        activeAccount.accountData.address,
        [
          {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: {
              fromAddress: activeAccount.accountData.address,
              toAddress: activeAccount.accountData.address,
              amount: [
                {
                  denom: "xfi",
                  amount:  (Number(transferAmount)*(10 ** 18)).toString(),
                },
              ],
            },
          },
        ],
        fee,
      );
      setFetching(false);
      if (result.code === 0) {
        console.log("Transaction successful!");
        console.log("Transaction hash:", result.transactionHash);
      } else {
        console.error("Transaction failed:", result.rawLog);
      }
    }
  };
  const canTransfer = () => {
    if (
      transferAmount === "" ||
      Number(transferAmount) == 0 ||
      invalidAmount ||
      recipientAddress === "" ||
      recipientAddressError != "" ||
      !fee ||
      fetching
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchNativeBalance();
  }, []);
  return (
    <div className="flex flex-1 flex-col w-full mt-2">
      <div className="w-full px-4 py-2 text-md font-bold">Send</div>
      <div className="w-full px-4 flex-1">
        <div>
          <Select value={address} onValueChange={(value) => setAddress(value)}>
            <SelectTrigger className="bg-input text-md h-[48px] pr-2 mt-2">
              <SelectValue placeholder="Address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={activeAccount.accountData.address}>
                {shortenAddress(activeAccount.accountData.address)}
              </SelectItem>
              <SelectItem value={activeAccount.accountData.evmAddress}>
                {shortenAddress(activeAccount.accountData.evmAddress)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2">
          <Input
            placeholder={isEVMAddress(address) ? "0x..." : "mx..."}
            type="text"
            className="text-md border-2 h-[48px] pr-10 focus:border-primary"
            name="recipientAddress"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            onBlur={validateRecipientAddress}
          />
          {recipientAddressError && (
            <Label className="text-destructive text-sm mt-2">
              {recipientAddressError}
            </Label>
          )}
        </div>
        <div className="mt-2">
          <div className="flex flex-row gap-4">
            <Input
              placeholder="0.00"
              type="text"
              className={
                `text-md border-2 h-[48px] pr-10 focus:border-primary` +
                invalidAmount
                  ? " border-destructive"
                  : ""
              }
              name="transferAmount"
              value={transferAmount}
              onChange={hadnleAmountChange}
              onBlur={checkAmountSufficient}
            />
            <Select
              value={selectedCoin}
              onValueChange={(value) => {
                setSelectedCoin(value);
                setTransferAmount("");
              }}
            >
              <SelectTrigger className="bg-input text-md h-[48px] w-[120px] pr-2">
                <SelectValue placeholder="Coin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={APP_CONTANTS.NATIVE_TOKEN.XFI.denom}>
                  {APP_CONTANTS.NATIVE_TOKEN.XFI.denom}
                </SelectItem>
                <SelectItem value={APP_CONTANTS.NATIVE_TOKEN.MPX.denom}>
                  {APP_CONTANTS.NATIVE_TOKEN.MPX.denom}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {invalidAmount && (
            <Label className="text-destructive text-sm">
              Insufficient balance
            </Label>
          )}
          <div className="text-sm text-subtext ">
            Available Balance: {getCoinBalance().toFixed(2)} {selectedCoin}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Label>Commision</Label>
          <Input
            placeholder={"0.00"}
            type="text"
            className="text-md border-2 h-[48px] pr-10 focus:border-primary"
            name="commision"
            value={convertTokenBalace(Number(fee?.amount[0].amount)) || 0.00}
            disabled={true}
          />
        </div>
        <Button
          disabled={!canTransfer()}
          className={`${!canTransfer() ? "bg-red-500" : ""} `}
          onClick={initiateTransaction}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

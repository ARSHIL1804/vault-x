import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_CONTANTS } from "./constants";
import { TRANSACTION_TYPE } from "./enums";
import { Asset } from "./interfaces";

import {Uint53, Decimal} from '@cosmjs/math'
import { GasPrice } from "@cosmjs/stargate";

import {AES,enc} from 'crypto-js';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const str2ab = (str) => new TextEncoder().encode(str);
const ab2str = (buf) => new TextDecoder().decode(buf);

export function isValidNumber(value){
  const strValue = String(value).trim();
  const numberRegex = /^-?(\d+\.?\d*|\.\d+)$/;
  if (numberRegex.test(strValue) && Number.isFinite(parseFloat(strValue))) {
    return strValue !== '.';
  }
  return false;
}
export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isEmpty(array:any) {
  return array.length == 0;
}

export function shortenAddress(address:string){
  return address.slice(0,5) + "..." + address.slice(35)
} 


export function convertTokenBalace(balance:number, decimals = 18){
  return balance / Math.pow(10,decimals)
}


export function getTokenTotalBalance(balance:number,price:number):number{
  if(balance == null || price == null){
    return 0;
  }
  return balance * price;
}


export function getFormatedDate(date:Date){
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if(date.toDateString() == today.toDateString()){
    return 'Today'
  }
  else if(date.toDateString() == yesterday.toDateString()){
    return 'Yesterday'
  }
  else{
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}



export function getTransactionType(tx:any, accountAddress:string){
  const addresses = tx.addresses;
  const bodyMessages = tx?.body?.messages;
  if(bodyMessages){
    if(!isNullOrUndefined(bodyMessages[0]?.data)){
      if(bodyMessages[0]?.data.input){
        return bodyMessages[0]?.data.input?.methodName || '';
      }
      else if(bodyMessages[0]?.data.data){
        return TRANSACTION_TYPE.CONTRACT_CALL
      }
      else{
        return TRANSACTION_TYPE.SEND;
      }
    }
    else if(tx.addresses.length>4){
      return TRANSACTION_TYPE.MULTISEND;
    }
    else if(tx.addresses[0] === accountAddress || tx.addresses[1] === accountAddress){
      return TRANSACTION_TYPE.SEND;
    }
    else{
      return TRANSACTION_TYPE.RECEIVE;
    }
  }
  return TRANSACTION_TYPE.UNKNOWN;
}


export function getTransactionAsset(tx:any){
  const bodyMessage = tx?.body?.messages[0];
  const asset:Asset = {
    denom:APP_CONTANTS.NATIVE_TOKEN.XFI.denom,
    amount:0
  }
  if(bodyMessage?.data?.value){
    asset.amount = bodyMessage?.data?.value;
    console.log('here: ',asset)
    return asset;
  }
  else{
    return bodyMessage?.amount || asset;
  }
}


export function isEVMAddress(address:string){
  return address.match(/^0x[a-fA-F0-9]{40}$/) !== null;
}

export function isCosmosAddress(address:string){
  return address.match(/^mx[a-zA-Z0-9]{39}$/) !== null;
}


export function calculateFee(gas, garPrice:GasPrice){
  const gasPrice= APP_CONTANTS.SIGNING_CLIENT_OPTION.gasPrice;
  const calculatedGas = Math.round(gas * APP_CONTANTS.GAS_LIMIT_COEF);
  const a =  garPrice.amount.multiply(new Uint53(calculatedGas)).ceil().toString();

  return {
    amount:a,
    gas:gas
  }


}

export const generateSaltAndIV = async (password:string) => {
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    str2ab(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: str2ab('FixedSalt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    256
  );

  const derived = new Uint8Array(bits);
  return {
    salt: derived.slice(0, 16),
    iv: derived.slice(16, 32)
  };
};

export const deriveKey = async (password, salt) => {
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    str2ab(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

export const encrypt = (data:string, password:string) => {
  const ciphertext = AES.encrypt(data, password).toString();
  return ciphertext;
};

export const decrypt = (data:string, password:string) => {
  const bytes = AES.decrypt(data, password);
  const originalText = bytes.toString(enc.Utf8);
  return originalText;
};
import { CURRENCIES, LANGAUGES, TRANSACTION_TYPE } from "./enums"


export interface Coin {
    name:string,
    denom:string
    balance:number,
    price:number
}

export interface Token {
    name:string,
    contractAddress:string,
    balance:number,
    decimals: number,
    symbol:string,
    type:string
}



export interface Asset {
    denom:string,
    amount:number
}

export interface Activity {
    hash:string,
    addresses:string[],
    isEVM:boolean,
    evmHash:string | null,
    type:TRANSACTION_TYPE,
    block:string,
    timestamp:Date,
    asset:Asset[],
    commision:Asset,
    gasLimit: number,
    gasUsed: number,
    gasMax:number,
    nonce:string,
}

export interface Language{
    name:string,
    symbol:string,
}

export interface Currency{
    name:string,
    symbol:string,
    short:string
}


export interface Settings {
    language:string,
    currency:string,
    rpc:string
}
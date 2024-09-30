import { GasPrice } from "@/packages/@cosmjs/stargate"

export const APP_CONTANTS  = 
{
    USER_WALLETS_KEY : "user-wallets",
    USER_ACTIVE_WALLET_KEY:"user-active-wallet",
    ACCOUNT_IMPORTED_TOKEN_KEY:"-account-tokens",
    WALLET_PASSWORD_KEY : "wallet-password",
    ACCOUNT_NAME_KEY : "Account",
    LAST_AUTH_TIME_KEY: "LastAuthTime",


    NETWORK :{
      Chain:'CrossFI Testnet',
      ChainID:4157
    },

    RPC : {
      Default : {
        name:'Default',
        rpcURL: 'https://rpc.testnet.ms',
        explorer: 'https://test.xfiscan.com/'
      },
      NodeStake: {
        name:'NodeStake',
        rpcURL: 'https://rpc-t.crossfi.nodestake.org',
        explorer: 'https://explorer.nodestake.org/crossfi-testnet'
      },
      ITRocket :{
        name:'ITRocket',
        rpcURL: 'https://crossfi-testnet-rpc.itrocket.net:443',
        explorer: 'https://testnet.itrocket.net/crossfi/staking/'
      },
    },
    LANGAUGES: {
      ENG : {
        name:'English',
        symbol:'ENG'
      }
    },

    CURRENCIES : {
      USD : {
        name:'United States Doller',
        short:'USD',
        symbol:'$'
      },
      INR: {
        name:'Indian Ruppe',
        short:'INR',
        symbol:'₹'
      }
    },
    MIN_PASSWORD_LENGTH : 6,
    MAX_PASSWORD_LENGTH : 12,

    RE_AUTHENTICATION_TIME: 1800000,  // in secs
    COSMOS_HD_PATH: "m/44'/118'/0'/0/0",
    ETHEREUM_HD_PATH: "m/44'/60'/0'/0/0",

    NATIVE_TOKEN : {
        XFI:{
          name:"CrossFI",
          denom: "XFI",
        },
        MPX:{
          name:"MPX",
          denom: "MPX",
          price: 0.02
        }
    },
    CRYPTO_PRICE : "https://min-api.cryptocompare.com/data/price",
    TOKEN_BACKGROUND_COLOR: ["#6e4648","#6e5946","#5c466e","#465f6e","#506e46"],
    GAS_LIMIT_COEF: 1.4,
    SIGNING_CLIENT_OPTION: {
      broadcastTimeoutMs:5e3,
      broadcastPollIntervalMs:1e3,
      gasPrice: GasPrice.fromString("100000000000xfi")
    }
}


export const API_CONSTANTS = {
  CRYPTO_PRICE : "https://min-api.cryptocompare.com/data/price",
  RPC_URL : "https://crossfi-testnet-rpc.itrocket.net:443",

  XFI_SCAN_URL :'https://test.xfiscan.com/api/1.0',
  XFI_SCAN_APIs:  {
    TOKEN_HOLDERS:'/token-holders', 
    TRANSACTIONS:'/txs',
    ADDRESSES:'/addresses'
  }
}




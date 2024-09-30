import {
  getDataFromBrowserStorage,
  setDataToBrowserStorage,
} from "@/lib/browser";
import { APP_CONTANTS } from "@/lib/constants";

import {
  AccountData,
  Algo,
  DirectSecp256k1HdWallet,
  makeCosmoshubPath,
} from "@/packages/@cosmjs/proto-signing";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { QueryClient, StargateClient, setupBankExtension } from "@/packages/@cosmjs/stargate";
import { Tendermint34Client } from "@/packages/@cosmjs/tendermint-rpc";
import { stringToPath } from "@/packages/@cosmjs/crypto";
import { useAuth } from "./AuthProvider";



interface WalletInfromation {
  name: string;
  serializedWallet: string;
}

interface AccountInfromation {
  name: string;
  accountData: AccountData;
}

const AccountsContext = createContext<{
  wallets: WalletInfromation[];
  activeWallet: WalletInfromation | null;
  addWallet: (mnemonic: string) => void;
  activeAccount: AccountInfromation | null;
  setActiveAccount: (account: AccountInfromation) => void;
}>({
  wallets: [],
  activeWallet:null,
  addWallet: (mnemonic: string) => {},
  activeAccount: null,
  setActiveAccount: () => {},
});

export default function AccountsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isAuthenticated} = useAuth();
  const [wallets, setWallets] = useState<WalletInfromation[]>([]);
  const [activeWallet, setActiveWallet] = useState<WalletInfromation | null>(null);

  const [activeAccount, setActiveAccount] = useState<AccountInfromation | null>(
    null
  );
  const router = useRouter();
  const {password} = useAuth();
  
  const setActiveWalletAndAccount = async (wallet:WalletInfromation) => {
    const deserializedWallet = await DirectSecp256k1HdWallet.deserialize(wallet.serializedWallet,password);
    
    const [_,account]= await deserializedWallet.getAccounts();
    const accountInfo:AccountInfromation = {
      name:wallet.name,
      accountData:account
    }
    setActiveWallet(wallet)
    setActiveAccount(accountInfo);
  }

  const addWallet = async (mnemonic: string) => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: "mx",
      hdPaths: [stringToPath(APP_CONTANTS.COSMOS_HD_PATH),stringToPath(APP_CONTANTS.ETHEREUM_HD_PATH)],
    });
    const serializedWallet = await wallet.serialize(password);
    console.log(wallet,serializedWallet)
    const data = await wallet.getAccounts();
    console.log(data);
    const [_,account] = await wallet.getAccounts();
    console.log("Cosmos Address:", account);
    const newWallet:WalletInfromation = {
      name: APP_CONTANTS.ACCOUNT_NAME_KEY + " " + (wallets.length + 1),
      serializedWallet: serializedWallet,
    };

    setDataToBrowserStorage(APP_CONTANTS.USER_WALLETS_KEY, [
      ...wallets,
      newWallet,
    ],password);
    setDataToBrowserStorage(APP_CONTANTS.USER_ACTIVE_WALLET_KEY,newWallet, password);

    setWallets([...wallets, newWallet]);
    setActiveWalletAndAccount(newWallet);
  };
  async function getWallets(){
    const walletsFromStorage = getDataFromBrowserStorage(APP_CONTANTS.USER_WALLETS_KEY,password) || [];
    setWallets(walletsFromStorage);
  }
  useEffect(() => {
    if(!isAuthenticated){
      router.push('/auth/verify');
      return;
    }
    getWallets();
  }, []);

  useEffect(() => {
    if (wallets && wallets.length > 0) {
      router.push("/account");
    } else {
      router.push("/auth/home");
      return;
    }
    const activeWalletFromStorage = getDataFromBrowserStorage(APP_CONTANTS.USER_ACTIVE_WALLET_KEY,password) || null;
    if(activeWalletFromStorage){
      setActiveWalletAndAccount(activeWalletFromStorage);
    }
    else{
      setActiveWalletAndAccount(wallets[0])
    }
  }, [wallets]);

  return (
    <AccountsContext.Provider
      value={{ wallets, activeWallet,addWallet, activeAccount, setActiveAccount }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export const useAccounts = () => {
  return useContext(AccountsContext);
};

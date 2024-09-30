"use client";
import React, { useEffect, useState } from "react";
import { useAccounts } from "@/app/providers/AccountProvider";
import { getDataFromBrowserStorage } from "@/lib/browser";
import { API_CONSTANTS, APP_CONTANTS } from "@/lib/constants";
import { Activity, Token } from "@/lib/interfaces";
import {
  convertTokenBalace,
  getFormatedDate,
  getTransactionAsset,
  getTransactionType,
} from "@/lib/utils";
import { TRANSACTION_TYPE } from "@/lib/enums";
import {
  LucideCircleHelp,
  LucideDownload,
  LucideFileCode,
  LucideFileQuestion,
  LucideRefreshCw,
  LucideSend,
  LucideSendHorizontal,
  LucideSendToBack,
} from "lucide-react";

export default function Home() {
  const { activeAccount } = useAccounts();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(1);

  const getTransactions = async (reset=false) => {
    const res = await fetch(
      API_CONSTANTS.XFI_SCAN_URL +
        API_CONSTANTS.XFI_SCAN_APIs.TRANSACTIONS +
        `?address=${activeAccount.accountData.address}&page=${reset ? 1 : page+1}`
    );
    const data = await res.json();
    setHasNext(data.hasNext || false);
    setPage(reset ? 1 : page+1)
    const updatedData = data.docs.map((transaction: any) => {
      return {
        hash: transaction.hash,
        addresses: transaction.addresses,
        isEVM: transaction.isEVM,
        evmHash: transaction.isEVM ? transaction.body.messages.hash : null,
        type: getTransactionType(
          transaction,
          activeAccount.accountData.address
        ),
        block: transaction.height,
        timestamp: transaction.timestamp,
        asset: getTransactionAsset(transaction),
        commision: transaction?.auth_info?.fee?.amount?.amount,
        gasLimit: transaction.gas_wanted,
        gasUsed: transaction.gas_used,
        nonce: transaction?.message?.data?.nonce,
      };
    });
    if(reset)setActivities(updatedData)
    else setActivities([...activities,...updatedData]);
  };

  const getTransactionIcon = (type: TRANSACTION_TYPE) => {
    switch (type) {
      case TRANSACTION_TYPE.SEND:
      case TRANSACTION_TYPE.MULTISEND:
        return <LucideSend size={24} />;
        break;
      case TRANSACTION_TYPE.RECEIVE:
        return <LucideDownload size={24} />;
        break;
      case TRANSACTION_TYPE.CONTRACT_CALL:
        return <LucideFileCode size={24} />;
        break;
      case TRANSACTION_TYPE.UNKNOWN:
        return <LucideCircleHelp size={24} />;
      default:
        return <LucideFileQuestion size={24} />;
    }
  };
  useEffect(() => {
    if (activeAccount) {
      getTransactions();
    }
  }, [activeAccount]);
  return (
    <div className="flex flex-1 flex-col w-full mt-2">
      <div className="w-full px-4 py-2 text-md font-bold flex flex-row justify-between">
        <span>Activity</span>
        <div className="text-primary font-semibold text-sm flex flex-row items-center cursor-pointer" onClick={()=>getTransactions(true)}>Refresh <LucideRefreshCw className="ml-2" size={16}/> </div>
      </div>
      <div className="w-full px-4 bg-card flex-1 overflow-y-scroll">
        {activities.length == 0 ? (
          <div>No Activity Yet</div>
        ) : (
          <div>
            {activities.map((transaction: any, index: number) => {
              return (
                <div className="flex flex-row py-2 items-center">
                  <div
                    className="w-[36px] h-[36px] rounded-full flex justify-center items-center font-semibold text-xl"
                    style={{
                      backgroundColor:
                        APP_CONTANTS.TOKEN_BACKGROUND_COLOR[
                          index % APP_CONTANTS.TOKEN_BACKGROUND_COLOR.length
                        ],
                    }}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex flex-col ml-2 w-[80%]">
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">{transaction.type}</span>
                      <span className="font-bold text-subtext text-sm">
                        {transaction.asset?.length > 0 ? (
                          transaction.asset?.length > 1 ? (
                            transaction.asset?.length + " Assets"
                          ) : (
                            <>
                              {convertTokenBalace(
                                transaction.asset[0].amount
                              ).toFixed(2)}{" "}
                              {transaction.asset[0].denom}
                            </>
                          )
                        ) : (
                          <>
                            {convertTokenBalace(
                              transaction.asset?.amount
                            ).toFixed(2)}{" "}
                            {transaction.asset?.denom}
                          </>
                        )}
                      </span>
                    </div>
                    <span>
                      {getFormatedDate(new Date(transaction.timestamp))}
                    </span>
                  </div>
                </div>
              );
            })}
            {
              hasNext && <span className="my-2 text-primary flex justify-center items-center cursor-pointer" onClick={()=>getTransactions()}>Load more</span> 
            }
          </div>
        )}
      </div>
    </div>
  );
}

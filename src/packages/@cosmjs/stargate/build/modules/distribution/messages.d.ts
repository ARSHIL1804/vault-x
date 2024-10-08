import { EncodeObject, GeneratedType } from "@/packages/@cosmjs/proto-signing";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
export declare const distributionTypes: ReadonlyArray<[string, GeneratedType]>;
export interface MsgWithdrawDelegatorRewardEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
    readonly value: Partial<MsgWithdrawDelegatorReward>;
}
export declare function isMsgWithdrawDelegatorRewardEncodeObject(object: EncodeObject): object is MsgWithdrawDelegatorRewardEncodeObject;
//# sourceMappingURL=messages.d.ts.map
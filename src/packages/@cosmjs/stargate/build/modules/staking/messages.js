"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakingTypes = void 0;
exports.isMsgBeginRedelegateEncodeObject = isMsgBeginRedelegateEncodeObject;
exports.isMsgCreateValidatorEncodeObject = isMsgCreateValidatorEncodeObject;
exports.isMsgDelegateEncodeObject = isMsgDelegateEncodeObject;
exports.isMsgEditValidatorEncodeObject = isMsgEditValidatorEncodeObject;
exports.isMsgUndelegateEncodeObject = isMsgUndelegateEncodeObject;
exports.isMsgCancelUnbondingDelegationEncodeObject = isMsgCancelUnbondingDelegationEncodeObject;
var tx_1 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
exports.stakingTypes = [
    ["/cosmos.staking.v1beta1.MsgBeginRedelegate", tx_1.MsgBeginRedelegate],
    ["/cosmos.staking.v1beta1.MsgCreateValidator", tx_1.MsgCreateValidator],
    ["/cosmos.staking.v1beta1.MsgDelegate", tx_1.MsgDelegate],
    ["/cosmos.staking.v1beta1.MsgEditValidator", tx_1.MsgEditValidator],
    ["/cosmos.staking.v1beta1.MsgUndelegate", tx_1.MsgUndelegate],
    ["/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation", tx_1.MsgCancelUnbondingDelegation],
];
function isMsgBeginRedelegateEncodeObject(o) {
    return o.typeUrl === "/cosmos.staking.v1beta1.MsgBeginRedelegate";
}
function isMsgCreateValidatorEncodeObject(o) {
    return o.typeUrl === "/cosmos.staking.v1beta1.MsgCreateValidator";
}
function isMsgDelegateEncodeObject(object) {
    return object.typeUrl === "/cosmos.staking.v1beta1.MsgDelegate";
}
function isMsgEditValidatorEncodeObject(o) {
    return o.typeUrl === "/cosmos.staking.v1beta1.MsgEditValidator";
}
function isMsgUndelegateEncodeObject(object) {
    return object.typeUrl === "/cosmos.staking.v1beta1.MsgUndelegate";
}
function isMsgCancelUnbondingDelegationEncodeObject(object) {
    return (object.typeUrl ===
        "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation");
}
//# sourceMappingURL=messages.js.map
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAminoMsgSetWithdrawAddress = isAminoMsgSetWithdrawAddress;
exports.isAminoMsgWithdrawDelegatorReward = isAminoMsgWithdrawDelegatorReward;
exports.isAminoMsgWithdrawValidatorCommission = isAminoMsgWithdrawValidatorCommission;
exports.isAminoMsgFundCommunityPool = isAminoMsgFundCommunityPool;
exports.createDistributionAminoConverters = createDistributionAminoConverters;
function isAminoMsgSetWithdrawAddress(msg) {
    // NOTE: Type string and names diverge here!
    return msg.type === "cosmos-sdk/MsgModifyWithdrawAddress";
}
function isAminoMsgWithdrawDelegatorReward(msg) {
    // NOTE: Type string and names diverge here!
    return msg.type === "cosmos-sdk/MsgWithdrawDelegationReward";
}
function isAminoMsgWithdrawValidatorCommission(msg) {
    return msg.type === "cosmos-sdk/MsgWithdrawValidatorCommission";
}
function isAminoMsgFundCommunityPool(msg) {
    return msg.type === "cosmos-sdk/MsgFundCommunityPool";
}
function createDistributionAminoConverters() {
    return {
        "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
            aminoType: "cosmos-sdk/MsgFundCommunityPool",
            toAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor;
                return ({
                    amount: __spreadArray([], amount, true),
                    depositor: depositor,
                });
            },
            fromAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor;
                return ({
                    amount: __spreadArray([], amount, true),
                    depositor: depositor,
                });
            },
        },
        "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
            aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, withdrawAddress = _a.withdrawAddress;
                return ({
                    delegator_address: delegatorAddress,
                    withdraw_address: withdrawAddress,
                });
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
                return ({
                    delegatorAddress: delegator_address,
                    withdrawAddress: withdraw_address,
                });
            },
        },
        "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
            aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
            toAmino: function (_a) {
                var delegatorAddress = _a.delegatorAddress, validatorAddress = _a.validatorAddress;
                return ({
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                });
            },
            fromAmino: function (_a) {
                var delegator_address = _a.delegator_address, validator_address = _a.validator_address;
                return ({
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                });
            },
        },
        "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
            aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
            toAmino: function (_a) {
                var validatorAddress = _a.validatorAddress;
                return ({
                    validator_address: validatorAddress,
                });
            },
            fromAmino: function (_a) {
                var validator_address = _a.validator_address;
                return ({
                    validatorAddress: validator_address,
                });
            },
        },
    };
}
//# sourceMappingURL=aminomessages.js.map
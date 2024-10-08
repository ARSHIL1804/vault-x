"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.govTypes = void 0;
exports.isMsgDepositEncodeObject = isMsgDepositEncodeObject;
exports.isMsgSubmitProposalEncodeObject = isMsgSubmitProposalEncodeObject;
exports.isMsgVoteEncodeObject = isMsgVoteEncodeObject;
exports.isMsgVoteWeightedEncodeObject = isMsgVoteWeightedEncodeObject;
var tx_1 = require("cosmjs-types/cosmos/gov/v1/tx");
var tx_2 = require("cosmjs-types/cosmos/gov/v1beta1/tx");
exports.govTypes = [
    ["/cosmos.gov.v1.MsgDeposit", tx_1.MsgDeposit],
    ["/cosmos.gov.v1.MsgSubmitProposal", tx_1.MsgSubmitProposal],
    ["/cosmos.gov.v1.MsgUpdateParams", tx_1.MsgUpdateParams],
    ["/cosmos.gov.v1.MsgVote", tx_1.MsgVote],
    ["/cosmos.gov.v1.MsgVoteWeighted", tx_1.MsgVoteWeighted],
    ["/cosmos.gov.v1beta1.MsgDeposit", tx_2.MsgDeposit],
    ["/cosmos.gov.v1beta1.MsgSubmitProposal", tx_2.MsgSubmitProposal],
    ["/cosmos.gov.v1beta1.MsgVote", tx_2.MsgVote],
    ["/cosmos.gov.v1beta1.MsgVoteWeighted", tx_2.MsgVoteWeighted],
];
function isMsgDepositEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgDeposit";
}
function isMsgSubmitProposalEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgSubmitProposal";
}
function isMsgVoteEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgVote";
}
function isMsgVoteWeightedEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgVoteWeighted";
}
//# sourceMappingURL=messages.js.map
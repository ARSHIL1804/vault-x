"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAminoMsgSubmitProposal = isAminoMsgSubmitProposal;
exports.isAminoMsgVote = isAminoMsgVote;
exports.isAminoMsgVoteWeighted = isAminoMsgVoteWeighted;
exports.isAminoMsgDeposit = isAminoMsgDeposit;
exports.createGovAminoConverters = createGovAminoConverters;
var math_1 = require("@/packages/@cosmjs/math");
var utils_1 = require("@/packages/@cosmjs/utils");
var gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
var any_1 = require("cosmjs-types/google/protobuf/any");
var queryclient_1 = require("../../queryclient");
function isAminoMsgSubmitProposal(msg) {
    return msg.type === "cosmos-sdk/MsgSubmitProposal";
}
function isAminoMsgVote(msg) {
    return msg.type === "cosmos-sdk/MsgVote";
}
function isAminoMsgVoteWeighted(msg) {
    return msg.type === "cosmos-sdk/MsgVoteWeighted";
}
function isAminoMsgDeposit(msg) {
    return msg.type === "cosmos-sdk/MsgDeposit";
}
function createGovAminoConverters() {
    // Gov v1 types missing, see
    // https://github.com/cosmos/cosmjs/issues/1442
    return {
        "/cosmos.gov.v1beta1.MsgDeposit": {
            aminoType: "cosmos-sdk/MsgDeposit",
            toAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor, proposalId = _a.proposalId;
                return {
                    amount: amount,
                    depositor: depositor,
                    proposal_id: proposalId.toString(),
                };
            },
            fromAmino: function (_a) {
                var amount = _a.amount, depositor = _a.depositor, proposal_id = _a.proposal_id;
                return {
                    amount: Array.from(amount),
                    depositor: depositor,
                    proposalId: BigInt(proposal_id),
                };
            },
        },
        "/cosmos.gov.v1beta1.MsgVote": {
            aminoType: "cosmos-sdk/MsgVote",
            toAmino: function (_a) {
                var option = _a.option, proposalId = _a.proposalId, voter = _a.voter;
                return {
                    option: option,
                    proposal_id: proposalId.toString(),
                    voter: voter,
                };
            },
            fromAmino: function (_a) {
                var option = _a.option, proposal_id = _a.proposal_id, voter = _a.voter;
                return {
                    option: (0, gov_1.voteOptionFromJSON)(option),
                    proposalId: BigInt(proposal_id),
                    voter: voter,
                };
            },
        },
        "/cosmos.gov.v1beta1.MsgVoteWeighted": {
            aminoType: "cosmos-sdk/MsgVoteWeighted",
            toAmino: function (_a) {
                var options = _a.options, proposalId = _a.proposalId, voter = _a.voter;
                return {
                    options: options.map(function (o) { return ({
                        option: o.option,
                        // Weight is between 0 and 1, so we always have 20 characters when printing all trailing
                        // zeros (e.g. "0.700000000000000000" or "1.000000000000000000")
                        weight: (0, queryclient_1.decodeCosmosSdkDecFromProto)(o.weight).toString().padEnd(20, "0"),
                    }); }),
                    proposal_id: proposalId.toString(),
                    voter: voter,
                };
            },
            fromAmino: function (_a) {
                var options = _a.options, proposal_id = _a.proposal_id, voter = _a.voter;
                return {
                    proposalId: BigInt(proposal_id),
                    voter: voter,
                    options: options.map(function (o) { return ({
                        option: (0, gov_1.voteOptionFromJSON)(o.option),
                        weight: math_1.Decimal.fromUserInput(o.weight, 18).atomics,
                    }); }),
                };
            },
        },
        "/cosmos.gov.v1beta1.MsgSubmitProposal": {
            aminoType: "cosmos-sdk/MsgSubmitProposal",
            toAmino: function (_a) {
                var initialDeposit = _a.initialDeposit, proposer = _a.proposer, content = _a.content;
                (0, utils_1.assertDefinedAndNotNull)(content);
                var proposal;
                switch (content.typeUrl) {
                    case "/cosmos.gov.v1beta1.TextProposal": {
                        var textProposal = gov_1.TextProposal.decode(content.value);
                        proposal = {
                            type: "cosmos-sdk/TextProposal",
                            value: {
                                description: textProposal.description,
                                title: textProposal.title,
                            },
                        };
                        break;
                    }
                    default:
                        throw new Error("Unsupported proposal type: '".concat(content.typeUrl, "'"));
                }
                return {
                    initial_deposit: initialDeposit,
                    proposer: proposer,
                    content: proposal,
                };
            },
            fromAmino: function (_a) {
                var initial_deposit = _a.initial_deposit, proposer = _a.proposer, content = _a.content;
                var any_content;
                switch (content.type) {
                    case "cosmos-sdk/TextProposal": {
                        var value = content.value;
                        (0, utils_1.assert)((0, utils_1.isNonNullObject)(value));
                        var _b = value, title = _b.title, description = _b.description;
                        (0, utils_1.assert)(typeof title === "string");
                        (0, utils_1.assert)(typeof description === "string");
                        any_content = any_1.Any.fromPartial({
                            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                            value: gov_1.TextProposal.encode(gov_1.TextProposal.fromPartial({
                                title: title,
                                description: description,
                            })).finish(),
                        });
                        break;
                    }
                    default:
                        throw new Error("Unsupported proposal type: '".concat(content.type, "'"));
                }
                return {
                    initialDeposit: Array.from(initial_deposit),
                    proposer: proposer,
                    content: any_content,
                };
            },
        },
    };
}
//# sourceMappingURL=aminomessages.js.map
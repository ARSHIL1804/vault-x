"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@/packages/@cosmjs/encoding");
const utils_1 = require("@/packages/@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const any_1 = require("cosmjs-types/google/protobuf/any");
const protobufjs_1 = require("protobufjs");
const registry_1 = require("./registry");
describe("registry demo", () => {
    it("works with a default msg", () => {
        const registry = new registry_1.Registry();
        const Coin = registry.lookupType("/cosmos.base.v1beta1.Coin");
        const MsgSend = registry.lookupType("/cosmos.bank.v1beta1.MsgSend");
        (0, utils_1.assert)(Coin);
        (0, utils_1.assert)(MsgSend);
        (0, utils_1.assert)((0, registry_1.isTsProtoGeneratedType)(Coin));
        (0, utils_1.assert)((0, registry_1.isTsProtoGeneratedType)(MsgSend));
        const coin = Coin.fromPartial({
            denom: "ucosm",
            amount: "1234567890",
        });
        const msgSend = MsgSend.fromPartial({
            fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            toAddress: "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
            amount: [coin],
        });
        const msgSendBytes = MsgSend.encode(msgSend).finish();
        const msgSendWrapped = any_1.Any.fromPartial({
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: msgSendBytes,
        });
        const txBody = tx_1.TxBody.fromPartial({
            messages: [msgSendWrapped],
            memo: "Some memo",
            timeoutHeight: BigInt(9999),
            extensionOptions: [],
        });
        const txBodyBytes = tx_1.TxBody.encode(txBody).finish();
        const txBodyDecoded = tx_1.TxBody.decode(txBodyBytes);
        const msg = txBodyDecoded.messages[0];
        (0, utils_1.assert)(msg.typeUrl);
        (0, utils_1.assert)(msg.value);
        const decoder = registry.lookupType(msg.typeUrl);
        const msgSendDecoded = decoder.decode(msg.value);
        // fromAddress and toAddress are now Buffers
        expect(msgSendDecoded.fromAddress).toEqual(msgSend.fromAddress);
        expect(msgSendDecoded.toAddress).toEqual(msgSend.toAddress);
        expect(msgSendDecoded.amount).toEqual(msgSend.amount);
    });
    it("works with a custom msg", () => {
        // From https://gist.github.com/fadeev/a4981eff1cf3a805ef10e25313d5f2b7
        const typeUrl = "/blog.MsgCreatePost";
        const MsgCreatePostOriginal = new protobufjs_1.Type("MsgCreatePost")
            .add(new protobufjs_1.Field("creator", 1, "string"))
            .add(new protobufjs_1.Field("title", 2, "string"))
            .add(new protobufjs_1.Field("body", 3, "string"))
            .add(new protobufjs_1.Field("attachment", 4, "bytes"));
        const registry = new registry_1.Registry();
        registry.register(typeUrl, MsgCreatePostOriginal);
        const MsgCreatePost = registry.lookupType(typeUrl);
        (0, utils_1.assert)(MsgCreatePost);
        (0, utils_1.assert)((0, registry_1.isPbjsGeneratedType)(MsgCreatePost));
        const msgDemo = MsgCreatePost.create({
            creator: "Me",
            title: "Something with stars",
            body: "la la la",
            attachment: (0, encoding_1.fromHex)("AABBAABB66FE"),
        });
        const msgDemoBytes = MsgCreatePost.encode(msgDemo).finish();
        const msgDemoWrapped = any_1.Any.fromPartial({
            typeUrl: typeUrl,
            value: msgDemoBytes,
        });
        const txBody = tx_1.TxBody.fromPartial({
            messages: [msgDemoWrapped],
            memo: "Some memo",
            timeoutHeight: BigInt(9999),
            extensionOptions: [],
        });
        const txBodyBytes = tx_1.TxBody.encode(txBody).finish();
        const txBodyDecoded = tx_1.TxBody.decode(txBodyBytes);
        const msg = txBodyDecoded.messages[0];
        (0, utils_1.assert)(msg.typeUrl);
        (0, utils_1.assert)(msg.value);
        const decoder = registry.lookupType(msg.typeUrl);
        const msgDemoDecoded = decoder.decode(msg.value);
        expect(msgDemoDecoded).toEqual(jasmine.objectContaining({
            creator: "Me",
            title: "Something with stars",
            body: "la la la",
        }));
        expect(Uint8Array.from(msgDemoDecoded.attachment)).toEqual((0, encoding_1.fromHex)("AABBAABB66FE"));
    });
});
//# sourceMappingURL=registry.spec.js.map
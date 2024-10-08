"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@/packages/@cosmjs/encoding");
const any_1 = require("cosmjs-types/google/protobuf/any");
const pubkey_1 = require("./pubkey");
describe("pubkey", () => {
    const defaultPubkeyBase64 = "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP";
    const defaultPubkeyBytes = (0, encoding_1.fromBase64)(defaultPubkeyBase64);
    const defaultPubkeyProtoBytes = Uint8Array.from([0x0a, defaultPubkeyBytes.length, ...defaultPubkeyBytes]);
    const ed25519PubkeyBase64 = "kEX3edqZB+HdCV92TPS7ePX0DtP62GWIjmrveZ5pnaQ=";
    const ed25519PubkeyBytes = (0, encoding_1.fromBase64)(ed25519PubkeyBase64);
    const ed25519PubkeyProtoBytes = Uint8Array.from([0x0a, ed25519PubkeyBytes.length, ...ed25519PubkeyBytes]);
    describe("encodePubkey", () => {
        it("works for secp256k1", () => {
            const pubkey = { type: "tendermint/PubKeySecp256k1", value: defaultPubkeyBase64 };
            expect((0, pubkey_1.encodePubkey)(pubkey)).toEqual(any_1.Any.fromPartial({
                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                value: defaultPubkeyProtoBytes,
            }));
        });
        it("works for ed25519", () => {
            const pubkey = { type: "tendermint/PubKeyEd25519", value: ed25519PubkeyBase64 };
            expect((0, pubkey_1.encodePubkey)(pubkey)).toEqual(any_1.Any.fromPartial({
                typeUrl: "/cosmos.crypto.ed25519.PubKey",
                value: ed25519PubkeyProtoBytes,
            }));
        });
        it("throws for unsupported pubkey types", () => {
            const pubkey = {
                type: "tendermint/PubKeyUnknown",
                value: defaultPubkeyBase64,
            };
            expect(() => (0, pubkey_1.encodePubkey)(pubkey)).toThrowError(/not recognized/i);
        });
    });
    describe("decodePubkey", () => {
        it("works for secp256k1", () => {
            const pubkey = {
                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                value: defaultPubkeyProtoBytes,
            };
            expect((0, pubkey_1.decodePubkey)(pubkey)).toEqual({
                type: "tendermint/PubKeySecp256k1",
                value: defaultPubkeyBase64,
            });
        });
        it("works for ed25519", () => {
            const pubkey = {
                typeUrl: "/cosmos.crypto.ed25519.PubKey",
                value: ed25519PubkeyProtoBytes,
            };
            expect((0, pubkey_1.decodePubkey)(pubkey)).toEqual({
                type: "tendermint/PubKeyEd25519",
                value: ed25519PubkeyBase64,
            });
        });
        it("throws for unsupported pubkey types", () => {
            const pubkey = {
                typeUrl: "/cosmos.crypto.unknown.PubKey",
                value: defaultPubkeyProtoBytes,
            };
            expect(() => (0, pubkey_1.decodePubkey)(pubkey)).toThrowError(/not recognized/i);
        });
    });
});
//# sourceMappingURL=pubkey.spec.js.map
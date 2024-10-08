"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@/packages/@cosmjs/amino");
const crypto_1 = require("@/packages/@cosmjs/crypto");
const encoding_1 = require("@/packages/@cosmjs/encoding");
const directsecp256k1wallet_1 = require("./directsecp256k1wallet");
const signing_1 = require("./signing");
const testutils_spec_1 = require("./testutils.spec");
describe("DirectSecp256k1Wallet", () => {
    const defaultPrivkey = (0, encoding_1.fromHex)("b8c462d2bb0c1a92edf44f735021f16c270f28ee2c3d1cb49943a5e70a3c763e");
    const defaultAddress = "cosmos1kxt5x5q2l57ma2d434pqpafxdm0mgeg9c8cvtx";
    const defaultPubkey = (0, encoding_1.fromHex)("03f146c27639179e5b67b8646108f48e1a78b146c74939e34afaa5414ad5c93f8a");
    describe("fromKey", () => {
        it("works", async () => {
            const signer = await directsecp256k1wallet_1.DirectSecp256k1Wallet.fromKey(defaultPrivkey);
            expect(signer).toBeTruthy();
        });
    });
    describe("getAccounts", () => {
        it("resolves to a list of accounts", async () => {
            const signer = await directsecp256k1wallet_1.DirectSecp256k1Wallet.fromKey(defaultPrivkey);
            const accounts = await signer.getAccounts();
            expect(accounts.length).toEqual(1);
            expect(accounts[0]).toEqual({
                address: defaultAddress,
                algo: "secp256k1",
                pubkey: defaultPubkey,
            });
        });
    });
    describe("signDirect", () => {
        it("resolves to valid signature", async () => {
            const { accountNumber, sequence, bodyBytes } = testutils_spec_1.testVectors[1].inputs;
            const wallet = await directsecp256k1wallet_1.DirectSecp256k1Wallet.fromKey(defaultPrivkey);
            const accounts = await wallet.getAccounts();
            const pubkey = {
                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                value: accounts[0].pubkey,
            };
            const fee = (0, amino_1.coins)(2000, "ucosm");
            const gasLimit = 200000;
            const chainId = "simd-testing";
            const feePayer = undefined;
            const feeGranter = undefined;
            const signDoc = (0, signing_1.makeSignDoc)((0, encoding_1.fromHex)(bodyBytes), (0, signing_1.makeAuthInfoBytes)([{ pubkey, sequence }], fee, gasLimit, feeGranter, feePayer), chainId, accountNumber);
            const signDocBytes = (0, signing_1.makeSignBytes)(signDoc);
            const { signature } = await wallet.signDirect(accounts[0].address, signDoc);
            const valid = await crypto_1.Secp256k1.verifySignature(crypto_1.Secp256k1Signature.fromFixedLength((0, encoding_1.fromBase64)(signature.signature)), (0, crypto_1.sha256)(signDocBytes), pubkey.value);
            expect(valid).toEqual(true);
        });
    });
});
//# sourceMappingURL=directsecp256k1wallet.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@/packages/@cosmjs/encoding");
const keys_1 = require("cosmjs-types/cosmos/crypto/secp256k1/keys");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const decode_1 = require("./decode");
const directsecp256k1hdwallet_1 = require("./directsecp256k1hdwallet");
const registry_1 = require("./registry");
const signing_2 = require("./signing");
const testutils_spec_1 = require("./testutils.spec");
describe("signing", () => {
    const chainId = "simd-testing";
    const toAddress = "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu";
    const sendAmount = "1234567";
    const sendDenom = "ucosm";
    const gasLimit = 200000;
    it("correctly parses signed transactions from test vectors", async () => {
        const wallet = await directsecp256k1hdwallet_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
        const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
        const prefixedPubkeyBytes = Uint8Array.from(keys_1.PubKey.encode({ key: pubkeyBytes }).finish());
        testutils_spec_1.testVectors.forEach(({ outputs: { signedTxBytes } }) => {
            const parsedTestTx = (0, decode_1.decodeTxRaw)((0, encoding_1.fromHex)(signedTxBytes));
            expect(parsedTestTx.signatures.length).toEqual(1);
            expect(parsedTestTx.authInfo.signerInfos.length).toEqual(1);
            expect(Uint8Array.from(parsedTestTx.authInfo.signerInfos[0].publicKey.value)).toEqual(prefixedPubkeyBytes);
            expect(parsedTestTx.authInfo.signerInfos[0].modeInfo.single.mode).toEqual(signing_1.SignMode.SIGN_MODE_DIRECT);
            expect({ ...parsedTestTx.authInfo.fee.amount[0] }).toEqual({ denom: "ucosm", amount: "2000" });
            expect(parsedTestTx.authInfo.fee.gasLimit.toString()).toEqual(gasLimit.toString());
            expect(parsedTestTx.body.extensionOptions).toEqual([]);
            expect(parsedTestTx.body.nonCriticalExtensionOptions).toEqual([]);
            expect(parsedTestTx.body.messages.length).toEqual(1);
            const registry = new registry_1.Registry();
            const parsedTestTxMsg = registry.decode({
                typeUrl: parsedTestTx.body.messages[0].typeUrl,
                value: parsedTestTx.body.messages[0].value,
            });
            expect(parsedTestTxMsg.fromAddress).toEqual(address);
            expect(parsedTestTxMsg.toAddress).toEqual(toAddress);
            expect(parsedTestTxMsg.amount.length).toEqual(1);
            expect(parsedTestTxMsg.amount[0].denom).toEqual(sendDenom);
            expect(parsedTestTxMsg.amount[0].amount).toEqual(sendAmount);
        });
    });
    it("correctly generates sign docs and signed transactions from test vectors", async () => {
        const wallet = await directsecp256k1hdwallet_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
        const [{ address }] = await wallet.getAccounts();
        await Promise.all(testutils_spec_1.testVectors.map(async ({ inputs, outputs }) => {
            const signDoc = (0, signing_2.makeSignDoc)((0, encoding_1.fromHex)(inputs.bodyBytes), (0, encoding_1.fromHex)(inputs.authInfoBytes), chainId, inputs.accountNumber);
            const signDocBytes = (0, signing_2.makeSignBytes)(signDoc);
            expect((0, encoding_1.toHex)(signDocBytes)).toEqual(outputs.signBytes);
            const { signature } = await wallet.signDirect(address, signDoc);
            const txRaw = tx_1.TxRaw.fromPartial({
                bodyBytes: (0, encoding_1.fromHex)(inputs.bodyBytes),
                authInfoBytes: (0, encoding_1.fromHex)(inputs.authInfoBytes),
                signatures: [(0, encoding_1.fromBase64)(signature.signature)],
            });
            const txRawBytes = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
            const txBytesHex = (0, encoding_1.toHex)(txRawBytes);
            expect(txBytesHex).toEqual(outputs.signedTxBytes);
        }));
    });
});
//# sourceMappingURL=signing.spec.js.map
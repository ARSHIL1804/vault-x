"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubkeyType = void 0;
exports.isEd25519Pubkey = isEd25519Pubkey;
exports.isSecp256k1Pubkey = isSecp256k1Pubkey;
exports.isSinglePubkey = isSinglePubkey;
exports.isMultisigThresholdPubkey = isMultisigThresholdPubkey;
function isEd25519Pubkey(pubkey) {
    return pubkey.type === "tendermint/PubKeyEd25519";
}
function isSecp256k1Pubkey(pubkey) {
    return pubkey.type === "tendermint/PubKeySecp256k1";
}
exports.pubkeyType = {
    /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/ed25519/ed25519.go#L22 */
    secp256k1: "tendermint/PubKeySecp256k1",
    /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/secp256k1/secp256k1.go#L23 */
    ed25519: "tendermint/PubKeyEd25519",
    /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/sr25519/codec.go#L12 */
    sr25519: "tendermint/PubKeySr25519",
    multisigThreshold: "tendermint/PubKeyMultisigThreshold",
};
function isSinglePubkey(pubkey) {
    var singPubkeyTypes = [exports.pubkeyType.ed25519, exports.pubkeyType.secp256k1, exports.pubkeyType.sr25519];
    return singPubkeyTypes.includes(pubkey.type);
}
function isMultisigThresholdPubkey(pubkey) {
    return pubkey.type === "tendermint/PubKeyMultisigThreshold";
}
//# sourceMappingURL=pubkeys.js.map
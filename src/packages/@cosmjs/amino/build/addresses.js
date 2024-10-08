"use strict";
// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawEd25519PubkeyToRawAddress = rawEd25519PubkeyToRawAddress;
exports.rawSecp256k1PubkeyToRawAddress = rawSecp256k1PubkeyToRawAddress;
exports.pubkeyToRawAddress = pubkeyToRawAddress;
exports.pubkeyToAddress = pubkeyToAddress;
var crypto_1 = require("@/packages/@cosmjs/crypto");
var encoding_1 = require("@/packages/@cosmjs/encoding");
var encoding_2 = require("./encoding");
var pubkeys_1 = require("./pubkeys");
function rawEd25519PubkeyToRawAddress(pubkeyData) {
    if (pubkeyData.length !== 32) {
        throw new Error("Invalid Ed25519 pubkey length: ".concat(pubkeyData.length));
    }
    return (0, crypto_1.sha256)(pubkeyData).slice(0, 20);
}
function rawSecp256k1PubkeyToRawAddress(pubkeyData) {
    if (pubkeyData.length !== 33) {
        throw new Error("Invalid Secp256k1 pubkey length (compressed): ".concat(pubkeyData.length));
    }
    return (0, crypto_1.ripemd160)((0, crypto_1.sha256)(pubkeyData));
}
// For secp256k1 this assumes we already have a compressed pubkey.
function pubkeyToRawAddress(pubkey) {
    if ((0, pubkeys_1.isSecp256k1Pubkey)(pubkey)) {
        var pubkeyData = (0, encoding_1.fromBase64)(pubkey.value);
        return rawSecp256k1PubkeyToRawAddress(pubkeyData);
    }
    else if ((0, pubkeys_1.isEd25519Pubkey)(pubkey)) {
        var pubkeyData = (0, encoding_1.fromBase64)(pubkey.value);
        return rawEd25519PubkeyToRawAddress(pubkeyData);
    }
    else if ((0, pubkeys_1.isMultisigThresholdPubkey)(pubkey)) {
        // https://github.com/tendermint/tendermint/blob/38b401657e4ad7a7eeb3c30a3cbf512037df3740/crypto/multisig/threshold_pubkey.go#L71-L74
        var pubkeyData = (0, encoding_2.encodeAminoPubkey)(pubkey);
        return (0, crypto_1.sha256)(pubkeyData).slice(0, 20);
    }
    else {
        throw new Error("Unsupported public key type");
    }
}
function pubkeyToAddress(pubkey, prefix) {
    return (0, encoding_1.toBech32)(prefix, pubkeyToRawAddress(pubkey));
}
//# sourceMappingURL=addresses.js.map
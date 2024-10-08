"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSecp256k1Signature = encodeSecp256k1Signature;
exports.decodeSignature = decodeSignature;
/* eslint-disable @typescript-eslint/naming-convention */
var encoding_1 = require("@/packages/@cosmjs/encoding");
var encoding_2 = require("./encoding");
var pubkeys_1 = require("./pubkeys");
/**
 * Takes a binary pubkey and signature to create a signature object
 *
 * @param pubkey a compressed secp256k1 public key
 * @param signature a 64 byte fixed length representation of secp256k1 signature components r and s
 */
function encodeSecp256k1Signature(pubkey, signature, urlType) {
    if (signature.length !== 64) {
        throw new Error("Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s.");
    }
    return {
        pub_key: (0, encoding_2.encodeSecp256k1Pubkey)(pubkey, urlType),
        signature: (0, encoding_1.toBase64)(signature),
    };
}
function decodeSignature(signature) {
    switch (signature.pub_key.type) {
        // Note: please don't add cases here without writing additional unit tests
        case pubkeys_1.pubkeyType.secp256k1:
            return {
                pubkey: (0, encoding_1.fromBase64)(signature.pub_key.value),
                signature: (0, encoding_1.fromBase64)(signature.signature),
            };
        default:
            throw new Error("Unsupported pubkey type");
    }
}
//# sourceMappingURL=signature.js.map
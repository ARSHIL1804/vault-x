"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCosmoshubPath = makeCosmoshubPath;
var crypto_1 = require("@/packages/@cosmjs/crypto");
/**
 * The Cosmos Hub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
function makeCosmoshubPath(a) {
    return [
        crypto_1.Slip10RawIndex.hardened(44),
        crypto_1.Slip10RawIndex.hardened(118),
        crypto_1.Slip10RawIndex.hardened(0),
        crypto_1.Slip10RawIndex.normal(0),
        crypto_1.Slip10RawIndex.normal(a),
    ];
}
//# sourceMappingURL=paths.js.map
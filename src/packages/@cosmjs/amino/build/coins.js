"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coin = coin;
exports.coins = coins;
exports.parseCoins = parseCoins;
exports.addCoins = addCoins;
var math_1 = require("@/packages/@cosmjs/math");
/**
 * Creates a coin.
 *
 * If your values do not exceed the safe integer range of JS numbers (53 bit),
 * you can use the number type here. This is the case for all typical Cosmos SDK
 * chains that use the default 6 decimals.
 *
 * In case you need to supportr larger values, use unsigned integer strings instead.
 */
function coin(amount, denom) {
    var outAmount;
    if (typeof amount === "number") {
        try {
            outAmount = new math_1.Uint53(amount).toString();
        }
        catch (_err) {
            throw new Error("Given amount is not a safe integer. Consider using a string instead to overcome the limitations of JS numbers.");
        }
    }
    else {
        if (!amount.match(/^[0-9]+$/)) {
            throw new Error("Invalid unsigned integer string format");
        }
        outAmount = amount.replace(/^0*/, "") || "0";
    }
    return {
        amount: outAmount,
        denom: denom,
    };
}
/**
 * Creates a list of coins with one element.
 */
function coins(amount, denom) {
    return [coin(amount, denom)];
}
/**
 * Takes a coins list like "819966000ucosm,700000000ustake" and parses it.
 *
 * Starting with CosmJS 0.32.3, the following imports are all synonym and support
 * a variety of denom types such as IBC denoms or tokenfactory. If you need to
 * restrict the denom to something very minimal, this needs to be implemented
 * separately in the caller.
 *
 * ```
 * import { parseCoins } from "@/packages/@cosmjs/proto-signing";
 * // equals
 * import { parseCoins } from "@/packages/@cosmjs/stargate";
 * // equals
 * import { parseCoins } from "@/packages/@cosmjs/amino";
 * ```
 *
 * This function is not made for supporting decimal amounts and does not support
 * parsing gas prices.
 */
function parseCoins(input) {
    return input
        .replace(/\s/g, "")
        .split(",")
        .filter(Boolean)
        .map(function (part) {
        // Denom regex from Stargate (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/types/coin.go#L599-L601)
        var match = part.match(/^([0-9]+)([a-zA-Z][a-zA-Z0-9/]{2,127})$/);
        if (!match)
            throw new Error("Got an invalid coin string");
        return {
            amount: match[1].replace(/^0+/, "") || "0",
            denom: match[2],
        };
    });
}
/**
 * Function to sum up coins with type Coin
 */
function addCoins(lhs, rhs) {
    if (lhs.denom !== rhs.denom)
        throw new Error("Trying to add two coins with different denoms");
    return {
        amount: math_1.Decimal.fromAtomics(lhs.amount, 0).plus(math_1.Decimal.fromAtomics(rhs.amount, 0)).atomics,
        denom: lhs.denom,
    };
}
//# sourceMappingURL=coins.js.map
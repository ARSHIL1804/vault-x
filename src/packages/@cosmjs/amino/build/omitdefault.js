"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitDefault = omitDefault;
/**
 * Returns the given input. If the input is the default value
 * of protobuf, undefined is retunred. Use this when creating Amino JSON converters.
 */
function omitDefault(input) {
    switch (typeof input) {
        case "string":
            return input === "" ? undefined : input;
        case "number":
            return input === 0 ? undefined : input;
        case "bigint":
            return input === BigInt(0) ? undefined : input;
        case "boolean":
            return !input ? undefined : input;
        default:
            throw new Error("Got unsupported type '".concat(typeof input, "'"));
    }
}
//# sourceMappingURL=omitdefault.js.map
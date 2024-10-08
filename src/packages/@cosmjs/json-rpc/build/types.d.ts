import { JsonCompatibleArray, JsonCompatibleDictionary, JsonCompatibleValue } from "./compatibility";
export type JsonRpcId = number | string;
export interface JsonRpcRequest {
    readonly jsonrpc: "2.0";
    readonly id: JsonRpcId;
    readonly method: string;
    readonly params: JsonCompatibleArray | JsonCompatibleDictionary;
}
export interface JsonRpcSuccessResponse {
    readonly jsonrpc: "2.0";
    readonly id: JsonRpcId;
    readonly result: any;
}
export interface JsonRpcError {
    readonly code: number;
    readonly message: string;
    readonly data?: JsonCompatibleValue;
}
/**
 * And error object as described in https://www.jsonrpc.org/specification#error_object
 */
export interface JsonRpcErrorResponse {
    readonly jsonrpc: "2.0";
    readonly id: JsonRpcId | null;
    readonly error: JsonRpcError;
}
export type JsonRpcResponse = JsonRpcSuccessResponse | JsonRpcErrorResponse;
export declare function isJsonRpcErrorResponse(response: JsonRpcResponse): response is JsonRpcErrorResponse;
export declare function isJsonRpcSuccessResponse(response: JsonRpcResponse): response is JsonRpcSuccessResponse;
/**
 * Error codes as specified in JSON-RPC 2.0
 *
 * @see https://www.jsonrpc.org/specification#error_object
 */
export declare const jsonRpcCode: {
    parseError: number;
    invalidRequest: number;
    methodNotFound: number;
    invalidParams: number;
    internalError: number;
    serverError: {
        default: number;
    };
};

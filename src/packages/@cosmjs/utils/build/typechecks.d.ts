/**
 * Checks if data is a non-null object (i.e. matches the TypeScript object type).
 *
 * Note: this returns true for arrays, which are objects in JavaScript
 * even though array and object are different types in JSON.
 *
 * @see https://www.typescriptlang.org/docs/handbook/basic-types.html#object
 */
export declare function isNonNullObject(data: unknown): data is object;
/**
 * Checks if data is an Uint8Array. Note: Buffer is treated as not a Uint8Array
 */
export declare function isUint8Array(data: unknown): data is Uint8Array;
/**
 * Checks if input is not undefined in a TypeScript-friendly way.
 *
 * This is convenient to use in e.g. `Array.filter` as it will convert
 * the type of a `Array<Foo | undefined>` to `Array<Foo>`.
 */
export declare function isDefined<X>(value: X | undefined): value is X;

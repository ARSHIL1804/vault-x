import { Attribute, Event } from "./events";
export interface Log {
    readonly msg_index: number;
    readonly log: string;
    readonly events: readonly Event[];
}
export declare function parseAttribute(input: unknown): Attribute;
export declare function parseEvent(input: unknown): Event;
export declare function parseLog(input: unknown): Log;
export declare function parseLogs(input: unknown): readonly Log[];
export declare function parseRawLog(input: string | undefined): readonly Log[];
/**
 * Searches in logs for the first event of the given event type and in that event
 * for the first first attribute with the given attribute key.
 *
 * Throws if the attribute was not found.
 */
export declare function findAttribute(logs: readonly Log[], eventType: string, attrKey: string): Attribute;
//# sourceMappingURL=logs.d.ts.map
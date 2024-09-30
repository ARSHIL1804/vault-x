import { Pubkey } from "@/packages/@cosmjs/amino";
import { Any } from "cosmjs-types/google/protobuf/any";
export declare function encodePubkey(pubkey: Pubkey): Any;
export declare function decodePubkey(pubkey?: Any | null): Pubkey | null;
//# sourceMappingURL=pubkey.d.ts.map
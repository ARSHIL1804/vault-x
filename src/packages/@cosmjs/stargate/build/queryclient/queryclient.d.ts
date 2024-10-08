import { CometClient } from "@/packages/@cosmjs/tendermint-rpc";
import { ProofOps } from "cosmjs-types/tendermint/crypto/proof";
type QueryExtensionSetup<P> = (base: QueryClient) => P;
export interface ProvenQuery {
    readonly key: Uint8Array;
    readonly value: Uint8Array;
    readonly proof: ProofOps;
    readonly height: number;
}
export interface QueryStoreResponse {
    /** The response key from Tendermint. This is the same as the query key in the request. */
    readonly key: Uint8Array;
    readonly value: Uint8Array;
    readonly height: number;
}
/**
 * The response of an ABCI query to Tendermint.
 * This is a subset of `tendermint34.AbciQueryResponse` in order
 * to abstract away Tendermint versions.
 */
export interface QueryAbciResponse {
    readonly value: Uint8Array;
    readonly height: number;
}
export declare class QueryClient {
    /** Constructs a QueryClient with 0 extensions */
    static withExtensions(cometClient: CometClient): QueryClient;
    /** Constructs a QueryClient with 1 extension */
    static withExtensions<A extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>): QueryClient & A;
    /** Constructs a QueryClient with 2 extensions */
    static withExtensions<A extends object, B extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>): QueryClient & A & B;
    /** Constructs a QueryClient with 3 extensions */
    static withExtensions<A extends object, B extends object, C extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>): QueryClient & A & B & C;
    /** Constructs a QueryClient with 4 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>): QueryClient & A & B & C & D;
    /** Constructs a QueryClient with 5 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>): QueryClient & A & B & C & D & E;
    /** Constructs a QueryClient with 6 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>): QueryClient & A & B & C & D & E & F;
    /** Constructs a QueryClient with 7 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>): QueryClient & A & B & C & D & E & F & G;
    /** Constructs a QueryClient with 8 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>): QueryClient & A & B & C & D & E & F & G & H;
    /** Constructs a QueryClient with 9 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>): QueryClient & A & B & C & D & E & F & G & H & I;
    /** Constructs a QueryClient with 10 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>): QueryClient & A & B & C & D & E & F & G & H & I & J;
    /** Constructs a QueryClient with 11 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>): QueryClient & A & B & C & D & E & F & G & H & I & J & K;
    /** Constructs a QueryClient with 12 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L;
    /** Constructs a QueryClient with 13 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object, M extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>, setupExtensionM: QueryExtensionSetup<M>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M;
    /** Constructs a QueryClient with 14 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object, M extends object, N extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>, setupExtensionM: QueryExtensionSetup<M>, setupExtensionN: QueryExtensionSetup<N>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N;
    /** Constructs a QueryClient with 15 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object, M extends object, N extends object, O extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>, setupExtensionM: QueryExtensionSetup<M>, setupExtensionN: QueryExtensionSetup<N>, setupExtensionO: QueryExtensionSetup<O>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O;
    /** Constructs a QueryClient with 16 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object, M extends object, N extends object, O extends object, P extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>, setupExtensionM: QueryExtensionSetup<M>, setupExtensionN: QueryExtensionSetup<N>, setupExtensionO: QueryExtensionSetup<O>, setupExtensionP: QueryExtensionSetup<P>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P;
    /** Constructs a QueryClient with 17 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object, M extends object, N extends object, O extends object, P extends object, Q extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>, setupExtensionM: QueryExtensionSetup<M>, setupExtensionN: QueryExtensionSetup<N>, setupExtensionO: QueryExtensionSetup<O>, setupExtensionP: QueryExtensionSetup<P>, setupExtensionQ: QueryExtensionSetup<Q>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q;
    /** Constructs a QueryClient with 18 extensions */
    static withExtensions<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object, G extends object, H extends object, I extends object, J extends object, K extends object, L extends object, M extends object, N extends object, O extends object, P extends object, Q extends object, R extends object>(cometClient: CometClient, setupExtensionA: QueryExtensionSetup<A>, setupExtensionB: QueryExtensionSetup<B>, setupExtensionC: QueryExtensionSetup<C>, setupExtensionD: QueryExtensionSetup<D>, setupExtensionE: QueryExtensionSetup<E>, setupExtensionF: QueryExtensionSetup<F>, setupExtensionG: QueryExtensionSetup<G>, setupExtensionH: QueryExtensionSetup<H>, setupExtensionI: QueryExtensionSetup<I>, setupExtensionJ: QueryExtensionSetup<J>, setupExtensionK: QueryExtensionSetup<K>, setupExtensionL: QueryExtensionSetup<L>, setupExtensionM: QueryExtensionSetup<M>, setupExtensionN: QueryExtensionSetup<N>, setupExtensionO: QueryExtensionSetup<O>, setupExtensionP: QueryExtensionSetup<P>, setupExtensionQ: QueryExtensionSetup<Q>, setupExtensionR: QueryExtensionSetup<R>): QueryClient & A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R;
    private readonly cometClient;
    constructor(cometClient: CometClient);
    /**
     * Queries the database store with a proof, which is then verified.
     *
     * Please note: the current implementation trusts block headers it gets from the PRC endpoint.
     */
    queryStoreVerified(store: string, queryKey: Uint8Array, desiredHeight?: number): Promise<QueryStoreResponse>;
    queryRawProof(store: string, queryKey: Uint8Array, desiredHeight?: number): Promise<ProvenQuery>;
    /**
     * Performs an ABCI query to Tendermint without requesting a proof.
     *
     * If the `desiredHeight` is set, a particular height is requested. Otherwise
     * the latest height is requested. The response contains the actual height of
     * the query.
     */
    queryAbci(path: string, request: Uint8Array, desiredHeight?: number): Promise<QueryAbciResponse>;
    private getNextHeader;
}
export {};
//# sourceMappingURL=queryclient.d.ts.map
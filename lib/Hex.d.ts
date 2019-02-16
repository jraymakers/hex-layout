export declare type AnyHex = Hex | MutableHex;
export declare class Hex {
    static fromId(hexId: string): Hex;
    static readonly Origin: Hex;
    static readonly PosQ: Hex;
    static readonly PosR: Hex;
    static readonly PosQNegR: Hex;
    static readonly NegQ: Hex;
    static readonly NegR: Hex;
    static readonly NegQPosR: Hex;
    static Directions: ReadonlyArray<Hex>;
    readonly q: number;
    readonly r: number;
    readonly s: number;
    constructor(q: number, r: number, s?: number);
    id(): string;
    equals(h: Hex): boolean;
    length(): number;
    distanceTo(h: Hex): number;
    clone(): Hex;
    plus(h: Hex): Hex;
    minus(h: Hex): Hex;
    times(n: number): Hex;
    mutableCopy(): MutableHex;
}
export declare class MutableHex {
    q: number;
    r: number;
    s: number;
    constructor(q: number, r: number, s?: number);
    add(h: Hex): MutableHex;
    sub(h: Hex): MutableHex;
    scale(n: number): MutableHex;
    round(): MutableHex;
    frozenCopy(): Hex;
}

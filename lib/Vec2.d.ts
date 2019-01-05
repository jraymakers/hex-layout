export declare type AnyVec2 = Vec2 | MutableVec2;
export declare class Vec2 {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    equals(v: AnyVec2): boolean;
    length(): number;
    dot(v: AnyVec2): number;
    plus(v: AnyVec2): Vec2;
    minus(v: AnyVec2): Vec2;
    times(x: number, y?: number): Vec2;
    mutableCopy(): MutableVec2;
}
export declare class MutableVec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(v: AnyVec2): MutableVec2;
    sub(v: AnyVec2): MutableVec2;
    scale(x: number, y?: number): MutableVec2;
    scaleBy(v: AnyVec2): MutableVec2;
    frozenCopy(): Vec2;
}
export declare const ZeroZeroVec2: Vec2;
export declare const PosXVec2: Vec2;
export declare const NegXVec2: Vec2;
export declare const PosYVec2: Vec2;
export declare const NegYVec2: Vec2;
export interface BoundsVec2 {
    readonly min: Vec2;
    readonly max: Vec2;
}
export declare function boundsVec2(vecs: ReadonlyArray<Vec2>): BoundsVec2;

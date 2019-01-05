import { Hex } from './Hex';
import { BoundsVec2, Vec2 } from './Vec2';
export declare namespace XAlignedHex {
    const PosX: Vec2;
    const PosXPosY: Vec2;
    const NegXPosY: Vec2;
    const NegX: Vec2;
    const NegXNegY: Vec2;
    const PosXNegY: Vec2;
}
export declare namespace YAlignedHex {
    const PosXPosY: Vec2;
    const PosY: Vec2;
    const NegXPosY: Vec2;
    const NegXNegY: Vec2;
    const NegY: Vec2;
    const PosXNegY: Vec2;
}
export declare enum Corner {
    PosQPosR = 0,
    NegQPos2R = 1,
    Neg2QPosR = 2,
    NegQNegR = 3,
    PosQNeg2R = 4,
    Pos2QNegR = 5
}
export declare enum EdgeCenter {
    PosQ = 0,
    PosR = 1,
    NegQPosR = 2,
    NegQ = 3,
    NegR = 4,
    PosQNegR = 5
}
export interface HexLayoutSettings {
    readonly origin: Vec2;
    readonly qBasis: Vec2;
    readonly rBasis: Vec2;
    readonly scale: Vec2;
}
export declare class HexLayout {
    readonly origin: Vec2;
    readonly qBasis: Vec2;
    readonly rBasis: Vec2;
    readonly scale: Vec2;
    readonly qInverse: Vec2;
    readonly rInverse: Vec2;
    readonly cornerVecs: ReadonlyArray<Vec2>;
    readonly edgeCenterVecs: ReadonlyArray<Vec2>;
    constructor(settings: HexLayoutSettings);
    cornerVec(corner: Corner): Vec2;
    edgeCenterVec(edgeCenter: EdgeCenter): Vec2;
    centerOfHex(h: Hex): Vec2;
    hexFromPoint(v: Vec2): Hex;
    cornersFromCenter(center: Vec2): ReadonlyArray<Vec2>;
    cornersOfHex(h: Hex): ReadonlyArray<Vec2>;
    bounds(hexes: ReadonlyArray<Hex>): BoundsVec2;
}

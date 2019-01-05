import {
  Hex,
  MutableHex,
} from './Hex';

import {
  boundsVec2,
  BoundsVec2,
  Vec2,
} from './Vec2';

const sqrt3 = Math.sqrt(3);
const sqrt3_2 = sqrt3 / 2;

/*  __
 * / _\
 * \__/
 */
export namespace XAlignedHex {
  export const PosX     = new Vec2( 1  ,        0);
  export const PosXPosY = new Vec2( 0.5,  sqrt3_2);
  export const NegXPosY = new Vec2(-0.5,  sqrt3_2);
  export const NegX     = new Vec2(-1  ,        0);
  export const NegXNegY = new Vec2(-0.5, -sqrt3_2);
  export const PosXNegY = new Vec2( 0.5, -sqrt3_2);
}

/*   >.<
 * |     |
 * |  |  |
 *   >.<
 */
export namespace YAlignedHex {
  export const PosXPosY = new Vec2( sqrt3_2,  0.5);
  export const     PosY = new Vec2(       0,  1  );
  export const NegXPosY = new Vec2(-sqrt3_2,  0.5);
  export const NegXNegY = new Vec2(-sqrt3_2, -0.5);
  export const     NegY = new Vec2(       0, -1  );
  export const PosXNegY = new Vec2( sqrt3_2, -0.5);
}

export enum Corner {
  PosQPosR,
  NegQPos2R,
  Neg2QPosR,
  NegQNegR,
  PosQNeg2R,
  Pos2QNegR,
};

export enum EdgeCenter {
  PosQ,
  PosR,
  NegQPosR,
  NegQ,
  NegR,
  PosQNegR,
};

export interface HexLayoutSettings {
  readonly origin: Vec2; // location of 0,0 hex
  readonly qBasis: Vec2; // direction of first (q) hex coordinate
  readonly rBasis: Vec2; // direction of second (r) hex coordinate
  readonly scale: Vec2; // distance between hex centers
}

export class HexLayout {

  public readonly origin: Vec2;
  public readonly qBasis: Vec2;
  public readonly rBasis: Vec2;
  public readonly scale: Vec2;

  public readonly qInverse: Vec2;
  public readonly rInverse: Vec2;
  
  public readonly cornerVecs: ReadonlyArray<Vec2>;
  public readonly edgeCenterVecs: ReadonlyArray<Vec2>;

  constructor(settings: HexLayoutSettings) {
    this.origin = settings.origin;
    this.qBasis = settings.qBasis;
    this.rBasis = settings.rBasis;
    this.scale = settings.scale;

    const det = this.qBasis.x * this.rBasis.y - this.qBasis.y * this.rBasis.x;
    if (det === 0) {
      throw new Error('Invalid basis vectors!  Matrix has no determinant.');
    }
    const detInv = 1 / det;

    this.qInverse = new Vec2(this.rBasis.y * detInv, -this.rBasis.x * detInv);
    this.rInverse = new Vec2(-this.qBasis.y * detInv, this.qBasis.x * detInv);

    const posQPosRCornerVec =
      this.qBasis.mutableCopy().add(this.rBasis).scale(1/3).scaleBy(this.scale).frozenCopy();
    const negQPos2RCornerVec =
      this.rBasis.mutableCopy().scale(2).sub(this.qBasis).scale(1/3).scaleBy(this.scale).frozenCopy();
    const neg2QPosRCornerVec =
      this.qBasis.mutableCopy().scale(-2).add(this.rBasis).scale(1/3).scaleBy(this.scale).frozenCopy();
    const negQNegRCornerVec = posQPosRCornerVec.times(-1);
    const posQNeg2RCornerVec = negQPos2RCornerVec.times(-1);
    const pos2QNegRCornerVec = neg2QPosRCornerVec.times(-1);

    this.cornerVecs = [
      posQPosRCornerVec,
      negQPos2RCornerVec,
      neg2QPosRCornerVec,
      negQNegRCornerVec,
      posQNeg2RCornerVec,
      pos2QNegRCornerVec,
    ];

    const posQEdgeCenterVec =
      this.qBasis.mutableCopy().scale(1/2).scaleBy(this.scale).frozenCopy();
    const posREdgeCenterVec =
      this.rBasis.mutableCopy().scale(1/2).scaleBy(this.scale).frozenCopy();
    const negQPosREdgeCenterVec =
      this.rBasis.mutableCopy().sub(this.qBasis).scale(1/2).scaleBy(this.scale).frozenCopy();
    const negQEdgeCenterVec = posQEdgeCenterVec.times(-1);
    const negREdgeCenterVec = posREdgeCenterVec.times(-1);
    const posQNegREdgeCenterVec = negQPosREdgeCenterVec.times(-1);

    this.edgeCenterVecs = [
      posQEdgeCenterVec,
      posREdgeCenterVec,
      negQPosREdgeCenterVec,
      negQEdgeCenterVec,
      negREdgeCenterVec,
      posQNegREdgeCenterVec,
    ];
  }

  public cornerVec(corner: Corner): Vec2 {
    return this.cornerVecs[corner];
  }

  public edgeCenterVec(edgeCenter: EdgeCenter): Vec2 {
    return this.edgeCenterVecs[edgeCenter];
  }

  public centerOfHex(h: Hex): Vec2 {
    return new Vec2(
      this.origin.x + this.scale.x * (this.qBasis.x * h.q + this.rBasis.x * h.r),
      this.origin.y + this.scale.y * (this.qBasis.y * h.q + this.rBasis.y * h.r),
    );
  }

  public hexFromPoint(v: Vec2): Hex {
    const x = (v.x - this.origin.x) / this.scale.x;
    const y = (v.y - this.origin.y) / this.scale.y;
    return new MutableHex(
      x * this.qInverse.x + y * this.qInverse.y,
      x * this.rInverse.x + y * this.rInverse.y,
    ).round().frozenCopy();
  }

  public cornersFromCenter(center: Vec2): ReadonlyArray<Vec2> {
    return this.cornerVecs.map((v) => center.plus(v));
  }

  public cornersOfHex(h: Hex): ReadonlyArray<Vec2> {
    const center = this.centerOfHex(h);
    return this.cornersFromCenter(center);
  }

  public bounds(hexes: ReadonlyArray<Hex>): BoundsVec2 {
    let allCorners: Vec2[] = [];
    for (const hex of hexes) {
      allCorners = allCorners.concat(this.cornersOfHex(hex));
    }
    return boundsVec2(allCorners);
  }

}

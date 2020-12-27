import { Vector } from './Vector';

/**
 * The coordinates of a hexagon.
 * 
 * The coordinates, q and r, are distances along two axes that are at a 60° angle.
 * 
 * A third coordinate, s, is derived from q and r such that q + r + s = 0.
 * The s coordinate represents the distance along the third hexagonal axis
 * (at 60° to both the q and r axes).
 * 
 * See https://www.redblobgames.com/grids/hexagons/#coordinates-axial for details.
 */
export class Hex {

  /** Origin hex (0, 0). */
  public static readonly Origin = new Hex( 0,  0);

  /** Hex in the positive Q direction (1, 0). */
  public static readonly PosQ = new Hex( 1,  0);

  /** Hex in the positive R direction (0, 1). */
  public static readonly PosR = new Hex( 0,  1);

  /** Hex in the positive S direction (1, -1). */
  public static readonly PosS = new Hex( 1, -1);

  /** Hex in the negative Q direction (-1, 0). */
  public static readonly NegQ = new Hex(-1,  0);

  /** Hex in the negative R direction (0, -1). */
  public static readonly NegR = new Hex( 0, -1);

  /** Hex in the negative S direction (-1, 1). */
  public static readonly NegS = new Hex(-1,  1);

  /** 
   * All six hex directions, starting with positive Q, then positive R,
   * and continuing around in a circle.
   */
  public static readonly Directions: ReadonlyArray<Hex> = [
    Hex.PosQ,
    Hex.PosR,
    Hex.PosS,
    Hex.NegQ,
    Hex.NegR,
    Hex.NegS,
  ];

  /**
   * Create a hex from a key string.
   * 
   * The key should be string consisting of the decimal integer representations
   * of the q and r coordinates separated by an underscore.
   * 
   * See the key() method.
   */
  public static fromKey(key: string): Hex {
    const parts = key.split('_');
    return new Hex(parseInt(parts[0], 10), parseInt(parts[1], 10));
  }

  /**
   * Returns the closest integer-coordinate hex to the given vector,
   * which is interpreted to be in axial space.
   * 
   * See https://www.redblobgames.com/grids/hexagons/#coordinates-axial for details.
   */
  public static fromAxialVector(v: Vector): Hex {
    const q = v.x;
    const r = v.y;
    const s = -q - r;
    let roundQ = Math.round(q);
    let roundR = Math.round(r);
    const roundS = Math.round(s);
    const qDiff = Math.abs(q - roundQ);
    const rDiff = Math.abs(r - roundR);
    const sDiff = Math.abs(s - roundS);
    if (qDiff > rDiff && qDiff > sDiff) {
      roundQ = -roundR - roundS;
    } else if (rDiff > sDiff) {
      roundR = -roundQ - roundS;
    }
    return new Hex(roundQ, roundR);
  }

  /** The q coordinate. */
  public readonly q: number;

  /** The r coordinate. */
  public readonly r: number;

  /** Construct a hex from its q and r coordinates. */
  constructor(q: number, r: number) {
    this.q = q;
    this.r = r;
  }

  /**
   * Returns the s coordinate.
   * 
   * Derived from q and r such that q + r + s = 0.
   * 
   * See https://www.redblobgames.com/grids/hexagons/#coordinates-axial for details.
   */
  public s(): number {
    return -this.q - this.r;
  }

  /**
   * Returns the string key for this hex.
   * 
   * The key consists of the decimal integer representations
   * of the q and r coordinates separated by an underscore.
   */
  public key(): string {
    return `${this.q}_${this.r}`;
  }

  /** Returns true if this hex has the same coordinates as the given hex. */
  public equals(h: Hex): boolean {
    return this.q === h.q && this.r === h.r;
  }

  /** Returns the "length" of this hex, when treated as a vector from the origin. */
  public length(): number {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s())) / 2;
  }

  /** Returns the distance from this hex to the given hex. */
  public distanceTo(h: Hex): number {
    return (Math.abs(h.q - this.q) + Math.abs(h.r - this.r) + Math.abs(h.s() - this.s())) / 2;
  }

  /** Returns the hex that results from adding this hex to the given hex. */
  public plus(h: Hex): Hex {
    return new Hex(this.q + h.q, this.r + h.r);
  }

  /** Returns the hex that results from subtracting the given hex from this hex. */
  public minus(h: Hex): Hex {
    return new Hex(this.q - h.q, this.r - h.r);
  }

  /** Returns a vector, in axial space, to the center of the hex. */
  public toAxialVector(): Vector {
    return new Vector(this.q, this.r);
  }

}

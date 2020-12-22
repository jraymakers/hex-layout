/**
 * The coordinates of a hexagon in an abstract space.
 * A hexagon location is described by two coordinates, q and r,
 * which indicate distance along two axes at an angle of 60° (or PI/3) from each other.
 * A third coordinate, s, is derived from q and r so that all three sum to 0;
 * s is the distance along the third axis 60° from r and 120° from q.
 */
export class Hex {

  /** Origin hex (0, 0). */
  public static readonly Origin   = new Hex( 0,  0);

  /** Hex in the positive Q direction (1, 0). */
  public static readonly PosQ     = new Hex( 1,  0);

  /** Hex in the positive R direction (0, 1). */
  public static readonly PosR     = new Hex( 0,  1);

  /** Hex in the positive Q, negative R direction (1, -1). */
  public static readonly PosQNegR = new Hex( 1, -1);

  /** Hex in the negative Q direction (-1, 0). */
  public static readonly NegQ     = new Hex(-1,  0);

  /** Hex in the negative R direction (0, -1). */
  public static readonly NegR     = new Hex( 0, -1);

  /** Hex in the negative Q, positive R direction (-1, 1). */
  public static readonly NegQPosR = new Hex(-1,  1);

  /** 
   * All six hex directions, starting with positive Q, then positive R,
   * and continuing around in a circle.
   */
  public static readonly Directions: ReadonlyArray<Hex> = [
    Hex.PosQ,
    Hex.PosR,
    Hex.PosQNegR,
    Hex.NegQ,
    Hex.NegR,
    Hex.NegQPosR,
  ];

  /**
   * Create a hex from a key string.
   * The key should be string consisting of the decimal integer representations
   * of the q and r coordinates separated by an underscore.
   * See the key() method.
   */
  public static fromKey(key: string): Hex {
    const parts = key.split('_');
    return new Hex(parseInt(parts[0], 10), parseInt(parts[1], 10));
  }

  /** Creates a hex from its q and r coordinates. */
  public static create(q: number, r: number): Hex {
    return new Hex(q, r);
  }

  /** Creates a mutable hex from its q and r coordinates. */
  public static mutable(q: number, r: number): MutableHex {
    return new MutableHex(q, r);
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
   * Derived from q and r such that all three sum to 0.
   */
  public s(): number {
    return -this.q - this.r;
  }

  /**
   * Returns the string key for this hex.
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

  /**
   * Returns the hex that results from scaling each coordinate by the given value or values.
   * If one value is given, both coordinates are scaled by that value.
   * If two values are given, each coordinate is scaled by the cooresponding value.
   */
  public times(q: number, r: number = q): Hex {
    return new Hex(this.q * q, this.r * r);
  }

  /** Returns a new mutable copy of this hex. */
  public mutableCopy(): MutableHex {
    return new MutableHex(this.q, this.r);
  }

}

/**
 * The mutable coordinates of a hexagon in an abstract space.
 * A hexagon location is described by two coordinates, q and r,
 * which indicate distance along two axes at an angle of 60° (or PI/3).
 * A third coordinate, s, is derived from q and r so that they sum to 0;
 * s is the distance along the third axis  60° from r and 120° from q.
 */
export class MutableHex extends Hex {

  /** Creates a mutable hex from its q and r coordinates. */
  public static create(q: number, r: number): MutableHex {
    return new MutableHex(q, r);
  }

  /** The q coordinate. */
  public q: number;

  /** The r coordinate. */
  public r: number;

  /** Construct a mutable hex from its q and r coordinates. */
  constructor(q: number, r: number) {
    super(q,r);
  }

  /** Updates this hex by adding the given hex, and returns the result. */
  public add(h: Hex): MutableHex {
    this.q += h.q;
    this.r += h.r;
    return this;
  }

  /** Updates this hex by subtracting the given hex, and returns the result. */
  public sub(h: Hex): MutableHex {
    this.q -= h.q;
    this.r -= h.r;
    return this;
  }

  /**
   * Updates this hex by scaling it by the given value or values, and returns the result.
   * If one value is given, both coordinates are scaled by that value.
   * If two values are given, each coordinate is scaled by the cooresponding value.
   */
  public scale(q: number, r: number = q): MutableHex {
    this.q *= q;
    this.r *= r;
    return this;
  }

  /** Updates this hex by rounding its coordinates to the nearest integer values. */
  public round(): MutableHex {
    let roundQ = Math.round(this.q);
    let roundR = Math.round(this.r);
    let roundS = Math.round(this.s());
    const qDiff = Math.abs(this.q - roundQ);
    const rDiff = Math.abs(this.r - roundR);
    const sDiff = Math.abs(this.s() - roundS);
    if (qDiff > rDiff && qDiff > sDiff) {
      roundQ = -roundR - roundS;
    } else if (rDiff > sDiff) {
      roundR = -roundQ - roundS
    }/* else {
      roundS = -roundQ - roundR;
    }*/
    this.q = roundQ;
    this.r = roundR;
    // this.s = roundS;
    return this;
  }

  /** Returns a frozen (immutable) copy of this hex. */
  public frozenCopy(): Hex {
    return new Hex(this.q, this.r/*, this.s*/);
  }

}

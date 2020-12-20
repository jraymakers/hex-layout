export type AnyHex = Hex | MutableHex;

export class Hex {

  public static readonly Origin   = new Hex( 0,  0);

  public static readonly PosQ     = new Hex( 1,  0);
  public static readonly PosR     = new Hex( 0,  1);
  public static readonly PosQNegR = new Hex( 1, -1);
  public static readonly NegQ     = new Hex(-1,  0);
  public static readonly NegR     = new Hex( 0, -1);
  public static readonly NegQPosR = new Hex(-1,  1);

  public static readonly Directions: ReadonlyArray<Hex> = [
    Hex.PosQ,
    Hex.PosR,
    Hex.PosQNegR,
    Hex.NegQ,
    Hex.NegR,
    Hex.NegQPosR,
  ];

  public static fromKey(hexKey: string): Hex {
    const parts = hexKey.split('_');
    return new Hex(parseInt(parts[0], 10), parseInt(parts[1], 10));
  }

  public static create(q: number, r: number, s?: number): Hex {
    return new Hex(q, r, s);
  }

  public static mutable(q: number, r: number, s?: number): MutableHex {
    return new MutableHex(q, r, s);
  }

  public readonly q: number;
  public readonly r: number;
  public readonly s: number;

  constructor(q: number, r: number, s?: number) {
    this.q = q;
    this.r = r;
    this.s = s == undefined ? -q-r : s;
  }

  public key(): string {
    return `${this.q}_${this.r}`;
  }

  public equals(h: AnyHex): boolean {
    return this.q === h.q && this.r === h.r && this.s === h.s;
  }

  public length(): number {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  public distanceTo(h: AnyHex): number {
    return (Math.abs(h.q - this.q) + Math.abs(h.r - this.r) + Math.abs(h.s - this.s)) / 2;
  }

  public plus(h: AnyHex): Hex {
    return new Hex(this.q + h.q, this.r + h.r, this.s + h.s);
  }

  public minus(h: AnyHex): Hex {
    return new Hex(this.q - h.q, this.r - h.r, this.s - h.s);
  }

  public times(n: number): Hex {
    return new Hex(this.q * n, this.r * n, this.s * n);
  }

  public mutableCopy(): MutableHex {
    return new MutableHex(this.q, this.r, this.s);
  }

}

export class MutableHex {

  public q: number;
  public r: number;
  public s: number;

  constructor(q: number, r: number, s?: number) {
    this.q = q;
    this.r = r;
    this.s = s == undefined ? -q-r : s;
  }

  public add(h: AnyHex): MutableHex {
    this.q += h.q;
    this.r += h.r;
    this.s += h.s;
    return this;
  }

  public sub(h: AnyHex): MutableHex {
    this.q -= h.q;
    this.r -= h.r;
    this.s -= h.s;
    return this;
  }

  public scale(n: number): MutableHex {
    this.q *= n;
    this.r *= n;
    this.s *= n;
    return this;
  }

  public round(): MutableHex {
    let roundQ = Math.round(this.q);
    let roundR = Math.round(this.r);
    let roundS = Math.round(this.s);
    const qDiff = Math.abs(this.q - roundQ);
    const rDiff = Math.abs(this.r - roundR);
    const sDiff = Math.abs(this.s - roundS);
    if (qDiff > rDiff && qDiff > sDiff) {
      roundQ = -roundR - roundS;
    } else if (rDiff > sDiff) {
      roundR = -roundQ - roundS
    } else {
      roundS = -roundQ - roundR;
    }
    this.q = roundQ;
    this.r = roundR;
    this.s = roundS;
    return this;
  }

  public frozenCopy(): Hex {
    return new Hex(this.q, this.r, this.s);
  }

}

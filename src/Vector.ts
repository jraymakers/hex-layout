export type AnyVector = Vector | MutableVector;

export class Vector {

  public static readonly Zero = new Vector(0,  0);

  public static readonly X = new Vector(1, 0);
  public static readonly Y = new Vector(0, 1);

  public static readonly PI_3 = Vector.direction(Math.PI/3);
  public static readonly PI_6 = Vector.direction(Math.PI/6);

  public static create(x: number, y: number): Vector {
    return new Vector(x, y);
  }

  public static direction(radians: number): Vector {
    return new Vector(Math.cos(radians), Math.sin(radians));
  }

  public static mutable(x: number, y: number): MutableVector {
    return new MutableVector(x, y);
  }

  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(v: AnyVector): boolean {
    return this.x === v.x && this.y === v.y;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public dot(v: AnyVector): number {
    return this.x * v.x + this.y * v.y;
  }

  public plus(v: AnyVector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  public minus(v: AnyVector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  public times(x: number, y: number = x): Vector {
    return new Vector(this.x * x, this.y * y);
  }

  public mutableCopy(): MutableVector {
    return new MutableVector(this.x, this.y);
  }

}

export class MutableVector {

  public static create(x: number, y: number): MutableVector {
    return new MutableVector(x, y);
  }

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(v: AnyVector): MutableVector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public sub(v: AnyVector): MutableVector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public scale(x: number, y: number = x): MutableVector {
    this.x *= x;
    this.y *= y;
    return this;
  }

  public scaleBy(v: AnyVector): MutableVector {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  public frozenCopy(): Vector {
    return new Vector(this.x, this.y);
  }

}

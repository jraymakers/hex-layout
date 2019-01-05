export type AnyVec2 = Vec2 | MutableVec2;

export class Vec2 {

  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(v: AnyVec2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public dot(v: AnyVec2): number {
    return this.x * v.x + this.y * v.y;
  }

  public plus(v: AnyVec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  public minus(v: AnyVec2): Vec2 {
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  public times(x: number, y: number = x): Vec2 {
    return new Vec2(this.x * x, this.y * y);
  }

  public mutableCopy(): MutableVec2 {
    return new MutableVec2(this.x, this.y);
  }

}

export class MutableVec2 {

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(v: AnyVec2): MutableVec2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public sub(v: AnyVec2): MutableVec2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public scale(x: number, y: number = x): MutableVec2 {
    this.x *= x;
    this.y *= y;
    return this;
  }

  public scaleBy(v: AnyVec2): MutableVec2 {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  public frozenCopy(): Vec2 {
    return new Vec2(this.x, this.y);
  }

}

export const ZeroZeroVec2 = new Vec2(0,0);
export const PosXVec2 = new Vec2(1, 0);
export const NegXVec2 = new Vec2(-1, 0);
export const PosYVec2 = new Vec2(0, 1);
export const NegYVec2 = new Vec2(0, -1);

export interface BoundsVec2 {
  readonly min: Vec2;
  readonly max: Vec2;
}

export function boundsVec2(vecs: ReadonlyArray<Vec2>): BoundsVec2 {
  let minX: number = Number.MAX_VALUE;
  let minY: number = Number.MAX_VALUE;
  let maxX: number = Number.MIN_VALUE;
  let maxY: number = Number.MIN_VALUE;
  for (const v of vecs) {
    if (v.x < minX) {
      minX = v.x;
    }
    if (v.y < minY) {
      minY = v.y;
    }
    if (v.x > maxX) {
      maxX = v.x;
    }
    if (v.y > maxY) {
      maxY = v.y;
    }
  }
  return {
    min: new Vec2(minX, minY),
    max: new Vec2(maxX, maxY)
  };
}

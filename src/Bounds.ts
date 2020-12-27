import { Vector } from './Vector';

/** Represents a rectangular region in two-dimensional Cartesian space. */
export class Bounds {

  /** Returns the smallest bounds that contains the given vectors. */
  public static fromVectors(vecs: ReadonlyArray<Vector>): Bounds {
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
    return new Bounds(minX, minY, maxX, maxY);
  }

  /** Minimum X value (i.e. "left"). */
  public readonly minX: number;

  /** Minimum Y value (i.e. "top" when postive Y is "down"). */
  public readonly minY: number;

  /** Maximum X value (i.e. "right"). */
  public readonly maxX: number;

  /** Maximum Y value (i.e. "bottom" when positive Y is "down"). */
  public readonly maxY: number;

  /** Constructs a bounds given minimum and maximum values for X and Y. */
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  /** Returns the difference between the maximum and minimum X values. */
  public width(): number {
    return this.maxX - this.minX;
  }

  /** Returns the difference between the maximum and minimum Y values. */
  public height(): number {
    return this.maxY - this.minY;
  }

}

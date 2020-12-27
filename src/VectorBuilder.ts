import { Vector } from './Vector';

/** A helper for building vectors efficiently. */
export class VectorBuilder {

  /** Creates a new vector builder starting from a vector. */
  public fromVector(v: Vector): VectorBuilder {
    return new VectorBuilder(v.x, v.y);
  }

  /** The x coordinate. */
  public x: number;

  /** The y coordinate. */
  public y: number;

  /** Constructs a new vector builder starting from x and y coordinates. */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /** Adds the given vector to the vector being built. */
  public add(v: Vector): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /** Subtracts the given vector to the vector being built. */
  public sub(v: Vector): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Scales the coordinates of the vector being built by the given x and y factors.
   * If only one factor is given, it is used for both coordinates.
   */
  public scaleBy(kx: number, ky: number = kx): this {
    this.x *= kx;
    this.y *= ky;
    return this;
  }

  /** Returns the built vector. */
  public vector(): Vector {
    return new Vector(this.x, this.y);
  }

}

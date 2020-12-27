/** A direction or point in two-dimensional Cartesian space. */
export class Vector {

  /** Zero length vector representing the origin. */
  public static readonly Zero = new Vector(0, 0);

  /** Unit vector in the positive x direction. */
  public static readonly X = new Vector(1, 0);

  /** Unit vector in the positive y direction. */
  public static readonly Y = new Vector(0, 1);

  /** Unit vector at an angle of PI/6 from the x axis. */
  public static readonly PI_6 = Vector.direction(Math.PI / 6);

  /** Unit vector at an angle of PI/3 from the x axis. */
  public static readonly PI_3 = Vector.direction(Math.PI / 3);

  /** Creates a unit vector given its angle in radians from the x axis. */
  public static direction(radians: number): Vector {
    return new Vector(Math.cos(radians), Math.sin(radians));
  }

  /** The x coordinate. */
  public readonly x: number;

  /** The y coordinate. */
  public readonly y: number;

  /** Constructs a vector given its x and y coordinates. */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /** Returns true if this vector has the same coordinates as the given vector. */
  public equals(v: Vector): boolean {
    return this.x === v.x && this.y === v.y;
  }

  /** Returns the length of this vector. */
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** Returns the dot product of this vector with the given vector. */
  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  /** Returns the vector that results from adding this vector and the given vector. */
  public plus(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /** Returns the vector that results from subtracting the given vector from this vector. */
  public minus(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * Returns the vector that results from scaling the coordinates by the given x and y factors.
   * If only one factor is given, it is used for both coordinates.
   */
  public scaledBy(kx: number, ky: number = kx): Vector {
    return new Vector(this.x * kx, this.y * ky);
  }

}

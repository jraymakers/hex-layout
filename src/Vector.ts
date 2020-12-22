/** A direction or point in two-dimensional Cartesian space. */
export class Vector {

  /** Zero length vector representing the origin. */
  public static readonly Zero = new Vector(0, 0);

  /** Unit vector in the positive x direction. */
  public static readonly X = new Vector(1, 0);

  /**
   * Unit vector in the positive t direction.
   * Note that positive t is typically considered "down" in computer graphics.
   */
  public static readonly Y = new Vector(0, 1);

  /** Unit vector at an angle of PI/6 from the x axis. */
  public static readonly PI_6 = Vector.direction(Math.PI / 6);

  /** Unit vector at an angle of PI/3 from the x axis. */
  public static readonly PI_3 = Vector.direction(Math.PI / 3);
  

  /** Creates a vector given its x and y coordinates. */
  public static create(x: number, y: number): Vector {
    return new Vector(x, y);
  }

  /** Creates a vector given its angle in radians from the x axis. */
  public static direction(radians: number): Vector {
    return new Vector(Math.cos(radians), Math.sin(radians));
  }

  /** Creates a new mutable vector given its x and t coordinates. */
  public static mutable(x: number, y: number): MutableVector {
    return new MutableVector(x, y);
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
   * Returns the vector that results from scaling each coordinate by the given value or values.
   * If one value is given, both coordinates are scaled by that value.
   * If two values are given, each coordinate is scaled by the cooresponding value.
   */
  public times(x: number, y: number = x): Vector {
    return new Vector(this.x * x, this.y * y);
  }

  /** Returns a new mutable copy of this vector. */
  public mutableCopy(): MutableVector {
    return new MutableVector(this.x, this.y);
  }

}

/** A mutable direction or point in two-dimensional Cartesian space. */
export class MutableVector extends Vector {

  /** Creates a new mutable vector given its x and y coordinates. */
  public static create(x: number, y: number): MutableVector {
    return new MutableVector(x, y);
  }

  /** The x coordinate. */
  public x: number;

  /** The y coordinate. */
  public y: number;

  /** Constructs a new mutable vector given its x and t coordinates. */
  constructor(x: number, y: number) {
    super(x,y);
    // this.x = x;
    // this.y = y;
  }

  /** Updates this vector by adding the given vector, and returns the result. */
  public add(v: Vector): MutableVector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /** Updates this vector by subtracting the given vector, and returns the result. */
  public sub(v: Vector): MutableVector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Updates this vector by scaling it by the given value or values, and returns the result.
   * If one value is given, both coordinates are scaled by that value.
   * If two values are given, each coordinate is scaled by the cooresponding value.
   */
  public scale(x: number, y: number = x): MutableVector {
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * Updates this vector by scaling each coordinate by the corresponding coordinate of the given vector,
   * and returns the result.
   */
  public scaleBy(v: Vector): MutableVector {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  /** Returns a frozen (immutable) copy of this vector. */
  public frozenCopy(): Vector {
    return new Vector(this.x, this.y);
  }

}

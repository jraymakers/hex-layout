import { Vector } from './Vector';

/** A 2x2 matrix. */
export class Matrix {

  /** The identity matrix. */
  public static readonly Identity =
    new Matrix(
      1, 0,
      0, 1,
    );

  /** Creates a 2x2 matrix given its four values (first row then second row). */
  public static create(a: number, b: number, c: number, d: number): Matrix {
    return new Matrix(a, b, c, d);
  }

  /** Creates a mutable 2x2 matrix given its four values (first row then second row). */
  public static mutable(a: number, b: number, c: number, d: number): MutableMatrix {
    return new MutableMatrix(a, b, c, d);
  }

  /** Returns the identity matrix. */
  public static identity(): Matrix {
    return Matrix.Identity;
  }

  /** Constructs a matrix from two basis vectors. */
  public static fromBasis(v1: Vector, v2: Vector): Matrix {
    return new Matrix(
      v1.x, v2.x,
      v1.y, v2.y,
    );
  }

  /** Constructs a transformation matrix representing a rotation by the specified angle in radians. */
  public static rotation(radians: number): Matrix {
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    return new Matrix(
       cos, sin,
      -sin, cos,
    );
  }

  /** Constructs a transformation matrix representing a shear parallel to the X axis. */
  public static xShear(k: number): Matrix {
    return new Matrix(
      1, k,
      0, 1,
    );
  }

  /** Constructs a transformation matrix representing a shear parallel to the Y axis. */
  public static yShear(k: number): Matrix {
    return new Matrix(
      1, 0,
      k, 1,
    );
  }

  /** Constructs a transformation matrix representing a stretch (or compression). */
  public static stretch(x: number, y: number): Matrix {
    return new Matrix(
      x, 0,
      0, y,
    );
  }

  /** First row, first column. */
  public readonly a: number;

  /** First row, second column. */
  public readonly b: number;

  /** Second row, first column. */
  public readonly c: number;

  /** Second row, second column. */
  public readonly d: number;

  /** Constructs a 2x2 matrix given its four values (first row then second row). */
  constructor(a: number, b: number, c: number, d: number) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  /** Returns the determinant of this matrix. */
  public determinant(): number {
    return this.a * this.d - this.b * this.c;
  }

  /**
   * Returns the inverse matrix of this matrix.
   * Throws an error if the determinant is zero,
   * and thus no inverse exists.
  */
  public inverse(): Matrix {
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix has no inverse!');
    }
    const invDet = 1 / det;
    return new Matrix(
       this.d * invDet, -this.b * invDet,
      -this.c * invDet,  this.a * invDet,
    );
  }

  /** Returns the result of multipling this matrix by another matrix. */
  public timesMatrix(m: Matrix): Matrix {
    return new Matrix(
      this.a * m.a + this.b * m.c, this.a * m.b + this.b * m.d,
      this.c * m.a + this.d * m.c, this.c * m.b + this.d * m.d,
    );
  }

  /** Returns the result of multipling this matrix by a vector. */
  public timesVector(v: Vector): Vector {
    return new Vector(
      this.a * v.x + this.b * v.y,
      this.c * v.x + this.d * v.y,
    );
  }

  /** Returns a new mutable copy of this matrix. */
  public mutableCopy(): MutableMatrix {
    return new MutableMatrix(this.a, this.b, this.c, this.d);
  }

}

/** A mutable 2x2 matrix. */
export class MutableMatrix extends Matrix {

  /** Creates a mutable 2x2 matrix given its four values (first row then second row). */
  public static create(a: number, b: number, c: number, d: number): MutableMatrix {
    return new MutableMatrix(a, b, c, d);
  }

  /** Constructs a mutable matrix starting from the identity. */
  public static identity(): MutableMatrix {
    return new MutableMatrix(
      1, 0,
      0, 1,
    );
  }

  /** Constructs a mutable matrix starting from two basis vectors. */
  public static fromBasis(v1: Vector, v2: Vector): MutableMatrix {
    return new MutableMatrix(
      v1.x, v2.x,
      v1.y, v2.y,
    );
  }

  /** Constructs a mutable transformation matrix starting from a rotation by the specified angle in radians. */
  public static rotation(radians: number): MutableMatrix {
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    return new MutableMatrix(
       cos, sin,
      -sin, cos,
    );
  }

  /** Constructs a mutable transformation matrix starting from a shear parallel to the X axis. */
  public static xShear(k: number): MutableMatrix {
    return new MutableMatrix(
      1, k,
      0, 1,
    );
  }

  /** Constructs a mutable transformation matrix starting from a shear parallel to the Y axis. */
  public static yShear(k: number): MutableMatrix {
    return new MutableMatrix(
      1, 0,
      k, 1,
    );
  }

  /** Constructs a mutable transformation matrix starting from a stretch (or compression). */
  public static stretch(x: number, y: number): MutableMatrix {
    return new MutableMatrix(
      x, 0,
      0, y,
    );
  }

  /** First row, first column. */
  public a: number;

  /** First row, second column. */
  public b: number;

  /** Second row, first column. */
  public c: number;

  /** Second row, second column. */
  public d: number;

  /** Constructs a 2x2 mutable matrix given its four values (first row then second row). */
  constructor(a: number, b: number, c: number, d: number) {
    super(a, b, c, d);
    // this.a = a;
    // this.b = b;
    // this.c = c;
    // this.d = d;
  }

  /** Returns the determinant of this matrix. */
  public determinant(): number {
    return this.a * this.d - this.b * this.c;
  }

  /**
   * Updates this matrix to the inverse, and returns the result.
   * Throws an error if the determinant is zero,
   * and thus no inverse exists.
  */
  public invert(): MutableMatrix {
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix has no inverse!');
    }
    const invDet = 1 / det;
    const newA =  this.d * invDet;
    const newB = -this.b * invDet;
    const newC = -this.c * invDet;
    const newD =  this.a * invDet;
    this.a = newA;
    this.b = newB;
    this.c = newC;
    this.d = newD;
    return this;
  }

  /** Updates this matrix to the product with the given matrix, and returns the result. */
  public timesMatrix(m: Matrix): MutableMatrix {
    const newA = this.a * m.a + this.b * m.c;
    const newB = this.a * m.b + this.b * m.d;
    const newC = this.c * m.a + this.d * m.c;
    const newD = this.c * m.b + this.d * m.d;
    this.a = newA;
    this.b = newB;
    this.c = newC;
    this.d = newD;
    return this;
  }

  /** Returns the result of multipling this matrix by a vector. */
  public timesVector(v: Vector): Vector {
    return new Vector(
      this.a * v.x + this.b * v.y,
      this.c * v.x + this.d * v.y,
    );
  }

  /** Returns a frozen (immutable) copy of this matrix. */
  public frozenCopy(): Matrix {
    return new Matrix(this.a, this.b, this.c, this.d);
  }

}

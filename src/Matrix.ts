import { Vector } from './Vector';

/** A 2x2 matrix. */
export class Matrix {

  /** The identity matrix. */
  public static readonly Identity =
    new Matrix(
      1, 0,
      0, 1,
    );

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

}

import { Vector } from './Vector';

export class Matrix {

  public static fromBasis(v1: Vector, v2: Vector): Matrix {
    return new Matrix(
      v1.x, v2.x,
      v1.y, v2.y,
    );
  }

  public static rotationTransform(radians: number): Matrix {
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    return new Matrix(
       cos, sin,
      -sin, cos,
    );
  }

  public static horizonalShearTransform(k: number): Matrix {
    return new Matrix(
      1, k,
      0, 1,
    );
  }

  public static verticalShearTransform(k: number): Matrix {
    return new Matrix(
      1, 0,
      k, 1,
    );
  }

  public static stretchTransform(x: number, y: number): Matrix {
    return new Matrix(
      x, 0,
      0, y,
    );
  }

  public static readonly Identity =
    new Matrix(
      1, 0,
      0, 1,
    );

  public readonly a: number;
  public readonly b: number;
  public readonly c: number;
  public readonly d: number;

  constructor(a: number, b: number, c: number, d: number) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  public determinant(): number {
    return this.a * this.d - this.b * this.c;
  }

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

  public timesMatrix(m: Matrix): Matrix {
    return new Matrix(
      this.a * m.a + this.b * m.c, this.a * m.b + this.b * m.d,
      this.c * m.a + this.d * m.c, this.c * m.b + this.d * m.d,
    );
  }

  public timesVector(v: Vector): Vector {
    return new Vector(
      this.a * v.x + this.b * v.y,
      this.c * v.x + this.d * v.y,
    );
  }

}

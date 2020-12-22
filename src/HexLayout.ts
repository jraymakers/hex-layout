import { Bounds } from './Bounds';
import { Hex } from './Hex';
import { Matrix } from './Matrix';
import { Vector } from './Vector';

const rotation_PI_3 = Matrix.rotation(Math.PI/3);

/** A Cartesian axis. */
export enum Axis {
  /** The x axis. */
  X,

  /** The y axis. */
  Y,
}

/** Input settings for HexLayout. */
export interface HexLayoutSettings {

  /**
   * Radius of the inscribed circle of a hex.
   * Equivalently, distance from the center of a hex to an edge center.
   */
  readonly innerRadius: number;

  /** Location in Cartesian space of the center of the (0, 0) hex. */
  readonly origin: Vector;

  /** Which Cartesian axis (x or y) the q axis is aligned with. */
  readonly qAxis: Axis;

}

export class HexLayout {

  /**
   * Radius of the inscribed circle of a hex.
   * Equivalently, distance from the center of a hex to an edge center.
   */
  public readonly innerRadius: number;

  /** Location in Cartesian space of the center of the (0, 0) hex. */
  public readonly origin: Vector;

  /** Which Cartesian axis (x or y) the q axis is aligned with. */
  public readonly qAxis: Axis;
  
  /** Transformation matrix for calculating Cartesian coordinates from hex coordinates. */
  public readonly hexToPointTransform: Matrix;

  /** Transformation matrix for calculating hex coordinates from Cartesian coordinates. */
  public readonly pointToHexTransform: Matrix;
  
  /**
   * The six vectors (in Cartesian space) from the center of a hex to each corner.
   * In circular order, starting with the q axis, and going in the direction of the r axis.
   */
  public readonly cornerVectors: ReadonlyArray<Vector>;

  /**
   * The six vectors (in Cartesian space) from the center of a hex to each edge center.
   * In circular order, starting with the q axis, and going in the direction of the r axis.
   */
  public readonly edgeCenterVectors: ReadonlyArray<Vector>;

  /** Constructs a HexLayout given HexLayoutSettings. */
  constructor(settings: HexLayoutSettings) {
    this.innerRadius = settings.innerRadius;
    this.origin = settings.origin;
    this.qAxis = settings.qAxis;

    this.hexToPointTransform =
      this.qAxis === Axis.X
        ? Matrix.stretch(1, Math.sqrt(3)/2).timesMatrix(Matrix.xShear(0.5))
        : Matrix.stretch(Math.sqrt(3)/2, 1).timesMatrix(Matrix.yShear(0.5))
        ;
    this.pointToHexTransform = this.hexToPointTransform.inverse();

    const qVector = this.qAxis === Axis.X ? Vector.X : Vector.Y;
    const rAxisDirection = this.qAxis === Axis.X ? 1 : -1;

    const cornerVector0 = Matrix.rotation(rAxisDirection * Math.PI/6)
      .timesVector(qVector).times(this.innerRadius * 2 / Math.sqrt(3));
    const cornerVector1 = rotation_PI_3.timesVector(cornerVector0);
    const cornerVector2 = rotation_PI_3.timesVector(cornerVector1);
    const cornerVector3 = rotation_PI_3.timesVector(cornerVector2);
    const cornerVector4 = rotation_PI_3.timesVector(cornerVector3);
    const cornerVector5 = rotation_PI_3.timesVector(cornerVector4);

    this.cornerVectors = [
      cornerVector0,
      cornerVector1,
      cornerVector2,
      cornerVector3,
      cornerVector4,
      cornerVector5,
    ];

    const edgeCenterVector0 = qVector.times(this.innerRadius);
    const edgeCenterVector1 = rotation_PI_3.timesVector(edgeCenterVector0);
    const edgeCenterVector2 = rotation_PI_3.timesVector(edgeCenterVector1);
    const edgeCenterVector3 = rotation_PI_3.timesVector(edgeCenterVector2);
    const edgeCenterVector4 = rotation_PI_3.timesVector(edgeCenterVector3);
    const edgeCenterVector5 = rotation_PI_3.timesVector(edgeCenterVector4);

    this.edgeCenterVectors = [
      edgeCenterVector0,
      edgeCenterVector1,
      edgeCenterVector2,
      edgeCenterVector3,
      edgeCenterVector4,
      edgeCenterVector5,
    ];
  }

  /**
   * Returns one of the six vectors from the center of a hex to a corner,
   * given the vector's index (from 0 to 5).
   * The vectors are in circular order, starting with the q axis, and going in the direction of the r axis.
   */
  public cornerVector(corner: 0 | 1 | 2 | 3 | 4 | 5): Vector {
    return this.cornerVectors[corner];
  }

  /**
   * Returns one of the six vectors from the center of a hex to an edge center,
   * given the vector's index (from 0 to 5).
   * The vectors are in circular order, starting with the q axis, and going in the direction of the r axis.
   */
  public edgeCenterVector(edgeCenter: 0 | 1 | 2 | 3 | 4 | 5): Vector {
    return this.edgeCenterVectors[edgeCenter];
  }

  /** Returns the (Cartesian) vector to the center of the given hex. */
  public centerOfHex(h: Hex): Vector {
    const hexVector = new Vector(h.q, h.r);
    const notTransformedOrScaled = this.hexToPointTransform.timesVector(hexVector);
    return notTransformedOrScaled.times(this.innerRadius * 2).plus(this.origin);
  }

  /** Returns the hex containing the point indicated by the (Cartesian) vector. */
  public hexFromPoint(v: Vector): Hex {
    const transformedAndScaled = v.minus(this.origin).times(1 / (this.innerRadius * 2));
    const fractionalHexVector = this.pointToHexTransform.timesVector(transformedAndScaled);
    return Hex.mutable(fractionalHexVector.x, fractionalHexVector.y).round().frozenCopy();
  }

  /**
   * Returns the six (Cartesian) vectors from the origin to the corners of a hex,
   * given a vector to the center of the hex.
   * The vectors are in circular order, starting with the q axis, and going in the direction of the r axis.
   */
  public cornersFromCenter(center: Vector): ReadonlyArray<Vector> {
    return this.cornerVectors.map((v) => center.plus(v));
  }

  /**
   * Returns the six (Cartesian) vectors from the origin to the corners of a given hex.
   * The vectors are in circular order, starting with the q axis, and going in the direction of the r axis.
   */
  public cornersOfHex(h: Hex): ReadonlyArray<Vector> {
    const center = this.centerOfHex(h);
    return this.cornersFromCenter(center);
  }

  /**
   * Returns the rectangular region (bounds) completely containing the given hexes.
   * All corners of the given hexes will be either inside or on the boundary of the returned region.
  */
  public bounds(hexes: ReadonlyArray<Hex>): Bounds {
    let allCorners: Vector[] = [];
    for (const hex of hexes) {
      allCorners = allCorners.concat(this.cornersOfHex(hex));
    }
    return Bounds.fromVectors(allCorners);
  }

}

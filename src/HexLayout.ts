import { Bounds } from './Bounds';
import { Hex } from './Hex';
import { Matrix } from './Matrix';
import { Vector } from './Vector';

const rotation_PI_3 = Matrix.rotation(Math.PI/3);

/** Input settings for HexLayout. */
export interface HexLayoutSettings {

  /** Distance between centers of adjacent hexes. */
  readonly centerToCenterDistance: number;

  /** Location in Cartesian space of the center of the (0, 0) hex. */
  readonly origin: Vector;

  /** The angle of the q axis, in radians from the x axis. */
  readonly qAxisAngle: number;

  /** Whether the r axis is 60° clockwise or counterclockwise from the q axis. */
  readonly rAxisClockwise: boolean;
}

export class HexLayout {

  /** Input layout settings. */
  public readonly settings: HexLayoutSettings;
  
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
    this.settings = settings;

    const qVector = Vector.direction(this.settings.qAxisAngle);
    const rAxisOrientation = this.settings.rAxisClockwise ? 1 : -1;

    this.hexToPointTransform =
      Matrix.rotation(-this.settings.qAxisAngle).timesMatrix(
        Matrix.stretch(1, rAxisOrientation * Math.sqrt(3)/2).timesMatrix(
          Matrix.xShear(0.5)
        )
      );
    this.pointToHexTransform = this.hexToPointTransform.inverse();

    const cornerVector0 = Matrix.rotation(rAxisOrientation * Math.PI/6)
      .timesVector(qVector).scaledBy(this.settings.centerToCenterDistance / Math.sqrt(3));
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

    const edgeCenterVector0 = qVector.scaledBy(this.settings.centerToCenterDistance / 2);
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
    const hexVector = h.toAxialVector();
    const notTransformedOrScaled = this.hexToPointTransform.timesVector(hexVector);
    return notTransformedOrScaled.scaledBy(this.settings.centerToCenterDistance).plus(this.settings.origin);
  }

  /** Returns the hex containing the point indicated by the (Cartesian) vector. */
  public hexFromPoint(v: Vector): Hex {
    const transformedAndScaled = v.minus(this.settings.origin).scaledBy(1 / this.settings.centerToCenterDistance);
    const fractionalHexVector = this.pointToHexTransform.timesVector(transformedAndScaled);
    return Hex.fromAxialVector(fractionalHexVector);
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

import { Bounds } from './Bounds';
import { Hex } from './Hex';
import { Matrix } from './Matrix';
import { Vector } from './Vector';

const rotation_PI_3 = Matrix.rotationTransform(Math.PI/3);

export enum Axis {
  X,
  Y,
}

export interface HexLayoutSettings {

  /** Distance from the center of a hex to an edge center */
  readonly innerRadius: number;

  /** Location of the 0,0 hex */
  readonly origin: Vector;

  /** Whether the q axis is aligned with the x or y axis */
  readonly qAxis: Axis;

}

export class HexLayout {

  public readonly innerRadius: number;
  public readonly origin: Vector;
  public readonly qAxis: Axis;
  
  public readonly hexToPointTransform: Matrix;
  public readonly pointToHexTransform: Matrix;
  
  public readonly cornerVectors: ReadonlyArray<Vector>;
  public readonly edgeCenterVectors: ReadonlyArray<Vector>;

  constructor(settings: HexLayoutSettings) {
    this.innerRadius = settings.innerRadius;
    this.origin = settings.origin;
    this.qAxis = settings.qAxis;

    this.hexToPointTransform =
      this.qAxis === Axis.X
        ? Matrix.stretchTransform(1, Math.sqrt(3)/2).timesMatrix(Matrix.horizonalShearTransform(0.5))
        : Matrix.stretchTransform(Math.sqrt(3)/2, 1).timesMatrix(Matrix.verticalShearTransform(0.5))
        ;
    this.pointToHexTransform = this.hexToPointTransform.inverse();

    const qVector = this.qAxis === Axis.X ? Vector.X : Vector.Y;
    const rAxisDirection = this.qAxis === Axis.X ? 1 : -1;

    const cornerVector0 = Matrix.rotationTransform(rAxisDirection * Math.PI/6)
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

  public cornerVector(corner: 0 | 1 | 2 | 3 | 4 | 5): Vector {
    return this.cornerVectors[corner];
  }

  public edgeCenterVector(edgeCenter: 0 | 1 | 2 | 3 | 4 | 5): Vector {
    return this.edgeCenterVectors[edgeCenter];
  }

  public centerOfHex(h: Hex): Vector {
    const hexVector = new Vector(h.q, h.r);
    const notTransformedOrScaled = this.hexToPointTransform.timesVector(hexVector);
    return notTransformedOrScaled.times(this.innerRadius * 2).plus(this.origin);
  }

  public hexFromPoint(v: Vector): Hex {
    const transformedAndScaled = v.minus(this.origin).times(1 / (this.innerRadius * 2));
    const fractionalHexVector = this.pointToHexTransform.timesVector(transformedAndScaled);
    return Hex.mutable(fractionalHexVector.x, fractionalHexVector.y).round().frozenCopy();
  }

  public cornersFromCenter(center: Vector): ReadonlyArray<Vector> {
    return this.cornerVectors.map((v) => center.plus(v));
  }

  public cornersOfHex(h: Hex): ReadonlyArray<Vector> {
    const center = this.centerOfHex(h);
    return this.cornersFromCenter(center);
  }

  public bounds(hexes: ReadonlyArray<Hex>): Bounds {
    let allCorners: Vector[] = [];
    for (const hex of hexes) {
      allCorners = allCorners.concat(this.cornersOfHex(hex));
    }
    return Bounds.fromVectors(allCorners);
  }

}

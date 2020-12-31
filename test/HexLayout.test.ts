import chai, { expect } from 'chai';
import chaiAlmost from 'chai-almost';

import { Bounds, Hex, HexLayout, Vector } from '../src';
import { HexLayoutSettings } from '../src/HexLayout';

chai.use(chaiAlmost());

describe('HexLayout', () => {

  const sqrt3 = Math.sqrt(3);

  const d = 12;
  const d_2 = d/2;
  const d_4 = d/4;

  const origin = new Vector(5,7);

  const settings_0_cw: HexLayoutSettings = {
    centerToCenterDistance: d,
    origin: origin,
    qAxisAngle: 0,
    rAxisClockwise: true,
  };

  const settings_PI_2_ccw: HexLayoutSettings = {
    centerToCenterDistance: d,
    origin: origin,
    qAxisAngle: Math.PI/2,
    rAxisClockwise: false,
  };

  describe('constructor', () => {

    it('should set up properties correctly when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.settings).to.deep.equal(settings_0_cw);
    });

    it('should set up properties correctly when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.settings).to.deep.equal(settings_PI_2_ccw);
    });

  });

  describe('cornerVector', () => {

    it('should return the correct values when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.cornerVector(0)).to.deep.almost.equal(new Vector( d_2,  d_2 * 1/sqrt3));
      expect(layout.cornerVector(1)).to.deep.almost.equal(new Vector(   0,  d_2 * 2/sqrt3));
      expect(layout.cornerVector(2)).to.deep.almost.equal(new Vector(-d_2,  d_2 * 1/sqrt3));
      expect(layout.cornerVector(3)).to.deep.almost.equal(new Vector(-d_2, -d_2 * 1/sqrt3));
      expect(layout.cornerVector(4)).to.deep.almost.equal(new Vector(   0, -d_2 * 2/sqrt3));
      expect(layout.cornerVector(5)).to.deep.almost.equal(new Vector( d_2, -d_2 * 1/sqrt3));
    });

    it('should return the correct values when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.cornerVector(0)).to.deep.almost.equal(new Vector( d_2 * 1/sqrt3,  d_2));
      expect(layout.cornerVector(1)).to.deep.almost.equal(new Vector( d_2 * 2/sqrt3,    0));
      expect(layout.cornerVector(2)).to.deep.almost.equal(new Vector( d_2 * 1/sqrt3, -d_2));
      expect(layout.cornerVector(3)).to.deep.almost.equal(new Vector(-d_2 * 1/sqrt3, -d_2));
      expect(layout.cornerVector(4)).to.deep.almost.equal(new Vector(-d_2 * 2/sqrt3,    0));
      expect(layout.cornerVector(5)).to.deep.almost.equal(new Vector(-d_2 * 1/sqrt3,  d_2));
    });

  });

  describe('edgeCenterVector', () => {

    it('should return the correct values when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.edgeCenterVector(0)).to.deep.almost.equal(new Vector( d_2,            0));
      expect(layout.edgeCenterVector(1)).to.deep.almost.equal(new Vector( d_4,  d_4 * sqrt3));
      expect(layout.edgeCenterVector(2)).to.deep.almost.equal(new Vector(-d_4,  d_4 * sqrt3));
      expect(layout.edgeCenterVector(3)).to.deep.almost.equal(new Vector(-d_2,            0));
      expect(layout.edgeCenterVector(4)).to.deep.almost.equal(new Vector(-d_4, -d_4 * sqrt3));
      expect(layout.edgeCenterVector(5)).to.deep.almost.equal(new Vector( d_4, -d_4 * sqrt3));
    });

    it('should return the correct values when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.edgeCenterVector(0)).to.deep.almost.equal(new Vector(           0,  d_2));
      expect(layout.edgeCenterVector(1)).to.deep.almost.equal(new Vector( d_4 * sqrt3,  d_4));
      expect(layout.edgeCenterVector(2)).to.deep.almost.equal(new Vector( d_4 * sqrt3, -d_4));
      expect(layout.edgeCenterVector(3)).to.deep.almost.equal(new Vector(           0, -d_2));
      expect(layout.edgeCenterVector(4)).to.deep.almost.equal(new Vector(-d_4 * sqrt3, -d_4));
      expect(layout.edgeCenterVector(5)).to.deep.almost.equal(new Vector(-d_4 * sqrt3,  d_4));
    });

  });

  describe('centerOfHex', () => {

    it('should return the correct value for hex (0,0) when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.centerOfHex(new Hex(0,0))).to.deep.almost.equal(origin);
    });

    it('should return the correct value for hex (1,0) when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.centerOfHex(new Hex(1,0))).to.deep.almost.equal(origin.plus(new Vector(d, 0)));
    });

    it('should return the correct value for hex (0,1) when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.centerOfHex(new Hex(0,1))).to.deep.almost.equal(origin.plus(new Vector(d_2, d_2 * sqrt3)));
    });

    it('should return the correct value for hex (1,1) when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.centerOfHex(new Hex(1,1))).to.deep.almost.equal(origin.plus(new Vector(d + d_2, d_2 * sqrt3)));
    });

    it('should return the correct value for hex (2,3) when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.centerOfHex(new Hex(2,3))).to.deep.almost.equal(origin.plus(new Vector(2 * d + 3 * d_2, 3 * d_2 * sqrt3)));
    });

    it('should return the correct value for hex (0,0) when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.centerOfHex(new Hex(0,0))).to.deep.almost.equal(origin);
    });

    it('should return the correct value for hex (1,0) when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.centerOfHex(new Hex(1,0))).to.deep.almost.equal(origin.plus(new Vector(0, d)));
    });

    it('should return the correct value for hex (0,1) when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.centerOfHex(new Hex(0,1))).to.deep.almost.equal(origin.plus(new Vector(d_2 * sqrt3, d_2)));
    });

    it('should return the correct value for hex (1,1) when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.centerOfHex(new Hex(1,1))).to.deep.almost.equal(origin.plus(new Vector(d_2 * sqrt3, d + d_2)));
    });

    it('should return the correct value for hex (2,3) when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.centerOfHex(new Hex(2,3))).to.deep.almost.equal(origin.plus(new Vector(3 * d_2 * sqrt3, 2 * d + 3 * d_2)));
    });

  });

  describe('hexFromPoint', () => {

    it('should return the correct value for the origin vector when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.hexFromPoint(origin)).to.deep.equal(new Hex(0,0));
    });

    it('should return the correct value for a vector just past the center of a hex when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.hexFromPoint(origin.plus(new Vector(2.1 * d + 3.1 * d_2, 3.1 * d_2 * sqrt3)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for a vector just before the center of a hex when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.hexFromPoint(origin.plus(new Vector(1.9 * d + 2.9 * d_2, 2.9 * d_2 * sqrt3)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for a vector to one side of the center of a hex when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.hexFromPoint(origin.plus(new Vector(2.1 * d + 2.8 * d_2, 2.8 * d_2 * sqrt3)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for a vector to the other side of the center of a hex when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.hexFromPoint(origin.plus(new Vector(1.8 * d + 3.1 * d_2, 3.1 * d_2 * sqrt3)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for the origin vector when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.hexFromPoint(origin)).to.deep.equal(new Hex(0,0));
    });

    it('should return the correct value for a vector just past the center of a hex when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.hexFromPoint(origin.plus(new Vector(3.1 * d_2 * sqrt3, 2.1 * d + 3.1 * d_2)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for a vector just before the center of a hex when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.hexFromPoint(origin.plus(new Vector(2.9 * d_2 * sqrt3, 1.9 * d + 2.9 * d_2)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for a vector to one side of the center of a hex when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.hexFromPoint(origin.plus(new Vector(2.8 * d_2 * sqrt3, 2.1 * d + 2.8 * d_2)))).to.deep.equal(new Hex(2,3));
    });

    it('should return the correct value for a vector to the other side of the center of a hex when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.hexFromPoint(origin.plus(new Vector(3.1 * d_2 * sqrt3, 1.8 * d + 3.1 * d_2)))).to.deep.equal(new Hex(2,3));
    });

  });

  describe('cornersFromCenter', () => {

    it('should return the correct values when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      expect(layout.cornersFromCenter(new Vector(2,3))).to.deep.almost.equal([
        new Vector(2 + d_2, 3 + d_2 * 1/sqrt3),
        new Vector(2      , 3 + d_2 * 2/sqrt3),
        new Vector(2 - d_2, 3 + d_2 * 1/sqrt3),
        new Vector(2 - d_2, 3 - d_2 * 1/sqrt3),
        new Vector(2      , 3 - d_2 * 2/sqrt3),
        new Vector(2 + d_2, 3 - d_2 * 1/sqrt3),
      ]);
    });

    it('should return the correct values when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.cornersFromCenter(new Vector(2,3))).to.deep.almost.equal([
        new Vector(2 + d_2 * 1/sqrt3, 3 + d_2),
        new Vector(2 + d_2 * 2/sqrt3, 3      ),
        new Vector(2 + d_2 * 1/sqrt3, 3 - d_2),
        new Vector(2 - d_2 * 1/sqrt3, 3 - d_2),
        new Vector(2 - d_2 * 2/sqrt3, 3      ),
        new Vector(2 - d_2 * 1/sqrt3, 3 + d_2),
      ]);
    });

  });

  describe('cornersOfHex', () => {

    it('should return the correct values when q axis angle is zero and r axis is clockwise', () => {
      const q = 2;
      const r = 3;
      const x = origin.x + q * d + r * d_2;
      const y = origin.y + r * d_2 * sqrt3;
      const layout = new HexLayout(settings_0_cw);
      expect(layout.cornersOfHex(new Hex(q,r))).to.deep.almost.equal([
        new Vector(x + d_2, y + d_2 * 1/sqrt3),
        new Vector(x      , y + d_2 * 2/sqrt3),
        new Vector(x - d_2, y + d_2 * 1/sqrt3),
        new Vector(x - d_2, y - d_2 * 1/sqrt3),
        new Vector(x      , y - d_2 * 2/sqrt3),
        new Vector(x + d_2, y - d_2 * 1/sqrt3),
      ]);
    });

    it('should return the correct values when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const q = 2;
      const r = 3;
      const x = origin.x + r * d_2 * sqrt3;
      const y = origin.y + q * d + r * d_2;
      const layout = new HexLayout(settings_PI_2_ccw);
      expect(layout.cornersOfHex(new Hex(q,r))).to.deep.almost.equal([
        new Vector(x + d_2 * 1/sqrt3, y + d_2),
        new Vector(x + d_2 * 2/sqrt3, y      ),
        new Vector(x + d_2 * 1/sqrt3, y - d_2),
        new Vector(x - d_2 * 1/sqrt3, y - d_2),
        new Vector(x - d_2 * 2/sqrt3, y      ),
        new Vector(x - d_2 * 1/sqrt3, y + d_2),
      ]);
    });

  });

  describe('bounds', () => {

    it('should return the correct values when q axis angle is zero and r axis is clockwise', () => {
      const layout = new HexLayout(settings_0_cw);
      const hexes = [
        new Hex(2,3),
        new Hex(5,7),
      ];
      expect(layout.bounds(hexes)).to.deep.almost.equal(new Bounds(
        origin.x + 2 * d + 3 * d_2 - d_2,
        origin.y + 3 * d_2 * sqrt3 - d_2 * 2/sqrt3,
        origin.x + 5 * d + 7 * d_2 + d_2,
        origin.y + 7 * d_2 * sqrt3 + d_2 * 2/sqrt3,
      ));
    });

    it('should return the correct values when q axis angle is PI/2 and r axis is counterclockwise', () => {
      const layout = new HexLayout(settings_PI_2_ccw);
      const hexes = [
        new Hex(2,3),
        new Hex(5,7),
      ];
      expect(layout.bounds(hexes)).to.deep.almost.equal(new Bounds(
        origin.x + 3 * d_2 * sqrt3 - d_2 * 2/sqrt3,
        origin.y + 2 * d + 3 * d_2 - d_2,
        origin.x + 7 * d_2 * sqrt3 + d_2 * 2/sqrt3,
        origin.y + 5 * d + 7 * d_2 + d_2,
      ));
    });

  });

});

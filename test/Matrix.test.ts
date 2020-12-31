import chai, { expect } from 'chai';
import chaiAlmost from 'chai-almost';

import { Matrix, Vector } from '../src';

chai.use(chaiAlmost());

describe('Matrix', () => {

  describe('constructor', () => {

    it('should set properties correctly', () => {
      const m = new Matrix(1,2,3,4);
      expect(m.a).to.equal(1);
      expect(m.b).to.equal(2);
      expect(m.c).to.equal(3);
      expect(m.d).to.equal(4);
    });

  });

  describe('fromBasis', () => {

    it('should set properties correctly', () => {
      const v1 = new Vector(2,3);
      const v2 = new Vector(5,7);
      const m = Matrix.fromBasis(v1, v2);
      expect(m).to.deep.equal(new Matrix(
        2, 5,
        3, 7,
      ));
    });

  });

  describe('rotation', () => {

    it('should set properties correctly', () => {
      const angle = Math.PI / 3;
      const m = Matrix.rotation(Math.PI / 3);
      expect(m).to.deep.equal(new Matrix(
        Math.cos(angle), -Math.sin(angle),
        Math.sin(angle),  Math.cos(angle),
      ));
    });

  });

  describe('xShear', () => {

    it('should set properties correctly', () => {
      const m = Matrix.xShear(3);
      expect(m).to.deep.equal(new Matrix(
        1, 3,
        0, 1,
      ));
    });

  });

  describe('yShear', () => {

    it('should set properties correctly', () => {
      const m = Matrix.yShear(3);
      expect(m).to.deep.equal(new Matrix(
        1, 0,
        3, 1,
      ));
    });

  });

  describe('stretch', () => {

    it('should set properties correctly', () => {
      const m = Matrix.stretch(3, 5);
      expect(m).to.deep.equal(new Matrix(
        3, 0,
        0, 5,
      ));
    });

  });

  describe('determinant', () => {

    it('should return the correct value', () => {
      const m = new Matrix(2,3,5,7);
      expect(m.determinant()).to.equal(2*7 - 3*5);
    });

  });

  describe('inverse', () => {

    it('should return the correct value', () => {
      const m = new Matrix(4,7,2,6);
      expect(m.inverse()).to.deep.almost.equal(new Matrix(
        0.6, -0.7,
        -0.2, 0.4,
      ));
    });

    it('should throw an error if no inverse exists', () => {
      const m = new Matrix(3,4,6,8);
      expect(() => m.inverse()).to.throw(Error, 'Matrix has no inverse!');
    });

  });

  describe('timesMatrix', () => {

    it('should return the correct value', () => {
      const m1 = new Matrix(2,3,5,7);
      const m2 = new Matrix(11,13,17,19);
      expect(m1.timesMatrix(m2)).to.deep.equal(new Matrix(
        2*11 + 3*17, 2*13 + 3*19,
        5*11 + 7*17, 5*13 + 7*19,
      ));
    });

  });

  describe('timesVector', () => {

    it('should return the correct value', () => {
      const m = new Matrix(2,3,5,7);
      const v = new Vector(11,13);
      expect(m.timesVector(v)).to.deep.equal(new Vector(2*11 + 3*13, 5*11 + 7*13));
    });

  });

});

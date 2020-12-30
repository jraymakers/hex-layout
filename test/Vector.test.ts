import { Vector } from '../src';

import { expect } from 'chai';

describe('Vector', () => {

  describe('constructor', () => {

    it('should set properties correctly', () => {
      const v = new Vector(1, 2);
      expect(v.x).to.equal(1);
      expect(v.y).to.equal(2);
    });

  });

  describe('equals', () => {
    
    it('should return true when properties are the same', () => {
      const v1 = new Vector(1,2);
      const v2 = new Vector(1,2);
      expect(v1.equals(v2)).to.be.true;
    });

    it('should return false when x values are different', () => {
      const v1 = new Vector(1,2);
      const v2 = new Vector(3,2);
      expect(v1.equals(v2)).to.be.false;
    });

    it('should return false when y values are different', () => {
      const v1 = new Vector(1,2);
      const v2 = new Vector(1,3);
      expect(v1.equals(v2)).to.be.false;
    });

  });

  describe('length', () => {

    it('should return the correct value', () => {
      const v = new Vector(3,4);
      expect(v.length()).to.equal(5);
    });

  });

  describe('dot', () => {

    it('should return the correct value', () => {
      const v1 = new Vector(2,3);
      const v2 = new Vector(5,7);
      expect(v1.dot(v2)).to.equal(2*5+3*7);
    });

  });

  describe('plus', () => {

    it('should return the correct result', () => {
      const v1 = new Vector(2,3);
      const v2 = new Vector(5,7);
      expect(v1.plus(v2)).to.deep.equal(new Vector(2+5,3+7));
    });

  });

  describe('minus', () => {

    it('should return the correct result', () => {
      const v1 = new Vector(5,7);
      const v2 = new Vector(2,3);
      expect(v1.minus(v2)).to.deep.equal(new Vector(5-2,7-3));
    });

  });

  describe('scaledBy', () => {

    it('should return the correct result when passed one value', () => {
      const v1 = new Vector(2,3);
      expect(v1.scaledBy(5)).to.deep.equal(new Vector(2*5,3*5));
    });

    it('should return the correct result when passed two values', () => {
      const v1 = new Vector(2,3);
      expect(v1.scaledBy(5,7)).to.deep.equal(new Vector(2*5,3*7));
    });

  });

});

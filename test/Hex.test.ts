import { expect } from 'chai';

import { Hex, Vector } from '../src';

describe('Hex', () => {

  describe('constructor', () => {

    it('should set properties correctly', () => {
      const h = new Hex(1,2);
      expect(h.q).to.equal(1);
      expect(h.r).to.equal(2);
    });

  });

  describe('fromKey', () => {

    it('should set properties correctly when q and r are positive', () => {
      const h = Hex.fromKey('2_3');
      expect(h).to.deep.equal(new Hex(2,3));
    });

    it('should set properties correctly when q and r are negative', () => {
      const h = Hex.fromKey('-2_-3');
      expect(h).to.deep.equal(new Hex(-2,-3));
    });

  });

  describe('fromAxialVector', () => {

    it('should set properties correctly when x and y are integers', () => {
      const h = Hex.fromAxialVector(new Vector(2,3));
      expect(h).to.deep.equal(new Hex(2,3));
    });

    it('should set properties correctly when x and y are slightly larger than integers', () => {
      const h = Hex.fromAxialVector(new Vector(2.1,3.1));
      expect(h).to.deep.equal(new Hex(2,3));
    });

    it('should set properties correctly when x and y are slightly smaller than integers', () => {
      const h = Hex.fromAxialVector(new Vector(1.9,2.9));
      expect(h).to.deep.equal(new Hex(2,3));
    });

    it('should set properties correctly when x is closer to an integer than y', () => {
      const h = Hex.fromAxialVector(new Vector(2.1,2.8));
      expect(h).to.deep.equal(new Hex(2,3));
    });

    it('should set properties correctly when y is closer to an integer than x', () => {
      const h = Hex.fromAxialVector(new Vector(1.8,3.1));
      expect(h).to.deep.equal(new Hex(2,3));
    });

  });

  describe('s', () => {

    it('should return the correct value when q and r are positive', () => {
      const h = new Hex(2,3);
      expect(h.s()).to.equal(-5);
    });

    it('should return the correct value when q is negative and r is positive', () => {
      const h = new Hex(-2,3);
      expect(h.s()).to.equal(-1);
    });

    it('should return the correct value when q is positive and r is negative', () => {
      const h = new Hex(2,-3);
      expect(h.s()).to.equal(1);
    });

    it('should return the correct value when q and r are negative', () => {
      const h = new Hex(-2,-3);
      expect(h.s()).to.equal(5);
    });

    it('should return zero when appropriate', () => {
      const h = new Hex(2,-2);
      expect(h.s()).to.equal(0);
    });

  });

  describe('key', () => {

    it('should return the correct value when q and r are positive', () => {
      const h = new Hex(2,3);
      expect(h.key()).to.equal('2_3');
    });

    it('should return the correct value when q and r are negative', () => {
      const h = new Hex(-2,-3);
      expect(h.key()).to.equal('-2_-3');
    });

  });

  describe('equals', () => {

    it('should return true when properties are the same', () => {
      const h1 = new Hex(2,3);
      const h2 = new Hex(2,3);
      expect(h1.equals(h2)).to.be.true;
    });

    it('should return true when q values are different', () => {
      const h1 = new Hex(2,3);
      const h2 = new Hex(5,3);
      expect(h1.equals(h2)).to.be.false;
    });

    it('should return true when r values are different', () => {
      const h1 = new Hex(2,3);
      const h2 = new Hex(2,5);
      expect(h1.equals(h2)).to.be.false;
    });

  });

  describe('length', () => {

    it('should return the correct value when q and r are positive', () => {
      const h = new Hex(2,3);
      expect(h.length()).to.equal(5);
    });

    it('should return the correct value when q is negative and r is positive', () => {
      const h = new Hex(-2,3);
      expect(h.length()).to.equal(3);
    });

    it('should return the correct value when q is positive and r is negative', () => {
      const h = new Hex(2,-3);
      expect(h.length()).to.equal(3);
    });

    it('should return the correct value when q and r are negative', () => {
      const h = new Hex(-2,-3);
      expect(h.length()).to.equal(5);
    });

    it('should return zero when appropriate', () => {
      const h = new Hex(0,0);
      expect(h.length()).to.equal(0);
    });

  });

  describe('length', () => {

    it('should return the correct value when q1 < q2 and r1 < r2', () => {
      const h1 = new Hex(2,3);
      const h2 = new Hex(5,7);
      expect(h1.distanceTo(h2)).to.equal(7);
    });

    it('should return the correct value when q1 > q2 and r1 < r2', () => {
      const h1 = new Hex(5,3);
      const h2 = new Hex(2,7);
      expect(h1.distanceTo(h2)).to.equal(4);
    });

    it('should return the correct value when q1 < q2 and r1 > r2', () => {
      const h1 = new Hex(2,7);
      const h2 = new Hex(5,3);
      expect(h1.distanceTo(h2)).to.equal(4);
    });

    it('should return the correct value when q1 > q2 and r1 > r2', () => {
      const h1 = new Hex(5,7);
      const h2 = new Hex(2,3);
      expect(h1.distanceTo(h2)).to.equal(7);
    });

    it('should return zero when appropriate', () => {
      const h1 = new Hex(2,3);
      const h2 = new Hex(2,3);
      expect(h1.distanceTo(h2)).to.equal(0);
    });

  });

  describe('plus', () => {

    it('should return the correct value', () => {
      const h1 = new Hex(2,3);
      const h2 = new Hex(5,7);
      expect(h1.plus(h2)).to.deep.equal(new Hex(2+5, 3+7));
    });

  });

  describe('minus', () => {

    it('should return the correct value', () => {
      const h1 = new Hex(5,7);
      const h2 = new Hex(2,3);
      expect(h1.minus(h2)).to.deep.equal(new Hex(5-2, 7-3));
    });

  });

  describe('toAxialVector', () => {

    it('should return the correct value', () => {
      const h = new Hex(2,3);
      expect(h.toAxialVector()).to.deep.equal(new Vector(2,3));
    });

  });

});

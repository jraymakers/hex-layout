import { expect } from 'chai';

import { Bounds, Vector } from '../src';

describe('Bounds', () => {

  describe('constructor', () => {

    it('should set properties correctly', () => {
      const b = new Bounds(1,2,3,4);
      expect(b.minX).to.equal(1);
      expect(b.minY).to.equal(2);
      expect(b.maxX).to.equal(3);
      expect(b.maxY).to.equal(4);
    });

  });

  describe('fromVectors', () => {

    it('should return the correct value for zero vectors', () => {
      const b = Bounds.fromVectors([]);
      expect(b).to.deep.equal(new Bounds(Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE));
    });

    it('should return the correct value for one vector', () => {
      const v = new Vector(1,2);
      const b = Bounds.fromVectors([v]);
      expect(b).to.deep.equal(new Bounds(1, 2, 1, 2));
    });

    it('should return the correct value for multiple vectors', () => {
      const v1 = new Vector(1,11);
      const v2 = new Vector(13,7);
      const v3 = new Vector(3,2);
      const v4 = new Vector(5,17);
      const b = Bounds.fromVectors([v1, v2, v3, v4]);
      expect(b).to.deep.equal(new Bounds(1, 2, 13, 17));
    });

  });

  describe('width', () => {

    it('should return the correct value', () => {
      const b = new Bounds(1,2,4,7);
      expect(b.width()).to.equal(3);
    });

  });

  describe('height', () => {

    it('should return the correct value', () => {
      const b = new Bounds(1,2,4,7);
      expect(b.height()).to.equal(5);
    });

  });

});

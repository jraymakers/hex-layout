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

});

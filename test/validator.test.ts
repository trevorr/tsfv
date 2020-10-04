import { expect } from 'chai';
import tsfv, { Validator } from '../src';

describe('validator', () => {
  it('is instanceof', () => {
    expect(tsfv instanceof Validator).to.be.true;
  });
});

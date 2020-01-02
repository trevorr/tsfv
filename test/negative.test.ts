import { expect } from 'chai';
import tsfv from '../src';

describe('negative', () => {
  it('passes when negative', () => {
    expect(tsfv.negative().test(-1)).to.be.true;
    expect(tsfv.negative().test(-Infinity)).to.be.true;
  });
  it('fails when positive or zero', () => {
    expect(tsfv.negative().test(1)).to.be.false;
    expect(tsfv.negative().test(0)).to.be.false;
    expect(tsfv.negative().test(Infinity)).to.be.false;
  });
  it('fails when non-numeric', () => {
    expect(tsfv.negative().test(NaN)).to.be.false;
    expect(tsfv.negative().test(null)).to.be.false;
    expect(tsfv.negative().test(undefined)).to.be.false;
    expect(tsfv.negative().test('string')).to.be.false;
    expect(tsfv.negative().test([])).to.be.false;
    expect(tsfv.negative().test({})).to.be.false;
  });
});

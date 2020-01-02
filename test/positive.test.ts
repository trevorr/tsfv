import { expect } from 'chai';
import tsfv from '../src';

describe('positive', () => {
  it('passes when positive', () => {
    expect(tsfv.positive().test(1)).to.be.true;
    expect(tsfv.positive().test(Infinity)).to.be.true;
  });
  it('fails when negative or zero', () => {
    expect(tsfv.positive().test(-1)).to.be.false;
    expect(tsfv.positive().test(0)).to.be.false;
    expect(tsfv.positive().test(-Infinity)).to.be.false;
  });
  it('fails when non-numeric', () => {
    expect(tsfv.positive().test(NaN)).to.be.false;
    expect(tsfv.positive().test(null)).to.be.false;
    expect(tsfv.positive().test(undefined)).to.be.false;
    expect(tsfv.positive().test('string')).to.be.false;
    expect(tsfv.positive().test([])).to.be.false;
    expect(tsfv.positive().test({})).to.be.false;
  });
});

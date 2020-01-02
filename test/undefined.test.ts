import { expect } from 'chai';
import tsfv from '../src';

describe('undefined', () => {
  it('passes when undefined', () => {
    expect(tsfv.undefined().test(undefined)).to.be.true;
  });
  it('fails when not undefined', () => {
    expect(tsfv.undefined().test(null)).to.be.false;
    expect(tsfv.undefined().test(false)).to.be.false;
    expect(tsfv.undefined().test(true)).to.be.false;
    expect(tsfv.undefined().test(0)).to.be.false;
    expect(tsfv.undefined().test(1)).to.be.false;
    expect(tsfv.undefined().test('')).to.be.false;
    expect(tsfv.undefined().test([])).to.be.false;
    expect(tsfv.undefined().test({})).to.be.false;
  });
});

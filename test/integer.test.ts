import { expect } from 'chai';
import tsfv from '../src';

describe('integer', () => {
  it('passes when integer', () => {
    expect(tsfv.integer().test(0)).to.be.true;
    expect(tsfv.integer().test(-0)).to.be.true;
    expect(tsfv.integer().test(+0)).to.be.true;
    expect(tsfv.integer().test(1)).to.be.true;
    expect(tsfv.integer().test(1e10)).to.be.true;
  });
  it('fails when not integer', () => {
    expect(tsfv.integer().test(1.1)).to.be.false;
    expect(tsfv.integer().test(Infinity)).to.be.false;
    expect(tsfv.integer().test(-Infinity)).to.be.false;
    expect(tsfv.integer().test(NaN)).to.be.false;
    expect(tsfv.integer().test(null)).to.be.false;
    expect(tsfv.integer().test(undefined)).to.be.false;
    expect(tsfv.integer().test(false)).to.be.false;
    expect(tsfv.integer().test(true)).to.be.false;
    expect(tsfv.integer().test(new Number(0))).to.be.false;
    expect(tsfv.integer().test(new Number(1))).to.be.false;
    expect(tsfv.integer().test('')).to.be.false;
    expect(tsfv.integer().test('1')).to.be.false;
    expect(tsfv.integer().test({})).to.be.false;
    expect(tsfv.integer().test([])).to.be.false;
  });
});

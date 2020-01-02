import { expect } from 'chai';
import tsfv from '../src';

describe('lessThan', () => {
  it('passes when less', () => {
    expect(tsfv.lessThan(0).test(-1)).to.be.true;
    expect(tsfv.lessThan(0).test('-1')).to.be.true;
    expect(tsfv.lessThan(0).test(new Number(-1))).to.be.true;
    expect(tsfv.lessThan(0).test(-Infinity)).to.be.true;
  });
  it('fails when greater or equal', () => {
    expect(tsfv.lessThan(0).test(1)).to.be.false;
    expect(tsfv.lessThan(0).test('1')).to.be.false;
    expect(tsfv.lessThan(0).test(new Number(1))).to.be.false;
    expect(tsfv.lessThan(0).test(0)).to.be.false;
    expect(tsfv.lessThan(0).test('0')).to.be.false;
    expect(tsfv.lessThan(0).test(new Number(0))).to.be.false;
    expect(tsfv.lessThan(0).test(Infinity)).to.be.false;
  });
  it('fails when non-numeric', () => {
    expect(tsfv.lessThan(0).test(NaN)).to.be.false;
    expect(tsfv.lessThan(0).test(null)).to.be.false;
    expect(tsfv.lessThan(0).test(undefined)).to.be.false;
    expect(tsfv.lessThan(0).test(false)).to.be.false;
    expect(tsfv.lessThan(0).test(true)).to.be.false;
    expect(tsfv.lessThan(0).test('1x')).to.be.false;
    expect(tsfv.lessThan(0).test([])).to.be.false;
    expect(tsfv.lessThan(0).test({})).to.be.false;
  });
});

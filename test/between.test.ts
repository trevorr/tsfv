import { expect } from 'chai';
import tsfv from '../src';

describe('between', () => {
  it('passes within range', () => {
    expect(tsfv.between(1, 10).test(1)).to.be.true;
    expect(tsfv.between(1, 10).test(5)).to.be.true;
    expect(tsfv.between(1, 10).test('5')).to.be.true;
    expect(tsfv.between(1, 10).test(new Number(5))).to.be.true;
    expect(tsfv.between(1, 10).test(10)).to.be.true;
  });
  it('fails outside range', () => {
    expect(tsfv.between(1, 10).test(0)).to.be.false;
    expect(tsfv.between(1, 10).test('0')).to.be.false;
    expect(tsfv.between(1, 10).test(new Number(0))).to.be.false;
    expect(tsfv.between(1, 10).test(11)).to.be.false;
    expect(tsfv.between(1, 10).test('11')).to.be.false;
    expect(tsfv.between(1, 10).test(new Number(11))).to.be.false;
    expect(tsfv.between(1, 10).test(-Infinity)).to.be.false;
    expect(tsfv.between(1, 10).test(Infinity)).to.be.false;
    expect(tsfv.between(1, 10).test(NaN)).to.be.false;
  });
  it('fails when non-numeric', () => {
    expect(tsfv.between(0, 1).test(null)).to.be.false;
    expect(tsfv.between(0, 1).test(undefined)).to.be.false;
    expect(tsfv.between(0, 1).test('1x')).to.be.false;
    expect(tsfv.between(0, 1).test([])).to.be.false;
    expect(tsfv.between(0, 1).test({})).to.be.false;
  });
});

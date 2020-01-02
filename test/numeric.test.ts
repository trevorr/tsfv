import { expect } from 'chai';
import tsfv from '../src';

describe('numeric', () => {
  it('passes when numeric', () => {
    expect(tsfv.numeric().test(0)).to.be.true;
    expect(tsfv.numeric().test(-0)).to.be.true;
    expect(tsfv.numeric().test(+0)).to.be.true;
    expect(tsfv.numeric().test('0')).to.be.true;
    expect(tsfv.numeric().test('-0')).to.be.true;
    expect(tsfv.numeric().test('+0')).to.be.true;
    expect(tsfv.numeric().test('1')).to.be.true;
    expect(tsfv.numeric().test('010')).to.be.true;
    expect(tsfv.numeric().test('0x10')).to.be.true;
    expect(tsfv.numeric().test(new Number(0))).to.be.true;
    expect(tsfv.numeric().test(new Number(1))).to.be.true;
    expect(tsfv.numeric().test(Infinity)).to.be.true;
    expect(tsfv.numeric().test(-Infinity)).to.be.true;
  });
  it('fails when not numeric', () => {
    expect(tsfv.numeric().test(NaN)).to.be.false;
    expect(tsfv.numeric().test(null)).to.be.false;
    expect(tsfv.numeric().test(undefined)).to.be.false;
    expect(tsfv.numeric().test(false)).to.be.false;
    expect(tsfv.numeric().test(true)).to.be.false;
    expect(tsfv.numeric().test('')).to.be.false;
    expect(tsfv.numeric().test({})).to.be.false;
    expect(tsfv.numeric().test([])).to.be.false;
    expect(tsfv.numeric().test(new Date())).to.be.false;
  });
});

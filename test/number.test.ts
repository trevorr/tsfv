import { expect } from 'chai';
import tsfv from '../src';

describe('number', () => {
  it('passes when number', () => {
    expect(tsfv.number().test(0)).to.be.true;
    expect(tsfv.number().test(-0)).to.be.true;
    expect(tsfv.number().test(+0)).to.be.true;
    expect(tsfv.number().test(Infinity)).to.be.true;
    expect(tsfv.number().test(-Infinity)).to.be.true;
    expect(tsfv.number().test(NaN)).to.be.true;
  });
  it('fails when not number', () => {
    expect(tsfv.number().test(null)).to.be.false;
    expect(tsfv.number().test(undefined)).to.be.false;
    expect(tsfv.number().test(false)).to.be.false;
    expect(tsfv.number().test(true)).to.be.false;
    expect(tsfv.number().test(new Number(0))).to.be.false;
    expect(tsfv.number().test(new Number(1))).to.be.false;
    expect(tsfv.number().test('')).to.be.false;
    expect(tsfv.number().test('1')).to.be.false;
    expect(tsfv.number().test({})).to.be.false;
    expect(tsfv.number().test([])).to.be.false;
  });
});

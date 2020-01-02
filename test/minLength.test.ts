import { expect } from 'chai';
import tsfv from '../src';

describe('minLength', () => {
  it('passes within range', () => {
    expect(tsfv.minLength(1).test('a')).to.be.true;
    expect(tsfv.minLength(1).test('abc')).to.be.true;
    expect(tsfv.minLength(1).test([1])).to.be.true;
    expect(tsfv.minLength(1).test([1, 2, 3])).to.be.true;
  });
  it('fails outside range', () => {
    expect(tsfv.minLength(1).test('')).to.be.false;
    expect(tsfv.minLength(1).test([])).to.be.false;
  });
  it('fails when not string or array', () => {
    expect(tsfv.minLength(0).test(null)).to.be.false;
    expect(tsfv.minLength(0).test(undefined)).to.be.false;
    expect(tsfv.minLength(0).test(false)).to.be.false;
    expect(tsfv.minLength(0).test(true)).to.be.false;
    expect(tsfv.minLength(0).test(0)).to.be.false;
    expect(tsfv.minLength(0).test(1)).to.be.false;
    expect(tsfv.minLength(0).test({})).to.be.false;
  });
});

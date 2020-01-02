import { expect } from 'chai';
import tsfv from '../src';

describe('maxLength', () => {
  it('passes within range', () => {
    expect(tsfv.maxLength(3).test('a')).to.be.true;
    expect(tsfv.maxLength(3).test('abc')).to.be.true;
    expect(tsfv.maxLength(3).test([1])).to.be.true;
    expect(tsfv.maxLength(3).test([1, 2, 3])).to.be.true;
  });
  it('fails outside range', () => {
    expect(tsfv.maxLength(3).test('abcd')).to.be.false;
    expect(tsfv.maxLength(3).test([1, 2, 3, 4])).to.be.false;
  });
  it('fails when not string or array', () => {
    expect(tsfv.maxLength(0).test(null)).to.be.false;
    expect(tsfv.maxLength(0).test(undefined)).to.be.false;
    expect(tsfv.maxLength(0).test(false)).to.be.false;
    expect(tsfv.maxLength(0).test(true)).to.be.false;
    expect(tsfv.maxLength(0).test(0)).to.be.false;
    expect(tsfv.maxLength(0).test(1)).to.be.false;
    expect(tsfv.maxLength(0).test({})).to.be.false;
  });
});

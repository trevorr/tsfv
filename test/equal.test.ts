import { expect } from 'chai';
import tsfv from '../src';

describe('equal', () => {
  it('passes with same values', () => {
    expect(tsfv.equal(undefined).test(undefined)).to.be.true;
    expect(tsfv.equal(null).test(null)).to.be.true;
    expect(tsfv.equal(true).test(true)).to.be.true;
    expect(tsfv.equal(false).test(false)).to.be.true;
    expect(tsfv.equal(42).test(42)).to.be.true;
    expect(tsfv.equal('hello').test('hello')).to.be.true;
    const arr = [42];
    expect(tsfv.equal(arr).test(arr)).to.be.true;
    const obj = {};
    expect(tsfv.equal(obj).test(obj)).to.be.true;
  });
  it('passes with signed zeroes', () => {
    expect(tsfv.exact(0).test(-0)).to.be.true;
    expect(tsfv.exact(0).test(+0)).to.be.true;
    expect(tsfv.exact(-0).test(0)).to.be.true;
    expect(tsfv.exact(-0).test(+0)).to.be.true;
    expect(tsfv.exact(+0).test(0)).to.be.true;
    expect(tsfv.exact(+0).test(-0)).to.be.true;
  });
  it('passes with conversions', () => {
    expect(tsfv.equal(undefined).test(null)).to.be.true;
    expect(tsfv.equal(null).test(undefined)).to.be.true;
    expect(tsfv.equal(42).test('42')).to.be.true;
    expect(tsfv.equal('hello').test({ toString: () => 'hello' })).to.be.true;
  });
  it('fails with different values', () => {
    expect(tsfv.equal(1).test(2)).to.be.false;
    expect(tsfv.equal(true).test(false)).to.be.false;
  });
  it('fails with NaN', () => {
    expect(tsfv.equal(NaN).test(NaN)).to.be.false;
  });
});

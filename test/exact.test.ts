import { expect } from 'chai';
import tsfv from '../src';

describe('exact', () => {
  it('passes with same values', () => {
    expect(tsfv.exact(undefined).test(undefined)).to.be.true;
    expect(tsfv.exact(null).test(null)).to.be.true;
    expect(tsfv.exact(true).test(true)).to.be.true;
    expect(tsfv.exact(false).test(false)).to.be.true;
    expect(tsfv.exact(42).test(42)).to.be.true;
    expect(tsfv.exact('hello').test('hello')).to.be.true;
    const arr = [42];
    expect(tsfv.exact(arr).test(arr)).to.be.true;
    const obj = {};
    expect(tsfv.exact(obj).test(obj)).to.be.true;
  });
  it('passes with signed zeroes', () => {
    expect(tsfv.exact(0).test(-0)).to.be.true;
    expect(tsfv.exact(0).test(+0)).to.be.true;
    expect(tsfv.exact(-0).test(0)).to.be.true;
    expect(tsfv.exact(-0).test(+0)).to.be.true;
    expect(tsfv.exact(+0).test(0)).to.be.true;
    expect(tsfv.exact(+0).test(-0)).to.be.true;
  });
  it('fails with conversions', () => {
    expect(tsfv.exact(undefined).test(null)).to.be.false;
    expect(tsfv.exact(null).test(undefined)).to.be.false;
    expect(tsfv.exact(42).test('42')).to.be.false;
    expect(tsfv.exact('hello').test({ toString: () => 'hello' })).to.be.false;
  });
  it('fails with different values', () => {
    expect(tsfv.exact(1).test(2)).to.be.false;
    expect(tsfv.exact(true).test(false)).to.be.false;
  });
  it('fails with NaN', () => {
    expect(tsfv.exact(NaN).test(NaN)).to.be.false;
  });
});

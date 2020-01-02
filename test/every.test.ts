import { expect } from 'chai';
import tsfv from '../src';

describe('every', () => {
  it('passes when every', () => {
    expect(tsfv.every(tsfv).test([])).to.be.true;
    expect(tsfv.every(tsfv.exact('a')).test(['a', 'a', 'a'])).to.be.true;
    expect(tsfv.every(tsfv.exact(1)).test([])).to.be.true;
    expect(tsfv.every(tsfv.exact(1)).test([1, 1, 1])).to.be.true;
    expect(tsfv.every(tsfv.exact(null)).test([null, null, null])).to.be.true;
    expect(tsfv.every(tsfv.exact(undefined)).test([undefined, undefined, undefined])).to.be.true;
    expect(tsfv.every(tsfv.exact(false)).test([false, false, false])).to.be.true;
    expect(tsfv.every(tsfv.exact(true)).test([true, true, true])).to.be.true;
  });
  it('fails when not every', () => {
    expect(tsfv.every(tsfv.exact('a')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.every(tsfv.exact('b')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.every(tsfv.exact('c')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.every(tsfv.exact(1)).test([3, 2, 1])).to.be.false;
    expect(tsfv.every(tsfv.exact(2)).test([3, 2, 1])).to.be.false;
    expect(tsfv.every(tsfv.exact(3)).test([3, 2, 1])).to.be.false;
    expect(tsfv.every(tsfv.exact(null)).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.every(tsfv.exact(undefined)).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.every(tsfv.exact(false)).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.every(tsfv.exact(true)).test([null, undefined, false, true])).to.be.false;
  });
  it('fails when none', () => {
    expect(tsfv.every(tsfv.exact('')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.every(tsfv.exact('d')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.every(tsfv.exact(0)).test([3, 2, 1])).to.be.false;
    expect(tsfv.every(tsfv.exact(null)).test([3, 2, 1])).to.be.false;
    expect(tsfv.every(tsfv.exact('')).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.every(tsfv.exact(0)).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.every(tsfv.exact([])).test([[]])).to.be.false;
  });
  it('fails when not array', () => {
    expect(tsfv.every(tsfv.null()).test(null)).to.be.false;
    expect(tsfv.every(tsfv.undefined()).test(undefined)).to.be.false;
    expect(tsfv.every(tsfv.exact(false)).test(false)).to.be.false;
    expect(tsfv.every(tsfv.exact(true)).test(true)).to.be.false;
    expect(tsfv.every(tsfv.exact(0)).test(0)).to.be.false;
    expect(tsfv.every(tsfv.exact(1)).test(1)).to.be.false;
    expect(tsfv.every(tsfv.exact('')).test('')).to.be.false;
    expect(tsfv.every(tsfv.exact({})).test({})).to.be.false;
  });
});

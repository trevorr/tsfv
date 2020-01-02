import { expect } from 'chai';
import tsfv from '../src';

describe('some', () => {
  it('passes when some', () => {
    expect(tsfv.some(tsfv.exact('a')).test(['a', 'b', 'c'])).to.be.true;
    expect(tsfv.some(tsfv.exact('b')).test(['a', 'b', 'c'])).to.be.true;
    expect(tsfv.some(tsfv.exact('c')).test(['a', 'b', 'c'])).to.be.true;
    expect(tsfv.some(tsfv.exact(1)).test([3, 2, 1])).to.be.true;
    expect(tsfv.some(tsfv.exact(2)).test([3, 2, 1])).to.be.true;
    expect(tsfv.some(tsfv.exact(3)).test([3, 2, 1])).to.be.true;
    expect(tsfv.some(tsfv.exact(null)).test([null, undefined, false, true])).to.be.true;
    expect(tsfv.some(tsfv.exact(undefined)).test([null, undefined, false, true])).to.be.true;
    expect(tsfv.some(tsfv.exact(false)).test([null, undefined, false, true])).to.be.true;
    expect(tsfv.some(tsfv.exact(true)).test([null, undefined, false, true])).to.be.true;
  });
  it('fails when none', () => {
    expect(tsfv.some(tsfv).test([])).to.be.false;
    expect(tsfv.some(tsfv.exact('')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.some(tsfv.exact('d')).test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.some(tsfv.exact(0)).test([3, 2, 1])).to.be.false;
    expect(tsfv.some(tsfv.exact(null)).test([3, 2, 1])).to.be.false;
    expect(tsfv.some(tsfv.exact('')).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.some(tsfv.exact(0)).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.some(tsfv.exact([])).test([[]])).to.be.false;
  });
  it('fails when not array', () => {
    expect(tsfv.some(tsfv.null()).test(null)).to.be.false;
    expect(tsfv.some(tsfv.undefined()).test(undefined)).to.be.false;
    expect(tsfv.some(tsfv.exact(false)).test(false)).to.be.false;
    expect(tsfv.some(tsfv.exact(true)).test(true)).to.be.false;
    expect(tsfv.some(tsfv.exact(0)).test(0)).to.be.false;
    expect(tsfv.some(tsfv.exact(1)).test(1)).to.be.false;
    expect(tsfv.some(tsfv.exact('')).test('')).to.be.false;
    expect(tsfv.some(tsfv.exact({})).test({})).to.be.false;
  });
});

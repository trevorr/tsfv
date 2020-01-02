import { expect } from 'chai';
import tsfv from '../src';

describe('includes', () => {
  it('passes when including', () => {
    expect(tsfv.includes('a').test(['a', 'b', 'c'])).to.be.true;
    expect(tsfv.includes('b').test(['a', 'b', 'c'])).to.be.true;
    expect(tsfv.includes('c').test(['a', 'b', 'c'])).to.be.true;
    expect(tsfv.includes(1).test([3, 2, 1])).to.be.true;
    expect(tsfv.includes(2).test([3, 2, 1])).to.be.true;
    expect(tsfv.includes(3).test([3, 2, 1])).to.be.true;
    expect(tsfv.includes(null).test([null, undefined, false, true])).to.be.true;
    expect(tsfv.includes(undefined).test([null, undefined, false, true])).to.be.true;
    expect(tsfv.includes(false).test([null, undefined, false, true])).to.be.true;
    expect(tsfv.includes(true).test([null, undefined, false, true])).to.be.true;
  });
  it('fails when not including', () => {
    expect(tsfv.includes('').test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.includes('d').test(['a', 'b', 'c'])).to.be.false;
    expect(tsfv.includes(0).test([3, 2, 1])).to.be.false;
    expect(tsfv.includes(null).test([3, 2, 1])).to.be.false;
    expect(tsfv.includes('').test([null, undefined, false, true])).to.be.false;
    expect(tsfv.includes(0).test([null, undefined, false, true])).to.be.false;
    expect(tsfv.includes([]).test([])).to.be.false;
    expect(tsfv.includes([]).test([[]])).to.be.false;
  });
  it('fails when not array', () => {
    expect(tsfv.includes(null).test(null)).to.be.false;
    expect(tsfv.includes(undefined).test(undefined)).to.be.false;
    expect(tsfv.includes(false).test(false)).to.be.false;
    expect(tsfv.includes(true).test(true)).to.be.false;
    expect(tsfv.includes(0).test(0)).to.be.false;
    expect(tsfv.includes(1).test(1)).to.be.false;
    expect(tsfv.includes('').test('')).to.be.false;
    expect(tsfv.includes({}).test({})).to.be.false;
  });
});

import { expect } from 'chai';
import tsfv from '../src';

describe('values', () => {
  it('passes when values match', () => {
    expect(tsfv.values(tsfv.every(tsfv)).test({})).to.be.true;
    expect(tsfv.values(tsfv.empty()).test({})).to.be.true;
    expect(tsfv.values(tsfv.length(1)).test({ a: 1 })).to.be.true;
    expect(tsfv.values(tsfv.some(tsfv.exact(1))).test({ a: 1 })).to.be.true;
    expect(tsfv.values(tsfv.every(tsfv.exact(1))).test({ a: 1 })).to.be.true;
    expect(tsfv.values(tsfv.some(tsfv.startsWith('a'))).test({ abc: 'abc' })).to.be.true;
    expect(tsfv.values(tsfv.every(tsfv.startsWith('a'))).test({ abc: 'abc' })).to.be.true;
    expect(tsfv.values(tsfv.every(tsfv.number())).test({ 1: 1 })).to.be.true;
  });
  it('fails when values do not match', () => {
    expect(tsfv.values(tsfv.some(tsfv)).test({})).to.be.false;
    expect(tsfv.values(tsfv.length(1)).test({})).to.be.false;
    expect(tsfv.values(tsfv.every(tsfv.exact(1))).test({ a: 1, b: 2 })).to.be.false;
    expect(tsfv.values(tsfv.exact(1)).test({ a: 1 })).to.be.false;
    expect(tsfv.values(tsfv.exact([1])).test({ a: 1 })).to.be.false;
  });
  it('fails when not object', () => {
    expect(tsfv.values(tsfv).test(null)).to.be.false;
    expect(tsfv.values(tsfv).test(undefined)).to.be.false;
    expect(tsfv.values(tsfv).test(false)).to.be.false;
    expect(tsfv.values(tsfv).test(true)).to.be.false;
    expect(tsfv.values(tsfv).test(0)).to.be.false;
    expect(tsfv.values(tsfv).test(1)).to.be.false;
    expect(tsfv.values(tsfv).test('')).to.be.false;
    expect(tsfv.values(tsfv).test([])).to.be.false;
  });
});

import { expect } from 'chai';
import tsfv from '../src';

describe('keys', () => {
  it('passes when keys match', () => {
    expect(tsfv.keys(tsfv.every(tsfv)).test({})).to.be.true;
    expect(tsfv.keys(tsfv.empty()).test({})).to.be.true;
    expect(tsfv.keys(tsfv.length(1)).test({ a: 1 })).to.be.true;
    expect(tsfv.keys(tsfv.some(tsfv.exact('a'))).test({ a: 1 })).to.be.true;
    expect(tsfv.keys(tsfv.every(tsfv.exact('a'))).test({ a: 1 })).to.be.true;
    expect(tsfv.keys(tsfv.some(tsfv.startsWith('a'))).test({ abc: 1 })).to.be.true;
    expect(tsfv.keys(tsfv.every(tsfv.startsWith('a'))).test({ abc: 1 })).to.be.true;
    expect(tsfv.keys(tsfv.every(tsfv.string())).test({ 1: 1 })).to.be.true;
  });
  it('fails when keys do not match', () => {
    expect(tsfv.keys(tsfv.some(tsfv)).test({})).to.be.false;
    expect(tsfv.keys(tsfv.length(1)).test({})).to.be.false;
    expect(tsfv.keys(tsfv.every(tsfv.exact('a'))).test({ a: 1, b: 1 })).to.be.false;
    expect(tsfv.keys(tsfv.exact('a')).test({ a: 1 })).to.be.false;
    expect(tsfv.keys(tsfv.exact(['a'])).test({ a: 1 })).to.be.false;
  });
  it('fails when not object', () => {
    expect(tsfv.keys(tsfv).test(null)).to.be.false;
    expect(tsfv.keys(tsfv).test(undefined)).to.be.false;
    expect(tsfv.keys(tsfv).test(false)).to.be.false;
    expect(tsfv.keys(tsfv).test(true)).to.be.false;
    expect(tsfv.keys(tsfv).test(0)).to.be.false;
    expect(tsfv.keys(tsfv).test(1)).to.be.false;
    expect(tsfv.keys(tsfv).test('')).to.be.false;
    expect(tsfv.keys(tsfv).test([])).to.be.false;
  });
});

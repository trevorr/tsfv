import { expect } from 'chai';
import tsfv from '../src';

describe('anyOf', () => {
  it('fails with no conditions', () => {
    expect(tsfv.anyOf().test(null)).to.be.false;
  });
  it('fails with false conditions', () => {
    expect(tsfv.anyOf(tsfv.number(), tsfv.string()).test(null)).to.be.false;
  });
  it('passes with a true condition', () => {
    expect(tsfv.anyOf(tsfv.number(), tsfv.string(), tsfv.null()).test(null)).to.be.true;
  });
});

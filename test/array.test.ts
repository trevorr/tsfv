import { expect } from 'chai';
import tsfv from '../src';

describe('array', () => {
  it('passes when array', () => {
    expect(tsfv.array().test([])).to.be.true;
    expect(tsfv.array().test(Array.from('123'))).to.be.true;
  });
  it('fails when not array', () => {
    expect(tsfv.array().test(null)).to.be.false;
    expect(tsfv.array().test(undefined)).to.be.false;
    expect(tsfv.array().test(false)).to.be.false;
    expect(tsfv.array().test(true)).to.be.false;
    expect(tsfv.array().test(0)).to.be.false;
    expect(tsfv.array().test(1)).to.be.false;
    expect(tsfv.array().test('')).to.be.false;
    expect(tsfv.array().test({})).to.be.false;
  });
});

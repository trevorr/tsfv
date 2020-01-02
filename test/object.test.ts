import { expect } from 'chai';
import tsfv from '../src';

describe('object', () => {
  it('passes when object', () => {
    expect(tsfv.object().test({})).to.be.true;
    expect(tsfv.object().test(new Date())).to.be.true;
  });
  it('fails when not object', () => {
    expect(tsfv.object().test(null)).to.be.false;
    expect(tsfv.object().test(undefined)).to.be.false;
    expect(tsfv.object().test(false)).to.be.false;
    expect(tsfv.object().test(true)).to.be.false;
    expect(tsfv.object().test(0)).to.be.false;
    expect(tsfv.object().test(1)).to.be.false;
    expect(tsfv.object().test('')).to.be.false;
    expect(tsfv.object().test([])).to.be.false;
    expect(tsfv.object().test(() => 0)).to.be.false;
    expect(tsfv.object().test(Symbol())).to.be.false;
  });
});

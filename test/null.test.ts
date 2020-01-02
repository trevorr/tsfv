import { expect } from 'chai';
import tsfv from '../src';

describe('null', () => {
  it('passes when null', () => {
    expect(tsfv.null().test(null)).to.be.true;
  });
  it('fails when not null', () => {
    expect(tsfv.null().test(undefined)).to.be.false;
    expect(tsfv.null().test(false)).to.be.false;
    expect(tsfv.null().test(true)).to.be.false;
    expect(tsfv.null().test(0)).to.be.false;
    expect(tsfv.null().test(1)).to.be.false;
    expect(tsfv.null().test('')).to.be.false;
    expect(tsfv.null().test([])).to.be.false;
    expect(tsfv.null().test({})).to.be.false;
  });
});

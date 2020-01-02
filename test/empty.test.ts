import { expect } from 'chai';
import tsfv from '../src';

describe('empty', () => {
  it('passes when empty string or array', () => {
    expect(tsfv.empty().test('')).to.be.true;
    expect(tsfv.empty().test([])).to.be.true;
  });
  it('fails when non-empty string or array', () => {
    expect(tsfv.empty().test('a')).to.be.false;
    expect(tsfv.empty().test([1])).to.be.false;
  });
  it('fails when not string or array', () => {
    expect(tsfv.empty().test(null)).to.be.false;
    expect(tsfv.empty().test(undefined)).to.be.false;
    expect(tsfv.empty().test(false)).to.be.false;
    expect(tsfv.empty().test(true)).to.be.false;
    expect(tsfv.empty().test(0)).to.be.false;
    expect(tsfv.empty().test(1)).to.be.false;
    expect(tsfv.empty().test({})).to.be.false;
  });
});

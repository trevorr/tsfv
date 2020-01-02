import { expect } from 'chai';
import tsfv from '../src';

describe('string', () => {
  it('passes when string', () => {
    expect(tsfv.string().test('')).to.be.true;
    expect(tsfv.string().test('abc')).to.be.true;
  });
  it('fails when not string', () => {
    expect(tsfv.string().test(null)).to.be.false;
    expect(tsfv.string().test(undefined)).to.be.false;
    expect(tsfv.string().test(false)).to.be.false;
    expect(tsfv.string().test(true)).to.be.false;
    expect(tsfv.string().test(0)).to.be.false;
    expect(tsfv.string().test(1)).to.be.false;
    expect(tsfv.string().test(new String(''))).to.be.false;
    expect(tsfv.string().test(new String('abc'))).to.be.false;
    expect(tsfv.string().test({})).to.be.false;
    expect(tsfv.string().test([])).to.be.false;
  });
});

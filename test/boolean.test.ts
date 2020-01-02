import { expect } from 'chai';
import tsfv from '../src';

describe('boolean', () => {
  it('passes when boolean', () => {
    expect(tsfv.boolean().test(false)).to.be.true;
    expect(tsfv.boolean().test(true)).to.be.true;
  });
  it('fails when not boolean', () => {
    expect(tsfv.boolean().test(null)).to.be.false;
    expect(tsfv.boolean().test(undefined)).to.be.false;
    expect(tsfv.boolean().test(new Boolean(false))).to.be.false;
    expect(tsfv.boolean().test(new Boolean(true))).to.be.false;
    expect(tsfv.boolean().test(0)).to.be.false;
    expect(tsfv.boolean().test(1)).to.be.false;
    expect(tsfv.boolean().test('')).to.be.false;
    expect(tsfv.boolean().test({})).to.be.false;
    expect(tsfv.boolean().test([])).to.be.false;
  });
});

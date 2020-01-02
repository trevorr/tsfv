import { expect } from 'chai';
import tsfv from '../src';

describe('instanceOf', () => {
  it('passes when instanceof', () => {
    expect(tsfv.instanceOf(Object).test({})).to.be.true;
    expect(tsfv.instanceOf(Object).test([])).to.be.true;
    expect(tsfv.instanceOf(Function).test(() => 0)).to.be.true;
    expect(tsfv.instanceOf(Date).test(new Date())).to.be.true;
  });
  it('fails when not instanceof', () => {
    expect(tsfv.instanceOf(Date).test({})).to.be.false;
    expect(tsfv.instanceOf(Object).test(Object.create(null))).to.be.false;
  });
  it('fails when not object', () => {
    expect(tsfv.instanceOf(Object).test(null)).to.be.false;
    expect(tsfv.instanceOf(Object).test(undefined)).to.be.false;
    expect(tsfv.instanceOf(Object).test(false)).to.be.false;
    expect(tsfv.instanceOf(Object).test(true)).to.be.false;
    expect(tsfv.instanceOf(Object).test(0)).to.be.false;
    expect(tsfv.instanceOf(Object).test(1)).to.be.false;
    expect(tsfv.instanceOf(Object).test('')).to.be.false;
  });
});

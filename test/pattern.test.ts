import { expect } from 'chai';
import tsfv from '../src';

describe('pattern', () => {
  it('passes when matching', () => {
    expect(tsfv.pattern(/.?/).test('')).to.be.true;
    expect(tsfv.pattern(/bcd/).test('abcde')).to.be.true;
    expect(tsfv.pattern(/bcd/i).test('ABCDE')).to.be.true;
  });
  it('fails when not matching', () => {
    expect(tsfv.pattern(/./).test('')).to.be.false;
    expect(tsfv.pattern(/bcd/).test('ABCDE')).to.be.false;
    expect(tsfv.pattern(/^bcd$/).test('abcde')).to.be.false;
  });
  it('fails when not string', () => {
    expect(tsfv.pattern(/.?/).test(null)).to.be.false;
    expect(tsfv.pattern(/.?/).test(undefined)).to.be.false;
    expect(tsfv.pattern(/.?/).test(false)).to.be.false;
    expect(tsfv.pattern(/.?/).test(true)).to.be.false;
    expect(tsfv.pattern(/.?/).test(0)).to.be.false;
    expect(tsfv.pattern(/.?/).test(1)).to.be.false;
    expect(tsfv.pattern(/.?/).test([])).to.be.false;
    expect(tsfv.pattern(/.?/).test({})).to.be.false;
  });
});

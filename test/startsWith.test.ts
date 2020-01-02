import { expect } from 'chai';
import tsfv from '../src';

describe('startsWith', () => {
  it('passes when matching', () => {
    expect(tsfv.startsWith('').test('')).to.be.true;
    expect(tsfv.startsWith('').test('abcde')).to.be.true;
    expect(tsfv.startsWith('abc').test('abcde')).to.be.true;
    expect(tsfv.startsWith('abcde').test('abcde')).to.be.true;
  });
  it('fails when not matching', () => {
    expect(tsfv.startsWith('a').test('')).to.be.false;
    expect(tsfv.startsWith('abc').test('ABCDE')).to.be.false;
    expect(tsfv.startsWith('bcd').test('abcde')).to.be.false;
  });
  it('fails when not string', () => {
    expect(tsfv.startsWith('').test(null)).to.be.false;
    expect(tsfv.startsWith('').test(undefined)).to.be.false;
    expect(tsfv.startsWith('').test(false)).to.be.false;
    expect(tsfv.startsWith('').test(true)).to.be.false;
    expect(tsfv.startsWith('').test(0)).to.be.false;
    expect(tsfv.startsWith('').test(1)).to.be.false;
    expect(tsfv.startsWith('').test([])).to.be.false;
    expect(tsfv.startsWith('').test({})).to.be.false;
  });
});

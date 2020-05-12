import { expect } from 'chai';
import tsfv from '../src';

const base = { inherited: true };

describe('properties', () => {
  it('passes when properties match', () => {
    const o = { a: 123, b: 'x' };
    expect(tsfv.properties({}).test(o)).to.be.true;
    expect(tsfv.properties({ a: tsfv.not.undefined() }).test(o)).to.be.true;
    expect(tsfv.properties({ a: tsfv.number() }).test(o)).to.be.true;
    expect(tsfv.properties({ inherited: tsfv.boolean() }).test(base)).to.be.true;
  });
  it('matches inherited properties', () => {
    expect(tsfv.properties({ inherited: tsfv.boolean() }).test(Object.create(base))).to.be.true;
    expect(
      tsfv
        .properties({ a: tsfv.number(), inherited: tsfv.boolean() })
        .test(Object.assign(Object.create(base), { a: 123 }))
    ).to.be.true;
  });
  it('fails when properties do not match', () => {
    expect(tsfv.properties({ a: tsfv.not.undefined() }).test({})).to.be.false;
    expect(tsfv.properties({ a: tsfv.number() }).test({ a: '123' })).to.be.false;
    expect(tsfv.properties({ a: tsfv.number(), b: tsfv.string() }).test({ a: 123, b: 456 })).to.be.false;
  });
  it('passes when only with no additional properties', () => {
    expect(tsfv.properties({}, true).test({})).to.be.true;
    expect(tsfv.properties({}, true).test(Object.create(base))).to.be.true;
    expect(tsfv.properties({ a: tsfv.number() }, true).test({ a: 123 })).to.be.true;
  });
  it('fails when only with additional properties', () => {
    expect(tsfv.properties({}, true).test(base)).to.be.false;
    expect(tsfv.properties({ a: tsfv.number() }, true).test({ a: 123, b: 'x' })).to.be.false;
  });
  it('fails when not object', () => {
    expect(tsfv.properties({}).test(null)).to.be.false;
    expect(tsfv.properties({}).test(undefined)).to.be.false;
    expect(tsfv.properties({}).test(false)).to.be.false;
    expect(tsfv.properties({}).test(true)).to.be.false;
    expect(tsfv.properties({}).test(0)).to.be.false;
    expect(tsfv.properties({}).test(1)).to.be.false;
    expect(tsfv.properties({}).test('')).to.be.false;
    expect(tsfv.properties({}).test([])).to.be.false;
  });
});

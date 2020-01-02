import { expect } from 'chai';
import tsfv from '../src';

describe('describe', () => {
  it('describes single rules', () => {
    expect(tsfv.array().describe()).to.equal('array');
    expect(tsfv.empty().describe()).to.equal('zero length');
    expect(tsfv.positive().describe()).to.equal('positive number');
  });
  it('describes not rules', () => {
    expect(tsfv.not.array().describe()).to.equal('not array');
    expect(tsfv.not.empty().describe()).to.equal('not zero length');
    expect(tsfv.not.positive().describe()).to.equal('not positive number');
  });
  it('describes multiple rules', () => {
    expect(
      tsfv
        .minLength(3)
        .every(tsfv.positive())
        .describe()
    ).to.equal('minimum length of 3 and array with every element positive number');
  });
  it('describes complex rules', () => {
    expect(
      tsfv
        .anyOf(tsfv.number(), tsfv.string())
        .not.equal('foo')
        .orUndefined()
        .describe()
    ).to.equal('(number or string) and not value equal to "foo" or undefined');
  });
});

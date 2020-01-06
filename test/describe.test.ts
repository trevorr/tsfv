import { expect } from 'chai';
import tsfv from '../src';

describe('describe', () => {
  it('describes single rules', () => {
    expect(tsfv.describe()).to.equal('any');
    expect(tsfv.array().describe()).to.equal('array');
    expect(tsfv.boolean().describe()).to.equal('boolean');
    expect(tsfv.integer().describe()).to.equal('integer');
    expect(tsfv.null().describe()).to.equal('null');
    expect(tsfv.number().describe()).to.equal('number');
    expect(tsfv.numeric().describe()).to.equal('numeric');
    expect(tsfv.object().describe()).to.equal('object');
    expect(tsfv.string().describe()).to.equal('string');
    expect(tsfv.undefined().describe()).to.equal('undefined');
    expect(tsfv.anyOf(tsfv.number(), tsfv.string()).describe()).to.equal('(number or string)');
    expect(tsfv.equal(1).describe()).to.equal('value equal to 1');
    expect(tsfv.exact(1).describe()).to.equal('value exactly equal to 1');
    expect(tsfv.predicate(() => true, 'true').describe()).to.equal('true');
    expect(tsfv.between(1, 2).describe()).to.equal('number between 1 and 2');
    expect(tsfv.greaterThan(1).describe()).to.equal('number greater than 1');
    expect(tsfv.greaterThanOrEqual(1).describe()).to.equal('number greater than or equal to 1');
    expect(tsfv.lessThan(1).describe()).to.equal('number less than 1');
    expect(tsfv.lessThanOrEqual(1).describe()).to.equal('number less than or equal to 1');
    expect(tsfv.positive().describe()).to.equal('positive number');
    expect(tsfv.negative().describe()).to.equal('negative number');
    expect(tsfv.length(1).describe()).to.equal('length of 1');
    expect(tsfv.length(1, 2).describe()).to.equal('length between 1 and 2');
    expect(tsfv.minLength(1).describe()).to.equal('minimum length of 1');
    expect(tsfv.maxLength(1).describe()).to.equal('maximum length of 1');
    expect(tsfv.empty().describe()).to.equal('zero length');
    expect(tsfv.pattern(/foo/).describe()).to.equal('string matching /foo/');
    expect(tsfv.contains('foo').describe()).to.equal('string containing "foo"');
    expect(tsfv.startsWith('foo').describe()).to.equal('string starting with "foo"');
    expect(tsfv.endsWith('foo').describe()).to.equal('string ending with "foo"');
    expect(tsfv.includes('foo').describe()).to.equal('array containing "foo"');
    expect(tsfv.every(tsfv).describe()).to.equal('array with every element any');
    expect(tsfv.some(tsfv).describe()).to.equal('array with some element any');
    expect(tsfv.instanceOf(Date).describe()).to.equal('instance of Date');
    expect(tsfv.keys(tsfv).describe()).to.equal('object with keys any');
    expect(tsfv.values(tsfv).describe()).to.equal('object with values any');
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
        .orNull()
        .orUndefined()
        .describe()
    ).to.equal('(number or string) and not value equal to "foo" or null or undefined');
  });
});

import { Predicate, RuleInstance } from './api';
import { Validator } from './Validator';

export class Validation extends Validator {
  constructor(rules: RuleInstance[], allowNull = false, allowUndefined = false, private readonly invertNext = false) {
    super(rules, allowNull, allowUndefined);
  }
  protected withRule(rule: RuleInstance): this {
    if (this.invertNext) {
      const orig = rule;
      rule = { id: 'not', rule: orig, describe: () => `not ${orig.describe()}`, test: v => !orig.test(v) };
    }
    return super.withRule(rule);
  }
  array(): this {
    return this.withRule({ id: 'array', describe: () => 'array', test: (v: any) => Array.isArray(v) });
  }
  boolean(): this {
    return this.withRule({ id: 'boolean', describe: () => 'boolean', test: (v: any) => typeof v === 'boolean' });
  }
  integer(): this {
    return this.withRule({ id: 'integer', describe: () => 'integer', test: (v: any) => Number.isInteger(v) });
  }
  null(): this {
    return this.withRule({ id: 'null', describe: () => 'null', test: (v: any) => v === null });
  }
  number(): this {
    return this.withRule({ id: 'number', describe: () => 'number', test: (v: any) => typeof v === 'number' });
  }
  numeric(): this {
    return this.withRule({ id: 'numeric', describe: () => 'numeric', test: (v: any) => isNumeric(v) });
  }
  object(): this {
    return this.withRule({ id: 'object', describe: () => 'object', test: (v: any) => isObject(v) });
  }
  string(): this {
    return this.withRule({ id: 'string', describe: () => 'string', test: (v: any) => typeof v === 'string' });
  }
  undefined(): this {
    return this.withRule({ id: 'undefined', describe: () => 'undefined', test: (v: any) => v === undefined });
  }
  get not(): Validation {
    return new Validation(this.rules, this.allowNull, this.allowUndefined, true);
  }
  anyOf(...validators: Validator[]): this {
    return this.withRule({
      id: 'anyOf',
      rulesAlternatives: validators.map(vd => vd.rules),
      describe: () => '(' + validators.map(vd => vd.describe()).join(' or ') + ')',
      test: (v: any) => validators.some(vd => vd.test(v))
    });
  }
  equal(value: any): this {
    return this.withRule({
      id: 'equal',
      value,
      describe: () => `value equal to ${JSON.stringify(value)}`,
      test: (v: any) => v == value
    });
  }
  exact(value: any): this {
    return this.withRule({
      id: 'exact',
      value,
      describe: () => `value exactly equal to ${JSON.stringify(value)}`,
      test: (v: any) => v === value
    });
  }
  predicate(test: Predicate, description: string): this {
    return this.withRule({
      id: 'predicate',
      describe: () => description,
      test
    });
  }
  between(min: number, max: number): this {
    if (min > max) {
      throw new Error(`Invalid range constraint: minimum (${min}) is greater than maximum (${max})`);
    }
    return this.withRule({
      id: 'between',
      min,
      max,
      describe: () => `number between ${min} and ${max}`,
      test: (v: any) => isNumeric(v) && v >= min && v <= max
    });
  }
  greaterThan(bound: number): this {
    return this.withRule({
      id: 'greaterThan',
      bound,
      describe: () => `number greater than ${bound}`,
      test: (v: any) => isNumeric(v) && v > bound
    });
  }
  greaterThanOrEqual(bound: number): this {
    return this.withRule({
      id: 'greaterThanOrEqual',
      bound,
      describe: () => `number greater than or equal to ${bound}`,
      test: (v: any) => isNumeric(v) && v >= bound
    });
  }
  lessThan(bound: number): this {
    return this.withRule({
      id: 'lessThan',
      bound,
      describe: () => `number less than ${bound}`,
      test: (v: any) => isNumeric(v) && v < bound
    });
  }
  lessThanOrEqual(bound: number): this {
    return this.withRule({
      id: 'lessThanOrEqual',
      bound,
      describe: () => `number less than or equal to ${bound}`,
      test: (v: any) => isNumeric(v) && v <= bound
    });
  }
  positive(): this {
    return this.withRule({ id: 'positive', describe: () => 'positive number', test: (v: any) => v > 0 });
  }
  negative(): this {
    return this.withRule({ id: 'negative', describe: () => 'negative number', test: (v: any) => v < 0 });
  }
  length(min: number, max?: number): this {
    if (max == null) {
      return this.withRule({
        id: 'length',
        min,
        describe: () => `length of ${min}`,
        test: (v: any) => hasLength(v) && v.length === min
      });
    }
    if (min > max) {
      throw new Error(`Invalid length constraint: minimum (${min}) is greater than maximum (${max})`);
    }
    return this.withRule({
      id: 'length',
      min,
      max,
      describe: () => `length between ${min} and ${max}`,
      test: (v: any) => hasLength(v) && v.length >= min && v.length <= max
    });
  }
  minLength(min: number): this {
    return this.withRule({
      id: 'minLength',
      min,
      describe: () => `minimum length of ${min}`,
      test: (v: any) => hasLength(v) && v.length >= min
    });
  }
  maxLength(max: number): this {
    return this.withRule({
      id: 'maxLength',
      max,
      describe: () => `maximum length of ${max}`,
      test: (v: any) => hasLength(v) && v.length <= max
    });
  }
  empty(): this {
    return this.withRule({
      id: 'empty',
      describe: () => 'zero length',
      test: (v: any) => hasLength(v) && v.length === 0
    });
  }
  pattern(regex: RegExp): this {
    return this.withRule({
      id: 'pattern',
      regex,
      describe: () => `string matching ${regex}`,
      test: (v: any) => typeof v === 'string' && regex.test(v)
    });
  }
  contains(str: string): this {
    return this.withRule({
      id: 'contains',
      str,
      describe: () => `string containing ${JSON.stringify(str)}`,
      test: (v: any) => typeof v === 'string' && v.includes(str)
    });
  }
  startsWith(str: string): this {
    return this.withRule({
      id: 'startsWith',
      str,
      describe: () => `string starting with ${JSON.stringify(str)}`,
      test: (v: any) => typeof v === 'string' && v.startsWith(str)
    });
  }
  endsWith(str: string): this {
    return this.withRule({
      id: 'endsWith',
      str,
      describe: () => `string ending with ${JSON.stringify(str)}`,
      test: (v: any) => typeof v === 'string' && v.endsWith(str)
    });
  }
  includes(value: any): this {
    return this.withRule({
      id: 'includes',
      value,
      describe: () => `array containing ${JSON.stringify(value)}`,
      test: (v: any) => Array.isArray(v) && v.includes(value)
    });
  }
  every(elementValidator: Validator): this {
    return this.withRule({
      id: 'every',
      rules: elementValidator.rules,
      describe: () => `array with every element ${elementValidator.describe()}`,
      test: (v: any[]) => Array.isArray(v) && v.every(e => elementValidator.test(e))
    });
  }
  some(elementValidator: Validator): this {
    return this.withRule({
      id: 'some',
      rules: elementValidator.rules,
      describe: () => `array with some element ${elementValidator.describe()}`,
      test: (v: any[]) => Array.isArray(v) && v.some(e => elementValidator.test(e))
    });
  }
  instanceOf(ctor: Function): this {
    return this.withRule({
      id: 'instanceOf',
      ctor,
      describe: () => `instance of ${ctor.name}`,
      test: (v: any) => v instanceof ctor
    });
  }
  keys(arrayValidator: Validator): this {
    return this.withRule({
      id: 'keys',
      rules: arrayValidator.rules,
      describe: () => `object with keys ${arrayValidator.describe()}`,
      test: (v: object) => isObject(v) && arrayValidator.test(Object.keys(v))
    });
  }
  values(arrayValidator: Validator): this {
    return this.withRule({
      id: 'values',
      rules: arrayValidator.rules,
      describe: () => `object with values ${arrayValidator.describe()}`,
      test: (v: object) => isObject(v) && arrayValidator.test(Object.values(v))
    });
  }
}

function hasLength(v: any): boolean {
  return typeof v === 'string' || Array.isArray(v);
}

function isNumeric(v: any): boolean {
  return !isNaN(parseFloat(v));
}

function isObject(v: any): v is object {
  return v && typeof v === 'object' && !Array.isArray(v);
}

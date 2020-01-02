import { Validation } from '../src';

declare module '../src/api' {
  export interface StringValidationReturning<V> {
    uppercase(): V;
  }
}

declare module '../src' {
  export interface Validation {
    uppercase(): Validation;
  }
}

Validation.prototype.uppercase = function(this: Validation): Validation {
  return this.withRule({
    id: 'uppercase',
    describe: () => 'uppercase string',
    test: v => /^[A-Z]+$/.test(v)
  });
};

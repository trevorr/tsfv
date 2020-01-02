import { Validation } from '../src';

declare module '../src/api' {
  export interface StringValidationReturning<V> {
    minWords(min: number): V;
  }
}

declare module '../src' {
  export interface Validation {
    minWords(min: number): Validation;
  }
}

Validation.prototype.minWords = function(this: Validation, min: number): Validation {
  return this.withRule({
    id: 'minWords',
    describe: () => `contains at least ${min} words`,
    test: v => typeof v === 'string' && v.trim().split(/\s+/).length >= min
  });
};

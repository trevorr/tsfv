import tsfv, { ValidationError } from '../src';
import { RuleInstance } from '../src/api';

function describeAufDeutsch(rule: RuleInstance): string {
  switch (rule.id) {
    case 'length':
      return `eine Länge zwischen ${rule.min} und ${rule.max}`;
    case 'pattern':
      return `eine Zeichenfolge die zu ${rule.regex} passt`;
    // ...
    default:
      throw new Error(`Unbekannte Regel: ${rule.id}`);
  }
}

function errorAufDeutsch(error: ValidationError): string {
  let message = `Erwartet ${describeAufDeutsch(error.rule)}`;
  if (error.variable) {
    message += ` für "${error.variable}"`;
  }
  return message;
}

tsfv
  .length(1, 64)
  .pattern(/([A-Z]+\s*)+/)
  .orUndefined()
  .testAll(null, 'words')
  .map(err => console.log(errorAufDeutsch(err)));
// Erwartet eine Länge zwischen 1 und 64 für "words"
// Erwartet eine Zeichenfolge die zu /([A-Z]+\s*)+/ passt für "words"

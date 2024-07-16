import { toRoman, romanNumeralConverter } from '../src/romanNumerals.js';

describe('Roman Numeral Converter', () => {
  describe('Recursive toRoman', () => {
    test('converts 1 to I', () => {
      expect(toRoman(1)).toBe('I');
    });

    test('converts 4 to IV', () => {
      expect(toRoman(4)).toBe('IV');
    });

    test('converts 9 to IX', () => {
      expect(toRoman(9)).toBe('IX');
    });

    test('converts 1994 to MCMXCIV', () => {
      expect(toRoman(1994)).toBe('MCMXCIV');
    });

    test('throws error for 0', () => {
      expect(() => toRoman(0)).toThrow('Number must be between 1 and 3999');
    });

    test('throws error for 4000', () => {
      expect(() => toRoman(4000)).toThrow('Number must be between 1 and 3999');
    });
  });

  describe('Curried romanNumeralConverter', () => {
    test('converts 1 to I', () => {
      expect(romanNumeralConverter(1)).toBe('I');
    });

    test('converts 4 to IV', () => {
      expect(romanNumeralConverter(4)).toBe('IV');
    });

    test('converts 9 to IX', () => {
      expect(romanNumeralConverter(9)).toBe('IX');
    });

    test('converts 1994 to MCMXCIV', () => {
      expect(romanNumeralConverter(1994)).toBe('MCMXCIV');
    });

    test('throws error for 0', () => {
      expect(() => romanNumeralConverter(0)).toThrow('Number must be between 1 and 3999');
    });

    test('throws error for 4000', () => {
      expect(() => romanNumeralConverter(4000)).toThrow('Number must be between 1 and 3999');
    });
  });
});
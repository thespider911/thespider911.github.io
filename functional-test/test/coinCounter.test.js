import { recursiveCoinCounter, closureCoinCounter } from '../src/coinCounter.js';

describe('Coin Counter', () => {
  describe('Recursive Coin Counter', () => {
    test('handles $0', () => {
      expect(recursiveCoinCounter(0)).toEqual({ quarter: 0, dime: 0, nickel: 0, penny: 0 });
    });

    test('handles $1.23', () => {
      expect(recursiveCoinCounter(1.23)).toEqual({ quarter: 4, dime: 2, nickel: 0, penny: 3 });
    });

    test('handles $4.99', () => {
      expect(recursiveCoinCounter(4.99)).toEqual({ quarter: 19, dime: 2, nickel: 0, penny: 4 });
    });
  });

  describe('Closure Coin Counter', () => {
    test('handles $0', () => {
      expect(closureCoinCounter(0)).toEqual({ quarters: 0, dimes: 0, nickels: 0, pennies: 0 });
    });

    test('handles $1.23', () => {
      expect(closureCoinCounter(1.23)).toEqual({ quarters: 4, dimes: 2, nickels: 0, pennies: 3 });
    });

    test('handles $4.99', () => {
      expect(closureCoinCounter(4.99)).toEqual({ quarters: 19, dimes: 2, nickels: 0, pennies: 4 });
    });
  });
});
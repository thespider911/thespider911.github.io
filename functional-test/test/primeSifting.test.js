import { sievePrimes } from '../src/primeSifting.js';

describe('Prime Sifting', () => {
  test('returns empty array for input less than 2', () => {
    expect(sievePrimes(1)).toEqual([]);
  });

  test('returns [2] for input 2', () => {
    expect(sievePrimes(2)).toEqual([2]);
  });

  test('returns correct primes for input 10', () => {
    expect(sievePrimes(10)).toEqual([2, 3, 5, 7]);
  });

  test('returns correct primes for input 30', () => {
    expect(sievePrimes(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  test('handles larger numbers', () => {
    const primes = sievePrimes(100);
    expect(primes).toHaveLength(25);
    expect(primes[primes.length - 1]).toBe(97);
  });
});
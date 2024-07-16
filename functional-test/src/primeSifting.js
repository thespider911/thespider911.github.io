export const sievePrimes = (max) => {
    if (max < 2) return [];

    const numbers = Array.from({ length: max - 1 }, (_, i) => i + 2);

    const sieve = (nums, prime = 2) => {
      if (prime > Math.sqrt(max)) return nums;

      const filtered = nums.filter(num => num === prime || num % prime !== 0);
      const nextPrime = filtered.find(num => num > prime);

      return sieve(filtered, nextPrime);
    };

    return sieve(numbers);
  };
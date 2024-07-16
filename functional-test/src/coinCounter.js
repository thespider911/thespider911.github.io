// Part 1: Recursive coin counter
export const recursiveCoinCounter = (amount) => {
    const coins = [
      { name: 'quarter', value: 25 },
      { name: 'dime', value: 10 },
      { name: 'nickel', value: 5 },
      { name: 'penny', value: 1 }
    ];

    const countCoins = (remaining, coinIndex = 0) => {
      if (coinIndex >= coins.length) return {};
      const coin = coins[coinIndex];
      const count = Math.floor(remaining / coin.value);
      const rest = remaining % coin.value;
      return {
        [coin.name]: count,
        ...countCoins(rest, coinIndex + 1)
      };
    };

    return countCoins(Math.round(amount * 100));
  };

  // Part 2: Closure-based coin counter
  export const closureCoinCounter = (amount) => {
    const cents = Math.round(amount * 100);

    const counter = (coinValue) => (acc) => {
      const count = Math.floor(acc / coinValue);
      return [count, acc % coinValue];
    };

    const quarter = counter(25);
    const dime = counter(10);
    const nickel = counter(5);
    const penny = counter(1);

    const [quarters, afterQuarters] = quarter(cents);
    const [dimes, afterDimes] = dime(afterQuarters);
    const [nickels, afterNickels] = nickel(afterDimes);
    const [pennies] = penny(afterNickels);

    return { quarters, dimes, nickels, pennies };
  };
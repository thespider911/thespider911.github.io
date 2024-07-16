const romanSymbols = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];

  export const toRoman = (num) => {
    if (num <= 0 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    const convert = (remaining, index = 0) => {
      if (remaining === 0) return '';
      const { value, symbol } = romanSymbols[index];
      if (remaining >= value) {
        return symbol + convert(remaining - value, index);
      }
      return convert(remaining, index + 1);
    };

    return convert(num);
  };

  // Bonus: Curried version
  export const curriedToRoman = (symbols) => (num) => {
    if (num <= 0 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    const convert = (remaining) => (index) => {
      if (remaining === 0) return '';
      const { value, symbol } = symbols[index];
      if (remaining >= value) {
        return symbol + convert(remaining - value)(index);
      }
      return convert(remaining)(index + 1);
    };

    return convert(num)(0);
  };

  export const romanNumeralConverter = curriedToRoman(romanSymbols);
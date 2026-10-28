import { formatMoney, parseMoney, roundMoney, toInputMoney } from '@/utils/money';

const nonBreakingSpace = /\u00a0/g;

describe('parseMoney', () => {
  it('accepts comma decimals', () => {
    expect(parseMoney('10,5')).toBe(10.5);
    expect(parseMoney('0,99')).toBe(0.99);
  });

  it('accepts periods as thousands separators', () => {
    expect(parseMoney('1.234,56')).toBe(1234.56);
    expect(parseMoney('1.234')).toBe(1234);
  });

  it('accepts period decimals', () => {
    expect(parseMoney('12.5')).toBe(12.5);
  });

  it('returns NaN for text without digits', () => {
    expect(parseMoney('')).toBeNaN();
    expect(parseMoney('abc')).toBeNaN();
  });
});

describe('formatMoney', () => {
  it('formats values as Brazilian reais', () => {
    expect(formatMoney(1234.5).replace(nonBreakingSpace, ' ')).toBe('R$ 1.234,50');
  });
});

describe('roundMoney and toInputMoney', () => {
  it('rounds to two decimal places', () => {
    expect(roundMoney(0.1 + 0.2)).toBe(0.3);
  });

  it('formats an input value with a comma', () => {
    expect(toInputMoney(1234.5)).toBe('1234,50');
  });
});

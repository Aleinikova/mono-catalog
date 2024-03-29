import { currencyFormatter } from './currency-formatter';

describe('currencyFormatter', () => {
  it('should work for USD', () => {
    expect(currencyFormatter(1000, 'USD')).toEqual(
      new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'USD',
      }).format(1000)
    );
  });
  it('should work for CHF', () => {
    expect(currencyFormatter(1000, 'CHF')).toEqual(
      new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'CHF',
      }).format(1000)
    );
  });
});

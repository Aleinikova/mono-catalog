export function currencyFormatter(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: currency || 'USD',
  });

  return formatter.format(amount);
}

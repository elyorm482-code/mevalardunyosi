export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
}

export function formatWeight(quantity: number, unit: 'kg' | 'dona' | 'quti'): string {
  if (unit === 'kg') {
    return `${quantity} kg`;
  }
  if (unit === 'quti') {
    return `${quantity} quti`;
  }
  return `${quantity} dona`;
}

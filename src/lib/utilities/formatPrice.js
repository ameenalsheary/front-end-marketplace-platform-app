export function formatPrice(value) {
  if (typeof value !== 'number') {
    return '';
  }

  return value.toFixed(2).replace('.', ',');
}

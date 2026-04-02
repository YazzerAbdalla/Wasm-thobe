export function toArabicNumbers(number: number) {
  return new Intl.NumberFormat("ar-EG").format(number);
}

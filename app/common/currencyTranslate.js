function currencyTranslate(value=0, locale='en-EN', currency='USD') {
  return value.toLocaleString('en-EN', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
}
export { currencyTranslate };

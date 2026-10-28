const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatMoney(value: number): string {
  return brl.format(value);
}

export function parseMoney(text: string): number {
  const clean = text.replace(/[^\d.,]/g, '');
  if (!/\d/.test(clean)) return Number.NaN;

  let normalized = clean;
  if (clean.includes(',')) {
    normalized = clean.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+$/.test(clean)) {
    normalized = clean.replace(/\./g, '');
  }
  return Number(normalized);
}

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function toInputMoney(value: number): string {
  return value.toFixed(2).replace('.', ',');
}
